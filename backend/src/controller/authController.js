import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  findByEmail,
  findUserCredential,
} from "../model/userModel.js";

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await findByEmail(email);

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User register successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

export const login = async (req, res) => {
  const { userCredential, password } = req.body;

  try {
    const user = await findUserCredential(userCredential);

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login Success!", token });
  } catch (error) {
    res.status(500).json({
      message: "Invalid credentials",
    });
  }
};

export const logout = async (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
};
