import { useEffect, useState } from "react";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/tasksApi";


function TasksPage() {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });


  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const data = await getTasks();

      setTasks(data.tasks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchTasks();
  }, []);


  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // Create Task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask(formData);

      setFormData({
        title: "",
        description: "",
        priority: "medium",
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };


  // Update Status
  const handleStatusChange = async (task, status) => {
    try {
      await updateTask(task._id, {
        ...task,
        status,
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };


  // Delete Task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Tasks
      </h1>


      {/* Create Task */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow mb-8"
      >
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
          required
        />

        <textarea
          name="description"
          placeholder="Task description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4 h-24"
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        >
          <option value="low">Low Priority</option>

          <option value="medium">Medium Priority</option>

          <option value="high">High Priority</option>
        </select>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Create Task
        </button>
      </form>


      {/* Tasks */}
      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <div className="bg-white p-6 rounded-2xl shadow">
          No tasks yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-6 rounded-2xl shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">
                  {task.title}
                </h2>

                <span className="text-sm bg-gray-200 px-3 py-1 rounded-full">
                  {task.priority}
                </span>
              </div>

              <p className="text-gray-700 mb-6">
                {task.description}
              </p>


              {/* Status */}
              <div className="mb-6">
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task, e.target.value)
                  }
                  className="border p-2 rounded-lg"
                >
                  <option value="todo">Todo</option>

                  <option value="in-progress">
                    In Progress
                  </option>

                  <option value="completed">
                    Completed
                  </option>
                </select>
              </div>


              {/* Actions */}
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TasksPage;