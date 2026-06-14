import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: '새닉네임', description: '닉네임 (1~20자)' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  name?: string;

  @ApiPropertyOptional({ example: 'https://...', description: '프로필 이미지 URL' })
  @IsOptional()
  @IsString()
  image?: string;
}
