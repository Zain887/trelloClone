import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiResponse, ApiOperation, ApiBadRequestResponse } from '@nestjs/swagger'; // Import necessary Swagger decorators

@Controller('/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Logged in successfully' }) // Describe the successful response
  @ApiBadRequestResponse({ description: 'Bad request' }) // Describe a possible error response
  async login(@Body() loginDto: LoginDto) {
    try {
      const token = await this.authService.login(loginDto.email, loginDto.password);
      if (!token) {
        throw new HttpException('Authentication failed', HttpStatus.UNAUTHORIZED);
      }
      return { access_token: token.access_token };
    } catch (error) {
      throw error;
    }
  }
}
