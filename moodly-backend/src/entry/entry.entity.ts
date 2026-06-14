import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { Emotion } from '../common/enums/emotion.enum';
import { User } from '../user/user.entity';
import { Tag } from '../tag/tag.entity';

@Entity('entries')
@Unique(['userId', 'date'])
export class Entry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'enum', enum: Emotion })
  emotion: Emotion;

  @Column({ type: 'varchar', length: 500, nullable: true })
  memo: string | null;

  @Column({ type: 'varchar', nullable: true })
  weather: string | null;

  @Column({ type: 'varchar' })
  userId: string;

  @ManyToOne(() => User, (user) => user.entries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.entries, { cascade: true })
  @JoinTable({ name: 'entry_tags' })
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
