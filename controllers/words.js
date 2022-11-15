const { Word } = require('../models')
const { Theme } = require('../models')

const getThemeWords = async (req, res, next) => {
    try {
        const { _id } = req.user
        const words = await Word.find({ theme: req.params.themeId, owner: _id })
        res.status(200).json({
            status: "success",
            code: 200,
            data: {
                words
            }
        })
    } catch (error) {
        next(error)
    }
}
const getAllWords = async (req, res, next) => {
    try {
        const flashcards = await Word.find({ owner: _id, theme: req.params.themeId })
        res.status(200).json({
            status: "success",
            code: 200,
            data: {
                flashcards
            }
        })
    } catch (error) {
        next(error)
    }
}

const addWord = async (req, res, next) => {
    try {
        const newWord = { ...req.body, theme: req.params.themeId, owner: req.user._id }
        const result = await Word.create(newWord)
        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                result
            }
        })
    } catch (error) {
        next(error)
    }
}

const findWordById = async (req, res, next,) => {
    try {
        const { id } = req.params
        const word = await Word.findById(id)

        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                word
            }
        })
    } catch (error) {
        next(error)
    }
}
const updateWord = async (req, res, next,) => {
    try {
        const { id } = req.params
        const word = await Word.findByIdAndUpdate(id, req.body, { new: true })

        res.json({
            status: "success",
            code: 200,
            data: {
                word
            }
        })
    } catch (error) {
        next(error)
    }
}

const deleteWord = async (req, res, next,) => {
    try {
        const { id } = req.params
        const word = await Word.findByIdAndDelete(id)

        res.json({
            status: "success",
            code: 200,
            data: {
                word
            }
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getThemeWords,
    getAllWords,
    addWord,
    findWordById,
    updateWord,
    deleteWord
}