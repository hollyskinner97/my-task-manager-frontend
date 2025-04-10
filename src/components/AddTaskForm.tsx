import React, { useState } from "react";
import { API_URL } from "../config";
import { Task } from "../types/Task";

interface AddTaskFormProps {
  onTaskAdded: (newTask: Task) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        const newTask: Task = await response.json();
        onTaskAdded(newTask);
        setTitle("");
      } else {
        console.error("Failed to add task");
      }
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex space-x-4 bg-white p-6 rounded-lg shadow-md mb-8"
    >
      <input
        type="text"
        placeholder="New task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
