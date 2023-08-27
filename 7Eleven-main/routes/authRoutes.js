import express from "express";
import {
  register,
  login,
  updateUser,
  getAllSuppliers,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.patch("/profile/:id", updateUser);

router.get("/suppliers", getAllSuppliers);

export default router;
