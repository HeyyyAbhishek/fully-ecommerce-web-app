const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel"); // Assuming you have a Mongoose model defined

const login = async (req, res) => {
  console.log("login called");
  console.log(req.body);
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid Request", ok: false });
    }

    // Check if user exists
    let user = await User.findOne({ email: email });
    console.log("user", user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials", ok: false });
    }

    // Check if password is correct
    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials", ok: false });
    }
    // Create JWT token
    const payload = {
      user: {
        id: user._id,
        email: user.email,
        account_type: user.account_type,

      },
    };

    const token = jwt.sign(payload, process.env.TOKEN_KEY, {
      expiresIn: "24h",
    });

    res.cookie(
      "user",
      {
        id: user._id,
        username: user.username,
        email: user.email,
        token: token,
        account_type: user.account_type,
      },
      {
        httpOnly: true,
        signed: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 1000,
      }
    );

    user.password = null
    user.salt = null
    // Create JWT token

    return res.status(200).json({
      ok: true,
      message: "Login Successful",
      user:user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("user");
    return res.status(200).json({
      ok: true,
      message: "Logout Successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const register = async (req, res) => {
  try {
    let { username, password, email, contact_number, isSeller } = req.body;
    if (!username || !password || !email || !contact_number) {
      return res.status(400).json({ message: "Invalid Request" });
    }

    // Check if user already exists
    let user = await User.findOne({ username: username });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      username: username,
      password: password,
      email: email,
      contact_number: contact_number,
      salt: salt,
      isSeller: isSeller,
    });

    await user.save();

    return res.status(200).json({ message: "User Created", ok: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const verifyLogin = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({ message: "Invalid Request" });
    }
    console.log("user in verifyLogin")
    return res.status(200).json({ user: user , ok: true ,isAuthenticated:true,message:"User is authenticated"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  login,
  logout,
  register,
  verifyLogin
};
