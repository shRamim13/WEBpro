import "../css/StatusModal.css";

const StatusModal = ({ closeModal, data }) => {
  return (
    <div className="status-modal-bg">
      <div
        className="status-modal-close"
        onClick={() => {
          closeModal(null);
        }}
      >
        X
      </div>

      <div className="order-details">
        <div className="buyer-details">
          <div className="title">Buyer</div>
          <hr className="hrule" />
          <div className="t1">{data.buyer_name}</div>
          <div className="t2">{data.buyer_phone}</div>
          <div className="t2">{data.buyer_address}</div>
          <div className="t2">TID: {data.buyer_transaction_id}</div>
        </div>

        <div className="vertical-line"></div>

        <div className="buyer-details">
          <div className="title">Supplier</div>
          <hr className="hrule" />
          <div className="t1">{data.supplier_name ?? "NA"}</div>
          <div className="t2">{data.supplier_phone ?? "NA"}</div>
          {/* <div className="t2">{data.supplier_address ?? "NA"}</div> */}
          <div className="t2">TID: {data.supplier_transaction_id ?? "NA"}</div>
        </div>
      </div>

      <div className="status-grid">
        <div
          className={
            data.order_status >= 2 ? "status-text-active" : "status-text"
          }
        >
          Delivery Done
        </div>
        <div
          className={
            data.order_status >= 2 ? "status-number-active" : "status-number"
          }
        >
          3
        </div>
        <div></div>
        <div></div>
        <div
          className={
            data.order_status >= 2
              ? "dashed-vertical-line-active"
              : "dashed-vertical-line"
          }
        ></div>
        <div></div>
        <div></div>
        <div
          className={
            data.order_status >= 1 ? "status-number-active" : "status-number"
          }
        >
          2
        </div>
        <div
          className={
            data.order_status >= 1 ? "status-text-active" : "status-text"
          }
        >
          Supplier Assigned
        </div>
        <div></div>
        <div
          className={
            data.order_status >= 1
              ? "dashed-vertical-line-active"
              : "dashed-vertical-line"
          }
        ></div>
        <div></div>
        <div
          className={
            data.order_status >= 0 ? "status-text-active" : "status-text"
          }
        >
          Order Created
        </div>
        <div
          className={
            data.order_status >= 0 ? "status-number-active" : "status-number"
          }
        >
          1
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default StatusModal;
