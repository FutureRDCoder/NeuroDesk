import useAuthStore from "../store/authStore";


function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  const logout = useAuthStore((state) => state.logout);


  return (
    <div className="min-h-screen p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">
          Welcome, {user?.name}
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="text-xl">
        🚀 NeuroDesk Dashboard
      </div>
    </div>
  );
}

export default DashboardPage;