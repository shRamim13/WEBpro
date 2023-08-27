import express from "express";
import {
  getAllTransactions,
  createTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.route("/").get(getAllTransactions);

router.route("/").post(createTransaction);

export default router;
