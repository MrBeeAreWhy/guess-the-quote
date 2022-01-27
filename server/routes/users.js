const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/',
    userController.getAllUsers,
    (req, res) => {
        return res.status(200).json(res.locals.users);
    });

router.post('/',
    userController.createUser,
    (req, res) => {
        return res.status(200).json(res.locals)
    })

module.exports = router;