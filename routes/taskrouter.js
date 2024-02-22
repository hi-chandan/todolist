import express from "express";
import { isAuthantication } from "../middleware/auth.js";
import {
  createtask,
  mytask,
  removetask,
  updatetask,
} from "../contrrolls/teskcontroller.js";
const router = express.Router();

router.post("/api/add", isAuthantication, createtask);
router.get("/api/tasks", isAuthantication, mytask);
router
  .route("/api/task/:id")
  .put(isAuthantication, updatetask)
  .delete(isAuthantication, removetask);
export default router;
