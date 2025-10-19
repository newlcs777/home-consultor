import { motion } from "framer-motion";
import LoginForm from "../components/Auth/LoginForm";
import LoginBanner from "../components/Auth/LoginBanner";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-sans text-gray-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex w-full max-w-6xl items-stretch justify-between bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden"
      >
        {/* Lado esquerdo (Banner com degradê dourado) */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="flex-1 hidden lg:flex justify-center items-center p-12 border-r border-gray-100"
          style={{
            background: "linear-gradient(135deg, #F5BA45 0%, #E8A82E 100%)",
          }}
        >
          <LoginBanner />
        </motion.div>

        {/* Lado direito (Formulário) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-1 justify-center items-center bg-white p-10"
        >
          <div className="w-full max-w-md space-y-6 text-center">
            {/* Logo opcional */}
            {/* <img src="/logo.png" alt="Consultor Inteligente" className="w-16 mx-auto mb-4" /> */}

            <LoginForm />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
