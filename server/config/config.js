//===================
// puerto configuración para desarrollo y producción

const { mongo } = require("mongoose");

//===================
process.env.PORT = process.env.PORT || 3000;

//===================
// entorno para saber si estoy en desarrollo o produccion
//===================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//===================
// url para entorno base de datos local y nube
//===================
let urlDB;
// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost:27017/usuarios';
// } else {
urlDB = 'mongodb+srv://hfuneme:5g9qxVjd5WKNB0BJ@cluster0.40rvx.mongodb.net/usuarios';
// }

// variable global para pasar al server
process.env.URLDB = urlDB;