import type { ApiResponsePayload } from "@/shared/types/index.js";

export function sendSuccess<T>(payload: ApiResponsePayload<T>) {
  return payload.res.status(payload.statusCode).json({
    success: true,
    status: "success",
    message: payload.message,
    data: payload.data ?? null,
  });
}

export function sendError(payload: Omit<ApiResponsePayload, "data">) {
  return payload.res.status(payload.statusCode).json({
    success: false,
    status:
      payload.statusCode >= 400 && payload.statusCode < 500
        ? "failed"
        : "error",
    message: payload.message,
  });
}
