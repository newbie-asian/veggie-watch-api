import { Router } from "express";
import { validate } from "@/shared/middlewares/validate.middleware.js";
import {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
} from "@/modules/user/user.controller.js";
import type { RouteModule } from "@/shared/types/index.js";

// Define routes for users
const router: Router = Router();

// Get all users
router.get("/", getAllUsers);

// Get a specific user by ID
router.get("/:id", getUserById);

// Create a new user
router.post("/", createUser);

// Update user information by ID
router.patch("/:id", updateUser);

// Delete a specific user by ID
router.delete("/:id", deleteUser);

export default {
  path: "/users",
  router,
} as RouteModule;
