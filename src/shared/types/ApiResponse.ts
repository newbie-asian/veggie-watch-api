import type { Response } from "express";

export interface ApiResponsePayload<T = unknown, U = unknown> {
  res: Response;
  statusCode: number;
  message: string;
  data?: T;
  meta?: U;
}

export interface ApiResponse<T = unknown, U = unknown> {
  data?: T;
  meta?: U;
  status: string;
  message: string;
  statusCode: number;
}
