import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ResponseHandler } from './middleware/responceHandler.js';
import { PORT } from './config/env.js';
import connectDB from './database/connectDb.js';
import { router } from "./routes/indexRoutes.js";
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
    cors({
      origin: [
        "http://localhost:3000",
      ],
    })
  );

app.use(ResponseHandler);
app.use(router);
app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT : " + PORT);
  });

connectDB();