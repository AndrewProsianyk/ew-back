const mongoose = require('mongoose')
require("dotenv").config();

const { DB_HOST, PORT = 3001 } = process.env;
const app = require('../app')

mongoose.connect(DB_HOST)
    .then(() => app.listen(PORT, () => console.log('Server started')))
    .catch(error => {
        console.log(error.message)
        process.exit(1)
    })