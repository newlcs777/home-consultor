import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";

export default function AccountSettingsButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/profile/settings")}
      className="p-2 rounded-full hover:bg-gray-200 transition"
      title="Configurações da conta"
    >
      <Settings className="w-6 h-6 text-gray-600" />
    </button>
  );
}
