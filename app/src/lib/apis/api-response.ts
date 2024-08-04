export type ApiResponse<D = void> = D extends void
  ? {
      message: string;
      data?: D;
      status: number;
    }
  : {
      message: string;
      data: D;
      status: number;
    };
