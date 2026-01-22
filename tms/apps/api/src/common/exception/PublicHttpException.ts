export class PublicHttpException extends Error {
  constructor(
    public readonly status: number,
    public readonly publicMessage: string,
    public readonly originalError?: any,
  ) {
    super(publicMessage);
  }
}
