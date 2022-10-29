const mongoose = require('mongoose')

const DB_HOST = 'mongodb+srv://Andrew:andrey3794@cluster0.6ombisd.mongodb.net/eWords-base?retryWrites=true&w=majority'

const app = require('../app')

mongoose.connect(DB_HOST)
    .then(() => app.listen(3001, () => console.log('Started on 3001')))
    .catch(error => {
        console.log(error.message)
        process.exit(1)
    })