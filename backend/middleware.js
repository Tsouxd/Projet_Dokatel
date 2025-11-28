const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || "mon_super_secret_indevinable";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer LE_TOKEN"

    // CHANGEMENT ICI : Si pas de token, on bloque tout de suite !
    if (!token) {
        return res.status(401).json({ error: "Accès refusé. Veuillez vous connecter." });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Session expirée, veuillez vous reconnecter." });
        }
        req.user = user; // L'utilisateur est validé
        next();
    });
};

module.exports = { authenticateToken, SECRET_KEY };