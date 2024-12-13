const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    department: {
      type: String, // Makes the field mandatory
      default: "General", // Sets a default value if none is provided
      enum: ["IT", "COMPS", "EXTC", "EXCS", "CIVIL", "MECH"], // Restricts the values
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
