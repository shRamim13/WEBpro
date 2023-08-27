import db from "../db.js";
import axios from "axios";
import {
  collection,
  query,
  updateDoc,
  where,
  getDocs,
  addDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const getAllOrders = async (req, res) => {
  try {
    const userId = req.query.user_id;
    const userType = req.query.user_type;

    const orders = [];
    let q;
    let querySnapshot;
    switch (userType) {
      case "0":
        q = query(collection(db, "orders"));
        querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          orders.push(doc.data());
        });
        break;

      case "1":
        q = query(collection(db, "orders"), where("buyer_id", "==", userId));
        querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          orders.push(doc.data());
        });
        break;

      case "2":
        console.log("supplier");
        q = query(collection(db, "orders"), where("supplier_id", "==", userId));
        querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          orders.push(doc.data());
        });
        break;
    }

    res.json({ staus: "success", data: { orders } });
  } catch (e) {
    console.log(e);
  }
};

const createOrder = async (req, res) => {
  try {
    const data = req.body;

    axios
      .post("http://localhost:5000/api/v1/transaction", {
        sender_id: data.buyer_account_id,
        receiver_id: data.ecomm_account_id,
        amount: data.total_price,
        sender_pin: data.buyer_pin,
      })
      .then(async (response) => {
        console.log(response.data.data.transaction_id);
        const docRef = await addDoc(collection(db, "orders"), {
          buyer_transaction_id: response.data.data.transaction_id,
          created_at: serverTimestamp(),
          total_price: data.total_price,
          quantity: data.quantity,
          product_name: data.product_name,
          buyer_id: data.buyer_id,
          buyer_name: data.buyer_name,
          buyer_address: data.buyer_address,
          order_status: 0,
          buyer_phone: data.buyer_phone,
        });

        await updateDoc(docRef, {
          order_id: docRef.id,
        });
        res.json({ status: "success", data: { order_id: docRef.id } });
      })
      .catch((error) => {
        console.log(error);
        res.status(402).json({ status: "failed" });
      });
  } catch (e) {
    console.log(e);
  }
};

const createSupplierRequest = async (req, res) => {
  try {
    const data = req.body;
    const orderId = req.params.id;
    axios
      .post("http://localhost:5000/api/v1/transaction", {
        sender_id: data.ecomm_account_id,
        receiver_id: data.supplier_account_id,
        amount: data.supplier_price,
        sender_pin: data.ecomm_pin,
      })
      .then(async (response) => {
        await updateDoc(doc(db, "orders", orderId), {
          supplier_transaction_id: response.data.data.transaction_id,
          supplier_price: data.supplier_price,
          supplier_id: data.supplier_id,
          supplier_name: data.supplier_name,
          supplier_phone: data.supplier_phone,
          order_status: 1,
        });
        res.json({
          status: "success",
          data: {
            order_id: orderId,
            supplier_transaction_id: response.data.data.transaction_id,
          },
        });
      })
      .catch((error) => {
        res.status(400).json({ status: "failed", message: error.message });
      });
  } catch (e) {
    console.log(e);
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const data = req.body;
    await updateDoc(doc(db, "orders", orderId), data);
    res.json({ status: "success", data: { order_id: orderId } });
  } catch (e) {
    console.log(e);
  }
};

export { getAllOrders, createOrder, updateOrder, createSupplierRequest };
