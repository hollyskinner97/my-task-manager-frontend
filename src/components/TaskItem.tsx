import React, { useState, useRef, useEffect } from "react";
import { API_URL } from "../config";
import { Task } from "../types/Task";
import { differenceInMinutes, differenceInWeeks } from "date-fns";
import toLocalDatetimeString from "./utils/toLocalDatetimeString";
import formatCountdown from "./utils/formatCountown";
import { ObjectId } from "mongodb";

type Props = {
  task: Task;
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (taskId: ObjectId) => void;
  token: string | null;
};

const TaskItem: React.FC<Props> = ({
  task,
  onTaskUpdated,
  onTaskDeleted,
  token,
}) => {
  // State
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [showDeadlinePopup, setShowDeadlinePopup] = useState(false);
  const [deadline, setDeadline] = useState<Date | null>(
    task.deadline ? new Date(task.deadline) : null
  );
  const [savedDeadline, setSavedDeadline] = useState<Date | null>(
    task.deadline ? new Date(task.deadline) : null
  );
  const [countdown, setCountdown] = useState("");
  const [isValidDeadline, setIsValidDeadline] = useState(true);

  // Refs
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Countdown
  useEffect(() => {
    let interval: number;
    const updateCountdown = () => {
      setCountdown(formatCountdown(savedDeadline));
    };

    if (savedDeadline) {
      updateCountdown();
      interval = setInterval(updateCountdown, 1000);
    }
    return () => clearInterval(interval);
  }, [savedDeadline]);

  // Deadline validation
  useEffect(() => {
    if (!deadline) return setIsValidDeadline(false);
    const now = new Date();
    const minDiff = differenceInMinutes(deadline, now);
    const maxDiff = differenceInWeeks(deadline, now);
    setIsValidDeadline(minDiff >= 1 && maxDiff <= 52);
  }, [deadline]);

  const saveEditedTitle = async () => {
    setIsEditing(false);
    if (editedTitle !== task.title) {
      onTaskUpdated({ ...task, title: editedTitle });

      try {
        const response = await fetch(`${API_URL}/tasks/${task._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: editedTitle }),
        });

        if (response.ok) {
          const updatedTask = await response.json();
          onTaskUpdated(updatedTask);
        }
      } catch (err) {
        console.error("Error updating title", err);
      }
    }
  };

  const handleStatusChange = async (completed: boolean) => {
    onTaskUpdated({ ...task, completed });

    try {
      const response = await fetch(`${API_URL}/tasks/${task._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        onTaskUpdated(updatedTask);
      }
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks/${task._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        onTaskDeleted(task._id);
      }
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const handleDeadlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deadline || !isValidDeadline) return;

    setSavedDeadline(deadline);
    setShowDeadlinePopup(false);
    onTaskUpdated({ ...task, deadline: deadline.toISOString() as any });

    try {
      const response = await fetch(`${API_URL}/tasks/${task._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ deadline }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        onTaskUpdated(updatedTask);
      }
    } catch (err) {
      console.error("Error updating deadline", err);
    }
  };

  const handleRemoveDeadline = async () => {
    setSavedDeadline(null);
    setDeadline(null);
    setShowDeadlinePopup(false);
    onTaskUpdated({ ...task, deadline: null });

    try {
      const response = await fetch(`${API_URL}/tasks/${task._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ deadline: null }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        onTaskUpdated(updatedTask);
      }
    } catch (err) {
      console.error("Error removing deadline", err);
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
            onKeyDown={(e) => e.key === "Enter" && saveEditedTitle()}
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

      <div className="flex items-center gap-2">
        {savedDeadline && (
          <span className="text-sm text-purple-600 font-mono max-w-[60px]">
            {countdown}
          </span>
        )}

        {showDeadlinePopup && (
          <form
            onSubmit={handleDeadlineSubmit}
            className="absolute bg-white shadow-lg rounded-md p-3 top-full right-4 z-10"
          >
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Set Deadline:
              <input
                type="datetime-local"
                className="block mt-1 border border-gray-300 rounded-md p-1"
                value={deadline ? toLocalDatetimeString(deadline) : ""}
                onChange={(e) => setDeadline(new Date(e.target.value))}
              />
            </label>
            <div className="flex justify-between items-center mt-2 gap-2">
              <button
                type="button"
                onClick={handleRemoveDeadline}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Remove
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowDeadlinePopup(false)}
                  className="text-sm text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isValidDeadline}
                  className={`text-sm font-medium px-2 rounded-md ${
                    isValidDeadline
                      ? "text-purple-600 hover:text-white hover:bg-purple-600"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        )}
        <button
          title="Set deadline"
          onClick={() => setShowDeadlinePopup(true)}
          className={`text-xl transition-colors duration-200 ${
            savedDeadline
              ? "text-purple-500 hover:bg-purple-100 spinner"
              : "text-gray-400 hover:bg-gray-100"
          } px-2 py-1 rounded-md`}
          style={{ cursor: "grab" }}
        >
          ⏳
        </button>

        <button
          className="hover:bg-red-100 px-2 py-1 rounded-md"
          onClick={handleDelete}
          title="Delete task"
          style={{ cursor: "grab" }}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
