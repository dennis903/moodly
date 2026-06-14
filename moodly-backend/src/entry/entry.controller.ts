import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { EntryService } from './entry.service';
import { TagService } from '../tag/tag.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { QueryEntriesDto } from './dto/query-entries.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../user/user.entity';

@ApiTags('Entries')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class EntryController {
  constructor(
    private readonly entryService: EntryService,
    private readonly tagService: TagService,
  ) {}

  @Get('entries')
  @ApiOperation({ summary: '일기 목록 조회 (기간 필터 가능)' })
  @ApiResponse({ status: 200, description: '일기 목록' })
  @ApiResponse({ status: 401, description: '토큰 없음 또는 만료' })
  findAll(@CurrentUser() user: User, @Query() query: QueryEntriesDto) {
    return this.entryService.findAll(user.id, query);
  }

  @Get('entries/:id')
  @ApiOperation({ summary: '일기 단건 조회' })
  @ApiResponse({ status: 200, description: '일기 상세' })
  @ApiResponse({ status: 401, description: '토큰 없음 또는 만료' })
  @ApiResponse({ status: 403, description: '다른 유저의 일기에 접근' })
  @ApiResponse({ status: 404, description: '일기를 찾을 수 없음' })
  findOne(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.entryService.findOne(id, user.id);
  }

  @Post('entries')
  @ApiOperation({ summary: '일기 생성' })
  @ApiResponse({ status: 201, description: '생성된 일기' })
  @ApiResponse({ status: 400, description: '유효성 검증 실패 (날짜 형식, 감정 값 등)' })
  @ApiResponse({ status: 401, description: '토큰 없음 또는 만료' })
  @ApiResponse({ status: 409, description: '해당 날짜에 이미 일기가 존재' })
  create(@CurrentUser() user: User, @Body() dto: CreateEntryDto) {
    return this.entryService.create(user.id, dto);
  }

  @Patch('entries/:id')
  @ApiOperation({ summary: '일기 수정' })
  @ApiResponse({ status: 200, description: '수정된 일기' })
  @ApiResponse({ status: 400, description: '유효성 검증 실패' })
  @ApiResponse({ status: 401, description: '토큰 없음 또는 만료' })
  @ApiResponse({ status: 403, description: '다른 유저의 일기에 접근' })
  @ApiResponse({ status: 404, description: '일기를 찾을 수 없음' })
  update(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEntryDto,
  ) {
    return this.entryService.update(id, user.id, dto);
  }

  @Delete('entries/:id')
  @ApiOperation({ summary: '일기 삭제' })
  @ApiResponse({ status: 200, description: '삭제 완료' })
  @ApiResponse({ status: 401, description: '토큰 없음 또는 만료' })
  @ApiResponse({ status: 403, description: '다른 유저의 일기에 접근' })
  @ApiResponse({ status: 404, description: '일기를 찾을 수 없음' })
  async remove(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.entryService.delete(id, user.id);
    return { message: '일기가 삭제되었습니다' };
  }

  @Get('tags')
  @ApiOperation({ summary: '내 태그 목록 조회' })
  @ApiResponse({ status: 200, description: '태그 목록' })
  @ApiResponse({ status: 401, description: '토큰 없음 또는 만료' })
  getTags(@CurrentUser() user: User) {
    return this.tagService.findByUser(user.id);
  }
}
