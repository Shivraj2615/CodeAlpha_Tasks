import { useEffect, useState, useContext } from "react";
import { getComments, addComment } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const Comments = ({ postId }) => {
  const { token, user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const loadComments = async () => {
    try {
      const res = await getComments(postId, token);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to load comments:", err);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const submitComment = async () => {
    if (!text.trim()) return;
    try {
      await addComment(postId, text, token);
      setText("");
      loadComments();
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.commentList}>
        {comments.map((c) => (
          <p key={c._id} style={styles.comment}>
            <b style={styles.author}>{c.author.username}</b> {c.text}
          </p>
        ))}
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={submitComment}>
          Post
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "10px",
  },
  commentList: {
    maxHeight: "150px",
    overflowY: "auto",
    marginBottom: "10px",
  },
  comment: {
    marginBottom: "5px",
    fontSize: "14px",
    color: "#333",
  },
  author: {
    marginRight: "5px",
    color: "#0095f6",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  button: {
    padding: "8px 15px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#0095f6",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};

export default Comments;
