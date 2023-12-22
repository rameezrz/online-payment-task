import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_DB_URI as string)
  .then(() => console.log("Mongodb connected"));

// Use the user routes
app.use("/users", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
