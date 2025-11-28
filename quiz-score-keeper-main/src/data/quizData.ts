export type Archetype = 
  | "GUERRIER"
  | "SAGE"
  | "SORCIER"
  | "EXPLORATEUR"
  | "SOUVERAIN"
  | "GUÉRISSEUR"
  | "REBELLE"
  | "COURTISAN"
  | "PRÊTRE"
  | "BARDE"
  | "ARTISAN"
  | "ERMITE";

export interface Answer {
  text: string;
  archetype: Archetype;
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Face au danger, quelle est votre première réaction ?",
    answers: [
      { text: "J'affronte la menace avec courage et détermination", archetype: "GUERRIER" },
      { text: "Je cherche à comprendre la situation et trouve une solution intelligente", archetype: "SAGE" },
      { text: "J'utilise mon intuition et des méthodes mystérieuses pour me protéger", archetype: "SORCIER" },
      { text: "Je fuis stratégiquement pour mieux revenir", archetype: "EXPLORATEUR" }
    ]
  },
  {
    id: 2,
    question: "Quel est votre plus grand rêve dans la vie ?",
    answers: [
      { text: "Diriger et avoir de l'influence sur les autres", archetype: "SOUVERAIN" },
      { text: "Découvrir tous les secrets et mystères de l'univers", archetype: "SAGE" },
      { text: "Soulager la souffrance et aider ceux qui en ont besoin", archetype: "GUÉRISSEUR" },
      { text: "Vivre libre, sans contraintes ni limites", archetype: "REBELLE" }
    ]
  },
  {
    id: 3,
    question: "Dans quel environnement vous sentez-vous le plus à votre place ?",
    answers: [
      { text: "Un château ou un palais avec du pouvoir et du prestige", archetype: "SOUVERAIN" },
      { text: "Une bibliothèque remplie de livres anciens et de connaissances", archetype: "SAGE" },
      { text: "Une forêt mystérieuse où règne la magie", archetype: "SORCIER" },
      { text: "Les routes ouvertes, toujours en mouvement vers de nouveaux horizons", archetype: "EXPLORATEUR" }
    ]
  },
  {
    id: 4,
    question: "Comment préférez-vous résoudre un conflit ?",
    answers: [
      { text: "Par la force physique ou l'intimidation", archetype: "GUERRIER" },
      { text: "Par la diplomatie, le charme et la négociation", archetype: "COURTISAN" },
      { text: "Par la méditation et la recherche de paix intérieure", archetype: "PRÊTRE" },
      { text: "En trouvant une échappatoire ou en contournant le problème", archetype: "REBELLE" }
    ]
  },
  {
    id: 5,
    question: "Si vous pouviez maîtriser un talent parfaitement, lequel choisiriez-vous ?",
    answers: [
      { text: "Les arts martiaux et les techniques de combat", archetype: "GUERRIER" },
      { text: "La musique, la poésie et l'art de raconter des histoires", archetype: "BARDE" },
      { text: "Les rituels magiques et les incantations", archetype: "SORCIER" },
      { text: "L'artisanat et la création d'objets magnifiques", archetype: "ARTISAN" }
    ]
  },
  {
    id: 6,
    question: "Dans un groupe, quel rôle adoptez-vous naturellement ?",
    answers: [
      { text: "Le chef qui prend les décisions et donne les ordres", archetype: "SOUVERAIN" },
      { text: "Le conseiller sage qui guide avec sa réflexion", archetype: "SAGE" },
      { text: "Le protecteur qui défend les membres du groupe", archetype: "GUERRIER" },
      { text: "L'âme du groupe qui remonte le moral et raconte des histoires", archetype: "BARDE" }
    ]
  },
  {
    id: 7,
    question: "Quelle phrase résonne le plus en vous ?",
    answers: [
      { text: "La connaissance est le véritable pouvoir", archetype: "SAGE" },
      { text: "L'amour transcende toutes les barrières", archetype: "COURTISAN" },
      { text: "Seul on va plus vite, ensemble on va plus loin", archetype: "PRÊTRE" },
      { text: "Les règles sont faites pour être brisées", archetype: "REBELLE" }
    ]
  },
  {
    id: 8,
    question: "Quel est votre rapport à la spiritualité ?",
    answers: [
      { text: "Je cherche activement l'illumination et le contact avec le divin", archetype: "PRÊTRE" },
      { text: "Je préfère la solitude méditative loin du monde", archetype: "ERMITE" },
      { text: "J'utilise les forces mystiques et l'énergie universelle", archetype: "SORCIER" },
      { text: "Je suis pragmatique, je crois seulement ce que je vois", archetype: "GUERRIER" }
    ]
  },
  {
    id: 9,
    question: "Qu'est-ce qui vous fait vous lever le matin avec enthousiasme ?",
    answers: [
      { text: "Le désir de vaincre et de conquérir de nouveaux défis", archetype: "GUERRIER" },
      { text: "La passion de créer quelque chose de beau de vos mains", archetype: "ARTISAN" },
      { text: "Le besoin profond d'aider et de soigner les autres", archetype: "GUÉRISSEUR" },
      { text: "La soif de découvrir des lieux et des expériences inconnus", archetype: "EXPLORATEUR" }
    ]
  },
  {
    id: 10,
    question: "Comment gérez-vous vos émotions ?",
    answers: [
      { text: "Je les maîtrise complètement par la discipline mentale", archetype: "ERMITE" },
      { text: "Je les exprime pleinement et librement", archetype: "COURTISAN" },
      { text: "Je les canalise dans l'action et le mouvement", archetype: "GUERRIER" },
      { text: "Je les transforme en créations artistiques", archetype: "BARDE" }
    ]
  },
  {
    id: 11,
    question: "Quel type de pouvoir vous fascine le plus ?",
    answers: [
      { text: "Le pouvoir politique et l'autorité sur les autres", archetype: "SOUVERAIN" },
      { text: "Le pouvoir de guérir les corps et les âmes", archetype: "GUÉRISSEUR" },
      { text: "Le pouvoir occulte et les secrets mystérieux", archetype: "SORCIER" },
      { text: "Le pouvoir de séduire et d'influencer par le charme", archetype: "COURTISAN" }
    ]
  },
  {
    id: 12,
    question: "Face à une grande injustice, quelle est votre réaction ?",
    answers: [
      { text: "Vous vous rebellez et luttez pour renverser le système", archetype: "REBELLE" },
      { text: "Vous cherchez à comprendre les causes profondes du problème", archetype: "SAGE" },
      { text: "Vous offrez votre aide et votre soutien aux victimes", archetype: "GUÉRISSEUR" },
      { text: "Vous agissez directement pour corriger l'injustice", archetype: "GUERRIER" }
    ]
  },
  {
    id: 13,
    question: "Quelle est votre relation à l'argent et aux richesses matérielles ?",
    answers: [
      { text: "C'est un moyen de financer mes voyages et découvertes", archetype: "EXPLORATEUR" },
      { text: "C'est secondaire, je cherche la richesse intérieure", archetype: "ERMITE" },
      { text: "C'est un outil essentiel de pouvoir et d'influence", archetype: "SOUVERAIN" },
      { text: "C'est le fruit de mes échanges et de mon commerce", archetype: "EXPLORATEUR" }
    ]
  },
  {
    id: 14,
    question: "Quel animal représente le mieux votre essence ?",
    answers: [
      { text: "Le loup solitaire qui parcourt les montagnes", archetype: "ERMITE" },
      { text: "Le lion majestueux, roi de la savane", archetype: "SOUVERAIN" },
      { text: "L'aigle visionnaire qui voit tout d'en haut", archetype: "SAGE" },
      { text: "Le renard rusé qui déjoue tous les pièges", archetype: "REBELLE" }
    ]
  },
  {
    id: 15,
    question: "Comment préférez-vous transmettre votre savoir aux autres ?",
    answers: [
      { text: "Par l'enseignement patient et structuré", archetype: "SAGE" },
      { text: "Par l'exemple et l'action concrète", archetype: "GUERRIER" },
      { text: "Par les histoires, légendes et chansons", archetype: "BARDE" },
      { text: "Par les rituels et l'initiation mystique", archetype: "PRÊTRE" }
    ]
  },
  {
    id: 16,
    question: "Quelle est votre plus grande peur secrète ?",
    answers: [
      { text: "Perdre ma liberté et être enfermé", archetype: "REBELLE" },
      { text: "Être impuissant face à la souffrance des autres", archetype: "GUÉRISSEUR" },
      { text: "Perdre mon pouvoir et mon influence", archetype: "SOUVERAIN" },
      { text: "Mourir sans avoir découvert la vérité ultime", archetype: "SAGE" }
    ]
  },
  {
    id: 17,
    question: "Dans quel moment vous sentez-vous le plus vivant et accompli ?",
    answers: [
      { text: "Quand vous créez quelque chose de vos propres mains", archetype: "ARTISAN" },
      { text: "Quand vous êtes en plein combat ou compétition", archetype: "GUERRIER" },
      { text: "Quand vous êtes en communion spirituelle avec le divin", archetype: "PRÊTRE" },
      { text: "Quand vous séduisez et charmez quelqu'un", archetype: "COURTISAN" }
    ]
  },
  {
    id: 18,
    question: "Quelle est votre perception du temps ?",
    answers: [
      { text: "Je vis intensément dans l'instant présent", archetype: "COURTISAN" },
      { text: "J'étudie le passé pour comprendre le présent", archetype: "SAGE" },
      { text: "Je perçois l'avenir et ses possibilités", archetype: "SORCIER" },
      { text: "Le temps est une illusion, seul l'éternel compte", archetype: "ERMITE" }
    ]
  },
  {
    id: 19,
    question: "Que représente pour vous la société et la civilisation ?",
    answers: [
      { text: "Un système complexe à organiser et à gouverner", archetype: "SOUVERAIN" },
      { text: "Une prison qui limite ma véritable nature", archetype: "ERMITE" },
      { text: "Un ordre établi qui doit être changé et défié", archetype: "REBELLE" },
      { text: "Un vaste terrain d'opportunités et de découvertes", archetype: "EXPLORATEUR" }
    ]
  },
  {
    id: 20,
    question: "Quel est votre rapport aux traditions et coutumes ancestrales ?",
    answers: [
      { text: "Je les préserve et les transmets fidèlement", archetype: "PRÊTRE" },
      { text: "Je les étudie pour en extraire la sagesse cachée", archetype: "SAGE" },
      { text: "Je les défie et j'innove au-delà d'elles", archetype: "REBELLE" },
      { text: "Je les respecte mais les adapte à mon époque", archetype: "ARTISAN" }
    ]
  },
  {
    id: 21,
    question: "Si vous pouviez avoir un don surnaturel, lequel choisiriez-vous ?",
    answers: [
      { text: "La télépathie et le contrôle des esprits", archetype: "SORCIER" },
      { text: "Le pouvoir de guérison instantanée", archetype: "GUÉRISSEUR" },
      { text: "Une force physique surhumaine", archetype: "GUERRIER" },
      { text: "La capacité de voir l'avenir", archetype: "SAGE" }
    ]
  },
  {
    id: 22,
    question: "Quelle est votre vision de l'amour ?",
    answers: [
      { text: "Une passion dévorante et essentielle à la vie", archetype: "COURTISAN" },
      { text: "Un lien spirituel profond entre deux âmes", archetype: "PRÊTRE" },
      { text: "Une distraction qui détourne de ma mission", archetype: "GUERRIER" },
      { text: "Un art subtil à maîtriser et à célébrer", archetype: "BARDE" }
    ]
  },
  {
    id: 23,
    question: "Face à un phénomène mystérieux et inexplicable, que faites-vous ?",
    answers: [
      { text: "Je cherche l'explication rationnelle et scientifique", archetype: "SAGE" },
      { text: "J'accepte le mystère comme partie du plan divin", archetype: "PRÊTRE" },
      { text: "J'utilise mes connaissances magiques pour le comprendre", archetype: "SORCIER" },
      { text: "Je pars à l'aventure pour l'explorer directement", archetype: "EXPLORATEUR" }
    ]
  },
  {
    id: 24,
    question: "Quelle est selon vous votre plus grande qualité ?",
    answers: [
      { text: "Mon courage inébranlable face à l'adversité", archetype: "GUERRIER" },
      { text: "Ma compassion infinie envers tous les êtres", archetype: "GUÉRISSEUR" },
      { text: "Mon esprit créatif et mon ingéniosité", archetype: "ARTISAN" },
      { text: "Mon charisme naturel et mon pouvoir de séduction", archetype: "COURTISAN" }
    ]
  },
  {
    id: 25,
    question: "Si vous deviez choisir une vie simple et modeste, ce serait...",
    answers: [
      { text: "Ermite solitaire en haut d'une montagne", archetype: "ERMITE" },
      { text: "Artisan humble dans un petit village", archetype: "ARTISAN" },
      { text: "Voyageur perpétuel sans attaches", archetype: "EXPLORATEUR" },
      { text: "Impossible ! Je refuse la simplicité et la médiocrité", archetype: "SOUVERAIN" }
    ]
  },
  {
    id: 26,
    question: "Quelle est votre relation avec la mort ?",
    answers: [
      { text: "Elle fait partie du cycle naturel de la vie", archetype: "GUÉRISSEUR" },
      { text: "Je la combats et la défie jusqu'au bout", archetype: "GUERRIER" },
      { text: "C'est une porte mystique vers un autre monde", archetype: "SORCIER" },
      { text: "Je préfère ne pas trop y penser et profiter de la vie", archetype: "EXPLORATEUR" }
    ]
  },
  {
    id: 27,
    question: "Quel héritage souhaitez-vous laisser après votre passage sur terre ?",
    answers: [
      { text: "Des œuvres d'art immortelles et magnifiques", archetype: "ARTISAN" },
      { text: "Un empire prospère ou une dynastie puissante", archetype: "SOUVERAIN" },
      { text: "Des connaissances précieuses et des enseignements", archetype: "SAGE" },
      { text: "Une révolution sociale qui change le monde", archetype: "REBELLE" }
    ]
  },
  {
    id: 28,
    question: "Quelle est votre méthode d'apprentissage préférée ?",
    answers: [
      { text: "L'étude solitaire dans les livres et manuscrits", archetype: "SAGE" },
      { text: "L'apprentissage par la pratique et l'expérimentation", archetype: "ARTISAN" },
      { text: "L'enseignement direct d'un maître spirituel", archetype: "PRÊTRE" },
      { text: "L'expérience vécue à travers les voyages", archetype: "EXPLORATEUR" }
    ]
  },
  {
    id: 29,
    question: "Comment célébrez-vous une grande victoire ou réussite ?",
    answers: [
      { text: "Par un grand festin avec récits épiques et chansons", archetype: "BARDE" },
      { text: "Dans la solitude et la méditation de gratitude", archetype: "ERMITE" },
      { text: "En planifiant immédiatement la prochaine conquête", archetype: "GUERRIER" },
      { text: "En partageant ma réussite avec ceux qui en ont besoin", archetype: "GUÉRISSEUR" }
    ]
  },
  {
    id: 30,
    question: "Quelle phrase finale résonne le plus profondément en vous ?",
    answers: [
      { text: "Je suis le créateur de ma propre destinée", archetype: "SORCIER" },
      { text: "Je suis celui qui protège et guide les autres", archetype: "GUERRIER" },
      { text: "Je suis l'éternel chercheur de vérité et de sagesse", archetype: "SAGE" },
      { text: "Je suis celui qui aime, inspire et transcende", archetype: "COURTISAN" }
    ]
  },
];

