import express from "express";
import {
  getAllOrders,
  createOrder,
  updateOrder,
  createSupplierRequest,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getAllOrders);

router.post("/", createOrder);

router.post("/:id/supplier-req", createSupplierRequest);

router.patch("/:id", updateOrder);

export default router;
