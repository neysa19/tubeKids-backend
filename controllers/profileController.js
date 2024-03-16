const Profile = require('../models/profileModel');

const registerProfile = async (req, res) => {
    const { nombre, avatar, pin, edad, userId } = req.body;
    try {
        const newProfile = new Profile({
            nombre,
            pin,
            avatar,
            edad,
            userId,
            role: 'user',
            estado: 'Activo',
        });
        await newProfile.save();
        res.status(201).json({ message: 'Perfil registrado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el perfil' });
    }
};

const loginProfile = async (req, res) => {
    const { nombre, pin } = req.body;
    try {
        const user = await Profile.findOne({ nombre, pin });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        res.json({
            message: 'Inicio de sesión exitoso',
            userId: user.userId,
            nombre: user.nombre,
            role: user.role,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};


const getProfilesByUserId = async (req, res) => {
    const { id } = req.params; // Obtener el ID del usuario de req.params
    try {
        const profiles = await Profile.find({ userId: id }); // Buscar perfiles por el ID de usuario

        if (!profiles || profiles.length === 0) {
            return res.status(404).json({ error: 'No se encontraron perfiles para este usuario' });
        }
        res.json(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los perfiles' });
    }
};

const getProfile = async (req, res) => {
    const { id } = req.params; // Obtener el ID del perfil de los parámetros de la URL
    try {
        const profile = await Profile.findById(id);
        if (!profile) {
            return res.status(404).json({ error: 'Perfil no encontrado' });
        }
        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el perfil' });
    }
};
const updateProfile = async (req, res) => {
    const { id } = req.params; // Obtener el ID del perfil de los parámetros de la URL
    const { nombre, pin, avatar, edad } = req.body; // Obtener los datos actualizados del perfil
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(id, { nombre, pin, avatar, edad }, { new: true });
        if (!updatedProfile) {
            return res.status(404).json({ error: 'Perfil no encontrado' });
        }
        res.json({ message: 'Perfil actualizado correctamente', profile: updatedProfile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
};

module.exports = { registerProfile, loginProfile, getProfilesByUserId, getProfile, updateProfile };
