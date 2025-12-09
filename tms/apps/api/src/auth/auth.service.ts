import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from './hash.util';
import { LoginDto, SignUpDto } from './auth.dto';
import { authenticator, totp } from 'otplib';
import * as qrcode from 'qrcode';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { throwSe } from 'src/common/exception/exception.util';
import { InvalidCredential, UserNotFound } from './auth.service.exceptions';


function dateToOtp(date: Date): string {
  const d = date;
  const months = d.getMonth() > 9 ? d.getMonth() : `${Math.ceil(Math.random()*10)%2 ? 2 : 6}${d.getDate()}`;
  const days = d.getDate() > 9 ? d.getDate() : `${Math.ceil(Math.random()*10)%2 ? 4 : 5}${d.getDate()}`;
  const hours = d.getHours() > 9 ? d.getHours() : `${Math.ceil(Math.random()*10)%2 ? 3 : 8}${d.getHours()}`;
  return `${months}${days}${hours}`;
}

function otpToDate(mailpass: string): Date {
  const year = (new Date()).getFullYear();
  const month = +mailpass.substring(0, 2).replace(/^[2-6]/, '');
  const date = +mailpass.substring(2, 4).replace(/^[4-5]/, '');
  const hour = +mailpass.substring(4, 6).replace(/^[3-8]/, '');
  return new Date(year, month, date, hour);
}

function diffMinutes(date1: Date, date2: Date) {
  const diffMs = Math.abs(date1.getTime() - date2.getTime());
  return Math.floor(diffMs / 60000);
}

async function newUserVerifySig(user: User, verifyPass: string) {
  return await hashPassword(verifyPass + user.privatekey);
}

function newUserVerifySigRaw(user: User, verifyPass: string) {
  return verifyPass + user.privatekey;
}


@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService, private configService: ConfigService, private userService: UserService) {
    authenticator.options = {
      window: 1,
      step: 30
    };
  }

  async userExists(username: string) {
    return !!await this.userService.findByUsername(username);
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username) || throwSe(UserNotFound);

    if (await comparePassword(password, user.password)) return user;

    throwSe(InvalidCredential);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    return { accessToken: this.jwtService.sign({ username: user.username, enabled: user.status === 'enabled', sub: user.userId }) };
  }

  async initRecovery(email: string) {
    const user = await this.userService.findByEmail(email) || throwSe(UserNotFound);

    const otp = dateToOtp(new Date());
    return { otp, key: await newUserVerifySig(user, otp) };
  }

  async resetPassword(email: string, otp: string, sig: string, newpassword: string) {
    const user = await this.userService.findByEmail(email) || throwSe(UserNotFound);

    if (await comparePassword(newUserVerifySigRaw(user, otp), sig) && diffMinutes(otpToDate(otp), new Date()) < 720) {
      user.password = await hashPassword(newpassword);
      user.privatekey = authenticator.generateSecret();
      await this.userService.saveUser(user);
      return { accessToken: this.jwtService.sign({ username: user.username, enabled: user.status === 'enabled', sub: user.userId }) };
    }

    throwSe(InvalidCredential);
  }

  async loginWithTotp(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findByUsername(loginDto.username) || throwSe(UserNotFound);

    authenticator.verify({ token: loginDto.password, secret: user.privatekey || '' }) || throwSe(InvalidCredential);

    return { accessToken: this.jwtService.sign({ username: user.username, enabled: user.status === 'enabled', sub: user.userId }) };
  }

  async signup(signUpDto: SignUpDto): Promise<{ accessToken: string, __mailbody: Object }> {
    const user = await this.userService.create({
      ...signUpDto,
      password: await hashPassword(signUpDto.password),
      privatekey: authenticator.generateSecret()
    });

    const mailpass = dateToOtp(new Date());
    console.log(mailpass, await newUserVerifySig(user, mailpass)); // TODO: send emailVirifyCode

    return {
      accessToken: this.jwtService.sign({ username: user.username, enabled: false, sub: user.userId }),
      __mailbody: { mailpass, sig: await newUserVerifySig(user, mailpass) }
    };
  }

  async resendMailpass(email: string) {
    const user = await this.userService.findByEmail(email) || throwSe(UserNotFound);

    const mailpass = dateToOtp(new Date());
    return { mailpass, sig: await newUserVerifySig(user, mailpass) };
  }

  async verifyEmail(email: string, mailpass: string, sig: string) {
    const user = await this.userService.findByEmail(email) || throwSe(UserNotFound);

    if (await comparePassword(newUserVerifySigRaw(user, mailpass), sig) && diffMinutes(otpToDate(mailpass), new Date()) < 720) {
      user.status = "enabled";
      return !!await this.userService.saveUser(user);
    }

    throwSe(InvalidCredential);
  }

  async authenticatorQr(username: string): Promise<string> {
    const user = await this.userService.findByUsername(username) || throwSe(UserNotFound);

    return new Promise((res, rej) => {
      const keyuri = totp.keyuri(user.username, this.configService.getOrThrow<string>('appname'), user.privatekey || '');
      qrcode.toDataURL(keyuri, (err, url) => {
        if (err) rej(err);
        else res(url)
      });
    });
  }

  async changePassword(username: string, password: string, newpassword: string) {
    const user = await this.validateUser(username, password);
    user.password = await hashPassword(newpassword);
    await this.userService.saveUser(user);
  }

}
