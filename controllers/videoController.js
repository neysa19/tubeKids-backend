const User = require('../models/userModel');
const Video = require('../models/videoModel');
const Playlist = require('../models/playlistModel');


const crearVideo = async (req, res) => {
  const { nombre, url, playlistId } = req.body;
  try {
    
    const playlist = await  Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist no encontrada o no pertenece al usuario' });
    }

    const nuevoVideo = new Video({ nombre, url, idPlaylist: playlistId });
    await nuevoVideo.save();

    res.status(201).json({ message: 'Video creado correctamente', video: nuevoVideo });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el video' });
  }
};


const obtenerVideoPorPlaylistId = async (req, res) => {
    const { playlistId } = req.params;
    try {
      const playlist = await Playlist.findById(playlistId); // Busca la playlist por su ID
      if (!playlist) {
        return res.status(404).json({ error: 'Playlist no encontrada' });
      }
      const videos = await Video.find({ idPlaylist: playlistId }); // Busca los videos por el ID de la playlist
      res.json(videos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los videos de la playlist' });
    }
  };


const obtenerVideoPorUsuario = async (req, res) => {
  const { userId } = req.params;
  console.log("2");
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const playlists = await Playlist.find({ userId });
    const playlistIds = playlists.map(playlist => playlist._id);

    const videos = await Video.find({ idPlaylist: { $in: playlistIds } });
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los videos del usuario' });
  }
};

const obtenerVideoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ error: 'Video no encontrado' });
    }
    res.json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el video' });
  }
};

const actualizarVideo = async (req, res) => {
  const { id } = req.params;
  const { nombre, url } = req.body;
  try {
    const video = await Video.findByIdAndUpdate(id, { nombre, url }, { new: true });
    if (!video) {
      return res.status(404).json({ error: 'Video no encontrado' });
    }
    res.json({ message: 'Video actualizado correctamente', video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el video' });
  }
};

const eliminarVideo = async (req, res) => {
  const { id } = req.params;
  console.log("id:"+ id)
  try {
    const video = await Video.findByIdAndDelete(id);
    if (!video) {
      return res.status(404).json({ error: 'Video no encontrado' });
    }
    res.json({ message: 'Video eliminado correctamente', video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el video' });
  }
};

module.exports = { crearVideo, obtenerVideoPorUsuario, obtenerVideoPorId, actualizarVideo, eliminarVideo,obtenerVideoPorPlaylistId  };
