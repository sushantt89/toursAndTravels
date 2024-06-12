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

//Delete booking
export const deleteBooking = async (req, res) => {
  const id = req.body.id;


  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully Deleted!",
      deleted_ID: deletedBooking._id,
      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Delete!",
    });
  }
};

//Update booking
export const updateBooking = async (req, res) => {
  const id = req.body.id;
  console.log("body:",req.bodySS)
  console.log(req.body.id)
  try {
    const updatedUser = await Booking.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true } // if you do not keep this you will get original data and not the updated one, So you need this when you want to immediatedly get data after updating it. else you need to fetch data again from db.
    );
    res.status(200).json({
      success: true,
      message: "Successfully Updated!",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Update!",
    });
  }
};