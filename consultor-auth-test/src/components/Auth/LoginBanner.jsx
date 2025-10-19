import { motion } from "framer-motion";

export default function LoginBanner() {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-md text-center space-y-8 bg-white rounded-3xl shadow-lg p-8"
    >
      <motion.img
        src="/banner-performance.png"
        alt="Método Inteligente"
        className="rounded-2xl shadow-xl w-full object-cover hover:scale-[1.02] transition-transform duration-500"
        whileHover={{ scale: 1.03 }}
      />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="space-y-3"
      >
        <h1 className="text-2xl font-bold text-gray-900">
          Um método inteligente de aumentar sua performance
        </h1>
        <p className="text-sm text-gray-800 max-w-sm mx-auto">
          Planeje seus treinos e sua dieta com tecnologia e propósito.  
          Resultados reais começam com um login 💪
        </p>
      </motion.div>
    </motion.div>
  );
}
