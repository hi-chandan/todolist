import express from "express";
import {
  Createuser,
  loginuser,
  logout,
  myprofile,
} from "../contrrolls/user.js";
import { isAuthantication } from "../middleware/auth.js";

const router = express.Router();

router.post("api/new/user", Createuser);
router.post("api/user/login", loginuser);

router.get("api/my", isAuthantication, myprofile);
router.get("api/logout", logout);

export default router;
