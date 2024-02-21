import express from "express";
import { DBconnection } from "./database/dbconn.js";
import router from "./routes/user.js";
import { config } from "dotenv";
import { errorhandler } from "./middleware/errorhandler.js";
import cookieParser from "cookie-parser";
import taskrouter from "./routes/taskrouter.js";
import cors from "cors";
export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(taskrouter);
app.use(router);

app.use(express.json());
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
app.use(errorhandler);
DBconnection();
