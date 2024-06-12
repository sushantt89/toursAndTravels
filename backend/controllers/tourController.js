import Tour from "../models/Tour.js";

//create Tour
export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  console.log(req.body)
  try {
    const savedTour = await newTour.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: "Failed to create. Try Again!",
    });
  }
};

//Update Tour
export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true } // if you do not keep this you will get original data and not the updated one, So you need this when you want to immediatedly get data after updating it. else you need to fetch data again from db.
    );
    res.status(200).json({
      success: true,
      message: "Successfully Updated!",
      data: updatedTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Update!",
    });
  }
};
//Delete Tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTour = await Tour.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully Deleted!",
      deleted_ID: deletedTour._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Delete!",
    });
  }
};
//getSingle Tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const singleTour = await Tour.findById(id).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Successfully Fetched!",
      data: singleTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Not Found!",
    });
  }
};
//getAll Tour
export const getAllTour = async (req, res) => {
  //for pagination
  const page = parseInt(req.query.page);
  // console.log(page);
  try {
    const allTour = await Tour.find().populate("reviews")
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      message: "Successfully Fetched!",
      totalTours: allTour.length,
      data: allTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Not Found!",
    });
  }
};

//get tour by search
export const getTourBySearch = async (req, res) => {
  //here "i" means case sensitive
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);
  try {
    const searchTour = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Found Successfully!",
      totalTours: searchTour.length,
      data: searchTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Not Found!",
    });
  }
};

//get featured tour
export const getFeaturedTours = async (req, res) => {
  try {
    const featuredTours = await Tour.find({ featured: true });
    res.status(200).json({
      success: true,
      message: "Featured Tours Found",
      totalTours: featuredTours.length,
      data: featuredTours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Not Found",
    });
  }
};

//get TourCount
export const getToursCount = async (req, res) => {
  try {
    const tourCount=await Tour.estimatedDocumentCount();
    res
    .status(200)
    .json({
      success:true,
      message:"Total count fetched successfully",
      data:tourCount,
    })
  } catch (error) {
    res
    .status(500)
    .json({
      success:false,
      message:"Total count fetch failed!"
    })
    
  }
};

