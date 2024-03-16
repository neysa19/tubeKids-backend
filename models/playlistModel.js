const mongoose= require("mongoose");

const playlist = new mongoose.Schema({
    nombre: String,
    url: String,
   
});

module.exports = mongoose.model('playlist', playlistSchema);