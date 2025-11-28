import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RotateCcw, Scale, Printer } from "lucide-react"; // Ajout de Printer
import type { Archetype } from "@/data/quizData";
import { archetypeDescriptions } from "@/data/quizData";

interface ResultCardProps {
  archetype: Archetype;
  backendData: any; 
  onRestart: () => void;
}

export const ResultCard = ({ archetype, backendData, onRestart }: ResultCardProps) => {
  const result = archetypeDescriptions[archetype];
  
  // Récupération de l'archétype secondaire (s'il existe)
  const secondaryArchetype = backendData?.archetype_secondaire as Archetype | null;
  const secondaryResult = secondaryArchetype ? archetypeDescriptions[secondaryArchetype] : null;

  // Fonction pour déclencher l'impression
  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* AJOUT DE LA CLASSE 'print-content' SUR LA CARD */}
      <Card className="print-content p-8 md:p-12 bg-card border-border shadow-[0_0_50px_hsl(var(--mystic-glow)/0.2)]">
        
        {/* === EN-TÊTE === */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-primary mb-2">
            Votre Vie Antérieure
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        {/* === RÉSULTAT PRINCIPAL === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-10"
        >
          <h3 className="text-4xl md:text-5xl font-cinzel font-bold text-foreground mb-4">
            {result.title}
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {result.description}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {result.traits.map((trait, index) => (
              <motion.div
                key={trait}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Badge 
                  variant="secondary" 
                  className="px-4 py-2 text-sm bg-secondary/20 border-secondary/50"
                >
                  {trait}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* === SECTION DUALITÉ / HYBRIDE === */}
        {secondaryResult && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-10 p-6 rounded-xl bg-secondary/10 border border-secondary/30 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary" />
            
            <div className="flex items-center gap-3 mb-3 text-foreground">
              <Scale className="w-6 h-6 text-primary" />
              <h4 className="text-xl font-bold font-cinzel">Une Dualité Révélée</h4>
            </div>
            
            <p className="mb-4 text-muted-foreground">
              Vos réponses révèlent une complexité rare. Vous n'êtes pas seulement "{result.title}", 
              vous partagez une force presque égale avec <span className="font-bold text-primary">"{secondaryResult.title}"</span>.
            </p>

            <div className="bg-background/40 p-4 rounded-lg border border-white/5">
                <p className="italic text-sm text-muted-foreground">"{secondaryResult.description}"</p>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-8">
            
            {/* === AXES DE TRAVAIL === */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-secondary/5 p-6 rounded-lg border border-white/5"
            >
              <h3 className="text-xl font-cinzel font-bold mb-4 flex items-center gap-2">
                 🔮 Vos axes d'évolution
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {backendData?.axes_de_travail?.map((axe: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{axe}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* === AFFICHAGE DES SCORES === */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-secondary/5 p-6 rounded-lg border border-white/5"
            >
              <h3 className="text-xl font-cinzel font-bold mb-4 flex items-center gap-2">
                📊 Répartition de l'Âme
              </h3>
              
              <div className="space-y-3">
                {Object.entries(backendData?.scores || {})
                    .sort(([,a], [,b]) => (b as number) - (a as number)) 
                    .slice(0, 5) 
                    .map(([key, value], index) => (
                    <div key={key} className="text-sm">
                        <div className="flex justify-between mb-1">
                            <span className="capitalize text-muted-foreground font-medium">{key.toLowerCase()}</span>
                            <span className="text-xs font-bold">{value as number} pts</span>
                        </div>
                        <div className="w-full h-2 bg-secondary/20 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(((value as number) / 10) * 100, 100)}%` }} 
                                transition={{ duration: 1, delay: 0.8 + (index * 0.1) }}
                                className={`h-full rounded-full ${index === 0 ? 'bg-primary' : 'bg-primary/50'}`} 
                            />
                        </div>
                    </div>
                ))}
              </div>
            </motion.div>
        </div>

        {/* === BOUTONS D'ACTION (Ajout de la classe 'no-print' pour masquer à l'impression) === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4 no-print"
        >
          {/* Bouton Recommencer (Style Outline pour donner la priorité visuelle à l'impression) */}
          <Button
            onClick={onRestart}
            variant="outline"
            size="lg"
            className="gap-2 border-primary/50 text-primary hover:bg-primary/10"
          >
            <RotateCcw className="w-5 h-5" />
            Recommencer
          </Button>

          {/* Bouton Imprimer (Nouveau) */}
          <Button
            onClick={handlePrint}
            size="lg"
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
          >
            <Printer className="w-5 h-5" />
            Imprimer le Résultat
          </Button>
        </motion.div>

      </Card>
    </motion.div>
  );
};