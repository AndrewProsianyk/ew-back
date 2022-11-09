const express = require("express");
const { joiSchema } = require('../../models/user')
const { validation, authenticate } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')

const router = express.Router();

router.post('/register', validation(joiSchema), ctrl.registration)

router.post('/login', validation(joiSchema), ctrl.login)

router.get('/logout', authenticate, ctrl.logout)

module.exports = router