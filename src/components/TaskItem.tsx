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
    <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 border-l-8 border-purple-400">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => handleStatusChange(e.target.checked)}
          className="w-5 h-5 accent-purple-500"
        />
        <h3
          className={`text-lg ${
            task.completed ? "line-through text-gray-400" : "text-gray-900"
          }`}
        >
          {task.title}
        </h3>
      </div>
      <button
        onClick={handleDelete}
        className="bg-white-400 hover:bg-red-100 text-white px-3 py-1 rounded-md"
      >
        ❌
      </button>
    </div>
  );
};

export default TaskItem;
