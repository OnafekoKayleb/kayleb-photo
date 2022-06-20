const mongoose = require('mongoose')

const connection = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        console.log(`database connected on ${db.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = {
    connection,
}