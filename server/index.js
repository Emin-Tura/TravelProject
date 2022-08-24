import express, { application } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import roomRouter from "./routes/roomRouter.js";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader("Access-Control-Allow-Origin", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "X-Requested-With,Content-Type,Authorization"
  );
  next();
});

app.use(express.json({ limit: "10mb" }));

app.use(cors());

app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/", (req, res) => res.json({ message: "Welcome to our API" }));
app.use("/", (req, res) =>
  res.status(404).json({ succes: false, message: "Not Found" })
);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT);
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
