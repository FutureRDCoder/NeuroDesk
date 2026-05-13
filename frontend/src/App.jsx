import { Routes, Route, Navigate } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

import DashboardLayout from "./layouts/DashboardLayout";

import DashboardHome from "./pages/DashboardHome";
import NotesPage from "./pages/NotesPage";
import TasksPage from "./pages/TasksPage";

import ProtectedRoute from "./routes/ProtectedRoute";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />

        <Route path="notes" element={<NotesPage />} />

        <Route path="tasks" element={<TasksPage />} />
      </Route>
    </Routes>
  );
}

export default App;