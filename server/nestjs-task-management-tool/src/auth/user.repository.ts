import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository, DataSource } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentils.dto';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async signUp(
    authCredentialsDto: AuthCredentialsDto,
    response: express.Response,
  ): Promise<void> {
    const { email, password } = authCredentialsDto;

    const user = new User();
    user.email = email;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();

    response
      .status(200)
      .json({ success: true, message: 'User Created successfully' });
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
    response: express.Response,
  ): Promise<void> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ where: { email } });
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    const token = jwt.sign(
      { email },
      'ndsdsmdnskjdhwjsdahsjdbscnzbczncz,xsjdhjkasgahdsadbsandscnghgasf',
    );

    // Set the token in a cookie

    response.set('Authorization', 'Bearer ' + token);
    response
      .status(200)
      .json({ success: true, message: 'User Logged in successfully', token });
  }
}
