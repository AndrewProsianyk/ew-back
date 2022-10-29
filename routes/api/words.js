const express = require("express");
const { Word } = require('../../models')
const router = express.Router();

router.get('/flashcards', async (req, res, next) => {
    try {
        const flashcards = await Word.find()
        console.log(flashcards)
    } catch (error) {
        console.log(error.message)
    }
})
router.post('/flashcards', async (req, res, next) => {
    try {
        const theme = {
            eng: 'newtry',
            ua: 'пиздець'
        }
        await Word.create(theme)
        console.log(theme)
    } catch (error) {
        console.log(error.message)
    }
})
module.exports = router;