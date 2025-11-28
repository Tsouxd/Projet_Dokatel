// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // Pour hasher les mots de passe
const jwt = require('jsonwebtoken'); // Pour créer les tokens
const db = require('./db');
const { calculerResultat } = require('./logic');
const { authenticateToken, SECRET_KEY } = require('./middleware');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// ==========================================
// 1. ROUTES D'AUTHENTIFICATION (Publiques)
// ==========================================

// Inscription
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Tous les champs sont requis." });
        }

        // Vérifier si l'email existe déjà
        const [existingUsers] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(409).json({ error: "Cet email est déjà utilisé." });
        }

        // Hasher le mot de passe (sécurité)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insérer dans la BDD
        await db.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: "Inscription réussie ! Connectez-vous." });

    } catch (error) {
        console.error("Erreur Register:", error);
        res.status(500).json({ error: "Erreur serveur lors de l'inscription." });
    }
});

// Connexion
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Chercher l'utilisateur
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(400).json({ error: "Email ou mot de passe incorrect." });
        }

        const user = users[0];

        // Comparer le mot de passe hashé
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Email ou mot de passe incorrect." });
        }

        // Créer le Token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username }, 
            SECRET_KEY, 
            { expiresIn: '24h' }
        );

        // Renvoyer le token au frontend
        res.json({ token, username: user.username });

    } catch (error) {
        console.error("Erreur Login:", error);
        res.status(500).json({ error: "Erreur serveur lors de la connexion." });
    }
});

// ==========================================
// 2. ROUTES DU QUIZ (Protégées)
// ==========================================

// Calcul du résultat (Nécessite d'être connecté)
app.post('/api/calculate', authenticateToken, async (req, res) => {
    try {
        const { answers } = req.body;
        const userId = req.user.id; // Récupéré grâce au token via le middleware

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ error: "Format invalide" });
        }

        // 1. Calculer la logique métier
        const resultat = calculerResultat(answers);

        // 2. Sauvegarder en BDD avec l'ID de l'utilisateur
        const query = `
            INSERT INTO quiz_results (user_id, archetype_final, archetype_secondaire, scores, axes_de_travail) 
            VALUES (?, ?, ?, ?, ?)
        `;
        
        await db.execute(query, [
            userId, // Lier le résultat à l'utilisateur connecté
            resultat.archetype_final, 
            resultat.archetype_secondaire, 
            JSON.stringify(resultat.scores), 
            JSON.stringify(resultat.axes_de_travail)
        ]);

        console.log(`Résultat pour user ${userId}: ${resultat.archetype_final}`);
        
        res.status(200).json(resultat);

    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ error: error.message });
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur Backend prêt sur http://localhost:${PORT}`);
});