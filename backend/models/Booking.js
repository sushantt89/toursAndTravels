import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  userEmail: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  guestSize: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Booking", bookingSchema);
