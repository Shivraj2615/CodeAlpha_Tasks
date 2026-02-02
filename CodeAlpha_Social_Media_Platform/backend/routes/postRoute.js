const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createPost,
  getAllPosts,
  toggleLike,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", protect, getAllPosts);
router.put("/:id/like", protect, toggleLike);
router.delete("/:id", protect, deletePost);

module.exports = router;
