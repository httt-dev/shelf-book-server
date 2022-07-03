const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../helper/database');

const router = express.Router();

router.get('/:id', async function (req, res) {

    try {
        const sql = "SELECT id, email, password, created_at FROM demo_user.`user` where id=?";
        const rows = await pool.query(sql, req.params.id);
        res.status(200).json(rows);

    } catch (error) {
        res.status(400).send(error.message)
    }
    res.status(200).json({
        id: req.params.id
    })
});



router.post('/register', async function (req, res) {
    try {
        const { email, password } = req.body;
        const salt = await bcrypt.salt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const sql = 'INSERT INTO user(email,password) VALUES(?,?)';
        const result = await pool.query(sql, [email, encryptedPassword]);
        //res.status(200).json(result);
        res.status(200).json({ userId: result.insertId });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/login', async function (req, res) {
    try {
        const { id, password } = req.body;
        const sql = 'SELECT password FROM user WHERE id=?';
        const rows = await pool.query(sql, id);
        if (rows) {
            const isValid = await bcrypt.compare(password, rows[0].password);

            //res.status(200).json(rows[0]);
            res.status(200).json({ valid_password: isValid });
        }
        res.status(200).send(`User with id ${id} was not found`)
    } catch (error) {
        res.status(400).send(error.message);
    }
})
module.exports = router;