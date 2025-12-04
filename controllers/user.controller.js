import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: "true", data: users });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: "true", data: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Prevent admin removing themselves
    if (req.user && user._id.toString() === req.user.id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Admin cannot delete their own account",
      });
    }

    await User.findByIdAndDelete(userId);

    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log("Delete user error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
