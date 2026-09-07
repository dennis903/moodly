export const formatTimeToKorean = (time: string) => {
  if (!time) return '아직 수정 전입니다.';

  const date = new Date(time);
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
};

export const formatDateToKorean = (date?: string) => {
  let convertedDate: Date;
  if (date) {
    convertedDate = new Date(date);
  } else {
    convertedDate = new Date();
  }

  const year = convertedDate.getFullYear();
  const month = String(convertedDate.getMonth() + 1).padStart(2, '0');
  const day = String(convertedDate.getDate()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일`;
};

export const formatDateToKoreanDay = (date?: string) => {
  let convertedDate: Date;
  if (date) {
    convertedDate = new Date(date);
  } else {
    convertedDate = new Date();
  }

  const day = convertedDate.getDay();
  const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  return daysOfWeek[day];
};

export const formatHoursAndMinutes = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};
