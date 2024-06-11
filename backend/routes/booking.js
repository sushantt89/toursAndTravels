import express from "express";
import {
  creatBooking,
  getAllBookings,
  getBookingById,
  deleteBooking
} from "../controllers/bookingController.js";
import { verifyUser,verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//create new booking
router.post("/", verifyUser, creatBooking);
//get booking by id
router.get("/:id", verifyUser, getBookingById);
//get all booking
router.get("/", verifyAdmin, getAllBookings);
//delete booking
router.delete("/:id", verifyAdmin, deleteBooking);

export default router;
