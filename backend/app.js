const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require("express-rate-limit");

const app = express()
app.use(helmet())
app.use(xss())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 
});
 
app.use(limiter);

const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

// Connection a la Base de Donnée MongoDB et cryptage des données grâce à DOTENV package.
//Le RGPD garantit la confidentialité des données pour les résidents de l'UE.

require("dotenv").config();
const ID = process.env.ID;
const MDP = process.env.MDP;

mongoose.connect(`mongodb+srv://${ID}:${MDP}@cluster0.iruk3.mongodb.net/tom?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Contourner les erreurs de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Rend les données du corps de la requête exploitable en Jsoon
app.use(bodyParser.json());

// Gestion de la ressource image en statique
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes attendues pour les differentes API
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;

//express-rate-limit


//OWASP

// La confidentialité
// l’intégrité 
// La disponibilité

// 1. injection mySQL
// noSQL de mongoDb ne permet pas les injections de sql

// 2. piratage de session
// authentification
// mot de passe fort avec validation password
// token JWT

// 3. protégez les données en transit
// Cross-Origin Resource Sharing (CORS).
// Les requêtes GET et POST sera autorisée que si elle a la même origine donc ça signifie qu'elle doit avoir les mêmes nom de domaine, port, hôtes et schémas. 

// 4. protégez les données stockées sur une application
// système de hashage avec bcrypt pour cacher les données sensibles comme le mdp

// 5. faille XSS : pour éviter d'ajouter du contenu dans une page
// HELMET pour les cookies et XSS-Clean
// Comment puis-je éviter cette attaque de cookie ?
// Une option consiste à ajouter un flag  HttpOnly à vos cookies. Ce flag permet d’empêcher un script d'accéder aux cookies. 





