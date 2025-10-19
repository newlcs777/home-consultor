//← alterar senha (com reautenticação)

import { useState } from "react";
import { updatePassword } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import ReauthDialog from "../Shared/ReauthDialog";

export default function ChangePassword() {
  const [form, setForm] = useState({ newPass: "", confirm: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [needReauth, setNeedReauth] = useState(false);

  const user = auth.currentUser;

  const writeAudit = async () => {
    // salva um registro em Firestore como "prova" de que houve troca de senha
    // (o Firebase não expõe "password changed at", então criamos nosso log)
    if (!user) return;
    const auditRef = collection(doc(db, "users", user.uid), "audit");
    await addDoc(auditRef, {
      type: "password_change",
      at: serverTimestamp(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (form.newPass.length < 6) {
      setMsg("A nova senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    if (form.newPass !== form.confirm) {
      setMsg("As senhas não coincidem.");
      return;
    }
    try {
      setLoading(true);
      await updatePassword(user, form.newPass);
      await writeAudit();
      setMsg("✅ Senha alterada com sucesso!");
      setForm({ newPass: "", confirm: "" });
    } catch (err) {
      // Se o Firebase exigir login recente, abrimos o modal de reautenticação
      if (err.code === "auth/requires-recent-login") {
        setNeedReauth(true);
        setMsg("É preciso confirmar sua identidade para continuar.");
      } else {
        setMsg("❌ " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const afterReauth = async () => {
    // tenta de novo após reautenticar
    try {
      setLoading(true);
      await updatePassword(user, form.newPass);
      await writeAudit();
      setMsg("✅ Senha alterada com sucesso!");
      setForm({ newPass: "", confirm: "" });
    } catch (err) {
      setMsg("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Alterar senha</h2>
      <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
        <input
          type="password"
          placeholder="Nova senha"
          className="border p-2 rounded"
          value={form.newPass}
          onChange={(e) => setForm((f) => ({ ...f, newPass: e.target.value }))}
          required
        />
        <input
          type="password"
          placeholder="Confirmar nova senha"
          className="border p-2 rounded"
          value={form.confirm}
          onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
          required
        />

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Atualizando..." : "Atualizar senha"}
          </button>
        </div>
      </form>
      {msg && <p className="text-sm text-gray-600 mt-2">{msg}</p>}

      <ReauthDialog
        open={needReauth}
        onClose={() => setNeedReauth(false)}
        onSuccess={afterReauth}
      />
    </section>
  );
}
