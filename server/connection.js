import mongoose from "mongoose";

export default async function connect(url) {
  try {
    await mongoose.connect(url);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
}
