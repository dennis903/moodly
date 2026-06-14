import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { IsEnum, IsOptional, IsDateString } from 'class-validator';
import { StatsService } from './stats.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../user/user.entity';

class SummaryQueryDto {
  @IsOptional()
  @IsEnum(['week', 'month', 'year'])
  period?: 'week' | 'month' | 'year';
}

class TrendQueryDto {
  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;
}

@ApiTags('Stats')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('summary')
  @ApiOperation({ summary: '감정 통계 요약' })
  @ApiQuery({ name: 'period', enum: ['week', 'month', 'year'], required: false })
  getSummary(
    @CurrentUser() user: User,
    @Query() query: SummaryQueryDto,
  ) {
    return this.statsService.getSummary(user.id, query.period ?? 'month');
  }

  @Get('trend')
  @ApiOperation({ summary: '감정 추이 데이터' })
  @ApiQuery({ name: 'from', required: false, example: '2026-06-01' })
  @ApiQuery({ name: 'to', required: false, example: '2026-06-30' })
  getEmotionTrend(
    @CurrentUser() user: User,
    @Query() query: TrendQueryDto,
  ) {
    const today = new Date().toISOString().slice(0, 10);
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    return this.statsService.getEmotionTrend(
      user.id,
      query.from ?? monthAgo,
      query.to ?? today,
    );
  }

  @Get('tags')
  @ApiOperation({ summary: '태그별 통계' })
  @ApiQuery({ name: 'period', enum: ['week', 'month', 'year'], required: false })
  getTagStats(
    @CurrentUser() user: User,
    @Query() query: SummaryQueryDto,
  ) {
    return this.statsService.getTagStats(user.id, query.period ?? 'month');
  }
}
