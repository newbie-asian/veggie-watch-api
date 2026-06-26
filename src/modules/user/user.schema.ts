import { integer, pgEnum, pgTable, varchar, text } from "drizzle-orm/pg-core";
import { timeStamps } from "@/shared/db/schema/helpers.js";

export const ROLES = ["admin", "user"] as const;
export const USER_STATUS = ["active", "inactive", "pending"] as const;

export const roleEnum = pgEnum("role", ROLES);
export const userStatusEnum = pgEnum("user_status", USER_STATUS);

export const usersTable = pgTable("users", {
  id: text()
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  firstName: text().notNull(),
  lastName: text().notNull(),
  password: varchar().notNull(), // hashed password
  age: integer().notNull(),
  email: text().notNull().unique(),
  role: roleEnum().notNull().default("user"),
  status: userStatusEnum().notNull().default("pending"),
  ...timeStamps,
});
