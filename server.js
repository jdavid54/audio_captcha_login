const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Pour lire les requêtes JSON
app.use(bodyParser.json());

// Servir les fichiers statiques uniquement depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint sécurisé pour vérifier le code du captcha
app.post('/verify-captcha', (req, res) => {
    // Lecture du fichier captcha.txt dans un dossier sécurisé
    const captchaFilePath = path.join(__dirname, 'secrets', 'captcha.txt');
    const userInput = req.body.code; // Code soumis par l'utilisateur

    fs.readFile(captchaFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erreur lors de la lecture du fichier captcha.' });
        }
        
        const correctCode = data.trim();
        if (userInput === correctCode) {
            res.json({ success: true, message: 'Code correct !' });
        } else {
            res.json({ success: false, message: 'Code incorrect. Veuillez réessayer.' });
        }
    });
});

// Démarre le serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
