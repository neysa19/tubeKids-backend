const mongoose= require("mongoose");

const playlistSchema = new mongoose.Schema({
    nombre: String,
    url: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Referencia al modelo de usuarios
        required: true
    }

});

module.exports = mongoose.model('playlist', playlistSchema);