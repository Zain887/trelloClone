import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import necessary Swagger decorator

export class CreateCommentDto {
  @ApiProperty({ description: 'Comment text', example: 'This is a comment' }) // Describe the property
  @IsNotEmpty()
  @IsString()
  comment: string;
}
