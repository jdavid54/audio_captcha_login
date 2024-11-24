# audio_captcha_login

  Voici la structure du projet mise à jour :
  
   /mon-projet
   
   ├── server.js
  
   ├── index.html
  
   ├── public
   
           └── Audio_Captcha.wav
   
   ├── secrets
  
            └── captcha.txt
 
    
  Dans cet exemple, captcha.txt est dans un dossier secrets qui ne doit pas être servi directement.

## Versions 

### version 0
  Dans cette version, index1.html et server1.js laissent ouvert le endpoint get-captcha qui permet de lire le contenu du code secret !!!


### version 1 : server.js
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

### Explications
    Vérification côté serveur :
    
      . L'utilisateur soumet son code à l'endpoint /verify-captcha.
      . Le serveur lit le fichier captcha.txt de manière sécurisée et compare le code soumis avec celui stocké.
    
    Le client ne voit jamais le code :
    
      . La validation se fait uniquement côté serveur.
      . Le client ne reçoit qu'une réponse de succès ou d'échec.

### Remarques de Sécurité
    Vous pouvez ajouter des mécanismes d'authentification pour protéger davantage cet endpoint (comme un jeton d'authentification si vous avez une session de connexion).
    
    Pour éviter les attaques de force brute, implémentez des limites de taux pour restreindre le nombre de tentatives.
    
    Assurez-vous que le serveur fonctionne sur HTTPS pour sécuriser la transmission des données.    

### Étape pour Lancer le Serveur

Assurez-vous que votre structure de fichiers est correcte.

### Lancez le serveur avec la commande :

  node server.js

### Accédez à votre application via le navigateur à http://localhost:3000.
![text](image.png)


#### Remarque
  
  En utilisant cette méthode, seul le serveur a accès à captcha.txt. Le navigateur ne peut voir que les réponses aux requêtes HTTP.
  
  Pour une sécurité renforcée, pensez à ajouter des mécanismes d'authentification et des protections contre les attaques CSRF (Cross-Site Request Forgery) si nécessaire.
  
  Si vous souhaitez ajouter plus de sécurité, envisagez l'utilisation de HTTPS et d'un système de jetons pour s'assurer que seules les requêtes légitimes puissent accéder au captcha.
  
