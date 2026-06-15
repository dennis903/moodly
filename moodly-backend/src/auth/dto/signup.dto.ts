import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'user@example.com', description: '이메일 주소' })
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다' })
  email: string;

  @ApiProperty({ example: 'password123', description: '비밀번호 (8자 이상)' })
  @IsString()
  @MinLength(8, { message: '비밀번호는 8자 이상이어야 합니다' })
  password: string;

  @ApiProperty({ example: '형진', description: '닉네임 (1~20자)' })
  @IsString()
  @MinLength(1, { message: '닉네임을 입력해주세요' })
  @MaxLength(20, { message: '닉네임은 20자 이하여야 합니다' })
  name: string;
}
