const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Modèle des Utilisateurs
const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true},
    password: { type: String, require: true}
});

// Import du plugin qui autorise la création d'un seul utilisateur avec une seule adresse mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);