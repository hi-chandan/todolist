import { sendcookie } from "../feature/sendcookie.js";
import errhandler from "../middleware/errorhandler.js";
import { User } from "../module/usre.js";
import bcrypt from "bcrypt";

// create user account
export const Createuser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new errhandler("fill the full form", 404));
    }

    let user = await User.findOne({ email });

    if (user) {
      return next(new errhandler("user is already registered", 404));
    }

    const hashcoded = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashcoded });

    sendcookie(user, res, "registration successfull", 200);
  } catch (error) {
    next(error);
  }
};

export const loginuser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new errhandler("please provide detail", 500));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new errhandler("user first register", 400));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new errhandler("invalid", 404));
    }
    sendcookie(user, res, "login in successfull", 200);
  } catch (error) {
    next(error);
  }
};

export const myprofile = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

// logut function

export const logout = (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        message: "logout successfull",
      });
  } catch (error) {
    next(error);
  }
};
