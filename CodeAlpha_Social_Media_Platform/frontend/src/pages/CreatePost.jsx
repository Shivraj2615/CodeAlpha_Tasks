import { useState, useContext } from "react";
import { createPost } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { token } = useContext(AuthContext);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image.trim()) {
      setMessage("Please enter an image URL.");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      await createPost({ caption, image }, token);
      setCaption("");
      setImage("");
      navigate("/feed");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Post</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#0095f6",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  message: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px 12px",
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

export default CreatePost;
