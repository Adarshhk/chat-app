import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken.utils.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).json({ error: "Credentials are blank." });
    }

    const user = await User.findOne({username});

    if (!user) return res.status(401).json({error : "User does not exists." })
    const isPasswordCorrect = await bcryptjs.compare(password, user.password || "");

    if (!isPasswordCorrect) {
      return res.status(402).json({ error: "Wrong Credentials entered." });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      _id : user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    })

  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const logout = (req, res) => {
  try {

    res.cookie("jwt" , "" , {maxAge : 0});
    return res.status(201).json({success : "Logged out successfully."})
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }

}

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match." })
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "User already exists." })
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const profilePic = `https://avatar.iran.liara.run/public/${gender === "male" ? "boy" : "girl"}?username=${username}`;


    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic,

    })

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });

    } else {
      res.status(400).json({ error: "Invalid user data" });
    }

  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
