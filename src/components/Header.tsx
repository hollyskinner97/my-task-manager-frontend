import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full bg-white bg-opacity-80 shadow-lg rounded-2xl py-4 mb-6">
      <div className="max-w-3xl mx-auto px-6 relative flex items-center justify-center">
        <h1 className="text-4xl font-bold text-purple-600 text-center w-full">
          🌈 My Task Manager 🌈
        </h1>
        {token && (
          <button
            onClick={handleLogout}
            className="absolute right-0 top-1/2 -translate-y-1/2 !text-red-600 font-semibold px-2 py-2 mr-2 hover:underline transition "
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
