require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { register, login, checkPin } = require("./controllers/userController");
const { registerProfile, getProfilesByUserId, getProfile, updateProfile, deleteProfile, checkPinProfile } = require("./controllers/profileController");
const { crearPlaylist, obtenerPlaylistsPorUsuario, obtenerPlaylistPorId, actualizarPlaylist, eliminarPlaylist } = require("./controllers/playlistController");

const app = express();
const port = process.env.PORT || 3000;

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database Connected');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

app.use(cors());
app.use(express.json());
app.post('/register', register);
app.post('/login', login);
app.post('/checkPin', checkPin);

app.post('/registerProfile', registerProfile);
app.get('/getProfilesByUserId/:id', getProfilesByUserId);
app.get('/getProfile/:id', getProfile);
app.put('/updateProfile/:id', updateProfile);
app.delete('/deleteProfile/:id', deleteProfile);
app.post('/checkPinProfile', checkPinProfile);

app.post('/playlist', crearPlaylist);
app.get('/playlists/:userId', obtenerPlaylistsPorUsuario);
app.get('/playlist/:id', obtenerPlaylistPorId);
app.put('/playlist/:id', actualizarPlaylist);
app.delete('/playlist/:id', eliminarPlaylist);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