export const archetypeDescriptions: Record<Archetype, { title: string; description: string; traits: string[] }> = {
  GUERRIER: {
    title: "Le Guerrier",
    description: "Dans votre vie antérieure, vous étiez un combattant valeureux. Que ce soit sur les champs de bataille ou dans les arènes, votre courage et votre force faisaient de vous une légende vivante.",
    traits: ["Courage", "Force physique", "Détermination", "Protection des faibles"]
  },
  SAGE: {
    title: "Le Sage",
    description: "Vous étiez un détenteur de savoir ancien, un philosophe ou un érudit respecté. Votre soif de connaissance et votre sagesse guidaient les rois et les peuples.",
    traits: ["Intelligence", "Sagesse", "Curiosité", "Conseil avisé"]
  },
  SORCIER: {
    title: "Le Sorcier",
    description: "Maître des arts mystiques et des forces occultes, vous manipuliez l'énergie universelle. Votre pouvoir était craint et respecté dans tout le royaume.",
    traits: ["Magie", "Intuition", "Mystère", "Pouvoir caché"]
  },
  EXPLORATEUR: {
    title: "L'Explorateur",
    description: "Vous parcouriez le monde à la recherche de nouveaux horizons. Cartographe, marin ou aventurier, votre esprit libre ne connaissait aucune frontière.",
    traits: ["Aventure", "Liberté", "Découverte", "Adaptabilité"]
  },
  SOUVERAIN: {
    title: "Le Souverain",
    description: "Roi, reine ou noble dirigeant, vous exerciez le pouvoir avec autorité. Votre influence façonnait le destin de nations entières.",
    traits: ["Leadership", "Autorité", "Vision", "Responsabilité"]
  },
  GUÉRISSEUR: {
    title: "Le Guérisseur",
    description: "Médecin, herboriste ou chamane, vous consacriez votre vie à soulager la souffrance. Votre compassion sauvait des vies et apportait l'espoir.",
    traits: ["Compassion", "Empathie", "Soin", "Dévouement"]
  },
  REBELLE: {
    title: "Le Rebelle",
    description: "Vous défiiez l'ordre établi et luttiez pour la liberté. Hors-la-loi au grand cœur ou révolutionnaire, vous changiez le monde à votre manière.",
    traits: ["Liberté", "Justice", "Audace", "Indépendance"]
  },
  COURTISAN: {
    title: "Le Courtisan",
    description: "Maître de l'étiquette et de la séduction, vous évoluiez avec grâce dans les cours royales. Votre charme et votre diplomatie ouvraient toutes les portes.",
    traits: ["Charisme", "Diplomatie", "Élégance", "Influence"]
  },
  PRÊTRE: {
    title: "Le Prêtre",
    description: "Serviteur dévoué du divin, vous étiez un pont entre les mortels et les dieux. Votre foi inspirait et guidait les âmes égarées.",
    traits: ["Foi", "Spiritualité", "Guidance", "Paix intérieure"]
  },
  BARDE: {
    title: "Le Barde",
    description: "Poète, musicien et conteur, vous préserviez les histoires et les légendes. Vos chants enchantaient les cours et réconfortaient les villages.",
    traits: ["Créativité", "Expression", "Inspiration", "Tradition"]
  },
  ARTISAN: {
    title: "L'Artisan",
    description: "Forgeron, sculpteur ou maître bâtisseur, vos créations traversaient les âges. Chaque œuvre portait la marque de votre excellence.",
    traits: ["Création", "Précision", "Patience", "Excellence"]
  },
  ERMITE: {
    title: "L'Ermite",
    description: "Retiré du monde, vous cherchiez l'illumination dans la solitude. Votre méditation profonde vous connectait aux vérités universelles.",
    traits: ["Solitude", "Méditation", "Sagesse intérieure", "Contemplation"]
  }
};
