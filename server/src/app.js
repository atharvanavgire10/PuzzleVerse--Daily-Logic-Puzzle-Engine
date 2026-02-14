import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import passport from "passport";

import "./config/passport.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();          // ✅ CREATE APP FIRST
const prisma = new PrismaClient();

// =====================
// Middlewares
// =====================

app.use(cors());
app.use(express.json());
app.use(passport.initialize());  // ✅ Now safe

// =====================
// Routes
// =====================

app.use("/api/auth", authRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// =====================
// Google Token Endpoint (Optional custom flow)
// =====================

app.post("/api/auth/google", async (req, res) => {
  try {
    const { email, name } = req.body;

    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          provider: "google"
        }
      });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Google auth failed" });
  }
});

// =====================
// Save Puzzle Result
// =====================

app.post("/api/result", async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "Unauthorized" });

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { date, score, attempts } = req.body;

    const result = await prisma.puzzleResult.create({
      data: {
        userId: decoded.userId,
        date,
        score,
        attempts
      }
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Saving result failed" });
  }
});

// =====================
// Start Server
// =====================

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000 🚀");
});
