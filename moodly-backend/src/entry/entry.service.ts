import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from './entry.entity';
import { TagService } from '../tag/tag.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { QueryEntriesDto } from './dto/query-entries.dto';

export interface PaginatedEntries {
  items: Entry[];
  nextCursor: string | null;
  hasNext: boolean;
}

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
    private readonly tagService: TagService,
  ) {}

  async findAll(
    userId: string,
    query: QueryEntriesDto,
  ): Promise<PaginatedEntries> {
    const { limit } = query;
    const qb = this.entryRepository
      .createQueryBuilder('entry')
      .leftJoinAndSelect('entry.tags', 'tag')
      .where('entry.userId = :userId', { userId })
      .orderBy('entry.date', 'DESC');

    if (query.from) {
      qb.andWhere('entry.date >= :from', { from: query.from });
    }
    if (query.to) {
      qb.andWhere('entry.date <= :to', { to: query.to });
    }
    if (query.cursor) {
      qb.andWhere('entry.date < :cursor', { cursor: query.cursor });
    }

    // limit + 1개를 조회해 다음 페이지 존재 여부를 판단
    const entries = await qb.take(limit + 1).getMany();
    const hasNext = entries.length > limit;
    const items = hasNext ? entries.slice(0, limit) : entries;

    return {
      items,
      nextCursor: hasNext ? items[items.length - 1].date : null,
      hasNext,
    };
  }

  async findOne(id: string, userId: string): Promise<Entry> {
    const entry = await this.entryRepository.findOne({
      where: { id },
      relations: { tags: true },
    });
    if (!entry) {
      throw new NotFoundException('일기를 찾을 수 없습니다');
    }
    if (entry.userId !== userId) {
      throw new ForbiddenException('접근 권한이 없습니다');
    }
    return entry;
  }

  async findByDate(userId: string, date: string): Promise<Entry | null> {
    return this.entryRepository.findOne({
      where: { userId, date },
      relations: { tags: true },
    });
  }

  async findByYmd(
    userId: string,
    year: number,
    month: number,
    day: number,
  ): Promise<Entry> {
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      throw new NotFoundException('일기를 찾을 수 없습니다');
    }

    const date = `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const entry = await this.findByDate(userId, date);
    if (!entry) {
      throw new NotFoundException('일기를 찾을 수 없습니다');
    }
    return entry;
  }

  async create(userId: string, dto: CreateEntryDto): Promise<Entry> {
    const existing = await this.findByDate(userId, dto.date);
    if (existing) {
      throw new ConflictException('해당 날짜에 이미 일기가 있습니다');
    }

    const tags = dto.tags?.length
      ? await this.tagService.findOrCreate(userId, dto.tags)
      : [];

    const entry = this.entryRepository.create({
      userId,
      date: dto.date,
      emotion: dto.emotion,
      memo: dto.memo ?? null,
      weather: dto.weather ?? null,
      tags,
    });

    return this.entryRepository.save(entry);
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateEntryDto,
  ): Promise<Entry> {
    const entry = await this.findOne(id, userId);

    if (dto.tags !== undefined) {
      entry.tags = dto.tags.length
        ? await this.tagService.findOrCreate(userId, dto.tags)
        : [];
    }

    if (dto.emotion !== undefined) entry.emotion = dto.emotion;
    if (dto.memo !== undefined) entry.memo = dto.memo ?? null;
    if (dto.weather !== undefined) entry.weather = dto.weather ?? null;

    return this.entryRepository.save(entry);
  }

  async delete(id: string, userId: string): Promise<void> {
    const entry = await this.findOne(id, userId);
    await this.entryRepository.remove(entry);
  }
}
