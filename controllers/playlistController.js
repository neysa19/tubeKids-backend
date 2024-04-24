const Playlist = require('../models/playlistModel');
const User = require('../models/userModel');
const Profile = require('../models/profileModel');

const crearPlaylist = async (req, res) => {
  const { nombre, userId, profileId } = req.body;
  console.log("" + nombre  +"" + userId, + "" + profileId)
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }

    const nuevaPlaylist = new Playlist({ nombre, userId, profileId });
    await nuevaPlaylist.save();

    res.status(201).json({ message: 'Playlist creada correctamente', playlist: nuevaPlaylist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la playlist' });
  }
};


const obtenerPlaylistsPorUsuario = async (req, res) => {
  const { userId } = req.params;
  try {
    const playlists = await Playlist.find({ userId });
    res.json(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las playlists del usuario' });
  }
};

const obtenerPlaylistPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist no encontrada' });
    }
    res.json(playlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la playlist' });
  }
};

const actualizarPlaylist = async (req, res) => {
  const { id } = req.params;
  const { nombre, userId, idProfile } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const profile = await Profile.findById(idProfile);
    if (!profile) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }

    const playlist = await Playlist.findOneAndUpdate({ _id: id, userId }, { nombre, idProfile }, { new: true });
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist no encontrada o no pertenece al usuario' });
    }

    res.json({ message: 'Playlist actualizada correctamente', playlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la playlist' });
  }
};

const eliminarPlaylist = async (req, res) => {
  const { id } = req.params;
  try {
    const playlist = await Playlist.findOneAndDelete({ _id: id });
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist no encontrada' });
    }
    res.json({ message: 'Playlist eliminada correctamente', playlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la playlist' });
  }
};

module.exports = { crearPlaylist, obtenerPlaylistsPorUsuario, obtenerPlaylistPorId, actualizarPlaylist, eliminarPlaylist };
