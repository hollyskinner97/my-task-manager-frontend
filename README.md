# Task Manager Application

This is the frontend of the Task Manager app, built with React, TypeScript and Tailwind CSS. It provides a user interface for managing tasks and interacting with the backend API.

The backend API can be found at: https://github.com/hollyskinner97/my-task-manager-backend

### Features

- **Full authorisation:** Users must register and log in, in order to use the app and its features.
- **Create, Edit, and Delete Tasks:** Manage tasks by adding, modifying, and removing them.
- **Deadline Management:** Users can set deadlines for tasks, which display live countdowns.
- **Task Completion Toggle:** Tasks can be marked as completed, with a strikethrough effect.
- **Egg Timer Animation:** The egg timer icon spins when a deadline is set and hasn't yet expired.

### Technologies Used

- **React:** JavaScript library for building user interfaces.
- **TypeScript:** Adds static typing to JavaScript for better development experience.
- **Tailwind CSS:** Utility-first CSS framework for fast styling.
- **Date-fns:** Library for date manipulation, used to handle countdowns and deadline formatting.

### Installation

1. Clone the repository:
   git clone https://github.com/your-username/my-task-manager-frontend
   cd my-task-manager-frontend

2. Install dependencies:
   npm install

3. Ensure you have the API URL in the `config.ts` file:
   Example:
   const API_URL = "http://localhost:3000";

4. Run the app:
   npm run dev

### Enjoy!
