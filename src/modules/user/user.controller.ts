import type { Request, Response } from "express";
import { sendSuccess } from "@/shared/utils/apiResponse.js";
import type { CreateUserDto, UpdateUserDto } from "@/modules/user/user.dto.js";

export const getAllUsers = async (_req: Request, res: Response) => {
  return sendSuccess({
    res,
    statusCode: 200,
    message: "Users fetched successfully",
    data: [],
  });
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const userId = req.params.id;

  return sendSuccess({
    res,
    statusCode: 200,
    message: "User fetched successfully",
    data: {},
  });
};

export const createUser = async (
  req: Request<{}, {}, CreateUserDto>,
  res: Response,
) => {
  const userData = req.body;

  return sendSuccess({
    res,
    statusCode: 201,
    message: "User created successfully",
    data: userData,
  });
};

export const updateUser = async (
  req: Request<{ id: string }, {}, UpdateUserDto>,
  res: Response,
) => {
  const userId = req.params.id;
  const updateData = req.body;

  return sendSuccess({
    res,
    statusCode: 200,
    message: "User updated successfully",
    data: updateData,
  });
};

export const deleteUser = async (
  _req: Request<{ id: string }>,
  res: Response,
) =>
  sendSuccess({
    res,
    statusCode: 200,
    message: "User deleted successfully",
  });
