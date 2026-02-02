import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  likePost,
  followUser,
  unfollowUser,
  deletePost,
} from "../services/authService";
import Comments from "./Comments";
import { Link } from "react-router-dom";

const Post = ({ post, refreshFeed }) => {
  const { user, token, refreshUser } = useContext(AuthContext);
  const [likes, setLikes] = useState(post.likes || []);

  const isFollowing = user.following.includes(post.author._id);
  const isOwnPost = post.author._id === user._id;

  const handleLike = async () => {
    setLikes((prev) =>
      prev.includes(user._id)
        ? prev.filter((id) => id !== user._id)
        : [...prev, user._id],
    );

    try {
      await likePost(post._id, token);
    } catch (err) {
      console.error("Error liking post:", err.message);
      refreshFeed();
    }
  };

  const handleFollow = async () => {
    if (isFollowing) {
      await unfollowUser(post.author._id, token);
    } else {
      await followUser(post.author._id, token);
    }
    refreshUser();
  };

  const handleDelete = async () => {
    await deletePost(post._id, token);
    refreshFeed();
  };

  return (
    <div style={styles.card}>
      {/* HEADER */}
      <div style={styles.header}>
        <Link to={`/user/${post.author._id}`} style={styles.username}>
          {post.author.username}
        </Link>

        <div style={styles.headerButtons}>
          {!isOwnPost && (
            <button
              style={isFollowing ? styles.unfollowButton : styles.followButton}
              onClick={handleFollow}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
          {isOwnPost && (
            <button style={styles.deleteButton} onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>

      {/* IMAGE */}
      <img
        src={post.image || "/sample-image.png"}
        alt="post"
        style={styles.image}
      />

      {/* CAPTION */}
      {post.caption && <p style={styles.caption}>{post.caption}</p>}

      {/* LIKE */}
      <button style={styles.likeButton} onClick={handleLike}>
        ❤️{likes.length}
      </button>

      {/* COMMENTS */}
      <div style={styles.comments}>
        <Comments postId={post._id} />
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #eee",
    borderRadius: "12px",
    backgroundColor: "#fff",
    padding: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    gap: "10px",
  },
  headerButtons: {
    display: "flex",
    gap: "10px",
  },
  username: {
    fontWeight: "bold",
    color: "#0095f6",
    textDecoration: "none",
    fontSize: "16px",
  },
  followButton: {
    padding: "6px 12px",
    backgroundColor: "#0095f6",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  unfollowButton: {
    padding: "6px 12px",
    backgroundColor: "#efefef",
    color: "#333",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  image: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  caption: {
    marginBottom: "10px",
    fontSize: "14px",
    color: "#333",
  },
  likeButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#ed4956",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "10px",
  },
  comments: {
    borderTop: "1px solid #eee",
    paddingTop: "10px",
  },
};

export default Post;
