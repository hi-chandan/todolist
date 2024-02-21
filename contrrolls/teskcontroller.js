import { Task } from "../module/taskmodule.js";
import errhandler from "../middleware/errorhandler.js";
export const createtask = async (req, res, next) => {
  console.log("This task is working properly");
  const { title, description } = req.body;
  const task = await Task.create({
    title,
    description,
    user: req.user,
  });
  if (!task) {
    return next(new errhandler("task is not added", 406));
  }

  res.status(200).json({
    success: true,
    message: "task is added",
    task,
  });
};

export const mytask = async (req, res, next) => {
  const userid = req.user._id;
  const task = await Task.find({ user: userid });
  res.status(200).json({
    success: true,
    message: "task show",
    task,
  });
};

export const updatetask = async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  task.iscomplete = !task.iscomplete;
  await task.save();
  res.status(200).json({
    success: true,
    message: "updated successfully",
    task,
  });
};

export const removetask = async (req, res, next) => {
  const { id } = req.params;
  console.log("this is id", id);
  const task = await Task.findById(id);
  console.log("This is task", task);
  if (!task) {
    return next(new errhandler("not task found", 406));
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "task delete successfuly",
  });
};
