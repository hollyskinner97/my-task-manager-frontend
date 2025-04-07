import React from "react";
import { Task } from "../types/Task";

interface Props {
  task: Task;
}

const TaskItem: React.FC<Props> = ({ task }) => {
  return (
    <li className="task-item">
      <h3>{task.title}</h3>
      <p>
        Status:{" "}
        {task.completed
          ? "Completed"
          : task.inProgress
          ? "In progress"
          : "To do"}
      </p>
      <small>{new Date(task.dateCreated).toLocaleString()}</small>
    </li>
  );
};

export default TaskItem;
