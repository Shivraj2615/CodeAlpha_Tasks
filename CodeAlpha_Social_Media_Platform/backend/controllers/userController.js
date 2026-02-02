const User = require("../models/User");

const getMe = async (req, res) => {
  res.json(req.user);
};

const followUser = async (req, res) => {
  const targetUser = await User.findById(req.params.id);
  const currentUser = await User.findById(req.user._id);

  if (!targetUser) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!targetUser.followers.includes(req.user._id)) {
    targetUser.followers.push(req.user._id);
    currentUser.following.push(req.params.id);

    await targetUser.save();
    await currentUser.save();
  }

  res.json({ message: "User followed" });
};

const unfollowUser = async (req, res) => {
  const targetUser = await User.findById(req.params.id);
  const currentUser = await User.findById(req.user._id);

  targetUser.followers = targetUser.followers.filter(
    (id) => id.toString() !== req.user._id.toString(),
  );

  currentUser.following = currentUser.following.filter(
    (id) => id.toString() !== req.params.id,
  );

  await targetUser.save();
  await currentUser.save();

  res.json({ message: "User unfollowed" });
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getMe, followUser, unfollowUser, getUserById };

