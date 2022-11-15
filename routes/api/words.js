const express = require("express");
const router = express.Router();
const { joiSchema } = require('../../models/word')
const { validation, authenticate } = require('../../middlewares')

const { words: ctrl } = require('../../controllers')

router.get('/:themeId', authenticate, ctrl.getThemeWords)

router.post('/:themeId', authenticate, ctrl.addWord)
// router.post('/', authenticate, validation(joiSchema), ctrl.addWord)

router.get('/:wordId', ctrl.findWordById)

router.put('/:wordId', ctrl.updateWord)

router.delete('/:wordId', ctrl.deleteWord)

module.exports = router;