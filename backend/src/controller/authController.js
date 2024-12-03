import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findByEmail } from "../model/userModel.js";

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
