import NavBar from "./NavBar";
import OptionBar from "./OptionBar";
import UniversalModal from "./StatusModal";
import SupplierRequestModal from "./SupplierRequestModal";
import "../css/Modal.css";
import { useEffect, useState } from "react";
import axios from "axios";
// const orders = [
//   {
//     key: 1,
//     orderId: "1234567asd",
//     orderedProduct: "Fabulous Watch",
//     quantity: "2",
//     dateTime: "27-06-23 6:30pm",
//     status: "Processing",
//     price: "400.00tk",
//     delivered: "29-06-23",
//     supplier: "Tui",
//   },
//   {
//     key: 2,
//     orderId: "1234567asd",
//     orderedProduct: "Fabulous Wallet",
//     quantity: "2",
//     dateTime: "27-06-23 6:30pm",
//     status: "Processing",
//     price: "400.00tk",
//     delivered: "29-06-23",
//     supplier: "Tui",
//   },
//   {
//     key: 3,
//     orderId: "1234567asd",
//     orderedProduct: "Ring for Girls",
//     quantity: "2",
//     dateTime: "27-06-23 6:30pm",
//     status: "Processing",
//     price: "400.00tk",
//     delivered: "29-06-23",
//     supplier: "Tui",
//   },
//   {
//     key: 4,
//     orderId: "1234567asd",
//     orderedProduct: "Ring for Girls",
//     quantity: "2",
//     dateTime: "27-06-23 6:30pm",
//     status: "Processing",
//     price: "400.00tk",
//     delivered: "29-06-23",
//     supplier: "Tui",
//   },
//   {
//     key: 5,
//     orderId: "1234567asd",
//     orderedProduct: "Ring for Girls",
//     quantity: "2",
//     dateTime: "27-06-23 6:30pm",
//     status: "Processing",
//     price: "400.00tk",
//     delivered: "29-06-23",
//     supplier: "Tui",
//   },

//   {
//     key: 6,
//     orderId: "1234567asd",
//     orderedProduct: "Ring for Girls",
//     quantity: "2",
//     dateTime: "27-06-23 6:30pm",
//     status: "Processing",
//     price: "400.00tk",
//     delivered: "29-06-23",
//     supplier: "Tui",
//   },
// ];

const AdminOrders = () => {
  // const [ongoingOrders, setOngoingOrders] = useState([]);
  // const [completedOrders, setCompletedOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [suppliers, setSupplier] = useState([]);
  const user_type = localStorage.getItem("ecomm_user_type");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/order", {
          params: {
            user_id: localStorage.getItem("ecomm_account_id"),
            user_type: localStorage.getItem("ecomm_user_type"),
          },
        });
        if (user_type === "0") {
          const response2 = await axios.get(
            "http://localhost:3000/api/v1/auth/suppliers"
          );
          console.log(response2.data.data.suppliers);
          setSupplier(response2.data.data.suppliers);
        }
        console.log(response.data.data.orders);
        const orders = response.data.data.orders;
        for (let i = 0; i < orders.length; i++) {
          const formattedDate = new Date(
            orders[i].created_at.seconds * 1000
          ).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          orders[i].formattedDate = formattedDate;
        }
        setOrders(orders);
      } catch (error) {
        console.log("error");
      }
    };

    fetchData();
  }, [user_type]);

  const updateOrder = (id, updatedOrder) => {
    setOrders((prevOrders) => {
      const newOrders = prevOrders.map((item) => {
        if (item.order_id === id) {
          return updatedOrder;
        }
        return item;
      });
      return newOrders;
    });
  };

  const [open, setOpen] = useState(null);
  const [openSupplier, setOpenSupplier] = useState(null);
  return (
    <div>
      <div className="order-body">
        <NavBar />
        <OptionBar />

        <div>
          <p className="ongoing">Ongoing</p>
          <div className="ongoing-container">
            {orders.map(
              (Element) =>
                Element.order_status !== 2 && (
                  <div key={Element.order_id} className="ongoing-card">
                    <div className="ongoing-content">
                      <div className="first-col">
                        <div className="first-first-col">
                          <p className="order-number">
                            Order{" "}
                            <div className="order-id">{Element.order_id}</div>
                          </p>
                          <div className="order-product">
                            {Element.product_name}
                          </div>
                        </div>
                        <div className="first-first-col">
                          <p className="order-date">{Element.formattedDate}</p>

                          <p className="order-quan">x{Element.quantity}</p>
                        </div>
                      </div>

                      <div>
                        <div className="supplier-double-button">
                          {((user_type === "0" && Element.order_status < 1) ||
                            (user_type === "2" &&
                              Element.order_status < 2)) && (
                            <button
                              className="mark-complete"
                              onClick={() => {
                                if (user_type === "0") {
                                  setOpenSupplier(Element);
                                } else {
                                  axios
                                    .patch(
                                      `http://localhost:3000/api/v1/order/${Element.order_id}`,
                                      {
                                        order_status: 2,
                                      }
                                    )
                                    .then((response) => {
                                      updateOrder(Element.order_id, {
                                        ...Element,
                                        order_status: 2,
                                      });
                                    })
                                    .catch((error) => {
                                      console.log(error);
                                    });
                                }
                              }}
                            >
                              {user_type === "0"
                                ? "Supplier Request"
                                : "Mark Complete"}
                            </button>
                          )}
                          <button
                            className="supplier-order-status"
                            onClick={() => {
                              setOpen(Element);
                            }}
                          >
                            Status
                          </button>
                        </div>

                        <p className="supplier-order-price">
                          Total: {Element.total_price} tk
                        </p>
                      </div>
                    </div>
                  </div>
                )
            )}
            {open && <UniversalModal data={open} closeModal={setOpen} />}
            {openSupplier && (
              <SupplierRequestModal
                order_id={openSupplier.order_id}
                suppliers={suppliers}
                total_price={openSupplier.total_price}
                updateOrder={updateOrder}
                order={openSupplier}
                closeModal={setOpenSupplier}
              />
            )}
            {(open || openSupplier) && <div className="overlay"></div>}
          </div>
          <hr className="break-line"></hr>
          <p className="ongoing">Completed</p>
          <div className="ongoing-container">
            <div className="complete-content">
              {orders.map(
                (Element) =>
                  Element.order_status === 2 && (
                    <div key={Element.order_id} className="grid-col">
                      <p className="complete-orderId">
                        Order {Element.order_id}
                      </p>
                      <p className="delivery-date">
                        Delivered on: {Element.formattedDate.slice(0, 8)}
                      </p>
                      <p className="supplier">
                        Supplier: {Element.supplier_name}
                      </p>
                      <p className="complete-product">
                        {Element.product_name} x{Element.quantity}
                      </p>
                      <p className="complete-price">
                        Total: {Element.total_price} tk
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;

// css code orders.css
