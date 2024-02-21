import jwt from "jsonwebtoken";
import { User } from "../module/usre.js";

export const isAuthantication = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(202).json({
      success: false,
      message: "Login in first",
    });
  }
  const user = jwt.verify(token, process.env.SECREAT_CODE);

  req.user = await User.findById(user._id);
  next();
};
