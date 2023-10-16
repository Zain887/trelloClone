import { IsString, IsBoolean, IsDate, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import necessary Swagger decorator

export class CreateCardDto {
  @ApiProperty({ description: 'Title of the card', example: 'My Card' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the card', example: 'Card description' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Status of the card', example: true })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ description: 'Due date of the card', example: '2023-10-31T00:00:00Z' })
  @IsOptional()
  @IsDate()
  dueDate: Date;

  @ApiProperty({ description: 'Reminder date for the card', example: '2023-10-30T12:00:00Z' })
  @IsOptional()
  @IsDate()
  reminderDate: Date;
}
