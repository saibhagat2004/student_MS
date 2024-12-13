const mongoose = require("mongoose");

// Define Department schema
const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  headOfDepartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher", // Reference to Teacher model
    required: false, // Optional
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
},
{timestamps:true});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
