// import React, { useEffect, useState } from "react";
// import {
//   getStudents,
//   createStudent,
//   updateStudent,
//   deleteStudent,
// } from "../../mongo/StudentService"; // Make sure the import path is correct

// const StudentList = () => {
//   const [students, setStudents] = useState([]);
//   const [newStudent, setNewStudent] = useState({
//     name: "",
//     age: "",
//     email: "",
//   });
//   const [editStudent, setEditStudent] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const data = await getStudents();
//         setStudents(data);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   // Handle student creation
//   const handleCreateStudent = async (e) => {
//     e.preventDefault();
//     try {
//       const createdStudent = await createStudent(newStudent);
//       setStudents([...students, createdStudent]);
//       setNewStudent({ name: "", age: "", email: "" });
//       setIsModalOpen(false); // Close modal after creating student
//     } catch (error) {
//       console.error("Error creating student:", error);
//     }
//   };

//   // Handle student update
//   const handleUpdateStudent = async (id) => {
//     try {
//       const updatedData = { ...editStudent };
//       const updatedStudent = await updateStudent(id, updatedData);
//       setStudents(
//         students.map((student) =>
//           student._id === id ? updatedStudent : student
//         )
//       );
//       setEditStudent(null); // Reset editing state
//       setIsModalOpen(false); // Close modal after updating student
//     } catch (error) {
//       console.error("Error updating student:", error);
//     }
//   };

//   // Handle student deletion
//   const handleDeleteStudent = async (id) => {
//     try {
//       await deleteStudent(id);
//       setStudents(students.filter((student) => student._id !== id));
//     } catch (error) {
//       console.error("Error deleting student:", error);
//     }
//   };

//   // Open modal for creating a new student
//   const openCreateModal = () => {
//     setNewStudent({ name: "", age: "", email: "" });
//     setIsModalOpen(true);
//   };

//   // Open modal for editing a student
//   const openEditModal = (student) => {
//     setEditStudent(student);
//     setIsModalOpen(true);
//   };

//   // Close modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditStudent(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//           Student List
//         </h2>

//         {/* Button to open the Create Student modal */}
//         <button
//           onClick={openCreateModal}
//           className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 mb-6"
//         >
//           Create New Student
//         </button>

//         {/* Student List */}
//         <ul className="space-y-6">
//           {students.map((student) => (
//             <li
//               key={student._id}
//               className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
//             >
//               <h3 className="text-xl font-medium text-gray-900">
//                 {student.name}
//               </h3>
//               <p className="text-gray-700">Age: {student.age}</p>
//               <p className="text-gray-700">Email: {student.email}</p>
//               <p className="text-gray-700">
//                 Counselor:{" "}
//                 {student.counselor ? student.counselor.name : "Not Assigned"}
//               </p>
//               <p className="text-gray-700">
//                 Results:{" "}
//                 {student.results && student.results.length > 0
//                   ? student.results.map((result, index) => (
//                       <span key={index}>
//                         {result.marks}{" "}
//                         {index < student.results.length - 1 && ", "}
//                       </span>
//                     ))
//                   : "No Results Available"}
//               </p>

//               {/* Edit and Delete Buttons */}
//               <button
//                 onClick={() => openEditModal(student)}
//                 className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDeleteStudent(student._id)}
//                 className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>

//         {/* Modal for Create or Edit Student */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 w-96">
//               <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
//                 {editStudent
//                   ? `Edit Student: ${editStudent.name}`
//                   : "Create New Student"}
//               </h3>

//               {/* Form for Create/Edit Student */}
//               <form
//                 onSubmit={
//                   editStudent
//                     ? () => handleUpdateStudent(editStudent._id)
//                     : handleCreateStudent
//                 }
//                 className="space-y-4"
//               >
//                 <input
//                   type="text"
//                   value={editStudent ? editStudent.name : newStudent.name}
//                   onChange={(e) =>
//                     editStudent
//                       ? setEditStudent({ ...editStudent, name: e.target.value })
//                       : setNewStudent({ ...newStudent, name: e.target.value })
//                   }
//                   placeholder="Name"
//                   className="w-full p-2 border rounded-md"
//                   required
//                 />
//                 <input
//                   type="number"
//                   value={editStudent ? editStudent.age : newStudent.age}
//                   onChange={(e) =>
//                     editStudent
//                       ? setEditStudent({ ...editStudent, age: e.target.value })
//                       : setNewStudent({ ...newStudent, age: e.target.value })
//                   }
//                   placeholder="Age"
//                   className="w-full p-2 border rounded-md"
//                   required
//                 />
//                 <input
//                   type="email"
//                   value={editStudent ? editStudent.email : newStudent.email}
//                   onChange={(e) =>
//                     editStudent
//                       ? setEditStudent({
//                           ...editStudent,
//                           email: e.target.value,
//                         })
//                       : setNewStudent({ ...newStudent, email: e.target.value })
//                   }
//                   placeholder="Email"
//                   className="w-full p-2 border rounded-md"
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-700"
//                 >
//                   {editStudent ? "Save Changes" : "Create Student"}
//                 </button>
//               </form>

//               {/* Cancel Button */}
//               <button
//                 onClick={closeModal}
//                 className="w-full mt-4 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentList;
import React, { useEffect, useState } from "react";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../../mongo/StudentService"; // Ensure the import path is correct
import Loader from "../shared/Loader";
const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
        setLoading(true);
      try {
        const data = await getStudents();
      
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
      finally{
         setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      const createdStudent = await createStudent(newStudent);
      setStudents([...students, createdStudent]);
      setNewStudent({ name: "", age: "", email: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  const handleUpdateStudent = async (id) => {
    try {
      const updatedData = { ...editStudent };
      const updatedStudent = await updateStudent(id, updatedData);
      setStudents(
        students.map((student) =>
          student._id === id ? updatedStudent : student
        )
      );
      setEditStudent(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent(id);
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const openCreateModal = () => {
    setNewStudent({ name: "", age: "", email: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (student) => {
    setEditStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditStudent(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Student List
        </h2>
        <button
          onClick={openCreateModal}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 mb-6"
        >
          Create New Student
        </button>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                PID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Age
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Department
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Counselor
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Results
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {student.pid ? student.pid : "none"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.age}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.department}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.counselor ? student.counselor.name : "Not Assigned"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.results && student.results.length > 0
                    ? student.results.map((result, index) => (
                        <span key={index}>
                          {result.marks}{" "}
                          {index < student.results.length - 1 && ", "}
                        </span>
                      ))
                    : "No Results Available"}
                </td>
                <td className="border border-gray-300 px-4 py-2 ">
                  <button
                    onClick={() => openEditModal(student)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 w-16 my-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 w-16 my-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="text-white text-lg">
              <Loader />
            </div>
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                {editStudent
                  ? `Edit Student: ${editStudent.name}`
                  : "Create New Student"}
              </h3>
              <form
                onSubmit={
                  editStudent
                    ? () => handleUpdateStudent(editStudent._id)
                    : handleCreateStudent
                }
                className="space-y-4"
              >
                <input
                  type="text"
                  value={editStudent ? editStudent.pid : newStudent.pid}
                  onChange={(e) =>
                    editStudent
                      ? setEditStudent({ ...editStudent, pid: e.target.value })
                      : setNewStudent({ ...newStudent, pid: e.target.value })
                  }
                  placeholder="pid"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  value={editStudent ? editStudent.name : newStudent.name}
                  onChange={(e) =>
                    editStudent
                      ? setEditStudent({ ...editStudent, name: e.target.value })
                      : setNewStudent({ ...newStudent, name: e.target.value })
                  }
                  placeholder="Name"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="number"
                  value={editStudent ? editStudent.age : newStudent.age}
                  onChange={(e) =>
                    editStudent
                      ? setEditStudent({ ...editStudent, age: e.target.value })
                      : setNewStudent({ ...newStudent, age: e.target.value })
                  }
                  placeholder="Age"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="email"
                  value={editStudent ? editStudent.email : newStudent.email}
                  onChange={(e) =>
                    editStudent
                      ? setEditStudent({
                          ...editStudent,
                          email: e.target.value,
                        })
                      : setNewStudent({ ...newStudent, email: e.target.value })
                  }
                  placeholder="Email"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <select
                  value={
                    editStudent ? editStudent.department : newStudent.department
                  }
                  onChange={(e) =>
                    editStudent
                      ? setEditStudent({
                          ...editStudent,
                          department: e.target.value,
                        })
                      : setNewStudent({
                          ...newStudent,
                          department: e.target.value,
                        })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="" disabled>
                    Select department
                  </option>
                  <option value="IT">IT</option>
                  <option value="COMPS">COMPS</option>
                  <option value="EXTC">EXTC</option>
                  <option value="EXCS">EXCS</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="MECH">MECH</option>
                </select>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-700"
                >
                  {editStudent ? "Save Changes" : "Create Student"}
                </button>
              </form>
              <button
                onClick={closeModal}
                className="w-full mt-4 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
