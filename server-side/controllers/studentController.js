const Student = require("../models/Student");
const Result = require("../models/Result");
const Counselor = require("../models/Counselor");
const Teacher = require("../models/Teacher");
// Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("counselor results").sort({createdAt: -1});
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.getStudents = async (req, res) => {
//   try {
//     // Fetch all students
//     const students = await Student.find()
//       .populate("counselor results")
//       .sort({ createdAt: -1 });

//     // Attach results, teachers, and counsellors to each student
//     for (const student of students) {
//       const results = await Result.find({ student: student._id }); // Fetch results
//       const teachers = await Teacher.find({ student: student._id }); // Fetch teachers
//       const counsellors = await Counselor.find({ student: student._id }); // Fetch counsellors

//       student.results = results; // Attach results
//       student.teachers = teachers; // Attach teachers
//       student.counsellors = counsellors; // Attach counsellors
//     }

//     res.status(200).json(students);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };




// Get a single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "teacher counselor results"
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.getStudentById = async (req, res) => {
//   try {
//     // Find the student by ID
//     const student = await Student.findById(req.params.id);

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     // Fetch results, teachers, and counsellors for the student
//     const results = await Result.find({ student: student._id });
//     const teachers = await Teacher.find({ student: student._id });
//     const counsellors = await Counselor.find({ student: student._id });

//     // Attach the fetched data to the student object
//     student.results = results;
//     student.teachers = teachers;
//     student.counsellors = counsellors;

//     res.status(200).json(student);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



// Create a new student
exports.createStudent = async (req, res) => {
  const { pid,name, age, email, teacher, counselor, results,department } = req.body;

  try {
    const newStudent = new Student({
      pid,
      name,
      age,
      email,
      teacher,
      counselor,
      results,
      department,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
  const { pid, name, age, email, teacher, department, counselor, results } =
    req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        pid,
        name,
        age,
        email,
        teacher,
        department,
        counselor,
        results,
      },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
