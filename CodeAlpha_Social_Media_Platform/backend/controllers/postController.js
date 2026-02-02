const Post = require("../models/Post");

// CREATE POST
const createPost = async (req, res) => {
  try {
    const { caption, image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const post = await Post.create({
      caption,
      image,
      author: req.user._id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL POSTS (FEED)
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username profilePic")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LIKE / UNLIKE POST
const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user._id;

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString(),
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete post

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      message: "Post deleted successfully",
      post: deletedPost,
    });
  } catch (error) {
    console.error("Delete Post Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { createPost, getAllPosts, toggleLike, deletePost };
