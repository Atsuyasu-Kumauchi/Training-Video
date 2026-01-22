import { Controller, Post, Body, Request, UseGuards, Get, HttpStatus, HttpException, Req, Query, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyUser, JwtAuthGuard } from './auth.guard';
import { LoginDto, SignUpDto } from './auth.dto';
import { throwHttpException } from 'src/common/exception/exception.util';
import { InvalidCredential, UserNotFound } from './auth.exceptions';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('totp-qr')
  async totpQr(@Req() req) {
    try {
      return await this.authService.totpQr(req.user.username);
    } catch (e) {
      if (e instanceof UserNotFound)
        throwHttpException("Unknown user!", HttpStatus.UNPROCESSABLE_ENTITY, e);
      throw e;
    }
  }

  @Post('login-totp')
  @HttpCode(HttpStatus.OK)
  async loginWithTotp(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.loginWithTotp(loginDto);
    } catch (e) {
      if (e instanceof UserNotFound || e instanceof InvalidCredential)
        throwHttpException("Invalid credentials", HttpStatus.UNAUTHORIZED, e);
      throw e;
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (e) {
      if (e instanceof UserNotFound || e instanceof InvalidCredential)
        throwHttpException("Invalid credentials", HttpStatus.UNAUTHORIZED, e);
      throw e;
    }
  }

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    if (await this.authService.userExists(signUpDto.username))
      throw new HttpException("User Exists!", HttpStatus.CONFLICT);

    return await this.authService.signup(signUpDto);
  }

  @Get('resend-mailpass')
  async resendMailpass(@Query('email') email: string) {
    try {
      return await this.authService.resendMailpass(email);
    } catch (e) {
      if (e instanceof UserNotFound)
        throwHttpException("Unknown account!", HttpStatus.UNPROCESSABLE_ENTITY, e);
      throw e;
    }
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body('email') email: string, @Body('mailpass') mailpass: string, @Body('sig') sig: string) {
    try {
      await this.authService.verifyEmail(email, mailpass, sig);
    } catch (e) {
      if (e instanceof UserNotFound || e instanceof InvalidCredential)
        throwHttpException("Invalid credentials", HttpStatus.UNAUTHORIZED, e);
      throw e;
    }
  }

  @Get('init-recovery')
  async initRecovery(@Query('email') email) {
    try {
      return await this.authService.initRecovery(email);
    } catch (e) {
      if (e instanceof UserNotFound)
        throwHttpException("Unknown user!", HttpStatus.UNPROCESSABLE_ENTITY, e);
      throw e;
    }
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body('email') email: string, @Body('otp') otp: string, @Body('sig') sig: string, @Body('newpassword') p: string) {
    try {
      await this.authService.resetPassword(email, otp, sig, p);
    } catch (e) {
      if (e instanceof UserNotFound || e instanceof InvalidCredential)
        throwHttpException("Invalid credentials", HttpStatus.UNAUTHORIZED, e);
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Req() req, @Body('password') password: string, @Body('newpassword') newpassword: string) {
    try {
      await this.authService.changePassword(req.user.username, password, newpassword);
    } catch (e) {
      if (e instanceof UserNotFound || e instanceof InvalidCredential)
        throwHttpException("Invalid credentials", HttpStatus.UNAUTHORIZED, e);
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard, VerifyUser)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('uri-permissions')
  async getUriPermissions(@Body() req) {
    return await this.authService.getUriPermissions();
  }

}
