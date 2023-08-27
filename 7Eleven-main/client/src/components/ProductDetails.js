import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/Modal.css";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import {
  faStar,
  faStarHalfStroke,
  faCircle,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Modal = ({ closeModal, element }) => {
  const history = useHistory();
  // console.log(element);
  const [count, setCount] = useState(1);
  const [formData, setFormData] = useState({
    buyer_name: localStorage.getItem("ecomm_user_name"),
    buyer_phone: localStorage.getItem("ecomm_user_phone"),
    buyer_address: localStorage.getItem("ecomm_user_address"),
    buyer_id: localStorage.getItem("ecomm_account_id"),
    buyer_account_id: localStorage.getItem("bank_account_id"),
    buyer_pin: localStorage.getItem("bank_pin_code"),
    ecomm_account_id: "7eleven1234",
    product_name: element.productName,
    quantity: 1,
    total_price: parseFloat(element.price),
  });

  const handleSubmit = async (e) => {
    // e.preventDefault();

    console.log(formData);
    await toast.promise(
      axios
        .post("http://localhost:3000/api/v1/order", formData)
        .then((response) => {
          console.log(response.data.data);
          closeModal(null);
          history.push("/orders");
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
        pending: "Ordering...",
        success: "Order Placed!",
      }
    );
  };

  const incrementCount = () => {
    // Update state with incremented value
    setCount(count + 1);
    setFormData({
      ...formData,
      quantity: formData.quantity + 1,
      total_price: (formData.quantity + 1) * element.price,
    });
  };
  const decrementCount = () => {
    // Update state with incremented value
    if (count > 1) {
      setCount(count - 1);
      setFormData({
        ...formData,
        quantity: formData.quantity - 1,
        total_price: (formData.quantity - 1) * element.price,
      });
      // setFormData({ ...formData, total_price: count * element.price });
    }
  };

  return (
    <div className="modal-background">
      <div
        className="modal-close"
        onClick={() => {
          closeModal(null);
        }}
      >
        X
      </div>
      <div>
        <img src={element.image} alt="Product" className="modal-img" />
      </div>
      <div className="prod-detail">
        <p className="modal-title">{element.productName}</p>
        <div className="modal-price">{element.price} tk</div>
        <div className="iconss">
          <div>
            <FontAwesomeIcon icon={faStar} className="modal-icon" />
          </div>
          <div className="ic">
            <FontAwesomeIcon icon={faStar} className="modal-icon" />
          </div>
          <div className="ic">
            <FontAwesomeIcon icon={faStar} className="modal-icon" />
          </div>
          <div className="ic">
            <FontAwesomeIcon icon={faStar} className="modal-icon" />
          </div>
          <div className="ic">
            <FontAwesomeIcon icon={faStarHalfStroke} className="modal-icon" />
          </div>
          <div className="ic"> 4.5 | 5000</div>
        </div>
        <div className="about">{element.description}</div>
        <p className="colors">Colors Available</p>
        <div className="color-container">
          <div className="color1">
            <FontAwesomeIcon icon={faCircle} className="clr1" />
          </div>
          <div className="color2">
            <FontAwesomeIcon icon={faCircle} className="clr2" />
          </div>
        </div>
        <div className="quantity">
          <div id="decrement-count">
            <FontAwesomeIcon
              icon={faMinus}
              className="minus"
              onClick={decrementCount}
            />
          </div>
          <span className="quan-count" id="total-count">
            {count}
          </span>
          <div>
            <FontAwesomeIcon
              icon={faPlus}
              className="plus"
              onClick={incrementCount}
            />
          </div>
        </div>
        <button className="checkout" onClick={handleSubmit}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Modal;

// css modal.css
