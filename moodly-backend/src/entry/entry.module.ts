import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entry.entity';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([Entry]), TagModule],
  providers: [EntryService],
  controllers: [EntryController],
  exports: [EntryService],
})
export class EntryModule {}
