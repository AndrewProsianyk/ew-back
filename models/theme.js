const { Schema, model } = require('mongoose')
const Joi = require('joi')

const themeSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
    name: Joi.string().required(),
    words: Joi.array().items(Joi.object())
})

const Theme = model('theme', themeSchema)

module.exports = {
    Theme,
    joiSchema
}