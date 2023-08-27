import db from "../db.js";

import { collection, query, getDocs, where } from "firebase/firestore";

const login = async (req, res) => {
  const { account_id, pin_code } = req.body;
  try {
    const q = query(
      collection(db, "bank_users"),
      where("account_id", "==", account_id),
      where("pin_code", "==", pin_code)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      res
        .status(402)
        .json({ status: "failure", message: "Invalid account id or pin code" });
    } else {
      querySnapshot.forEach((doc) => {
        res.status(200).json({
          status: "success",
          data: {
            account_id: doc.data().account_id,
            balance: doc.data().balance,
          },
        });
      });
    }
  } catch (e) {}
};

export { login };
