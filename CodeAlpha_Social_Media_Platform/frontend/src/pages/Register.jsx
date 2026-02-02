import { useState } from "react";
import { registerUser } from "../services/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
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
      await registerUser(formData);
      setMessage("Registered successfully. Please login.");
      setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Register</h2>

        {message && <p style={styles.message}>{message}</p>}

        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          style={styles.input}
          required
        />

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
          {loading ? "Registering..." : "Register"}
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
    transition: "background-color 0.2s",
  },
};

export default Register;
