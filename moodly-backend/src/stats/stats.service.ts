import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from '../entry/entry.entity';
import { Emotion } from '../common/enums/emotion.enum';
import { calculateStreak } from './helpers/streak.helper';
import { EMOTION_VALUE } from './helpers/emotion-value.helper';

type Period = 'week' | 'month' | 'year';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
  ) {}

  private getPeriodRange(period: Period): { from: string; to: string } {
    const now = new Date();
    const to = now.toISOString().slice(0, 10);
    const from = new Date(now);

    if (period === 'week') from.setDate(now.getDate() - 6);
    else if (period === 'month') from.setMonth(now.getMonth() - 1);
    else from.setFullYear(now.getFullYear() - 1);

    return { from: from.toISOString().slice(0, 10), to };
  }

  async getSummary(userId: string, period: Period) {
    const { from, to } = this.getPeriodRange(period);

    const entries = await this.entryRepository
      .createQueryBuilder('entry')
      .where('entry.userId = :userId', { userId })
      .andWhere('entry.date >= :from', { from })
      .andWhere('entry.date <= :to', { to })
      .getMany();

    const dates = entries.map((e) => e.date);
    const { current, longest } = calculateStreak(dates);

    // 전체 기간 일 수 계산
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const totalPeriodDays =
      Math.round(
        (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1;

    // 감정 분포
    const emotionCount: Partial<Record<Emotion, number>> = {};
    for (const entry of entries) {
      emotionCount[entry.emotion] = (emotionCount[entry.emotion] ?? 0) + 1;
    }

    const total = entries.length;
    const emotionDistribution = Object.entries(emotionCount).map(
      ([emotion, count]) => ({
        emotion,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      }),
    );

    const dominantEmotion =
      emotionDistribution.sort((a, b) => b.count - a.count)[0]?.emotion ??
      null;

    return {
      period,
      from,
      to,
      totalDays: total,
      currentStreak: current,
      longestStreak: longest,
      completionRate:
        totalPeriodDays > 0
          ? Math.round((total / totalPeriodDays) * 100)
          : 0,
      dominantEmotion,
      emotionDistribution,
    };
  }

  async getEmotionTrend(userId: string, from: string, to: string) {
    const entries = await this.entryRepository
      .createQueryBuilder('entry')
      .where('entry.userId = :userId', { userId })
      .andWhere('entry.date >= :from', { from })
      .andWhere('entry.date <= :to', { to })
      .orderBy('entry.date', 'ASC')
      .getMany();

    return entries.map((e) => ({
      date: e.date,
      emotion: e.emotion,
      emotionValue: EMOTION_VALUE[e.emotion],
    }));
  }

  async getTagStats(userId: string, period: Period) {
    const { from, to } = this.getPeriodRange(period);

    const entries = await this.entryRepository
      .createQueryBuilder('entry')
      .leftJoinAndSelect('entry.tags', 'tag')
      .where('entry.userId = :userId', { userId })
      .andWhere('entry.date >= :from', { from })
      .andWhere('entry.date <= :to', { to })
      .getMany();

    const tagMap = new Map<
      string,
      { name: string; count: number; emotions: Emotion[] }
    >();

    for (const entry of entries) {
      for (const tag of entry.tags) {
        if (!tagMap.has(tag.id)) {
          tagMap.set(tag.id, { name: tag.name, count: 0, emotions: [] });
        }
        const data = tagMap.get(tag.id)!;
        data.count++;
        data.emotions.push(entry.emotion);
      }
    }

    return Array.from(tagMap.values())
      .map(({ name, count, emotions }) => {
        const emotionFreq: Partial<Record<Emotion, number>> = {};
        for (const e of emotions) {
          emotionFreq[e] = (emotionFreq[e] ?? 0) + 1;
        }
        const dominantEmotion = Object.entries(emotionFreq).sort(
          (a, b) => b[1] - a[1],
        )[0]?.[0] as Emotion | undefined;

        return { name, count, dominantEmotion };
      })
      .sort((a, b) => b.count - a.count);
  }
}
