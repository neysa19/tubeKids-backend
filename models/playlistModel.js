const mongoose= require("mongoose");

const playlistSchema = new mongoose.Schema({
    nombre: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Referencia al modelo de usuarios
        required: true
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile', // Referencia al modelo de perfil
        required: true
    }


});

module.exports = mongoose.model('playlist', playlistSchema);