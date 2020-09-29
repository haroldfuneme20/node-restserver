const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./config/config');

const app = express()

// app.use(cors);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//llamado de las rutas del usuario
app.use(require('./routes/usuario'));

//llamado de las rutas de redis
// app.use(require('./routes/redis'));



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