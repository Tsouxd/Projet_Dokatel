// logic.js

const AXES_DE_TRAVAIL = {
    "GUERRIER": [
        "Apprendre à déposer les armes et accepter votre vulnérabilité.",
        "Utiliser votre force pour protéger plutôt que pour conquérir.",
        "Cultiver la paix intérieure par la méditation."
    ],
    "SAGE": [
        "Passer de la théorie à l'action concrète.",
        "Connecter avec votre cœur, pas seulement votre intellect.",
        "Partager votre savoir avec humilité."
    ],
    "SORCIER": [
        "Ancrer vos visions dans la réalité matérielle.",
        "Utiliser votre intuition pour servir le bien commun.",
        "Ne pas vous isoler dans vos mystères."
    ],
    "EXPLORATEUR": [
        "Trouver la stabilité et planter des racines quelque part.",
        "Apprécier ce que vous avez ici et maintenant.",
        "S'engager durablement dans vos relations."
    ],
    "SOUVERAIN": [
        "Apprendre à déléguer et faire confiance.",
        "Accepter que vous ne pouvez pas tout contrôler.",
        "Servir les autres avant de chercher à les diriger."
    ],
    "GUÉRISSEUR": [
        "Poser des limites pour ne pas vous épuiser émotionnellement.",
        "Accepter que vous ne pouvez pas sauver tout le monde.",
        "Vous accorder le droit de recevoir de l'aide aussi."
    ],
    "REBELLE": [
        "Choisir vos combats avec sagesse.",
        "Construire du nouveau plutôt que de seulement détruire l'ancien.",
        "Trouver la paix avec une autorité juste."
    ],
    "COURTISAN": [
        "Être authentique et cesser de vouloir plaire à tout prix.",
        "Développer une profondeur intérieure au-delà des apparences.",
        "Utiliser votre influence pour la vérité."
    ],
    "PRÊTRE": [
        "Rester connecté aux besoins humains simples.",
        "Ne pas imposer votre vision spirituelle aux autres.",
        "Trouver le sacré dans le quotidien trivial."
    ],
    "BARDE": [
        "Prendre vos responsabilités au sérieux quand c'est nécessaire.",
        "Ne pas fuir la réalité dans l'imaginaire en permanence.",
        "Utiliser votre voix pour dire des vérités difficiles."
    ],
    "ARTISAN": [
        "Lever les yeux de votre ouvrage pour voir le monde.",
        "Accepter que la perfection n'existe pas.",
        "Partager vos créations au lieu de les cacher."
    ],
    "ERMITE": [
        "Oser revenir vers les autres pour partager votre sagesse.",
        "Ne pas utiliser la solitude comme une fuite.",
        "Ouvrir votre cœur à l'amitié."
    ]
};

const calculerResultat = (reponsesUtilisateur) => {
    // 1. Sécurité
    if (!reponsesUtilisateur || reponsesUtilisateur.length === 0) {
        throw new Error("Aucune réponse fournie.");
    }

    // 2. Calcul des scores
    const scores = {};
    reponsesUtilisateur.forEach((archetype) => {
        // Normalisation au cas où
        const key = archetype.toUpperCase();
        if (AXES_DE_TRAVAIL[key]) {
            scores[key] = (scores[key] || 0) + 1;
        }
    });

    // 3. Trier les archétypes par score décroissant
    // On obtient un tableau de clés triées : ["GUERRIER", "SOUVERAIN", "SAGE"...]
    const classement = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);

    if (classement.length === 0) throw new Error("Impossible de calculer un résultat.");

    const premier = classement[0];
    const second = classement[1] || null;

    let archetypeFinal = premier;
    let archetypeSecondaire = null;

    // 4. Détection de l'Hybridité (Dualité)
    // Si le deuxième a le même score que le premier, on le définit comme secondaire
    if (second && scores[premier] === scores[second]) {
        archetypeSecondaire = second;
    }

    // 5. Récupérer les axes du principal
    const axes = AXES_DE_TRAVAIL[archetypeFinal];

    return {
        archetype_final: archetypeFinal,
        archetype_secondaire: archetypeSecondaire, // C'est ce champ qui manquait !
        scores: scores,
        axes_de_travail: axes
    };
};

module.exports = { calculerResultat };