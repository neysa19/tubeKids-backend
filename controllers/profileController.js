const Profile = require('../models/profileModel');

// Registrar Perfiles//
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



// Obtiene los perfiles de acuerdo al usuario Logiado///
const getProfilesByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const profiles = await Profile.find({ userId: id });

        if (!profiles || profiles.length === 0) {
            return res.status(404).json({ error: 'No se encontraron perfiles para este usuario' });
        }
        res.json(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los perfiles' });
    }
};
//ontiene el perfil de acuerdo al Id //
const getProfile = async (req, res) => {
    const { id } = req.params;
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
// Actualiza el Perfil con ref ID //
const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { nombre, pin, avatar, edad } = req.body;
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

// Elimidar por Id//

const deleteProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const profile = await Profile.findById(id);
        if (!profile) {
            return res.status(404).json({ error: 'El Perfil no existe' });
        }
        await profile.deleteOne();
        res.status(200).json({ message: ' Perfil eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
}


const checkPinProfile = async (req, res) => {
    const { nombre, pin } = req.body;
    try {
        const profile = await Profile.findOne({ nombre });
        if (!profile) {
            return res.status(401).json({ error: 'Perfil no encontrado' });
        }
        if (pin !== profile.pin) {
            console.log(pin);
            console.log(profile.pin);
            return res.status(401).json({ error: 'PIN incorrecto' });
        }
        console.log("Todo esta bien");
        res.json({
            success: true,
            message: 'PIN correcto',
            profileId: profile._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al verificar el PIN' });
    }
}


module.exports = { registerProfile, getProfilesByUserId, getProfile, updateProfile, deleteProfile, checkPinProfile };
