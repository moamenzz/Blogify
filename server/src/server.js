import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import { authRouter } from "./routes/authRouter.js";
import { connectMONGO } from "./lib/dbConn.js";
import { corsConfig } from "./lib/corsConfig.js";
import cors from "cors";
import { postRouter } from "./routes/postRouter.js";
import { userRouter } from "./routes/userRouter.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json({ limit: "50mb" }));
app.use(urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(cors(corsConfig));

app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  connectMONGO();
});
