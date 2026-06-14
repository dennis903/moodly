import { Emotion } from '../../common/enums/emotion.enum';

export const EMOTION_VALUE: Record<Emotion, number> = {
  [Emotion.HAPPY]: 5,
  [Emotion.JOY]: 5,
  [Emotion.PROUD]: 4,
  [Emotion.CALM]: 4,
  [Emotion.MEH]: 3,
  [Emotion.TIRED]: 2,
  [Emotion.ANXIOUS]: 2,
  [Emotion.SAD]: 1,
  [Emotion.GLOOMY]: 1,
  [Emotion.ANGRY]: 1,
};
