// Importa o Firebase principal
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚙️ Configuração segura usando variáveis de ambiente (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializa o app
const app = initializeApp(firebaseConfig);

// Exporta autenticação e banco de dados
export const auth = getAuth(app);
export const db = getFirestore(app);

// 🔹 Providers de login social
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");

// LinkedIn (não nativo) — placeholder para evitar erro de importação
export const linkedinProvider = new OAuthProvider("linkedin.com");
