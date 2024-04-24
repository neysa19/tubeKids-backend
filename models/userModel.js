const mongoose= require("mongoose");

const UserSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    email: String,
    pin: String,
    password: String,
    pais: String,
    fechanacimiento: Date,
    role: String,
    phone: String,
    estado: String,
    validacion: String,
});

module.exports = mongoose.model('Users', UserSchema);