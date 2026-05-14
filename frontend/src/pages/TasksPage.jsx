import { useEffect, useState } from "react";
import KanbanBoard from "../components/KanbanBoard";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/tasksApi";

import socket from "../socket";


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
    useEffect(() => {
      socket.on("taskCreated", () => {
        fetchTasks();
      });

      socket.on("taskUpdated", () => {
        fetchTasks();
      });

      socket.on("taskDeleted", () => {
        fetchTasks();
      });

      return () => {
        socket.off("taskCreated");

        socket.off("taskUpdated");

        socket.off("taskDeleted");
      };
    }, []);
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


        {/* Kanban Board */}
        {loading ? (
        <p>Loading...</p>
        ) : tasks.length === 0 ? (
        <div className="bg-white p-6 rounded-2xl shadow">
            No tasks yet.
        </div>
        ) : (
        <KanbanBoard
            tasks={tasks}
            onStatusChange={async (taskId, newStatus) => {
            try {
                const task = tasks.find(
                (t) => t._id === taskId
                );

                await updateTask(taskId, {
                ...task,
                status: newStatus,
                });

                fetchTasks();
            } catch (error) {
                console.error(error);
            }
            }}
        />
        )}
    </div>
    );
}

export default TasksPage;