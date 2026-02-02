import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../api/api";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const placeOrderHandler = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const orderData = {
      orderItems: cartItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        product: item._id,
      })),
      totalPrice,
    };

    try {
      await createOrder(orderData, user.token);
      clearCart();
      alert("Order placed successfully!");
      navigate("/");
    } catch (error) {
      alert("Order failed");
    }
  };

  return (
    <div className="order-container">
      <h2 className="page-title">Order Review</h2>

      <div className="order-wrapper">
        {/* Order Items */}
        <div className="order-items-card">
          {cartItems.map((item) => (
            <div className="order-item" key={item._id}>
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

        {/* Summary */}
        <div className="order-summary-card">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="summary-row">
            <span>Total Price</span>
            <span>₹{totalPrice}</span>
          </div>

          <button className="place-order-btn" onClick={placeOrderHandler}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
