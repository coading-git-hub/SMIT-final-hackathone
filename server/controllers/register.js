import user from "../models/user.js";
import bcrypt from "bcrypt";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const findedEmail = await user.findOne({ email: email});

    if (findedEmail) {
      const error = new Error("User already exists"); 
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(200).json({
      message: "User registered successfully",
      status: true,
      user: savedUser,
    });
  } catch (error) {
    next(error);
  }
};

export default register;
