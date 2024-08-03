export interface ApiResponse<D> {
  message: string;
  data?: D;
  status: number;
}
