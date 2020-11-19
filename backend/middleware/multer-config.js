// Ajout des packages suplémentaires
const multer = require ('multer');

// Ajout d'un dictionnaire pour les formats d'images
const MIME_TYPES = {
     'image/jpg': 'jpg',
     'image/jpeg': 'jpg',
     'image/png': 'png'
 };

// Création d'une constante pour indiquer où enregistrer le fichier entrant
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split (' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');

