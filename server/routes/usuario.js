const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const { replaceOne } = require('../models/usuario');
const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');
const app = express()


app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 10;
    limite = Number(limite);

    Usuario.find({ estado: true }, '')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                // si entra qui se sale de una
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    numero_registros: conteo
                })
            })


        })
});

app.post('/usuario', function(req, res) {
    //se optiene la info del post que llega en el body x-www-form-urlencoded
    let body = req.body;

    // se crea un objeto con el modelo Usuario y se llena con los datos del body
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, userDB) => {
        if (err) {
            // si entra qui se sale de una
            return res.status(400).json({
                ok: false,
                err
            })
        }

        // 1-) borra el dato para que no se muestre en la respuesta
        //sin embargo no borra el campo por lo que da el nombre de este
        // userDB.password = null;

        // 2-) forma es borrarla del modelo Usuario


        res.json({
            ok: true,
            usuario: userDB
        })
    });

    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         mensaje: 'el nombre es necesario',
    //         ok: false
    //     })
    // } else {
    //     res.json({
    //         persona: body
    //     })
    // }

});

// actualizacion de registro
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);



    // Usuario.findById( id, (err, userBD) =>{
    //     userBD.save();
    // });
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userBD) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            id,
            user: userBD
        })
    });

});

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    // borrado fisicamente
    // Usuario.findByIdAndRemove(id, (err, userDelete) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }
    //     if (userDelete === null) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         })
    //     }

    //     res.json({
    //         ok: true,
    //         message: `El usuario ${userDelete} fue borrado exitosamente`,
    //         usuario_borrado: userDelete
    //     })
    // });

    // Borrado cambiando estado
    let cambioEstado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, cambioEstado, { new: true }, (err, userDelete) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (userDelete === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            message: `El usuario ${userDelete} fue borrado por estado exitosamente`,
            usuario_borrado: userDelete
        })
    });

})


module.exports = app;