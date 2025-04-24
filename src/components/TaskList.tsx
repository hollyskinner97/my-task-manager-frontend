import { ObjectId } from "mongodb";
import { Task } from "../types/Task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: (updatedTask: Task) => void;
  onTaskDeleted: (taskId: ObjectId) => void;
  token: string | null;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskUpdated,
  onTaskDeleted,
  token,
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
          token={token}
        />
      ))}
    </ul>
  );
};

export default TaskList;
