# So-Pekocko-p6

# Frontend

Le frontend a été crée avec angular.js
Le backend a été créé avec node.js, express et mongoDB

### Installation des dépendances

Dans le dossier `/frontend` démarrez `npm install` pour installer toutes les dépendances du frontend.
Dans le dossier `/backend` démarrez `npm install` pour installer toutes les dépendances du backend.

### Connexion de la base de donnée 

Dans le fichier `.env`, veuillez rentrer le host, les identifiants de votre utilisateur admin et le nom de la base de données que vous souhaitez créer.

### Development server

Aller dans `cd frontend` et démarrer `ng serve` pour lancer le frontend de l'application sur localhost 4200
Aller dans `cd backend` et démarrer  `nodemon server` pour avoir accès au serveur de développement. L'application va se recharger automatiquement si vous modifiez un fichier source.

### Piquante API Operation 

This API allows authenticated users to consult and record the sauces of other users and manage their own. These features will be implemented from the frontend application. She will be in charge of contacting the API to perform user actions and all this thanks to HTTP requests. Below you will find the routes used to carry out these operations.

Subscribe to So-Pekocko - POST => http://localhost:3000/api/auth/signup
Connect to So-pekocko - POST => http://localhost:3000/api/auth/login
Display all the sauces - GET => http://localhost:3000/api/sauces
Display one of the sauces - GET => http://localhost:3000/api/sauces/:id
Record a sauce - POST => http://localhost:3000/api/sauces
Update one of the sauce - PUT => http://localhost:3000/api/sauces/:id
Delete one of the sauces - DELETE => http://localhost:3000/api/sauces/:id
Like or dislike one of the sauce - POST => http://localhost:3000/api/sauces/:id/like

