// import React, { useState, useEffect } from "react";
// import {
//   getAllTeachers,
//   createTeacher,
//   updateTeacher,
//   deleteTeacher,
// } from "../../mongo/TeacherService";
// import { useNavigate } from "react-router-dom";

// const TeacherList = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [newTeacher, setNewTeacher] = useState({
//     name: "",
//     email: "",
//     courses: [],
//     department: "",
//   });
//   const [isAdding, setIsAdding] = useState(false); // State to toggle add form
//   const [isEditing, setIsEditing] = useState(false);
//   const [editTeacher, setEditTeacher] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const data = await getAllTeachers();
//         setTeachers(data);
//         console.log(data);
//       } catch (err) {
//         console.error("Error fetching teachers:", err);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   const handleCreateTeacher = async (e) => {
//     e.preventDefault();
//     try {
//       const newTeacherData = await createTeacher(newTeacher);
//       setTeachers((prevTeachers) => [...prevTeachers, newTeacherData]);
//       setNewTeacher({ name: "", email: "", courses: [], department: "" }); // reset form
//       setIsAdding(false); // Close form after adding
//     } catch (err) {
//       console.error("Error creating teacher:", err);
//     }
//   };

//   const handleDeleteTeacher = async (teacherId) => {
//     try {
//       await deleteTeacher(teacherId);
//       setTeachers(teachers.filter((teacher) => teacher._id !== teacherId));
//     } catch (err) {
//       console.error("Error deleting teacher:", err);
//     }
//   };

//   const handleEditTeacher = (teacherId) => {
//     const teacherToEdit = teachers.find((teacher) => teacher._id === teacherId);
//     setEditTeacher(teacherToEdit);
//     setIsEditing(true);
//   };

//   const handleUpdateTeacher = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedTeacherData = await updateTeacher(
//         editTeacher._id,
//         editTeacher
//       );
//       setTeachers(
//         teachers.map((teacher) =>
//           teacher._id === editTeacher._id ? updatedTeacherData : teacher
//         )
//       );
//       setIsEditing(false);
//       setEditTeacher(null);
//     } catch (err) {
//       console.error("Error updating teacher:", err);
//     }
//   };

//   const closeModal = () => {
//     setIsAdding(false);
//     setIsEditing(false);
//     setEditTeacher(null);
//   };

//   return (
//     <div className="container max-w-5xl p-6 bg-gray-50 rounded-lg shadow-lg mx-auto">
//       <h1 className="text-3xl font-bold text-center mb-6">Teacher List</h1>

//       {/* Button to toggle Add Form */}
//       <div className="mb-6 text-center max-w-5xl">
//         <button
//           onClick={() => setIsAdding(!isAdding)}
//           className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
//         >
//           {isAdding ? "Close Form" : "Add New Teacher"}
//         </button>
//       </div>

//       {/* Add/Edit Teacher Modal */}
//       {(isAdding || isEditing) && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
//             <h2 className="text-xl font-semibold mb-4">
//               {isAdding ? "Add New Teacher" : "Edit Teacher"}
//             </h2>
//             <form
//               onSubmit={isAdding ? handleCreateTeacher : handleUpdateTeacher}
//               className="space-y-4"
//             >
//               <input
//                 type="text"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Name"
//                 value={isAdding ? newTeacher.name : editTeacher?.name}
//                 onChange={(e) =>
//                   isAdding
//                     ? setNewTeacher({ ...newTeacher, name: e.target.value })
//                     : setEditTeacher({
//                         ...editTeacher,
//                         name: e.target.value,
//                       })
//                 }
//                 required
//               />
//               <input
//                 type="email"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Email"
//                 value={isAdding ? newTeacher.email : editTeacher?.email}
//                 onChange={(e) =>
//                   isAdding
//                     ? setNewTeacher({ ...newTeacher, email: e.target.value })
//                     : setEditTeacher({
//                         ...editTeacher,
//                         email: e.target.value,
//                       })
//                 }
//                 required
//               />
//               <select
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Courses"
//                 value={isAdding ? newTeacher.courses : editTeacher?.courses}
//                 onChange={(e) =>
//                   isAdding
//                     ? setNewTeacher({
//                         ...newTeacher,
//                         courses: Array.from(
//                           e.target.selectedOptions,
//                           (option) => option.value
//                         ),
//                       })
//                     : setEditTeacher({
//                         ...editTeacher,
//                         courses: Array.from(
//                           e.target.selectedOptions,
//                           (option) => option.value
//                         ),
//                       })
//                 }
//                 required
//               >
//                 <option value="" disabled>
//                   Select department
//                 </option>
//                 <option value="CHEM101">CHEM101</option>
//                 <option value="PHYS101">PHYS101</option>
//                 <option value="MATH101">MATH101</option>
//                 <option value="CG01">CG01</option>
//                 <option value="EG101">EG101</option>
//               </select>

