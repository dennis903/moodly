import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString } from 'class-validator';

export class QueryEntriesDto {
  @ApiPropertyOptional({ example: '2026-06-01', description: '조회 시작일' })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({ example: '2026-06-30', description: '조회 종료일' })
  @IsOptional()
  @IsDateString()
  to?: string;
}
