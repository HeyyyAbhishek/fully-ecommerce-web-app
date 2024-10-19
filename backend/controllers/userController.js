const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const sellerModel = require("../models/sellerModel") // Assuming you have a Mongoose model defined

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
        isSeller: user.isSeller,
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
        isSeller: user.isSeller,  
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
    console.log("under user register function: res.body is",req.body)
    let { username, password, email, contact_number, isSeller = false ,account_type } = req.body;

    if (!username || !password || !email || !contact_number || !account_type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User with given username or email already exists" });
    }

    console.log("seller type", isSeller);

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      username,
      password: hashedPassword,
      email,
      contact_number,
      isSeller,
      salt,
      account_type
    });

    // Create new seller profile if isSeller is true
    if (isSeller) {
      const seller = new sellerModel({
        listedProducts: [],
        orderHistory: [],
        sellerSpecificField: "",
        user: user._id,
      });
      await seller.save();
    }

    await user.save();

    return res.status(201).json({ message: "User Created", ok: true });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};



const verifyLogin = async (req, res) => {
  try {
    const user = req.signedCookies.user;
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid Request" });
    }
    const {email,username,id,account_type,isSeller} = user;
    console.log("user in verifyLogin")
    return res.status(200).json({ user:{
      email:email,
      username:username,
      id:id,
      account_type:account_type,
      isSeller:isSeller
    }, ok: true ,isAuthenticated:true,message:"User is authenticated"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getDetails = async (req, res) => {
  try {
    const user = req.signedCookies.user;
    const {email,username,id,token,account_type} = user;
    if (!user) {
      return res.status(400).json({ message: "Invalid Request" });
    }
    const getUser = await User.findOne({email:email}).select("-password -salt");
    console.log(email,username,id,token,account_type);
    return res.status(200).json({ user: getUser , ok: true ,isAuthenticated:true,message:"User is authenticated"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  login,
  logout,
  register,
  verifyLogin,
  getDetails
};
