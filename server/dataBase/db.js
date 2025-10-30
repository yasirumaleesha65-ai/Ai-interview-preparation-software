import mongoose from "mongoose";

const connectToDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("successfully connected to the database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectToDataBase;
