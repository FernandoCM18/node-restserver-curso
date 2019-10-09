// ================
// Puerto
// ================
process.env.PORT = process.env.PORT || 3000;

// ================
// Entorno
// ================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ================
// Base de datos
// ================
let urlDB ;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://fernandocm:FgIcY3ER1pgeNicG@cluster0-d2wn8.mongodb.net/cafe';
}

process.env.URLDB = urlDB;




