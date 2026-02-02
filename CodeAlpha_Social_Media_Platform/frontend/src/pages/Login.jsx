import { useContext, useState } from "react";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await loginUser(formData);
      login(res.data.token);
      navigate("/");
    } catch (err) {
      setMessage("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>

        {message && <p style={styles.message}>{message}</p>}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    backgroundColor: "#fafafa",
    padding: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "350px",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#0095f6",
    fontWeight: "bold",
    fontSize: "24px",
  },
  message: {
    marginBottom: "15px",
    color: "red",
    textAlign: "center",
    fontSize: "14px",
  },
  input: {
    padding: "10px 12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#0095f6",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Login;
