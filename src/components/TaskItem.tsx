import React from "react";
import { Task } from "../types/Task";
import { API_URL } from "../config";
import { ObjectId } from "mongodb";

interface Props {
  task: Task;
  onTaskUpdated: (updatedTask: Task) => void;
  onTaskDeleted: (taskId: ObjectId) => void;
}

const TaskItem: React.FC<Props> = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const handleStatusChange = async (completed: boolean) => {
    try {
      const response = await fetch(`${API_URL}/${task._id}`, {
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

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/${task._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onTaskDeleted(task._id);
      } else {
        console.error("Failed to delete task");
      }
    } catch (err) {
      console.error("Error deleting task", err);
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
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TaskItem;
