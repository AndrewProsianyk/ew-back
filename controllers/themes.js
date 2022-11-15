const { Theme } = require('../models')

const getAllThemes = async (req, res, next) => {
    try {
        const { _id } = req.user
        const themes = await Theme.find({ owner: _id })

        res.status(200).json({
            status: "success",
            code: 200,
            data: {
                themes
            }
        })
    } catch (error) {
        next(error)
    }
}

const addTheme = async (req, res, next) => {
    try {
        const newTheme = { ...req.body, owner: req.user._id }
        const result = await Theme.create(newTheme)
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

const updateTheme = async (req, res, next) => {
    try {
        const { id } = req.params
        const theme = await Theme.findByIdAndUpdate(id, req.body, { new: true })

        res.json({
            status: "success",
            code: 200,
            data: {
                theme
            }
        })
    } catch (error) {
        next(error)
    }
}

const deleteTheme = async (req, res, next,) => {
    try {
        const { id } = req.params
        const theme = await Theme.findByIdAndDelete(id)

        res.json({
            status: "success",
            code: 200,
            data: {
                theme
            }
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAllThemes,
    addTheme,
    updateTheme,
    deleteTheme
}