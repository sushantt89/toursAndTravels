import express from "express";
import {
  creatBooking,
  getAllBookings,
  getBookingById,
} from "../controllers/bookingController.js";
import { verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//create new booking
router.post("/", verifyUser, creatBooking);
//get booking by id
router.get("/:id", verifyUser, getBookingById);
//get all booking
router.get("/", verifyUser, getAllBookings);

export default router;
