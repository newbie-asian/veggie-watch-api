import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { timeStamps } from "@/shared/db/schema/helpers.schema.js";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  age: integer().notNull(),
  email: varchar().notNull().unique(),
  ...timeStamps,
});
