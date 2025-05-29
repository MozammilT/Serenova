// Get /api/user route in the server.js file
export const getUserData = async (req, res) => {
  console.log("[userController] getUserData called");
  try {
    console.log("[userController] req.user:", req.user);

    const role = req.user.role;
    const recentSearchcities = req.user.recentSearchcities;

    console.log("[userController] Responding with:", {
      role,
      recentSearchcities,
    });

    res.json({ sucess: true, role, recentSearchcities });
  } catch (err) {
    console.error("[userController] Error:", err);
    res.json({ success: false, message: err.message });
  }
};
