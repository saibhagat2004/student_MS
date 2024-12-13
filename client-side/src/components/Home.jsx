// import React from "react";
// import { Link, Outlet } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="container mx-auto p-4">
//       <nav className="flex justify-center space-x-4 border-b pb-2">
//         {["students", "teachers", "counselors", "results", "courses","Departments"].map(
//           (section) => (
//             <Link
//               key={section}
//               to={`/${section}`}
//               className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-blue-500"
//             >
//               {section.charAt(0).toUpperCase() + section.slice(1)}
//             </Link>
//           )
//         )}
//       </nav>
//       {/* Render the appropriate component based on the active route */}
//       <div className="mt-4">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserTie,
  FaBookOpen,
  FaGraduationCap,
  FaUniversity,
} from "react-icons/fa";

const Home = () => {
  const location = useLocation();

  // Check if the user is on the /home or root route
  const isMainPage = location.pathname === "/home" || location.pathname === "/";

  // Define sections with labels and corresponding icons
  const sections = [
    { label: "Students", icon: <FaUserGraduate /> },
    { label: "Teachers", icon: <FaChalkboardTeacher /> },
    { label: "Counselors", icon: <FaUserTie /> },
    { label: "Results", icon: <FaGraduationCap /> },
    { label: "Courses", icon: <FaBookOpen /> },
    { label: "Departments", icon: <FaUniversity /> },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Navigation Bar */}
      <nav className="flex justify-center space-x-6 border-b pb-4">
        {sections.map(({ label, icon }) => (
          <Link
            key={label}
            to={`/${label.toLowerCase()}`}
            className="group flex flex-col items-center space-y-2 text-center hover:text-blue-500"
          >
            <div className="text-5xl text-gray-400 group-hover:text-blue-500 transform transition-all duration-300 group-hover:scale-110">
              {icon}
            </div>
            <span className="text-sm font-semibold text-gray-500 group-hover:text-blue-500">
              {label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Main Content */}
      <div className="mt-6">
        {isMainPage ? (
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-gray-800 animate-fade-in">
              Welcome to the Student Management System
            </h1>
            <p className="text-lg text-gray-600">
              Manage students, teachers, courses, and results all in one place.
              Streamline the educational experience with ease.
            </p>
            <p className="text-gray-500">
              Navigate through the sections above to access specific modules.
            </p>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Home;
