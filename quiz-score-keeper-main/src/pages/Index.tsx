import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { QuestionCard } from "@/components/QuestionCard";
import { QuizProgress } from "@/components/QuizProgress";
import { ResultCard } from "@/components/ResultCard";
import { AuthForm } from "@/components/AuthForm"; 
import { questions, type Archetype } from "@/data/quizData";
import { toast } from "sonner";
import { calculerBackend } from "@/api/calcule";
import { useAuth } from "@/context/AuthContext";

type QuizState = "welcome" | "quiz" | "result";

const Index = () => {
  // 1. D'ABORD TOUS LES HOOKS (Sans exception)
  const { token, logout, username } = useAuth();
  
  const [quizState, setQuizState] = useState<QuizState>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({}); // Gardé si besoin, mais géré par backend
  const [finalArchetype, setFinalArchetype] = useState<Archetype | null>(null);
  const [userAnswers, setUserAnswers] = useState<Archetype[]>([]);
  const [backendResult, setBackendResult] = useState<any>(null);

  // Le useEffect doit être ICI (avant tout return)
  useEffect(() => {
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
      console.log('Dernier résultat local:', JSON.parse(savedResult));
    }
  }, []);

  // 2. ENSUITE LES FONCTIONS
  const handleStart = () => {
    setQuizState("quiz");
    setCurrentQuestion(0);
    setScores({});
    setFinalArchetype(null);
  };

  const handleAnswer = async (archetype: Archetype) => {
    const updatedAnswers = [...userAnswers, archetype];
    setUserAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      return;
    }

    // ⚠️ FIN DU QUIZ
    try {
      const data = await calculerBackend(updatedAnswers);
      console.log("Réponse backend =", data);

      setBackendResult(data);
      setFinalArchetype(data.archetype_final as Archetype);

      // (Optionnel) Sauvegarde locale en backup
      const result = {
        archetype: data.archetype_final,
        scores: data.scores,
        axes: data.axes_de_travail,
        date: new Date().toISOString(),
      };
      localStorage.setItem("quizResult", JSON.stringify(result));

      setQuizState("result");
      toast.success("Votre résultat a été enregistré !");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors du calcul du résultat 😢");
    }
  };

  const handleRestart = () => {
    setQuizState("welcome");
    setCurrentQuestion(0);
    setScores({});
    setFinalArchetype(null);
    setUserAnswers([]);
    setBackendResult(null);
  };

  // 3. ENFIN, LE RENDU CONDITIONNEL (Après tous les hooks)
  
  // Si pas connecté, on affiche le Login
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-background">
         <AuthForm />
      </div>
    );
  }

  // Si connecté, on affiche l'app
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative">
      
      {/* Barre utilisateur (Déconnexion) */}
      <div className="absolute top-4 right-4 flex items-center gap-4 z-20">
        <span className="text-muted-foreground text-sm hidden md:inline">
            Initié: <span className="text-foreground font-medium">{username}</span>
        </span>
        <button 
            onClick={logout} 
            className="text-sm text-primary hover:text-primary/80 hover:underline font-semibold transition-colors"
        >
          Se déconnecter
        </button>
      </div>

      <AnimatePresence mode="wait">
        {quizState === "welcome" && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}

        {quizState === "quiz" && (
          <div key="quiz" className="w-full max-w-3xl">
            <QuizProgress 
              current={currentQuestion + 1} 
              total={questions.length} 
            />
            <QuestionCard
              question={questions[currentQuestion]}
              onAnswer={handleAnswer}
            />
          </div>
        )}

        {quizState === "result" && finalArchetype && (
          <ResultCard
            key="result"
            archetype={finalArchetype}
            backendData={backendResult}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;