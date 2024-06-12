import User from "../models/User.js";

//create User
export const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Faile to create. Try Again!",
    });
  }
};

//Update User
export const updateUser = async (req, res) => {
  const id = req.body.id;
  console.log(req.body.id)
  try {
    const updatedUser = await User.findByIdAndUpdate(
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
//Delete User
export const deleteUser = async (req, res) => {
  const id = req.body.id;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully Deleted!",
      deleted_ID: deletedUser._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Delete!",
    });
  }
};
//getSingle User
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "Successfully Fetched!",
      data: singleUser,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: "Not Found!",
    });
  }
};
//getAll User
export const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json({
      success: true,
      message: "Successfully Fetched!",
      totalUsers: allUser.length,
      data: allUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Not Found!",
    });
  }
};
