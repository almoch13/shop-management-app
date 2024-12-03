import express from "express";
import dotenv from "dotenv";
// import cors from "cors";
import authRouter from "./routes/authRoute.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
// app.use(cors());

app.get("/", (req, res) => res.send("API is running in PORT " + PORT));
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
