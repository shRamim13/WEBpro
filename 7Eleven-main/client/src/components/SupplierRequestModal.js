import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SupplierRequestModal = ({
  closeModal,
  order_id,
  suppliers,
  total_price,
  updateOrder,
  order,
}) => {
  console.log(order);
  const [formData, setFormData] = useState({
    ecomm_account_id: localStorage.getItem("bank_account_id"),
    ecomm_pin: localStorage.getItem("bank_pin_code"),
    supplier_account_id: suppliers[0].account_id ?? "",
    supplier_price: parseFloat(total_price),
    supplier_id: suppliers[0].user_id ?? "",
    supplier_name: suppliers[0].name ?? "",
    supplier_phone: suppliers[0].phone ?? "",
  });
  const [count, setCount] = useState(0);

  const submitHandler = async () => {
    await toast.promise(
      axios
        .post(
          `http://localhost:3000/api/v1/order/${order_id}/supplier-req`,
          formData
        )
        .then((response) => {
          console.log(response.data.data);
          updateOrder(order_id, {
            ...order,
            order_status: 1,
            supplier_transaction_id: response.data.data.supplier_transaction_id,
            supplier_name: formData.supplier_name,
            supplier_phone: formData.supplier_phone,
          });
          closeModal(null);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "colored",
          });
        }),
      {
        pending: "Creating Request...",
        success: "Request Created!",
      }
    );
  };
  const incrementCount = () => {
    // Update state with incremented value
    setFormData({
      ...formData,
      supplier_price: total_price - total_price * ((count + 1) / 100),
    });
    setCount(count + 1);
  };
  const decrementCount = () => {
    // Update state with incremented value
    if (count > 0) {
      setFormData({
        ...formData,
        supplier_price:
          formData.supplier_price -
          formData.supplier_price * ((count - 1) / 100),
      });
      setCount(count - 1);
    }
  };
  const changeHandler = (e) => {
    const supplier = suppliers.find(
      (supplier) => supplier.user_id === e.target.value
    );
    setFormData({
      ...formData,
      supplier_account_id: supplier.account_id,
      supplier_id: supplier.user_id,
      supplier_name: supplier.name,
      supplier_phone: supplier.phone,
    });
  };

  return (
    <div className="universal-modal-background">
      <div
        className="universal-modal-close"
        onClick={() => {
          closeModal(null);
        }}
      >
        X
      </div>
      <div className="supplier-content">
        <div class="supplier-request">Supplier Request</div>

        <label for="supplier" className="supplier-label">
          Select Supplier
        </label>
        <select id="supplier" name="supplier" onChange={changeHandler}>
          {suppliers.map((supplier) => (
            <option value={supplier.user_id}>{supplier.name}</option>
          ))}
          {/* <option value="Amir Hamza">Amir Hamza</option>
          <option value="Nazmun Nahar Tui">Nazmun Nahar Tui</option>
          <option value="Rahim Ali">Rahim Ali</option> */}
        </select>
        <div className="row">
          <div className="group">
            <label for="service-charge" className="service-charge-label">
              Service Charge
            </label>
            <div className="service-charge">
              <div id="decrement-count">
                <FontAwesomeIcon
                  icon={faMinus}
                  className="minus"
                  onClick={decrementCount}
                />
              </div>
              <span className="quan-count" id="total-count">
                {count}%
              </span>
              <div>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="plus"
                  onClick={incrementCount}
                />
              </div>
            </div>
          </div>
          <div class="group">
            <label htmlFor="amount" className="amount">
              Amount (tk)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.supplier_price}
              onChange={(e) => {}}
            />
          </div>
        </div>
        <button className="supplier-checkout" onClick={submitHandler}>
          Create
        </button>
      </div>
    </div>
  );
};

export default SupplierRequestModal;
// orders.css
