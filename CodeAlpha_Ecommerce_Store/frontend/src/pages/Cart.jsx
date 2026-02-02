import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  return (
    <div className="cart-container">
      <h2 className="page-title">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">
          Cart is empty.{" "}
          <Link to="/" className="shop-link">
            Go Shopping
          </Link>
        </p>
      ) : (
        <div className="cart-wrapper">
          {/* Cart Items */}
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                {/* Info */}
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-qty">Quantity: {item.qty}</p>
                </div>

                {/* Actions */}
                <div className="cart-item-actions">
                  <p className="cart-item-price">₹{item.price * item.qty}</p>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <p>Total Items: {cartItems.length}</p>
            <p className="total-price">Total: ₹{totalPrice}</p>

            <Link to="/checkout">
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;