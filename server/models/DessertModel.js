import mongoose from "mongoose";

const DessertSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },

    inStock: { type: Boolean, default: true },
    availableFrom: { type: Date, default: Date.now },

    discountPercent: { type: Number, default: 0 },
    finalPrice: { type: Number }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

// IMPORTANT: Use your real collection name → "sweet"
const DessertModel = mongoose.model("Sweet", DessertSchema, "Sweet");

export default DessertModel;
