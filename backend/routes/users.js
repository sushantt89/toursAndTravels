import express from "express";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//update user
router.put("/:id", verifyAdmin, updateUser);
//Delete user
router.delete("/:id", verifyUser, deleteUser);
//getSingle user
router.get("/:id", getSingleUser);
//getAll user
router.get("/", verifyAdmin, getAllUser);

export default router;
