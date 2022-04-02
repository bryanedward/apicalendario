
const {Schema, model } = require('mongoose')

const UserSchema = new Schema({
    title:{
        type: String,
        required: true
    }
})

module.exports = model('usuarios', UserSchema)