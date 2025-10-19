// src/pages/ProfileSettingsPage.jsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ChangePasswordForm from "../components/Profile/ChangePasswordForm";
import SocialConnect from "../components/Profile/SocialConnect";
import RecentActivity from "../components/Profile/RecentActivity";

export default function ProfileSettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-700">
            Configurações da Conta
          </h2>
          <button
            onClick={() => navigate("/profile")}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-6">
          <ChangePasswordForm />
          <SocialConnect />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
