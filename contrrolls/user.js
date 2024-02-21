import { sendcookie } from "../feature/sendcookie.js";
import errhandler from "../middleware/errorhandler.js";
import { User } from "../module/usre.js";
import bcrypt from "bcrypt";

// create user account
export const Createuser = async (req, res, next) => {
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
};

export const loginuser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new errhandler("user first register"));
  }
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new errhandler("invalid", 404));
  }
  sendcookie(user, res, "login in successfull", 200);
};

export const myprofile = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: req.user,
  });
};

// logut function

export const logout = (req, res, next) => {
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
};
