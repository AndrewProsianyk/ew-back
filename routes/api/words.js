const express = require("express");
const router = express.Router();
const { joiSchema } = require('../../models/word')
const { validation, authenticate } = require('../../middlewares')

const { words: ctrl } = require('../../controllers')

router.get('/', authenticate, ctrl.getAllWords)

router.post('/', authenticate, validation(joiSchema), ctrl.addWord)

router.get('/:id', ctrl.findWordById)

router.put('/:id', ctrl.updateWord)

router.delete('/:id', ctrl.deleteWord)

module.exports = router;