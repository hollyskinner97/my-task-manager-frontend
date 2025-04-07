import React from "react";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  return (
    <main className="app-container">
      <h1>Task Manager</h1>
      <TaskList />
    </main>
  );
};

export default App;
