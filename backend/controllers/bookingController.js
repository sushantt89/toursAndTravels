import Booking from "../models/Booking.js";

//create a booking
export const creatBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();

    res.status(200).json({
      success: true,
      message: "Successfully created a booking!",
      data: savedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create a booking!",
    });
  }
};

// get single booking by id
export const getBookingById=async(req,res)=>{
    const id=req.params.id;
    try {
        const availableBookings=await Booking.findById(id);
    
        res.status(200).json({
            success:true,
            message:"successfully fetchecd booking by id!",
            data:availableBookings
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to fetch booking!",
        })
        
    }
}

//get all booking
export const getAllBookings=async (req,res)=>{
    try {
        const allBookings=await Booking.find();
        res.status(200).json({
            success:true,
            message:"succssfully fetched all bookings!",
            data:allBookings
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"failed to fetched all bookings!",
        })
        
    }
}