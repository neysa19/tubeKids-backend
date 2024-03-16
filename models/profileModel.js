const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    nombre: String,
    pin: String,
    avatar: String,
    edad: Number,
    role: String,
    estado: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Referencia al modelo de usuarios
        required: true
    }
});

module.exports = mongoose.model('profile', profileSchema);