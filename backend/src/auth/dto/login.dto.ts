import { IsNotEmpty, IsEmail, MinLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {

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
