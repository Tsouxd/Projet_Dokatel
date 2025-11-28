import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Lock, User, Mail } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle entre Login et Register
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth(); // Récupéré du contexte créé précédemment

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin ? "/api/login" : "/api/register";
    const url = `http://localhost:3000${endpoint}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Une erreur est survenue");

        if (isLogin) {
            // Connexion réussie : on stocke le token via le Contexte
            login(data.token, data.username);
            toast.success(`Bienvenue, ${data.username} !`);
        } else {
            // Inscription réussie
            toast.success("Compte créé ! Connectez-vous maintenant.");
            setIsLogin(true); // Basculer vers le login
        }
    } catch (error: any) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-md mx-auto"
    >
      <Card className="p-8 bg-card border-border shadow-[0_0_50px_hsl(var(--mystic-glow)/0.1)]">
        <div className="text-center mb-6">
          <Sparkles className="w-10 h-10 mx-auto mb-2 text-primary" />
          <h2 className="text-3xl font-cinzel font-bold text-primary">
            {isLogin ? "Connexion Mystique" : "Rejoindre le Cercle"}
          </h2>
          <p className="text-muted-foreground text-sm">
            Authentifiez-vous pour découvrir votre passé.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="username">Nom d'initié</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="username" 
                  placeholder="Votre pseudo" 
                  className="pl-9" 
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required 
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="email" 
                type="email" 
                placeholder="votre@email.com" 
                className="pl-9" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="password" 
                type="password" 
                className="pl-9" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
            {loading ? "Invocation en cours..." : (isLogin ? "Se Connecter" : "S'inscrire")}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-muted-foreground hover:text-primary underline transition-colors"
          >
            {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà initié ? Se connecter"}
          </button>
        </div>
      </Card>
    </motion.div>
  );
};