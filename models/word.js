const { Schema, model } = require('mongoose')
const Joi = require('joi')

const wordSchema = new Schema({
    eng: {
        type: String,
        required: [true, "Required field!"]
    },
    ua: {
        type: String,
        required: [true, "Required field!"]
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
    eng: Joi.string().min(1).required().pattern(/^[A-Za-z]+$/),
    ua: Joi.string().min(1).required().pattern(/^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+$/)
})

const Word = model('word', wordSchema)

module.exports = {
    Word,
    joiSchema
}