import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Question } from "@/data/quizData";

interface QuestionCardProps {
  question: Question;
  onAnswer: (archetype: string) => void;
}

export const QuestionCard = ({ question, onAnswer }: QuestionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-8 bg-card border-border shadow-[0_0_30px_hsl(var(--mystic-glow)/0.1)]">
        <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-center mb-8 text-foreground">
          {question.question}
        </h2>
        
        <div className="space-y-4">
          {question.answers.map((answer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className="w-full text-left h-auto py-4 px-6 justify-start hover:bg-muted hover:border-primary transition-all duration-300 group"
                onClick={() => onAnswer(answer.archetype)}
              >
                <span className="text-base md:text-lg flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{answer.text}</span>
                </span>
              </Button>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
