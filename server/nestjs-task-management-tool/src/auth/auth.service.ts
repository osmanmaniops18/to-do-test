import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentils.dto';
import * as express from 'express';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
    response: express.Response,
  ): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto, response);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
    response: express.Response,
  ): Promise<void> {
    return this.userRepository.validateUserPassword(
      authCredentialsDto,
      response,
    );
  }
}
