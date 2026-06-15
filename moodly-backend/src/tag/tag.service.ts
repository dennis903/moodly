import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findOrCreate(userId: string, tagNames: string[]): Promise<Tag[]> {
    const tags: Tag[] = [];
    for (const name of tagNames) {
      const trimmed = name.trim();
      if (!trimmed) continue;

      let tag = await this.tagRepository.findOne({
        where: { userId, name: trimmed },
      });

      if (!tag) {
        tag = this.tagRepository.create({ userId, name: trimmed });
        tag = await this.tagRepository.save(tag);
      }

      tags.push(tag);
    }
    return tags;
  }

  async findByUser(userId: string): Promise<Tag[]> {
    return this.tagRepository
      .createQueryBuilder('tag')
      .leftJoin('tag.entries', 'entry')
      .where('tag.userId = :userId', { userId })
      .addSelect('COUNT(entry.id)', 'entryCount')
      .groupBy('tag.id')
      .orderBy('entryCount', 'DESC')
      .getMany();
  }
}
