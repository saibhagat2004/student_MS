// const mongoose = require("mongoose");

// const teacherSchema = new mongoose.Schema(
//   {
    
//     name: { type: String, required: true },
//     email: { type: String, unique: true, required: true },
//     courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
//     department: {
//       type: String, // Makes the field mandatory
//       default: "General", // Sets a default value if none is provided
//       enum: ["IT", "COMPS", "EXTC", "EXCS", "CIVIL", "MECH"], // Restricts the values
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Teacher", teacherSchema);
const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    courses: [{ type: String, ref: "Course" }], // Reference to course codes
    department: {
      type: String,
      default: "General",
      enum: ["IT", "COMPS", "EXTC", "EXCS", "CIVIL", "MECH"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
