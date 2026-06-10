import { FetchError } from "./fetch/fetch.error";

const STATUS_MESSAGE: Record<number, string> = {
  400: "잘못된 요청입니다.",
  401: "로그인이 필요합니다.",
  403: "권한이 없습니다.",
  404: "데이터를 찾을 수 없습니다.",
  409: "이미 존재합니다.",
  500: "서버 오류가 발생했습니다.",
};

export const getErrorMessage = (
  error: unknown,
  fallback = "오류가 발생했습니다.",
) => {
  if (error instanceof FetchError) {
    return error.message?.length
      ? error.message // 서버가 내려준 메시지 우선
      : (STATUS_MESSAGE[error.status] ?? fallback);
  }

  return error instanceof Error ? error.message : fallback;
};
