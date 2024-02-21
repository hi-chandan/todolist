import jwt from "jsonwebtoken";
export const sendcookie = async (user, res, message, status) => {
  const token = await jwt.sign({ _id: user._id }, process.env.SECREAT_CODE);

  res
    .status(status)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: message,
    });
};
