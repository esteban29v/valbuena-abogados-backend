// auth.controller.ts
import { Controller, Post, Body, HttpStatus, Res, UnauthorizedException, UseGuards, Get, HttpCode, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';

import { Response } from 'express';

import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('testing-guard')
  getProtectedData() {
    return { message: 'This is protected data!' };
  }

  @Post('login')
  async login(@Body() user: User) {
    const validatedUser = await this.authService.validateUser(user.email, user.password);
    if (!validatedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      access_token: await this.authService.authenticate(validatedUser)
    }
  }

  @Post('register')
  async createUser(@Body() userData: Partial<User>, @Res() response: Response) {
    let statusCode = 200;
    let message = '';
    let success = true;
    let data = null;
    let errors = [];

    try{
      const userResponse = await this.authService.createUser(userData);
      
      statusCode = HttpStatus.CREATED; //
      message = 'User created successfully!';
      success = true;
      statusCode = 201;
      data = userResponse;
    } catch(error){
      console.error(error);

      if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
        statusCode = HttpStatus.CONFLICT;
        message = 'An error occurred while creating the user';
        success = false;
        errors = [
          'duplicate_entry'
        ]
      }
    }

    return response.status(statusCode).json({
      message,
      success,
      statusCode,
      data,
      errors,
      timestamp: new Date().toISOString(),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    const userId = req.user.id; // El ID del usuario que se obtiene del JWT
    const accessToken = req.headers.authorization?.split(' ')[1]; // Obtener el token del header

    console.log(req.user, accessToken);

    // Invalidate the token in the database
    await this.authService.logout(userId, accessToken);

    return { message: 'Logout successful' };
  }
}
