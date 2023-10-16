import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberDto {
	@IsNotEmpty()
	@IsEmail()
	@IsString()
	email: string;

}
