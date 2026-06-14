import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  MaxLength,
} from 'class-validator';
import { Emotion } from '../../common/enums/emotion.enum';

export class CreateEntryDto {
  @ApiProperty({ example: '2026-06-14', description: '일기 날짜 (YYYY-MM-DD)' })
  @IsDateString({}, { message: '유효한 날짜 형식이 아닙니다 (YYYY-MM-DD)' })
  date: string;

  @ApiProperty({ enum: Emotion, example: Emotion.HAPPY, description: '감정' })
  @IsEnum(Emotion, { message: '유효한 감정 값이 아닙니다' })
  emotion: Emotion;

  @ApiPropertyOptional({ example: '오늘 좋은 일이 있었다', description: '메모 (최대 500자)' })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: '메모는 500자 이하여야 합니다' })
  memo?: string;

  @ApiPropertyOptional({ example: ['회사', '운동'], description: '태그 이름 배열' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: '맑음', description: '날씨' })
  @IsOptional()
  @IsString()
  weather?: string;
}
