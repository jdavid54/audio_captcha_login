const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Servir les fichiers statiques uniquement depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint sécurisé pour lire le fichier captcha.txt
app.get('/get-captcha', (req, res) => {
    // Lecture du fichier captcha.txt dans un dossier sécurisé
    const captchaFilePath = path.join(__dirname, 'secrets', 'captcha.txt');

    fs.readFile(captchaFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erreur lors de la lecture du fichier captcha.');
        } else {
            // Envoie le contenu du fichier sans espace supplémentaire
            res.send(data.trim());
        }
    });
});

// Démarre le serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
