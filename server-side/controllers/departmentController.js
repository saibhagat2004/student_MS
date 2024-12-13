const Department = require("../models/Department");

// Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const { name, code, courses, headOfDepartment, students } = req.body;

    const newDepartment = new Department({
      name,
      code,
      courses,
      headOfDepartment,
      students,
    });

    const savedDepartment = await newDepartment.save();
    res
      .status(201)
      .json({
        message: "Department created successfully",
        data: savedDepartment,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating department", error: error.message });
  }
};

// Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate("courses")
      .populate("headOfDepartment")
      .populate("students");
    res.status(200).json({ data: departments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching departments", error: error.message });
  }
};


// Get a department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id)
      .populate("courses")
      .populate("headOfDepartment")
      .populate("students");

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ data: department });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching department", error: error.message });
  }
};

// Update a department by ID
exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, courses, headOfDepartment, students } = req.body;

    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { name, code, courses, headOfDepartment, students },
      { new: true, runValidators: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    res
      .status(200)
      .json({
        message: "Department updated successfully",
        data: updatedDepartment,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating department", error: error.message });
  }
};

// Delete a department by ID
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDepartment = await Department.findByIdAndDelete(id);

    if (!deletedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    res
      .status(200)
      .json({
        message: "Department deleted successfully",
        data: deletedDepartment,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting department", error: error.message });
  }
};
