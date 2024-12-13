import axios from "axios";

const API_URL = "http://localhost:3000/counselors"; // Update this to your API's base URL

// Get all counselors
export const getCounselors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching counselors:", error);
    throw error;
  }
};

// Get a single counselor by ID
export const getCounselorById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching counselor with ID ${id}:`, error);
    throw error;
  }
};

// Create a new counselor
export const createCounselor = async (counselorData) => {
  try {
    const response = await axios.post(`${API_URL}/`, counselorData);
    return response.data;
  } catch (error) {
    console.error("Error creating counselor:", error);
    throw error;
  }
};

// Update a counselor by ID
export const updateCounselor = async (id, counselorData) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      counselorData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating counselor with ID ${id}:`, error);
    throw error;
  }
};

// Delete a counselor by ID
export const deleteCounselor = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting counselor with ID ${id}:`, error);
    throw error;
  }
};
