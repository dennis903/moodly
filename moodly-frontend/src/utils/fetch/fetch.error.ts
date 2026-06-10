export class FetchError extends Error {
  constructor(
    public status: number,
    public code: string | undefined, // 서버 비즈니스 코드 (zempot의 5221 같은)
    message: string,
    public payload?: unknown,
  ) {
    super(message);
    this.name = "FetchError";
  }
}
