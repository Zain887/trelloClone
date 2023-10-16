import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import necessary Swagger decorator

export class CreateBoardDto {

  @ApiProperty({ description: 'Title of the board', example: 'My Board' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Is the board active?', example: true })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
