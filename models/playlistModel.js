const mongoose= require("mongoose");

const playlistSchema = new mongoose.Schema({
    nombre: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Referencia al modelo de usuarios
        required: true
    },
    profileIds: [{ // Cambiar profileId a profileIds y definir como array
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile', // Referencia al modelo de perfil
        required: true
    }]


});

module.exports = mongoose.model('playlist', playlistSchema);