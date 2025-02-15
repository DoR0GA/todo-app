import express from "express";
import taskRoutes from "./routes/TaskRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB подключена"))
.catch(err => console.error("Ошибка подключения к MongoDB:", err));

app.listen(5000, () => console.log("Сервер запущен на порту 5000"));
app.use("/api/tasks", taskRoutes);
