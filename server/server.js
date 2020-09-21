const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

require('./config/config');

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//llamado de las rutas del usuario
app.use(require('./routes/usuario'));



//Conexion a Mongo local
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err) {
        throw err;
    }
    console.log('Base de datos online');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto ', 3000);
})