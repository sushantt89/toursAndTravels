import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//uer registration
export const register = async (req, res) => {
  try {
    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });

    const saveduser = await newUser.save();

    res.status(200).json({
      sucess: true,
      message: "New user successfully created",
      data: saveduser,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "New user failed to create. Please Try Again!",
    });
  }
};

// user login
export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const findUser = await User.findOne({ email }); 

    if (!findUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // If user found, compare password
    bcrypt.compare(req.body.password, findUser.password)
      .then((checkCorrectPassword) => {
        if (!checkCorrectPassword) {
          return res.status(401).json({
            success: false,
            message: "Incorrect email or password",
          });
        } else {
          const { password, role, ...rest } = findUser._doc; // ._doc file ma return garxa response data esma password ra role jhikyo and baki rest le liyo
          //create a jwt token
          const token = jwt.sign(
            { id: findUser._id, role: findUser.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15m" }
          );

          //set token in the browser cookies and send response to the client
          res
            .cookie("accessToken", token, {
              httpOnly: true,
              expiresIn: token.expiresIn,
            })
            .status(200)
            .json({
              success: true,
              message: "Successfully login",
              data: { ...rest },
              token,
              role,
            });
        }
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
