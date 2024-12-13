const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    pid:{
      type: String,
      unique: true,
      required: true,
      
    },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, unique: true, required: true },
    department: {
      type: String,// Makes the field mandatory
      default: "General", // Sets a default value if none is provided
      enum: ["IT", "COMPS", "EXTC", "EXCS", "CIVIL", "MECH"], // Restricts the values
    },
    teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
    counselor: { type: mongoose.Schema.Types.ObjectId, ref: "Counselor" },
    results: [{ type: mongoose.Schema.Types.ObjectId, ref: "Result" }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
