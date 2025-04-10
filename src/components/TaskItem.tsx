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
    <div className="task-item flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => handleStatusChange(e.target.checked)}
          className="w-6 h-6 rounded"
        />
        <h3
          className={`text-lg ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </h3>
      </div>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
