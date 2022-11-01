const { Schema, model } = require('mongoose')
const Joi = require('joi')

const wordSchema = new Schema({
    eng: {
        type: String,
        required: [true, "Required field!"],
        // match: "/^[A-Za-z]+$/"
    },
    ua: {
        type: String,
        required: [true, "Required field!"],
        // match: "/^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+$/"
    }
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
    eng: Joi.string().min(1).required().pattern(/^[A-Za-z]+$/),
    ua: Joi.string().min(1).required().pattern(/^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+$/)
})
// .pattern(/^[A-Za-z]+$/),
// .pattern(/^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+$/)
const Word = model('word', wordSchema)

module.exports = {
    Word,
    joiSchema
}