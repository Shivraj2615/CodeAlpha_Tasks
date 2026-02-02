import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getPosts } from "../services/authService";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await getPosts(token);
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={styles.feedContainer}>
      <div style={styles.createPostWrapper}>
        <button
          style={styles.createPostButton}
          onClick={() => navigate("/create")}
        >
          + Create Post
        </button>
      </div>

      {loading ? (
        <p style={styles.centerText}>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p style={styles.centerText}>No posts yet. Be the first to post!</p>
      ) : (
        posts.map((post) => (
          <Post key={post._id} post={post} refreshFeed={fetchPosts} />
        ))
      )}
    </div>
  );
};

const styles = {
  feedContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
    padding: "0 10px",
    fontFamily: "Arial, sans-serif",
  },
  createPostWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
  },
  createPostButton: {
    padding: "10px 20px",
    backgroundColor: "#0095f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.2s",
  },
  centerText: {
    textAlign: "center",
    color: "#555",
    marginTop: "20px",
  },
};

export default Feed;
