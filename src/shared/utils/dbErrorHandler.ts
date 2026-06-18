import { DrizzleQueryError } from "drizzle-orm/errors";
import { DatabaseError } from "pg";

type ErrorHandler = (error: any) => {
  message: string;
  constraint: string | null;
};

const PostgresErrorHandlers: Record<string, ErrorHandler> = {
  "23505": (error) => ({
    message: "A duplicate entry was found for a unique field.",
    constraint: error.constraint || null,
  }),
  "23503": (error) => ({
    message:
      "A foreign key violation occurred. The record you are trying to link does not exist.",
    constraint: error.constraint || null,
  }),
  "22P02": () => ({
    message:
      "The data provided is in an invalid format (e.g., not a valid UUID).",
    constraint: null,
  }),
  "23514": (error) => ({
    message: "A check constraint was violated.",
    constraint: error.constraint || null,
  }),
  "23502": (error) => ({
    message: `A required field is missing. The column '${error.column}' cannot be null.`,
    constraint: error.column || null,
  }),
};

export function getDbErrorMessage(
  error: unknown,
): { message: string; constraint: string | null } | null {
  if (error instanceof DrizzleQueryError) {
    const originalError = error.cause;

    if (originalError instanceof DatabaseError) {
      const handler = PostgresErrorHandlers[originalError.code ?? "default"];
      if (handler) {
        return handler(originalError);
      }

      return {
        message: `Database error: ${originalError.message}`,
        constraint: null,
      };
    }
  }

  return null;
}
