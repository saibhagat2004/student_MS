import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import StudentList from "./components/pages/StudentList";
import TeacherList from "./components/pages/TeacherList";
import CounselorList from "./components/pages/CounselorList";
import ResultList from "./components/pages/ResultList";
import CourseList from "./components/pages/CourseList";
import DepartmentList from "./components/pages/DepartmentList";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home route with nested routes */}
        <Route path="/" element={<Home />}>
          <Route path="students" element={<StudentList />} />
          <Route path="teachers" element={<TeacherList />} />
          <Route path="counselors" element={<CounselorList />} />
          <Route path="results" element={<ResultList />} />
          <Route path="courses" element={<CourseList />} />
          <Route path="departments" element={<DepartmentList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
