const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getMe,
  followUser,
  unfollowUser,
  getUserById,
} = require("../controllers/userController");

const router = express.Router();

router.get("/me", protect, getMe);
router.put("/:id/follow", protect, followUser);
router.put("/:id/unfollow", protect, unfollowUser);
router.get("/:id", protect, getUserById);

module.exports = router;
