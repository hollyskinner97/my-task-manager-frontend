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

  if (loading) return <p>Loading tasks...</p>;

  return (
    <main className="app-container">
      <h1>Task Manager</h1>
      <TaskList
        tasks={tasks}
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleTaskDeleted}
      />
      <AddTaskForm onTaskAdded={handleTaskAdded} />
    </main>
  );
};

export default App;
