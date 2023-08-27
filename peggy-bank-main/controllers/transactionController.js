import db from "../db.js";
import {
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  addDoc,
  updateDoc,
  or,
  and,
  orderBy,
} from "firebase/firestore";

const getAllTransactions = async (req, res) => {
  try {
    const { account_id } = req.query;
    const q = query(
      collection(db, "transactions"),
      or(
        where("sender_id", "==", account_id),
        where("receiver_id", "==", account_id)
      ),
      orderBy("created_at", "desc")
    );
    const querySnapshot = await getDocs(q);
    const transactions = [];
    querySnapshot.forEach((doc) => {
      transactions.push(doc.data());
    });
    res.status(200).json({
      status: "success",
      data: transactions,
    });
  } catch (e) {
    console.log(e);
  }
};

const createTransaction = async (req, res) => {
  try {
    const { sender_id, receiver_id, amount, sender_pin } = req.body;
    let senderName = "";
    let receiverName = "";

    const q = query(
      collection(db, "bank_users"),
      and(
        where("account_id", "==", sender_id),
        where("pin_code", "==", sender_pin)
      )
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      res
        .status(402)
        .json({ status: "failure", message: "Invalid sender account" });
      return;
    }
    querySnapshot.forEach((doc) => {
      senderName = doc.data().name;
      if (doc.data().balance < amount) {
        res
          .status(402)
          .json({ status: "failure", message: "Insufficient balance" });
      }
      return;
    });

    await updateDoc(querySnapshot.docs[0].ref, {
      balance: querySnapshot.docs[0].data().balance - amount,
    });

    const q2 = query(
      collection(db, "bank_users"),
      where("account_id", "==", receiver_id)
    );
    const querySnapshot2 = await getDocs(q2);
    if (querySnapshot2.empty) {
      res
        .status(402)
        .json({ status: "failure", message: "Invalid receiver account" });
      return;
    }
    querySnapshot2.forEach((doc) => {
      receiverName = doc.data().name;
    });

    await updateDoc(querySnapshot2.docs[0].ref, {
      balance: querySnapshot2.docs[0].data().balance + amount,
    });

    const data = {
      sender_id: sender_id,
      receiver_id: receiver_id,
      sender_name: senderName,
      receiver_name: receiverName,
      amount: amount,
      created_at: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "transactions"), data);

    await updateDoc(docRef, {
      transaction_id: docRef.id,
    });

    res.status(200).json({
      status: "successful",
      data: {
        transaction_id: docRef.id,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export { getAllTransactions, createTransaction };
