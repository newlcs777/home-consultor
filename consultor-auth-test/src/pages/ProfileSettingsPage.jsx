// src/pages/ProfileSettingsPage.jsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ChangePassword from "../components/Profile/ChangePassword";
import AccountActions from "../components/Profile/AccountActions"
import RecentActivity from "../components/Profile/RecentActivity";

export default function ProfileSettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl text-center relative">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-700">
            Configurações da Conta
          </h2>
          <div className="w-8" /> {/* apenas para balancear o layout */}
        </div>

        {/* Conteúdo da página */}
        <ChangePassword />
        <AccountActions/>
        <RecentActivity/>
      </div>
    </div>
  );
}
