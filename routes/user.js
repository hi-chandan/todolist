import express from "express";
import {
  Createuser,
  loginuser,
  logout,
  myprofile,
} from "../contrrolls/user.js";
import { isAuthantication } from "../middleware/auth.js";

const router = express.Router();

router.post("/new/user", Createuser);
router.post("/user/login", loginuser);

router.get("/my", isAuthantication, myprofile);
router.get("/logout", logout);

export default router;
