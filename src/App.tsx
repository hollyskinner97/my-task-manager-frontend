import React, { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import { fetchTasks } from "./utils/fetchTasks";
import { Task } from "./types/Task";
import { ObjectId } from "mongodb";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        console.error("Error fetching tasks", err);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleTaskAdded = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const handleTaskDeleted = (taskId: ObjectId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">Loading tasks...</p>
      </div>
    );

  return (
    <main className="w-full max-w-3xl mx-auto bg-white bg-opacity-80 rounded-2xl shadow-2xl p-8 space-y-6">
      <h1>🌈 My Task Manager 🌈</h1>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks yet...</p>
      ) : (
        <div>
          <p className="text-center mb-7">
            Welcome to your new favourite task-managing app, helping you to stay
            organised and get stuff done! Add tasks to your to-do list below,
            set deadlines for yourself, and tick tasks off when they're
            completed!
          </p>
          <TaskList
            tasks={tasks}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
          />
        </div>
      )}
      <AddTaskForm onTaskAdded={handleTaskAdded} />
    </main>
  );
};

export default App;
