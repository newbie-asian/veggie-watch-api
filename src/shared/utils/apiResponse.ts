import type { ApiResponsePayload } from "@/shared/types/ApiResponse.js";

export function sendSuccess<T>(payload: ApiResponsePayload<T>) {
  const { res, data, message, statusCode } = payload;

  return res.status(payload.statusCode).json({
    data: data ?? null,
    status: "success",
    message,
    statusCode,
  });
}

export function sendError(payload: Omit<ApiResponsePayload, "data">) {
  const { res, message, statusCode, meta } = payload;

  return res.status(payload.statusCode).json({
    status: statusCode >= 400 && statusCode < 500 ? "failed" : "error",
    message,
    statusCode,
    meta,
  });
}
