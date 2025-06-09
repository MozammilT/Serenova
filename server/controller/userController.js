// Get /api/user route in the server.js file

export const getUserData = async (req, res) => {
  console.log("[userController] getUserData called");
  try {
    // TEMP: Mock user object if req.user is missing
    if (!req.user) {
      console.warn("[userController] req.user is undefined, mocking user...");
      req.user = {
        role: "guest",
        recentSearchcities: ["Delhi", "Mumbai", "Goa"],
      };
    }

    console.log("[userController] req.user:", req.user);

    const role = req.user.role;
    const recentSearchcities = req.user.recentSearchcities;
    const id = req.user._id;

    console.log("[userController] Responding with:", {
      role,
      recentSearchcities,
      id,
    });

    res.json({ success: true, role, recentSearchcities });
  } catch (err) {
    console.error("[userController] Error:", err);
    res.json({ success: false, message: err.message });
  }
};

//Store User recent Serched cities
export const storeRecentSearchedCities = async (req, res) => {
  try {
    const { recentSearchCity } = req.body;
    const user = req.user;

    if (user.recentSearchcities.length >= 5) {
      user.recentSearchcities.push(recentSearchCity);
    } else {
      user.recentSearchcities.shift();
      user.recentSearchcities.push(recentSearchCity);
    }
    await user.save();
  } catch (err) {
    console.log("error in storeRecentSearchedCities:", err);
    res.json({ success: false, message: err.message });
  }
};
