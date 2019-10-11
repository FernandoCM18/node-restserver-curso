// ============================
// Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
// Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
// Vencimiento del token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ============================
// SEED  de autenticacion
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


let urlDB ;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ============================
// Google Client ID
// ============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '1022843461085-gfi585jonv01moopic0so203s563u1i8.apps.googleusercontent.com';




