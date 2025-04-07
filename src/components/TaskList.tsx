import React, { useEffect, useState } from "react";
import { Task } from "../types/Task";
import { API_URL } from "../config";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: Task[]) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch tasks", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading tasks...</p>;
  if (!tasks.length) return <p>No tasks yet...</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
