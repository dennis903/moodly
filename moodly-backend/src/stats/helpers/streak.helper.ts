/**
 * 날짜 배열에서 현재 연속 기록일과 최장 연속 기록일을 계산합니다.
 * dates: 'YYYY-MM-DD' 형식의 날짜 배열 (정렬 불필요)
 */
export function calculateStreak(dates: string[]): {
  current: number;
  longest: number;
} {
  if (!dates.length) return { current: 0, longest: 0 };

  // 중복 제거 후 오름차순 정렬
  const sorted = [...new Set(dates)].sort();

  // 오늘 기준 현재 연속일 계산
  const today = new Date().toISOString().slice(0, 10);
  let current = 0;
  let checkDate = today;

  while (sorted.includes(checkDate)) {
    current++;
    const d = new Date(checkDate);
    d.setDate(d.getDate() - 1);
    checkDate = d.toISOString().slice(0, 10);
  }

  // 전체 최장 연속일 계산
  let longest = 0;
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diffDays =
      (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streak++;
    } else {
      longest = Math.max(longest, streak);
      streak = 1;
    }
  }
  longest = Math.max(longest, streak);

  return { current, longest };
}
