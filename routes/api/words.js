const express = require("express");
const { Word } = require('../../models')
const router = express.Router();

router.get('/flashcards', async (req, res, next) => {
    try {
        const flashcards = await Word.find({})
        res.status(200).json({
            status: "success",
            code: 200,
            data: {
                flashcards
            }
        })
    } catch (error) {
        console.log(error.message)
    }
})
router.post('/flashcards', async (req, res, next) => {
    try {
        const theme = req.body
        await Word.create(theme)
        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                theme
            }
        })
    } catch (error) {
        console.log(error.message)
    }
})
module.exports = router;