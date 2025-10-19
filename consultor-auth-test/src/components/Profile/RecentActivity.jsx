//← último login e registros (audit log)

import { useEffect, useState } from "react";
import { auth, db } from "../../services/firebase";
import {
  doc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

function fmtDate(s) {
  try {
    return new Date(s).toLocaleString("pt-BR");
  } catch {
    return "-";
  }
}

export default function RecentActivity() {
  const [lastLogin, setLastLogin] = useState("-");
  const [lastPassChange, setLastPassChange] = useState("-");

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // 1) Último login vem do metadata do Firebase Auth
    if (user.metadata?.lastSignInTime) {
      setLastLogin(fmtDate(user.metadata.lastSignInTime));
    }

    // 2) Última troca de senha buscamos no Firestore (audit log)
    (async () => {
      try {
        const auditRef = collection(doc(db, "users", user.uid), "audit");
        const q = query(auditRef, orderBy("at", "desc"), limit(1));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const d = snap.docs[0].data();
          if (d.type === "password_change" && d.at?.toDate) {
            setLastPassChange(d.at.toDate().toLocaleString("pt-BR"));
          }
        }
      } catch {
        // se não houver log, permanece "-"
      }
    })();
  }, []);

  return (
    <section className="border rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Atividade recente</h2>
      <ul className="text-sm text-gray-700 space-y-1">
        <li>Último login: <strong>{lastLogin}</strong></li>
        <li>Senha alterada: <strong>{lastPassChange}</strong></li>
      </ul>
      <p className="text-xs text-gray-400 mt-2">
        Observação: “Senha alterada” é registrado pelo sistema no momento da troca.
      </p>
    </section>
  );
}
