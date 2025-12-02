const mysql = require('mysql2');
require('dotenv').config();

// 1. Nettoyage de l'URL
let dbUrl = process.env.DATABASE_URL;
if (dbUrl && dbUrl.includes('?')) {
    dbUrl = dbUrl.split('?')[0]; 
}

const pool = mysql.createPool({
    uri: dbUrl, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: { rejectUnauthorized: false }
});

const promisePool = pool.promise();

// 2. INITIALISATION AUTOMATIQUE DES TABLES
const initDb = async () => {
    try {
        const connection = await promisePool.getConnection();
        console.log("✅ Connexion BDD réussie ! Vérification des tables...");

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS quiz_results (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                archetype_final VARCHAR(50) NOT NULL,
                archetype_secondaire VARCHAR(50),
                scores JSON NOT NULL,
                axes_de_travail JSON NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        console.log("✅ Tables 'users' et 'quiz_results' prêtes !");
        connection.release();
    } catch (err) {
        console.error("❌ Erreur lors de l'initialisation des tables :", err);
    }
};

// On lance l'initialisation
initDb();

module.exports = promisePool;
