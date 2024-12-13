// const Teacher = require("../models/Teacher");
// const Course = require("../models/Course");
// // Get all teachers
// exports.getTeachers = async (req, res) => {
//   try {
//     const teachers = await Teacher.find() // Populate students if necessary
//       .populate("courses").sort({createdAt:-1}); // Populate the courses field with Course documents

//     res.status(200).json(teachers);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get a single teacher by ID
// exports.getTeacherById = async (req, res) => {
//   try {
//     const teacher = await Teacher.findById(req.params.id).populate(
//       "students courses"
//     );
//     if (!teacher) {
//       return res.status(404).json({ message: "Teacher not found" });
//     }
//     res.status(200).json(teacher);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Create a new teacher
// exports.createTeacher = async (req, res) => {
//   const { name, email, courses,department } = req.body;

//   try {
//     const newTeacher = new Teacher({
//       name,
//       email,
//       courses,
//       department,
//     });

//     const savedTeacher = await newTeacher.save();
//     res.status(201).json(savedTeacher);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update a teacher by ID
// exports.updateTeacher = async (req, res) => {
//   const { name, email, department, courses } = req.body;

//   try {
//     const updatedTeacher = await Teacher.findByIdAndUpdate(
//       req.params.id,
//       { name, email, courses, department },
//       { new: true }
//     );

//     if (!updatedTeacher) {
//       return res.status(404).json({ message: "Teacher not found" });
//     }

//     res.status(200).json(updatedTeacher);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete a teacher by ID
// exports.deleteTeacher = async (req, res) => {
//   try {
//     const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
//     if (!deletedTeacher) {
//       return res.status(404).json({ message: "Teacher not found" });
//     }
//     res.status(200).json({ message: "Teacher deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const Teacher = require("../models/Teacher");
const Course = require("../models/Course");

// Get all teachers
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });

    // For each teacher, we will populate course codes
    const populatedTeachers = await Promise.all(
      teachers.map(async (teacher) => {
        const courses = await Course.find({ code: { $in: teacher.courses } });
        teacher.courses = courses;
        return teacher;
      })
    );

    res.status(200).json(populatedTeachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Populate courses by course code
    const courses = await Course.find({ code: { $in: teacher.courses } });
    teacher.courses = courses;

    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new teacher
exports.createTeacher = async (req, res) => {
  const { name, email, courses, department } = req.body;

  try {
    const newTeacher = new Teacher({
      name,
      email,
      courses,
      department,
    });

    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a teacher by ID
exports.updateTeacher = async (req, res) => {
  const { name, email, department, courses } = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { name, email, courses, department },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Populate courses by course code after update
    const updatedCourses = await Course.find({
      code: { $in: updatedTeacher.courses },
    });
    updatedTeacher.courses = updatedCourses;

    res.status(200).json(updatedTeacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a teacher by ID
exports.deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
