import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  findByEmail,
  findUserCredential,
  tokenRefresh,
} from "../model/userModel.js";
import prisma from "../utils/prismaClient.js";

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
  const { credential, password } = req.body;

  try {
    const user = await findUserCredential(credential);

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // console.log(refreshToken);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await tokenRefresh({
      token: refreshToken,
      userId: user.id,
      expiresAt,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Success!",
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresAt: expiresAt,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Invalid credentials",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    console.log(refreshToken);
    if (!refreshToken) return res.status(404).json({ message: "No content" });
    await prisma.refreshTokens.deleteMany({
      where: {
        token: refreshToken,
      },
    });

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(400).json({ message: "Refresh token required" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
        role: decoded.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(403).json({
      message: "Invalid refresh token",
      error,
    });
  }
};
