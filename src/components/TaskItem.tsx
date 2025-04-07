import React from "react";
import { Task } from "../types/Task";
import { API_URL } from "../config";

interface Props {
  task: Task;
  onTaskUpdated: (updatedTask: Task) => void;
}

const TaskItem: React.FC<Props> = ({ task, onTaskUpdated }) => {
  const handleStatusChange = async (completed: boolean) => {
    const updatedTask = { ...task, completed };

    try {
      const response = await fetch(`${API_URL}/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      if (response.ok) {
        const updatedTaskData = await response.json();
        onTaskUpdated(updatedTaskData);
      } else {
        console.error("Failed to update task status");
      }
    } catch (err) {
      console.error("Error updating task status", err);
    }
  };

  return (
    <li className="task-item">
      <h3>{task.title}</h3>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={(e) => handleStatusChange(e.target.checked)}
      />
      <small>{new Date(task.dateCreated).toLocaleString()}</small>
    </li>
  );
};

export default TaskItem;
