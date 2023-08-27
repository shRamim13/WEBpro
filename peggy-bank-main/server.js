import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// routes
import authRouter from "./routes/authRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";
import notFoundMiddleware from "./middlewares/not-found.js";
// import db from "./db.js";
// import { collection, addDoc } from "firebase/firestore";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/transaction", transactionRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(notFoundMiddleware);

const port = 5000;

app.listen(port, () => {
  console.log(`Bank listening at http://localhost:${port}`);
});
