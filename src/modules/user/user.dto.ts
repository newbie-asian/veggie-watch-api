import { z } from "zod";

export const createUserZodSchema = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  age: z.number().min(1).positive(),
  gender: z.string().min(1).max(15),
  phone: z.string().min(7).max(20),
  password: z.string().min(6).max(100),
  role: z
    .union([
      z.literal("user"),
      z.literal("organizer"),
      z.literal("seller"),
      z.literal("admin"),
    ])
    .default("user"),
  status: z
    .union([z.literal("active"), z.literal("inactive"), z.literal("pending")])
    .default("active"),
});

export type User = z.infer<typeof createUserZodSchema> & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};
export type CreateUserDto = Omit<
  User,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
export type UpdateUserDto = Partial<CreateUserDto>;
