import { Archetype } from "@/data/quizData";

// On utilise la variable d'environnement ici aussi
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_URL = `${BASE_URL}/api/calculate`;

interface BackendResponse {
  archetype_final: string;
  archetype_secondaire?: string | null; // J'ai ajouté ça car ton backend le renvoie maintenant
  scores: Record<string, number>;
  axes_de_travail: string[];
}

export const calculerBackend = async (answers: Archetype[]): Promise<BackendResponse> => {
  // 1. Récupération du token de connexion stocké dans le navigateur
  const token = localStorage.getItem('token');

  // 2. Préparation des en-têtes (Headers)
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Si l'utilisateur est connecté, on ajoute sa "carte d'identité" (le token)
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: headers, // <-- C'est ici que le token est envoyé !
      // On envoie le tableau brut d'archétypes
      body: JSON.stringify({ answers }),
    });

    // Gestion spécifique si le token est périmé ou invalide
    if (response.status === 401) {
      throw new Error("Session expirée. Veuillez vous déconnecter et vous reconnecter.");
    }

    if (!response.ok) {
      throw new Error("Erreur serveur");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
};
