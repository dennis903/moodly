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

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
    private readonly tagService: TagService,
  ) {}

  async findAll(userId: string, query: QueryEntriesDto): Promise<Entry[]> {
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

    return qb.getMany();
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
