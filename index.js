import express from "express";
import router from "./routes/user.js";
import { config } from "dotenv";
import { errorhandler } from "./middleware/errorhandler.js";
import cookieParser from "cookie-parser";
import taskrouter from "./routes/taskrouter.js";
import cors from "cors";
import { DBconnection } from "./database/dbconn.js";
import path from "path";
export const app = express();
app.use(express.json());
app.use(cookieParser());

config({
  path: "./database/config.env",
});
app.use(
  cors({
    origin: [process.env.FRONT_END],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

// router import
app.use("/api/v1", taskrouter);
app.use("/api/v1", router);

app.use(express.static(path.join(path.resolve(), "/frontend/dist")));
console.log(path.join(path.resolve(), "/frontend/dist/index.html"));
app.get("*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "frontend/dist/index.html"));
});

app.use(errorhandler);
DBconnection();
