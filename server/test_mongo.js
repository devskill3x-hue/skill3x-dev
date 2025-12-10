import mongoose from "mongoose";

const uri = "mongodb+srv://skill3x:ujjwal1801@skill3x.ai4trep.mongodb.net/skill3x";

mongoose.connect(uri)
  .then(() => console.log(" MongoDB Connected Successfully 🎉"))
  .catch((err) => console.log("Connection Error:", err));
