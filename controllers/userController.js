const User = require('../models/userModel');

const register = async (req, res) => {
    const { nombre, apellidos, email, pin, password, pais, fechanacimiento } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya fue registrado' });
        }
        const newUser = new User({
            nombre,
            apellidos,
            email,
            pin,
            password,
            pais,
            fechanacimiento,
            role: 'user',
            estado: 'inactivo',
            validacion: 'Activa',
        });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        if (password !== user.password) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        res.json({
            message: 'Inicio de sesión exitoso',
            userId: user._id,
            nombre: user.nombre,
            role: user.role,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
}


const checkPin = async (req, res) => {
    const { email, pin} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        if (pin !== user.pin) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        res.json({
            message: 'Inicio de sesión exitoso',
            userId: user._id,
            nombre: user.nombre,
            role: user.role,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
}

const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
}


const updateUserById = async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
}

const deleteUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
}

module.exports = { register, login, checkPin, getUserById, updateUserById, deleteUserById };


