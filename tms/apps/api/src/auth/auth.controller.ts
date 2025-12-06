import { Controller, Post, Body, Request, UseGuards, Get, HttpStatus, HttpException, Req, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtActiveAuthGuard, JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto, SignUpDto } from './auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('authenticator-qr')
  async authenticatorQr(@Req() req) {
    const qr = await this.authService.authenticatorQr(req.user.username);
    if (qr) return qr;
    throw new HttpException('QR Generate Failed!', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Post('login-totp')
  async loginWithTotp(@Body() loginDto: LoginDto) {
    const token = await this.authService.loginWithTotp(loginDto);
    if (token) return token;
    throw new HttpException('Invalid Credential!', HttpStatus.UNAUTHORIZED);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    if (token) return token;
    throw new HttpException('Invalid Credential!', HttpStatus.UNAUTHORIZED);
  }

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    if (await this.authService.userExists(signUpDto.username))
      throw new HttpException("User Exists!", HttpStatus.CONFLICT);

    const token = await this.authService.signup(signUpDto);
    if (token) return token;

    throw new HttpException('Signup Failed!', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Get('resend-mailpass')
  async resendMailpass(@Query('email') email: string) {
    const mailbody = await this.authService.resendMailpass(email);
    if (!mailbody) throw new HttpException('Failed Resend!', HttpStatus.INTERNAL_SERVER_ERROR);
    return mailbody;
  }

  @Post('verify-email')
  async verifyEmail(@Body('email') email: string, @Body('mailpass') mailpass: string, @Body('sig') sig: string) {
    const ok = await this.authService.verifyEmail(email, mailpass, sig);
    if (!ok) throw new HttpException('Invalid Credential!', HttpStatus.UNAUTHORIZED);
  }

  @Get('init-recovery')
  async initRecovery(@Query('email') email) {
    const mailbody = await this.authService.initRecovery(email);
    if (!mailbody) throw new HttpException('Failed send!', HttpStatus.INTERNAL_SERVER_ERROR);
    return mailbody;
  }

  @Post('reset-password')
  async resetPassword(@Body('email') email: string, @Body('otp') otp: string, @Body('sig') sig: string, @Body('newpassword') p: string) {
    const ok = await this.authService.resetPassword(email, otp, sig, p);
    if (!ok) throw new HttpException('Invalid Credential!', HttpStatus.UNAUTHORIZED);
  }

  @UseGuards(JwtActiveAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
