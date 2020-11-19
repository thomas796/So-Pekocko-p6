const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const path = require('path');
var helmet = require('helmet')

const app = express();
app.use(helmet())

const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

// Connection a la Base de Donnée MongoDB et cryptage des données grâce à DOTENV package.
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