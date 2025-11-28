import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="p-8 md:p-16 bg-card border-border shadow-[0_0_50px_hsl(var(--mystic-glow)/0.2)] text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-6xl font-cinzel font-bold text-primary mb-6"
        >
          Quelle était votre vie antérieure ?
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-4 mb-10"
        >
          <p className="text-xl text-muted-foreground leading-relaxed">
            Plongez dans les mystères du passé et découvrez qui vous étiez dans une vie antérieure.
          </p>
          <p className="text-lg text-muted-foreground">
            Répondez à 30 questions pour révéler votre archétype ancestral.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-cinzel text-xl px-12 py-6 h-auto shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] transition-all duration-300"
          >
            Commencer le voyage
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          <p>Durée estimée : 5 minutes</p>
        </motion.div>
      </Card>
    </motion.div>
  );
};
