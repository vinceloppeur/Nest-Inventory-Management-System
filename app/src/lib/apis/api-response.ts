export interface ApiResponse<
  D extends Record<string, unknown> | void = undefined,
> {
  message: string;
  data?: D;
  requestedAt: Date;
  status: number;
}
