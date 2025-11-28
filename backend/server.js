const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db'); // Notre nouveau fichier db.js version Postgres
const { calculerResultat } = require('./logic');
const { authenticateToken, SECRET_KEY } = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000; // Render impose le port via process.env

app.use(cors());
app.use(bodyParser.json());

// ==========================================
// ROUTES AUTHENTIFICATION
// ==========================================

app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(400).json({ error: "Tout est requis." });

        // 1. Vérifier si user existe
        // PostgreSQL : on utilise $1 au lieu de ?
        const checkUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        
        // PostgreSQL : les données sont dans .rows
        if (checkUser.rows.length > 0) {
            return res.status(409).json({ error: "Email déjà utilisé." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. Insérer
        await db.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', 
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: "Succès !" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur." });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (result.rows.length === 0) return res.status(400).json({ error: "Inconnu." });

        const user = result.rows[0]; // On prend le premier résultat

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: "Mot de passe incorrect." });

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' });

        res.json({ token, username: user.username });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur." });
    }
});

// ==========================================
// ROUTES QUIZ
// ==========================================

app.post('/api/calculate', authenticateToken, async (req, res) => {
    try {
        const { answers } = req.body;
        const userId = req.user.id;

        const resultat = calculerResultat(answers);

        // PostgreSQL : Syntaxe $1, $2, $3, $4, $5
        const query = `
            INSERT INTO quiz_results (user_id, archetype_final, archetype_secondaire, scores, axes_de_travail) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `;
        
        await db.query(query, [
            userId,
            resultat.archetype_final,
            resultat.archetype_secondaire,
            JSON.stringify(resultat.scores),
            JSON.stringify(resultat.axes_de_travail)
        ]);
        
        res.status(200).json(resultat);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur Backend prêt sur le port ${PORT}`);
});