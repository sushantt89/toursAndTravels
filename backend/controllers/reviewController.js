import Review from "../models/Review.js";
import Tour from "../models/Tour.js";

export const createReview = async (req, res) => {
  const tourId = req.params.id;
  const newReview = new Review({
    ...req.body,
    productId: tourId, // Set the productId to the tourId
  });

  try {
    const savedReview = await newReview.save();

    // Now update the tour by adding the review reference (ObjectId)
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    res.status(200).json({
      success: true,
      message: "Successfully created a Review!",
      data: savedReview,
    });
    console.log(savedReview);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to write Review!",
    });
  }
};
