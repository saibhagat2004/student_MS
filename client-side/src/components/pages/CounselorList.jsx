import React, { useState, useEffect } from "react";
import {
  getCounselors,
  createCounselor,
  updateCounselor,
  deleteCounselor,
} from "../../mongo/CounselorServices";
import Loader from "../shared/Loader";
const CounselorList = () => {
  const [counselors, setCounselors] = useState([]);
  const [newCounselor, setNewCounselor] = useState({
    name: "",
    email: "",
    specializations: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCounselor, setEditCounselor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCounselors = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const data = await getCounselors();
        console.log(data);
        setCounselors(data);
        setMessage("Data fetched successfully.");
      } catch (err) {
        console.error("Error fetching counselors:", err);
        setMessage("Error fetching counselors.");
      } finally {
        setLoading(false); // Set loading to false after fetching data
        setTimeout(() => setMessage(""), 2000); // Clear message after 2 seconds
      }
    };

    fetchCounselors();
  }, []);

  const handleCreateCounselor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newCounselorData = await createCounselor(newCounselor);
      setCounselors([...counselors, newCounselorData]);
      setNewCounselor({
        name: "",
        email: "",
        specializations: "",
      });
      setIsAdding(false);
      setMessage("Counselor added successfully.");
    } catch (err) {
      console.error("Error creating counselor:", err);
      setMessage("Error creating counselor.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 2000); // Clear message after 2 seconds
    }
  };

  const handleDeleteCounselor = async (counselorId) => {
    setLoading(true);
    try {
      await deleteCounselor(counselorId);
      setCounselors(
        counselors.filter((counselor) => counselor._id !== counselorId)
      );
      setMessage("Counselor deleted successfully.");
    } catch (err) {
      console.error("Error deleting counselor:", err);
      setMessage("Error deleting counselor.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 2000); // Clear message after 2 seconds
    }
  };

  const handleEditCounselor = (counselorId) => {
    const counselorToEdit = counselors.find(
      (counselor) => counselor._id === counselorId
    );
    if (counselorToEdit) {
      setEditCounselor(counselorToEdit);
      setIsEditing(true);
    }
  };

  const handleUpdateCounselor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedCounselor = await updateCounselor(
        editCounselor._id,
        editCounselor
      );
      setCounselors(
        counselors.map((counselor) =>
          counselor._id === updatedCounselor._id ? updatedCounselor : counselor
        )
      );
      setIsEditing(false);
      setEditCounselor(null);
      setMessage("Counselor updated successfully.");
    } catch (err) {
      console.error("Error updating counselor:", err);
      setMessage("Error updating counselor.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 2000); // Clear message after 2 seconds
    }
  };

  const closeModal = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditCounselor(null);
  };

  return (
    <div className="container max-w-5xl p-6 bg-gray-50 rounded-lg shadow-lg mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Counselor List</h1>

      {/* Show loading indicator */}

      {/* Show success/error message */}
      {message && <div className="text-center text-green-600">{message}</div>}

      <div className="mb-6 text-center max-w-5xl">
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
        >
          {isAdding ? "Close Form" : "Add New Counselor"}
        </button>
      </div>
      {loading && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-lg">
            <Loader />
          </div>
        </div>
      )}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {isAdding ? "Add New Counselor" : "Edit Counselor"}
            </h2>
            <form
              onSubmit={
                isAdding ? handleCreateCounselor : handleUpdateCounselor
              }
              className="space-y-4"
            >
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
                value={isAdding ? newCounselor.name : editCounselor?.name || ""}
                onChange={(e) =>
                  isAdding
                    ? setNewCounselor({ ...newCounselor, name: e.target.value })
                    : setEditCounselor({
                        ...editCounselor,
                        name: e.target.value,
                      })
                }
                required
              />
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={
                  isAdding ? newCounselor.email : editCounselor?.email || ""
                }
                onChange={(e) =>
                  isAdding
                    ? setNewCounselor({
                        ...newCounselor,
                        email: e.target.value,
                      })
                    : setEditCounselor({
                        ...editCounselor,
                        email: e.target.value,
                      })
                }
                required
              />
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Specialization"
                value={
                  isAdding
                    ? newCounselor.specializations
                    : editCounselor?.specializations || ""
                }
                onChange={(e) =>
                  isAdding
                    ? setNewCounselor({
                        ...newCounselor,
                        specializations: e.target.value,
                      })
                    : setEditCounselor({
                        ...editCounselor,
                        specializations: e.target.value,
                      })
                }
                required
              />

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closeModal}
                  className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isAdding ? "Add Counselor" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left text-gray-700 border-b">
                Name
              </th>
              <th className="py-3 px-6 text-left text-gray-700 border-b">
                Email
              </th>
              <th className="py-3 px-6 text-left text-gray-700 border-b">
                Specialization
              </th>
              <th className="py-3 px-6 text-left text-gray-700 border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {counselors.map((counselor) => (
              <tr key={counselor._id} className="hover:bg-gray-100">
                <td className="py-3 px-6">{counselor.name}</td>
                <td className="py-3 px-6">{counselor.email}</td>
                <td className="py-3 px-6">
                  {counselor.specializations &&
                  counselor.specializations.length > 0
                    ? counselor.specializations.join(", ") // Join the array into a string
                    : "No Specializations"}{" "}
                </td>

                <td className="py-3 px-6 space-x-2">
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
                    onClick={() => handleEditCounselor(counselor._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                    onClick={() => handleDeleteCounselor(counselor._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CounselorList;
