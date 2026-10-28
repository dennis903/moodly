import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsDateString, IsInt, Min, Max } from 'class-validator';

export class QueryEntriesDto {
  @ApiPropertyOptional({ example: '2026-06-01', description: '조회 시작일' })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({ example: '2026-06-30', description: '조회 종료일' })
  @IsOptional()
  @IsDateString()
  to?: string;

  @ApiPropertyOptional({
    example: '2026-04-15',
    description: '이전 응답의 nextCursor (이 날짜보다 이전 일기부터 조회)',
  })
  @IsOptional()
  @IsDateString()
  cursor?: string;

  @ApiPropertyOptional({
    example: 20,
    default: 20,
    minimum: 1,
    maximum: 50,
    description: '한 번에 가져올 개수',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 20;
}