//               <select
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Department"
//                 value={
//                   isAdding ? newTeacher.department : editTeacher?.department
//                 }
//                 onChange={(e) =>
//                   isAdding
//                     ? setNewTeacher({
//                         ...newTeacher,
//                         department: e.target.value,
//                       })
//                     : setEditTeacher({
//                         ...editTeacher,
//                         department: e.target.value,
//                       })
//                 }
//                 required
//               >
//                 <option value="" disabled>
//                   Select department
//                 </option>
//                 <option value="IT">IT</option>
//                 <option value="COMPS">COMPS</option>
//                 <option value="EXTC">EXTC</option>
//                 <option value="EXCS">EXCS</option>
//                 <option value="CIVIL">CIVIL</option>
//                 <option value="MECH">MECH</option>
//               </select>

//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="submit"
//                   className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   {isAdding ? "Add Teacher" : "Save Changes"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Teachers List */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
//           <thead>
//             <tr>
//               <th className="py-3 px-6 text-left text-gray-700 border-b">
//                 Name
//               </th>
//               <th className="py-3 px-6 text-left text-gray-700 border-b">
//                 Email
//               </th>
//               <th className="py-3 px-6 text-left text-gray-700 border-b">
//                 Department
//               </th>
//               <th className="py-3 px-6 text-left text-gray-700 border-b">
//                 Courses
//               </th>
//               <th className="py-3 px-6 text-left text-gray-700 border-b">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {teachers.map((teacher) => (
//               <tr key={teacher._id} className="hover:bg-gray-100">
//                 <td className="py-3 px-6">{teacher.name}</td>
//                 <td className="py-3 px-6">{teacher.email}</td>
//                 <td className="py-3 px-6">{teacher.department}</td>
//                 <td className="py-3 px-6">
//                   {teacher.courses && teacher.courses.length > 0
//                     ? teacher.courses.map((course) => course.code).join(", ")
//                     : "No Results Available"}
//                 </td>
//                 <td className="py-3 px-6 space-x-2">
//                   <button
//                     className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
//                     onClick={() => handleEditTeacher(teacher._id)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
//                     onClick={() => handleDeleteTeacher(teacher._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TeacherList;
import React, { useState, useEffect } from "react";
import {
  getAllTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../../mongo/TeacherService";
import { useNavigate } from "react-router-dom";
import Loader from "../shared/Loader";
const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    courses: [],
    department: "",
  });
  const [isAdding, setIsAdding] = useState(false); // State to toggle add form
  const [isEditing, setIsEditing] = useState(false);
  const [editTeacher, setEditTeacher] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true); // Set loading true when fetching
      try {
        const data = await getAllTeachers();
        setTeachers(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      } finally {
        setLoading(false); // Set loading false after fetching
      }
    };

    fetchTeachers();
  }, []);

  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading true when creating a teacher
    try {
      const newTeacherData = await createTeacher(newTeacher);
      setTeachers((prevTeachers) => [...prevTeachers, newTeacherData]);
      setNewTeacher({ name: "", email: "", courses: [], department: "" }); // reset form
      setIsAdding(false); // Close form after adding
    } catch (err) {
      console.error("Error creating teacher:", err);
    } finally {
      setLoading(false); // Set loading false after creating
    }
  };

  const handleDeleteTeacher = async (teacherId) => {
    setLoading(true); // Set loading true when deleting
    try {
      await deleteTeacher(teacherId);
      setTeachers(teachers.filter((teacher) => teacher._id !== teacherId));
    } catch (err) {
      console.error("Error deleting teacher:", err);
    } finally {
      setLoading(false); // Set loading false after deleting
    }
  };

  const handleEditTeacher = (teacherId) => {
    const teacherToEdit = teachers.find((teacher) => teacher._id === teacherId);
    setEditTeacher(teacherToEdit);
    setIsEditing(true);
  };

  const handleUpdateTeacher = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading true when updating
    try {
      const updatedTeacherData = await updateTeacher(
        editTeacher._id,
        editTeacher
      );
      setTeachers(
        teachers.map((teacher) =>
          teacher._id === editTeacher._id ? updatedTeacherData : teacher
        )
      );
      setIsEditing(false);
      setEditTeacher(null);
    } catch (err) {
      console.error("Error updating teacher:", err);
    } finally {
      setLoading(false); // Set loading false after updating
    }
  };

  const closeModal = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditTeacher(null);
  };

  return (
    <div className="container max-w-5xl p-6 bg-gray-50 rounded-lg shadow-lg mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Teacher List</h1>

      {/* Button to toggle Add Form */}
      <div className="mb-6 text-center max-w-5xl">
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
        >
          {isAdding ? "Close Form" : "Add New Teacher"}
        </button>
      </div>

      {/* Add/Edit Teacher Modal */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {isAdding ? "Add New Teacher" : "Edit Teacher"}
            </h2>
            <form
              onSubmit={isAdding ? handleCreateTeacher : handleUpdateTeacher}
              className="space-y-4"
            >
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
                value={isAdding ? newTeacher.name : editTeacher?.name}
                onChange={(e) =>
                  isAdding
                    ? setNewTeacher({ ...newTeacher, name: e.target.value })
                    : setEditTeacher({
                        ...editTeacher,
                        name: e.target.value,
                      })
                }
                required
              />
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={isAdding ? newTeacher.email : editTeacher?.email}
                onChange={(e) =>
                  isAdding
                    ? setNewTeacher({ ...newTeacher, email: e.target.value })
                    : setEditTeacher({
                        ...editTeacher,
                        email: e.target.value,
                      })
                }
                required
              />
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Courses"
                value={isAdding ? newTeacher.courses : editTeacher?.courses}
                onChange={(e) =>
                  isAdding
                    ? setNewTeacher({
                        ...newTeacher,
                        courses: Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        ),
                      })
                    : setEditTeacher({
                        ...editTeacher,
                        courses: Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        ),
                      })
                }
                required
              >
                <option value="" disabled>
                  Select department
                </option>
                <option value="CHEM101">CHEM101</option>
                <option value="PHYS101">PHYS101</option>
                <option value="MATH101">MATH101</option>
                <option value="CG01">CG01</option>
                <option value="EG101">EG101</option>
              </select>

              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Department"
                value={
                  isAdding ? newTeacher.department : editTeacher?.department
                }
                onChange={(e) =>
                  isAdding
                    ? setNewTeacher({
                        ...newTeacher,
                        department: e.target.value,
                      })
                    : setEditTeacher({
                        ...editTeacher,
                        department: e.target.value,
                      })
                }
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
                  {isAdding ? "Add Teacher" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-lg"><Loader/></div>
        </div>
      )}

      {/* Teachers List */}
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
                Department
              </th>
              <th className="py-3 px-6 text-left text-gray-700 border-b">
                Courses
              </th>
              <th className="py-3 px-6 text-left text-gray-700 border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id} className="hover:bg-gray-100">
                <td className="py-3 px-6">{teacher.name}</td>
                <td className="py-3 px-6">{teacher.email}</td>
                <td className="py-3 px-6">{teacher.department}</td>
                <td className="py-3 px-6">
                  {teacher.courses && teacher.courses.length > 0
                    ? teacher.courses.map((course) => course.code).join(", ")
                    : "No Results Available"}
                </td>
                <td className="py-3 px-6 space-x-2">
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
                    onClick={() => handleEditTeacher(teacher._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                    onClick={() => handleDeleteTeacher(teacher._id)}
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

export default TeacherList;
