import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="logo">
          <Link to="/" className="logo-link">
            SimpleStore
          </Link>
        </h2>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/cart" className="nav-link nav-cart">
            Cart <span className="cart-count">{cartCount}</span>
          </Link>

          <Link to="/orders" className="nav-link">
            Orders
          </Link>

          {user ? (
            <div className="nav-user">
              <span className="username">Hi, {user.name}</span>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link nav-link-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
