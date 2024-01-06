import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
// app.useGlobalPipes(new ValidationPipe());をmain.tsに追加
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(6)
  @MaxLength(15)
  password: string;

  @IsNotEmpty()
  team: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(6)
  @MaxLength(15)
  password: string;
}
