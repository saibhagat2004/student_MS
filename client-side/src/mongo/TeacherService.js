import axios from "axios";

const API_URL = "http://localhost:3000/teachers"; // Change to your backend API URL

// Get all teachers
export const getAllTeachers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

// Get a single teacher by ID
export const getTeacherById = async (teacherId) => {
  try {
    const response = await axios.get(`${API_URL}/${teacherId}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

// Create a new teacher
export const createTeacher = async (teacherData) => {
  try {
    const response = await axios.post(API_URL, teacherData);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

// Update a teacher by ID
export const updateTeacher = async (teacherId, updateData) => {
  try {
    const response = await axios.put(`${API_URL}/${teacherId}`, updateData);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

// Delete a teacher by ID
export const deleteTeacher = async (teacherId) => {
  try {
    const response = await axios.delete(`${API_URL}/${teacherId}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};
