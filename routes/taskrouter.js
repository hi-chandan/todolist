import express from "express";
import { isAuthantication } from "../middleware/auth.js";
import {
  createtask,
  mytask,
  removetask,
  updatetask,
} from "../contrrolls/teskcontroller.js";
const router = express.Router();

router.post("/add", isAuthantication, createtask);
router.get("/tasks", isAuthantication, mytask);
router
  .route("/task/:id")
  .put(isAuthantication, updatetask)
  .delete(isAuthantication, removetask);
export default router;
