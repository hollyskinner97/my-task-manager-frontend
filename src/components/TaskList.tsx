import { ObjectId } from "mongodb";
import { Task } from "../types/Task";
import TaskItem from "./TaskItem";
import { useState } from "react";

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: (updatedTask: Task) => void;
  onTaskDeleted: (taskId: ObjectId) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskUpdated,
  onTaskDeleted,
}) => {
  if (!tasks.length)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-lg">📝 No tasks yet...</p>
      </div>
    );

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id.toString()}
          task={task}
          onTaskUpdated={onTaskUpdated}
          onTaskDeleted={onTaskDeleted}
        />
      ))}
    </ul>
  );
};

export default TaskList;
