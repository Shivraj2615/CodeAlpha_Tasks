import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchMyOrders } from "../api/api";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const loadOrders = async () => {
      const { data } = await fetchMyOrders(user.token);
      setOrders(data);
    };

    loadOrders();
  }, [user, navigate]);

  return (
    <div className="order-history-container">
      <h2 className="page-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="empty-orders">You haven’t placed any orders yet.</p>
      ) : (
        <div className="order-history-list">
          {orders.map((order) => (
            <div className="order-history-card" key={order._id}>
              {/* Order Header */}
              <div className="order-header">
                <div>
                  <p className="order-id">Order ID</p>
                  <p className="order-id-value">{order._id}</p>
                </div>

                <div>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <span
                    className={`order-status ${
                      order.isPaid ? "paid" : "pending"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="order-items">
                {order.orderItems.map((item, index) => (
                  <div className="order-item" key={index}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="order-item-image"
                    />

                    <div className="order-item-info">
                      <p className="order-item-name">{item.name}</p>
                      <p className="order-item-qty">Qty: {item.qty}</p>
                    </div>

                    <p className="order-item-price">₹{item.qty * item.price}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="order-footer">
                <p className="order-total">Total: ₹{order.totalPrice}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
