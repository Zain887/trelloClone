import { IsNotEmpty, IsEmail, MinLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class authCredentialsDto {

  @ApiProperty({ description: 'User first name', example: 'Shahbaz' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'User last name', example: 'Raza' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'User email', example: 'shahbaz@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ description: 'User password (min length: 6)', example: 'password123' })
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}
