import mongoose from "mongoose";

const getConnection = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("✅ MongoDB connected successfully");
    })
    .catch((error) => {
      console.error("❌ MongoDB connection failed:", error.message);
    });
  } catch (error) {
    console.error("❌ Connection error:", error.message);
  }
};

export default getConnection;
