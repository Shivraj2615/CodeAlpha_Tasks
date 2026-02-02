import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo / Brand */}
        <div className="footer-brand">
          <h3 className="brand-title">SimpleStore</h3>
          <p className="brand-text">Your one-stop shop for simple products.</p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <h4 className="footer-heading">Quick Links</h4>
          <Link to="/" className="footer-link">
            Home
          </Link>
          <Link to="/cart" className="footer-link">
            Cart
          </Link>
          <Link to="/orders" className="footer-link">
            Orders
          </Link>
        </div>

        {/* Info */}
        <div className="footer-info">
          <h4 className="footer-heading">Support</h4>
          <p className="footer-text">Contact Us</p>
          <p className="footer-text">Privacy Policy</p>
          <p className="footer-text">Terms & Conditions</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} SimpleStore. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
