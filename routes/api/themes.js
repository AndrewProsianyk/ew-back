const express = require("express");
const router = express.Router();
const { joiSchema } = require('../../models/theme')
const { validation, authenticate } = require('../../middlewares')

const { themes: ctrl } = require('../../controllers')

router.get('/', authenticate, ctrl.getAllThemes)

router.post('/', authenticate, validation(joiSchema), ctrl.addTheme)

router.put('/:themeId', ctrl.updateTheme)

router.delete('/:themeId', ctrl.deleteTheme)

module.exports = router;