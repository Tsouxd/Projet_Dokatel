const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db'); 
const { calculerResultat } = require('./logic');
const { authenticateToken, SECRET_KEY } = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// ROUTES AUTH
// ==========================================

app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password)
            return res.status(400).json({ error: "Tout est requis." });

        // Vérifier email existant
        const [checkUser] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (checkUser.length > 0)
            return res.status(409).json({ error: "Email déjà utilisé." });

        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertion MySQL
        await db.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: "Succès !" });

    } catch (error) {
        console.error("REGISTER ERROR:", error);
        res.status(500).json({ error: "Erreur serveur." });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (rows.length === 0)
            return res.status(400).json({ error: "Inconnu." });

        const user = rows[0];

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            return res.status(400).json({ error: "Mot de passe incorrect." });

        const token = jwt.sign(
            { id: user.id, username: user.username },
            SECRET_KEY,
            { expiresIn: "24h" }
        );

        res.json({ token, username: user.username });

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ error: "Erreur serveur." });
    }
});

// ==========================================
// ROUTE QUIZ
// ==========================================

app.post('/api/calculate', authenticateToken, async (req, res) => {
    try {
        const { answers } = req.body;
        const userId = req.user.id;

        const resultat = calculerResultat(answers);

        await db.query(
            `INSERT INTO quiz_results 
            (user_id, archetype_final, archetype_secondaire, scores, axes_de_travail)
            VALUES (?, ?, ?, ?, ?)`,
            [
                userId,
                resultat.archetype_final,
                resultat.archetype_secondaire,
                JSON.stringify(resultat.scores),
                JSON.stringify(resultat.axes_de_travail)
            ]
        );

        res.status(200).json(resultat);

    } catch (error) {
        console.error("CALCULATE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Serveur Backend prêt sur le port ${PORT}`);
});
