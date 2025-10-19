// src/components/Profile/ProfileSettingsButton.jsx
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";

export default function ProfileSettingsButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/profile/settings")}
      className="p-2 rounded-full hover:bg-gray-200 transition"
    >
      <Settings className="w-6 h-6 text-gray-600" />
    </button>
  );
}
