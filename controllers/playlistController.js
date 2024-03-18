const Playlist = require('../models/playlistModel');
const User = require('../models/userModel');

const crearPlaylist = async (req, res) => {
  const { nombre, url, userId } = req.body;
  try {
    const nuevaPlaylist = new Playlist({ nombre, url, userId });
    await nuevaPlaylist.save();

    res.status(201).json({ message: 'Playlist creada correctamente', playlist: nuevaPlaylist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la playlist' });
  }
};

// Uso en el enrutador


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
  
  // Uso en el enrutador


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
  
  // Uso en el enrutador
 
  
  const actualizarPlaylist = async (req, res) => {
    const { id } = req.params;
    const { nombre, url, userId } = req.body;
    try {
      // Verifica si la playlist existe y pertenece al usuario
      const playlist = await Playlist.findOne({ _id: id, userId });
      if (!playlist) {
        return res.status(404).json({ error: 'Playlist no encontrada o no pertenece al usuario' });
      }
  
      // Actualiza la playlist
      playlist.nombre = nombre;
      playlist.url = url;
      await playlist.save();
      res.json({ message: 'Playlist actualizada correctamente', playlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar la playlist' });
    }
  };
  
  // Uso en el enrutador
  const eliminarPlaylist = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
      // Verifica si la playlist existe y pertenece al usuario
      const playlist = await Playlist.findOne({ _id: id, userId });
      if (!playlist) {
        return res.status(404).json({ error: 'Playlist no encontrada o no pertenece al usuario' });
      }
  
      // Elimina la playlist
      await playlist.remove();
      res.json({ message: 'Playlist eliminada correctamente', playlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la playlist' });
    }
  };
  
  // Uso en el enrutador
  
  
  
  

  module.exports = { crearPlaylist, obtenerPlaylistsPorUsuario, obtenerPlaylistPorId, actualizarPlaylist, eliminarPlaylist };
