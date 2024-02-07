import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentils.dto';
import * as express from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto,
    @Res() response: express.Response,
  ): Promise<void> {
    return this.authService.signUp(AuthCredentialsDto, response);
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response: express.Response,
  ): Promise<void> {
    response.cookie('key', 'value');
    return this.authService.signIn(AuthCredentialsDto, response);
  }
}
