import { useState, useRef } from "react";
import { auth } from "../../services/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

export default function AvatarUpload() {
  const user = auth.currentUser;
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      // 🔹 Referência no Firebase Storage
      const storage = getStorage();
      const fileRef = ref(storage, `avatars/${user.uid}.jpg`);

      // 🔹 Faz upload do arquivo
      await uploadBytes(fileRef, file);

      // 🔹 Obtém URL da imagem
      const downloadURL = await getDownloadURL(fileRef);

      // 🔹 Atualiza o perfil do usuário no Auth
      await updateProfile(user, { photoURL: downloadURL });

      // 🔹 Atualiza o estado local
      setPhotoURL(downloadURL);

      alert("✅ Foto atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      alert("❌ Erro ao enviar a foto. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 🔹 Foto atual ou círculo padrão */}
      {photoURL ? (
        <img
          src={photoURL}
          alt="Foto de perfil"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-sm"
        />
      ) : (
        <div className="bg-orange-500 text-white w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold">
          {user?.displayName?.[0]?.toUpperCase() || "L"}
        </div>
      )}

      {/* 🔹 Botão para escolher arquivo */}
      <button
        onClick={() => fileInputRef.current.click()}
        disabled={uploading}
        className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${
          uploading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {uploading ? "Enviando..." : "Alterar Foto"}
      </button>

      {/* 🔹 Input de arquivo oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
