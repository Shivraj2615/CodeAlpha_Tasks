import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        MiniGram
      </Link>

      {user ? (
        <div style={styles.userContainer}>
          <span style={styles.username}>Hi, {user.username}</span>
          <Link to="/" style={styles.link}>
            Feed
          </Link>
          <Link to="/create" style={styles.link}>
            Create
          </Link>
          <Link to={`/user/${user._id}`} style={styles.link}>
            Profile
          </Link>
          <button style={styles.button} onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div style={styles.userContainer}>
          <Link to="/login" style={styles.link}>
            Login
          </Link>
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    borderBottom: "1px solid #eee",
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
    fontFamily: "Arial, sans-serif",
  },
  logo: {
    textDecoration: "none",
    color: "#0095f6",
    fontWeight: "bold",
    fontSize: "24px",
    margin: 0,
  },
  userContainer: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  username: {
    fontWeight: "bold",
    color: "#333",
  },
  link: {
    textDecoration: "none",
    color: "#0095f6",
    fontWeight: "500",
    padding: "6px 10px",
    borderRadius: "4px",
    transition: "all 0.2s",
  },
  button: {
    padding: "6px 12px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#f0f0f0",
    color: "#333",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
  },
};

export default Navbar;
