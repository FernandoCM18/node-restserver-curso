const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');

const app = express();
const Producto = require('../models/producto');

// ============================
// Obtener productos
// ============================
app.get('/productos', verificaToken, (req, res) => {
    // trae todos los productos
    // populate: usuario y categoria
    // paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec( (err, productos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Producto.count({ disponible: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    productos,
                    cuantos: conteo
                });
            });

        });

});

// ============================
// Obtener un producto por ID 
// ============================
app.get('/productos/:id', verificaToken, (req, res) => {
    // populate: usuario y categorias
    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec( (err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El id no existe'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });
        });

});

// ============================
// Buscar productos
// ============================
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true, 
                productos
            });
        });



});

// ============================
// Crear un nuevo producto
// ============================
app.post('/productos', verificaToken, (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save( (err, productoDB) => {
        
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });

    });

});

// ============================
// Actualizar producto
// ============================
app.put('/productos/:id', verificaToken, (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado

    let id = req.params.id;
    let body = req.body;

    Producto.findByIdAndUpdate(id, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }
        
        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.descripcion = body.descripcion;
        productoDB.disponible = body.disponible;
        productoDB.categoria = body.categoria;

        productoDB.save( (err, productoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
             
            res.json({
                ok: true,
                producto: productoGuardado
            });

        });

    });

});

// ============================
// Borrar producto
// ============================
app.delete('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    let cambiaDisponible = {
        disponible: false
    }

    Producto.findByIdAndUpdate(id, cambiaDisponible, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB,
            messaje: 'Producto Borrado'
        });
    });

});






module.exports = app;

