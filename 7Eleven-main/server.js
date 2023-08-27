import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// Routers
import authRouter from "./routes/authRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/order", orderRouter);

app.get("/", (req, res) => {
  res.send("7Eleven");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
