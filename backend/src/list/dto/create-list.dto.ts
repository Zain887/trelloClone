import { IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { ListPosition } from '../entities/list.entity';
import { ApiProperty } from '@nestjs/swagger'; // Import necessary Swagger decorator

export class CreateListDto {

  @ApiProperty({ description: 'Title of the list', example: 'My List' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Position of the list', enum: ListPosition, example: ListPosition.FIRST })
  @IsEnum(ListPosition)
  position: ListPosition;
}
