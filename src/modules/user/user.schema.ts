import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { timeStamps } from "@/shared/db/schema/helpers.js";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar().notNull(),
  lastName: varchar().notNull(),
  password: varchar().notNull(),
  age: integer().notNull(),
  email: varchar().notNull().unique(),
  ...timeStamps,
});
