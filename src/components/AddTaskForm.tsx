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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add task</button>
    </form>
  );
};

export default AddTaskForm;
