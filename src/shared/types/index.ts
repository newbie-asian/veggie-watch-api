import type { Router } from "express";
import type { Response } from "express";

export interface RouteModule {
  path: string;
  router: Router;
}

export interface ApiResponsePayload<T = unknown> {
  res: Response;
  statusCode: number;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
}
