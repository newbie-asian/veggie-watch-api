import type { Request, Response } from "express";
import { ApiResponse } from "@/shared/utils/apiResponse.js";
import type {
  CreateUserDto,
  UpdateUserDto,
} from "@/modules/users/users.dto.js";

export const getAllUsers = async (_req: Request, res: Response) => {
  // Placeholder for fetching users from a database
  return ApiResponse.success(res, "Users fetched successfully", []);
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  // Placeholder for fetching a specific user from a database

  return ApiResponse.success(res, "User fetched successfully", {
    id: userId,
    name: "John Doe",
  });
};

export const createUser = async (
  req: Request<{}, {}, CreateUserDto>,
  res: Response,
) => {
  const userData = req.body;
  // Placeholder for creating a new user in a database

  return ApiResponse.success(res, "User created successfully", userData, 201);
};

export const updateUser = async (
  req: Request<{ id: string }, {}, UpdateUserDto>,
  res: Response,
) => {
  const userId = req.params.id;
  const updateData = req.body;
  // Placeholder for updating a user in a database
  return ApiResponse.success(res, "User updated successfully", {
    id: userId,
    ...updateData,
  });
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const userId = req.params.id;

  return ApiResponse.success(res, "User deleted successfully", null);
};
