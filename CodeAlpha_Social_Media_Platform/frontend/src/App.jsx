import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { token, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div style={styles.loadingContainer}>
        <h2 style={styles.loadingText}>Loading...</h2>
      </div>
    );

  return (
    <div style={styles.appContainer}>
      <Navbar />

      <div style={styles.pageContainer}>
        <Routes>
          {!token ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Feed />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/user/:id" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#fafafa",
    minHeight: "100vh",
  },
  pageContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#fafafa",
  },
  loadingText: {
    color: "#0095f6",
    fontSize: "24px",
    fontWeight: "bold",
  },
};

export default App;
