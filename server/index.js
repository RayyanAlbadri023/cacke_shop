// index.jsx
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserModel from "./models/UserModel.js";
import DessertModel from "./models/DessertModel.js";

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= MONGODB CONNECTION =================
try {
  const conStr =
    "mongodb+srv://admin:admin@cluster0.sk96alb.mongodb.net/SweetDB?retryWrites=true&w=majority";

  await mongoose.connect(conStr);
  console.log("MongoDB Connected Successfully");
} catch (error) {
  console.log("MongoDB Connection Error:", error);
}

// ================= SERVER =================
app.listen(5000, () => {
  console.log("Server running on port 5000...");
});

// =====================================================
// ================= USER AUTH ROUTES ==================
// =====================================================

// SIGNUP
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: "customer",
    });

    await user.save();

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
});

// =====================================================
// ================= DESSERT ROUTES ====================
// =====================================================

// CREATE Dessert
app.post("/createDessert", async (req, res) => {
  try {
    const { name, price, category, image, inStock, discountPercent, availableFrom } = req.body;

    const discount = (price * (discountPercent || 0)) / 100;
    const finalPrice = price - discount;

    const dessert = new DessertModel({
      name,
      price,
      category,
      image,
      inStock,
      discountPercent,
      availableFrom,
      finalPrice,
    });

    await dessert.save();

    res.status(201).json({ message: "Dessert created", dessert });
  } catch (error) {
    res.status(500).json({ message: "Error creating dessert", error });
  }
});

// GET ALL Desserts
app.get("/getDesserts", async (req, res) => {
  try {
    const desserts = await DessertModel.find().sort({ createdAt: -1 });
    res.status(200).json({ desserts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching desserts", error });
  }
});

// UPDATE Dessert
app.put("/updateDessert", async (req, res) => {
  try {
    const { _id, price, discountPercent } = req.body;

    const discount = (price * (discountPercent || 0)) / 100;
    const finalPrice = price - discount;

    const updatedDessert = await DessertModel.findOneAndUpdate(
      { _id },
      { ...req.body, finalPrice },
      { new: true }
    );

    res.status(200).json({
      message: "Dessert updated",
      dessert: updatedDessert,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating dessert", error });
  }
});

// DELETE Dessert
app.delete("/deleteDessert/:id", async (req, res) => {
  try {
    const deletedDessert = await DessertModel.findOneAndDelete({ _id: req.params.id });

    res.status(200).json({
      message: "Dessert deleted",
      dessert: deletedDessert,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting dessert", error });
  }
});
