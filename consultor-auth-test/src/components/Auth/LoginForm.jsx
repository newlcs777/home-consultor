import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  googleProvider,
  appleProvider,
} from "../../services/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useAuth } from "../../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/profile");
  }, [user, navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch {
      setError("Email ou senha incorretos");
    } finally {
      setLoading(false);
    }
  };

  const handleProviderLogin = async (provider, label) => {
    setError("");
    try {
      await signInWithPopup(auth, provider);
      navigate("/profile");
    } catch {
      setError(`Erro ao entrar com ${label}`);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-lg space-y-8 transition-shadow duration-300 hover:shadow-2xl">
      {/* Cabeçalho */}
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Bem-vindo ao Consultor Inteligente
        </h1>
        <p className="text-gray-600 text-sm">
          Acesse sua conta para continuar
        </p>
      </header>

      {/* Mensagem de erro */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 text-center">
          {error}
        </div>
      )}

      {/* Formulário de login */}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F5BA45]"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F5BA45]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-gray-900 font-semibold transition-all ${
            loading
              ? "bg-[#F5BA45]/70 cursor-not-allowed"
              : "bg-[#F5BA45] hover:bg-[#e4a834] shadow-md hover:shadow-lg"
          }`}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      {/* Login social */}
      <div className="pt-4 space-y-3 border-t border-gray-200">
        <div className="text-center text-gray-500 text-sm">ou entre com</div>

        <div className="flex flex-col gap-3">
          {/* Google */}
          <button
            onClick={() => handleProviderLogin(googleProvider, "Google")}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-xl font-medium shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
          >
            <FcGoogle className="text-2xl" />
            <span>Entrar com Google</span>
          </button>

          {/* Apple */}
          <button
            onClick={() => handleProviderLogin(appleProvider, "Apple")}
            className="w-full flex items-center justify-center gap-3 bg-black text-white py-3 rounded-xl font-medium shadow-md hover:bg-[#111] hover:shadow-lg transition-all"
          >
            <FaApple className="text-2xl" />
            <span>Entrar com Apple</span>
          </button>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="text-center text-sm text-gray-500 pt-4 border-t border-gray-100 space-y-1">
        <p>
          Esqueceu a senha?{" "}
          <span
            onClick={() => navigate("/forgot-password")}
            className="text-[#F5BA45] hover:underline cursor-pointer"
          >
            Recuperar
          </span>
        </p>
        <p>
          Não tem conta?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#F5BA45] hover:underline cursor-pointer"
          >
            Criar agora
          </span>
        </p>
      </footer>
    </div>
  );
}
