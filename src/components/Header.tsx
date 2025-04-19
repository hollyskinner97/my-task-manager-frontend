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
      <div className="max-w-3xl mx-auto flex justify-between items-center px-6">
        <h1>🌈 My Task Manager 🌈</h1>
        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
