import React, { useRef, useState } from "react";
import { Task } from "../types/Task";
import { API_URL } from "../config";
import { ObjectId } from "mongodb";

interface Props {
  task: Task;
  onTaskUpdated: (updatedTask: Task) => void;
  onTaskDeleted: (taskId: ObjectId) => void;
}

const TaskItem: React.FC<Props> = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const checkboxRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerFireworks = () => {
    const checkbox = checkboxRef.current;
    const container = containerRef.current;

    if (!checkbox || !container) return;

    const checkboxRect = checkbox.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const centerX =
      checkboxRect.left + checkboxRect.width / 2 - containerRect.left;
    const centerY =
      checkboxRect.top + checkboxRect.height / 2 - containerRect.top;

    const colors = ["#ff4d6d", "#4dccff", "#ffe066", "#63e6be", "#845ef7"];

    for (let i = 0; i < 8; i++) {
      const firework = document.createElement("div");
      firework.className = "firework";

      const color = colors[Math.floor(Math.random() * colors.length)];
      firework.style.backgroundColor = color;

      firework.style.left = `${centerX}px`;
      firework.style.top = `${centerY}px`;
      firework.style.setProperty("--angle", `${(360 / 8) * i}deg`);
      container.appendChild(firework);

      setTimeout(() => {
        firework.remove();
      }, 800);
    }
  };

  const handleStatusChange = async (completed: boolean) => {
    if (completed) triggerFireworks();
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

  const saveEditedTitle = async () => {
    if (editedTitle.trim() === "" || editedTitle === task.title) {
      setIsEditing(false);
      return;
    }
    try {
      const response = await fetch(`${API_URL}/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editedTitle }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        onTaskUpdated(updatedTask);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error updating task title", err);
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
    <div
      className="relative flex items-center justify-between bg-white rounded-xl shadow-md p-4 border-l-8 border-purple-400"
      ref={containerRef}
    >
      <div className="flex items-center gap-4">
        <input
          ref={checkboxRef}
          type="checkbox"
          title="Tick to mark completed task"
          checked={task.completed}
          onChange={(e) => handleStatusChange(e.target.checked)}
          className="w-5 h-5 accent-purple-500"
        />
        {isEditing ? (
          <input
            className="text-lg border-b border-purple-300 focus:outline-none w-full"
            style={{ minWidth: "40ch" }}
            value={editedTitle}
            maxLength={50}
            autoFocus
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={saveEditedTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveEditedTitle();
              }
            }}
          />
        ) : (
          <h3
            className={`text-lg ${
              task.completed ? "line-through text-gray-400" : "text-gray-900"
            }`}
            onClick={() => setIsEditing(true)}
            title="Click to edit task title"
          >
            {task.title}
          </h3>
        )}
      </div>
      <button
        onClick={handleDelete}
        className="bg-white-400 hover:bg-red-100 text-white px-3 py-1 rounded-md"
        title="Delete task"
      >
        ❌
      </button>
    </div>
  );
};

export default TaskItem;
