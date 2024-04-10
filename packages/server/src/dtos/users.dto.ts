import { UserRole } from '@/interfaces/users.interface';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class CreateUserDto extends LoginUserDto {
  @IsString()
  public name: string;

  @IsEnum(UserRole)
  public role: UserRole;
}
