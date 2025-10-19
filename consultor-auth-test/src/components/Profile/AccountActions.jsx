//sair, deletar conta, voltar ao dashboard

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, signOut } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import ReauthDialog from "../Shared/ReauthDialog";

export default function AccountActions() {
  const navigate = useNavigate();
  const [needReauth, setNeedReauth] = useState(false);
  const [msg, setMsg] = useState("");
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const performDelete = async () => {
    try {
      // Opcional: remover documento principal do usuário, se existir
      await deleteDoc(doc(db, "users", user.uid)).catch(() => {});
      await deleteUser(user);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        setNeedReauth(true);
        setMsg("Confirme sua identidade para excluir a conta.");
      } else {
        setMsg("❌ " + err.message);
      }
    }
  };

  return (
    <section className="border rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Ações</h2>
      <div className="flex flex-col md:flex-row gap-2">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Voltar para Dashboard
        </button>

        <button
          onClick={handleLogout}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Sair
        </button>

        <button
          onClick={() => {
            if (confirm("Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.")) {
              performDelete();
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Deletar conta
        </button>
      </div>

      {msg && <p className="text-sm text-gray-600 mt-2">{msg}</p>}

      <ReauthDialog
        open={needReauth}
        onClose={() => setNeedReauth(false)}
        onSuccess={performDelete}
      />
    </section>
  );
}
