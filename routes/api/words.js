const express = require("express");
const router = express.Router();
const { joiSchema } = require('../../models')
const validation = require('../../middlewares')

const { words: ctrl } = require('../../controllers/words')

router.get('/flashcards', ctrl.getAllWords)

router.post('/flashcards', validation(joiSchema), ctrl.addWord)

router.get('/flashcards/:id', ctrl.findWordById)

router.put('/flashcards/:id', ctrl.updateWord)

router.delete('/flashcards/:id', ctrl.deleteWord)

module.exports = router;