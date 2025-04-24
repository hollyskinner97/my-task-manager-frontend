import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-3xl mx-auto text-center space-y-6">
        <p className="text-lg">Please log in or register to get started...</p>
        <div className="space-y-4">
          <Link
            to="/login"
            className="block w-full py-2 bg-purple-600 !text-white rounded-xl hover:bg-purple-800 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block w-full py-2 bg-purple-600 !text-white rounded-xl hover:bg-purple-800 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
