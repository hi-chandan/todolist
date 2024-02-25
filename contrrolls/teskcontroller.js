import { Task } from "../module/taskmodule.js";
import errhandler from "../middleware/errorhandler.js";
export const createtask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({
      title,
      description,
      user: req.user,
    });
    if (!task) {
      return next(new errhandler("task not add", 406));
    }

    res.status(200).json({
      success: true,
      message: "task is added",
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const mytask = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const tasks = await Task.find({ user: userid }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "task show",
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updatetask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    task.iscomplete = !task.iscomplete;
    await task.save();
    res.status(200).json({
      success: true,
      message: "updated successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const removetask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return next(new errhandler("not task found", 406));
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "task delete successfuly",
    });
  } catch (error) {
    next(error);
  }
};
