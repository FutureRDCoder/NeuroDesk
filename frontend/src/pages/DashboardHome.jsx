import useAuthStore from "../store/authStore";


function DashboardHome() {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">
        Welcome, {user?.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">
            Notes
          </h2>

          <p className="text-gray-600">
            Manage your smart notes
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">
            Tasks
          </h2>

          <p className="text-gray-600">
            Track your productivity
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">
            AI Assistant
          </h2>

          <p className="text-gray-600">
            AI-powered workflows
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;