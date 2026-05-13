import { Link, Outlet, useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore";


function DashboardLayout() {
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();


  const handleLogout = () => {
    logout();

    navigate("/login");
  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6 flex flex-col">
        <h1 className="text-3xl font-bold mb-10">
          NeuroDesk
        </h1>

        <nav className="flex flex-col gap-4">
          <Link
            to="/dashboard"
            className="hover:bg-gray-800 p-3 rounded-lg"
          >
            Dashboard
          </Link>

          <Link
            to="/dashboard/notes"
            className="hover:bg-gray-800 p-3 rounded-lg"
          >
            Notes
          </Link>

          <Link
            to="/dashboard/tasks"
            className="hover:bg-gray-800 p-3 rounded-lg"
          >
            Tasks
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 py-3 rounded-lg"
        >
          Logout
        </button>
      </aside>


      {/* Main Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;