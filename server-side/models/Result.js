const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    department: {
      type: String, // Makes the field mandatory
      default: "General", // Sets a default value if none is provided
      enum: ["IT", "COMPS", "EXTC", "EXCS", "CIVIL", "MECH"], // Restricts the values
    },
    marks: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
