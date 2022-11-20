const { User } = require("../models");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const registration = async (req, res) => {
    const { name, email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        res.status(409).json({
            status: 'error',
            code: 409,
            message: 'User with this email is already exists.'
        })
        return
    }
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    await User.create({
        name,
        email,
        password: hashedPassword
    })

    res.status(201).json({
        status: 'success',
        code: 201,
        message: 'User is successfully registered.'
    })
}

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    const isPasswordCorrect = bcrypt.compareSync(password, user.password)

    if (!user || !isPasswordCorrect) {
        res.status(401).json({
            status: 'error',
            code: 401,
            message: 'Wrong email or password.'
        })
        return
    }

    const payload = {
        id: user._id
    }

    const token = jwt.sign(payload, SECRET_KEY)

    await User.findByIdAndUpdate(user._id, { token })

    const loggedUser = {
        name: user.name,
        email: user.email
    }

    res.json({
        status: 'success',
        code: 200,
        data: {
            token,
            loggedUser
        }
    })
}

const logout = async (req, res) => {
    const { _id } = req.user
    await User.findByIdAndUpdate(_id, { token: null })
    res.status(200).json({
        status: "success",
        code: 200,
        message: 'Logged out'
    })
}

module.exports = {
    registration,
    login,
    logout
}