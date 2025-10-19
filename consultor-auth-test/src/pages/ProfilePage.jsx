import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import AccountSettingsButton from "../components/Profile/AccountSettingsButton";
import AvatarUpload from "../components/Profile/AvatarUpload";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) navigate("/");
      else setUser(user);
    });
    return unsubscribe;
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center relative">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-700">Perfil</h1>
          <AccountSettingsButton />
        </div>

        {/* Avatar e informações */}
        <div className="flex flex-col items-center gap-3">
          {/* 🔹 Aqui usamos o componente AvatarUpload */}
          <AvatarUpload />

          <h2 className="font-bold text-gray-800 text-lg">
            {user.displayName || "Usuário"}
          </h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        {/* Botão sair */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
