const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import du modèle de l'utilisateur
const User = require('../models/user');
const validatorEmail = require("email-validator");
const passwordValidator = require("password-validator");

// Create a schema
let passwordSchema = new passwordValidator();
 
// Add properties to it
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
 
// Sign up
exports.signup = (req, res, next) => {

  if (validatorEmail.validate(req.body.email)) {
      if (passwordSchema.validate(req.body.password)) {
        console.log('req '+req.body.password)
        bcrypt.hash(req.body.password, 10).then(hash => {
          const user = new User({
            email: req.body.email,
            password: hash
          });
          user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé avec succès !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))

        } else {
          const error = 'invalide password';
          res.status(400).json({ error })
        }
    } else {
      const error = 'invalide email';
      res.status(600).json({ error })
    }

}

// Sign In
  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Oups... Utilisateur non trouvé. Veuillez créer votre compte !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };