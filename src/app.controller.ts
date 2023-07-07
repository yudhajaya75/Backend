import { BadRequestException, Body, Controller, Get, Post, Res, Req, UnauthorizedException, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService
  ) { }

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.appService.create({
      email,
      password: hashedPassword
    });
    delete user.password;

    return user;
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.appService.findOne({ email });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      email: user.email,
      message: 'Login successful'
    };
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.appService.findOne({ id: data['id'] });

      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'Logout successful'
    }
  }

  //   @Delete('user')
  // async deleteUser(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
  //   try {
  //     const cookie = request.cookies['jwt'];

  //     const data = await this.jwtService.verifyAsync(cookie);

  //     if (!data) {
  //       throw new UnauthorizedException();
  //     }

  //     await this.appService.delete({ id: data['id'] });

  //     response.clearCookie('jwt');

  //     return {
  //       message: 'User deleted successfully'
  //     };
  //   } catch (e) {
  //     throw new UnauthorizedException();
  //   }
  // } 
}
