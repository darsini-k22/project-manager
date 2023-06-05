const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, require: [true, "Title field cannot be empty!"] },
    description: {
      type: String,
      require: [false, "Enter the description of the project"],
    },
    due_date: { type: Date, require: [false, "Enter the due date"] },
    creator_name: {
      type: String,
      require: [true, "Creator name field cannot be empty!"],
    },
    creator_email: {
      type: String,
      require: [true, "Creator email field cannot be empty"],
    },
    status:{
        type:String,
        default:"Working"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Projects", projectSchema);
