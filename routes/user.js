import express from "express";
import {
  Createuser,
  loginuser,
  logout,
  myprofile,
} from "../contrrolls/user.js";
import { isAuthantication } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", Createuser);
router.post("/login", loginuser);

router.get("/me", isAuthantication, myprofile);
router.get("/logout", logout);

export default router;
