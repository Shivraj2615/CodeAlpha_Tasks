import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  getUserById,
  followUser,
  unfollowUser,
  getPosts,
  likePost,
} from "../services/authService";
import Comments from "../components/Comments";

const Profile = () => {
  const { id } = useParams();
  const { token, user, refreshUser } = useContext(AuthContext);

  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const DEFAULT_PROFILE =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // default user icon

  // Fetch profile user data
  const fetchProfile = async () => {
    const res = await getUserById(id, token);
    setProfileUser(res.data);
  };

  const fetchPosts = async () => {
    const res = await getPosts(token);
    const userPosts = res.data.filter((p) => p.author._id === id);
    setPosts(userPosts);
  };

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, [id]);

  const handleFollow = async () => {
    if (!profileUser) return;
    const isFollowing = user.following.includes(profileUser._id);
    if (isFollowing) {
      await unfollowUser(profileUser._id, token);
    } else {
      await followUser(profileUser._id, token);
    }
    refreshUser();
    fetchProfile();
  };

  if (!profileUser) return <h2 style={styles.loading}>Loading...</h2>;

  const isOwnProfile = user._id === profileUser._id;
  const isFollowing = user.following.includes(profileUser._id);

  return (
    <div style={styles.container}>
      {/* Profile Header */}
      <div style={styles.header}>
        <div style={styles.userInfo}>
          <div style={styles.profilePicWrapper}>
            <img
              src={profileUser.profilePic || DEFAULT_PROFILE}
              alt="Profile"
              style={styles.profilePic}
            />
          </div>
          <div>
            <h2 style={styles.username}>{profileUser.username}</h2>
            <p style={styles.stats}>
              <b>{profileUser.followers.length}</b> Followers ·{" "}
              <b>{profileUser.following.length}</b> Following
            </p>
          </div>
        </div>

        {!isOwnProfile && (
          <button
            style={isFollowing ? styles.unfollowButton : styles.followButton}
            onClick={handleFollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>

      {/* Posts Grid */}
      <div style={styles.posts}>
        {posts.map((post) => (
          <div key={post._id} style={styles.card}>
            <img src={post.image} style={styles.image} alt="post" />
            <p style={styles.caption}>{post.caption}</p>
            <button
              style={styles.likeButton}
              onClick={async () => {
                await likePost(post._id, token);
                fetchPosts();
              }}
            >
              ❤️ {post.likes.length}
            </button>
            <div style={styles.comments}>
              <Comments postId={post._id} token={token} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  loading: {
    textAlign: "center",
    marginTop: "50px",
    color: "#0095f6",
    fontWeight: "bold",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  profilePicWrapper: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  profilePic: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  username: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
  },
  stats: {
    fontSize: "14px",
    color: "#555",
  },
  followButton: {
    padding: "8px 16px",
    backgroundColor: "#0095f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  unfollowButton: {
    padding: "8px 16px",
    backgroundColor: "#efefef",
    color: "#333",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  posts: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    backgroundColor: "#fff",
    padding: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  image: {
    width: "100%",
    height: "200px",
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

export default Profile;
