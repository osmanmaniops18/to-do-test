import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum([true, false])
  status: boolean;

  @IsString()
  imageUrl: string;
}
