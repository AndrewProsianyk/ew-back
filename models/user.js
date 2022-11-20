const { Schema, model } = require('mongoose')
const Joi = require('joi')

const userSchema = Schema({
    name: {
        type: String,
        minlength: 2,
        default: 'User'
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    token: {
        type: String,
        default: null
    }
}, { versionKey: false, timestamps: true })


const joiSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required()
})

const User = model('user', userSchema)

module.exports = {
    User,
    joiSchema
}