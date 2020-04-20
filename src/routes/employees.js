const express = require('express');
const Router = express.Router();

const mysqlConnection = require('../database');

Router.get('/', ( req, res ) => {
    mysqlConnection.query('SELECT * FROM employees', ( err, rows, fields ) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err)
        }
    });
});

Router.get('/:id', ( req, res ) => {
    //req.params.id 
    const { id } = req.params;
    console.log(id);
    mysqlConnection.query("SELECT * FROM employees WHERE id = ? ", [id],  ( err, rows, fields ) => {
        if(!err) {
            console.log(err);
            console.log(fields);
            console.log(rows);
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

Router.post('/', ( req, res ) => {
    const { id, name, salary } = req.body;
    const query = `
        CALL employeeAddOrEdit (?, ?, ?);
    `;
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(!err) {
            res.json({ status: "Empleado Guardado" });
        } else {
            console.log(err);
        }
    });
});

Router.put('/:id', ( req, res ) => {
    const { name, salary } = req.body;
    const { id } = req.params;
    console.log(req.params);
    const query = `CALL employeeAddOrEdit (?, ?, ?)`;
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(!err) {
            res.json({ status: "Empleado Actualizado" });
        } else {
            console.log(err);
        }
    })
});

Router.delete('/:id', ( req, res ) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM employees WHERE id = ?', [id], (err, rows, filas) => {
        if(!err) {
            res.json({ status : "Empleado Eliminado" });
        } else {
            console.log(err);
        }
    });
});

module.exports = Router;

