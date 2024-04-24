require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { register, login, checkPin, getUserById, updateUserById, deleteUserById  } = require("./controllers/userController");
const { registerProfile, getProfilesByUserId, getProfile, updateProfile, deleteProfile, checkPinProfile } = require("./controllers/profileController");
const { crearPlaylist, obtenerPlaylistsPorUsuario, obtenerPlaylistPorId, actualizarPlaylist, eliminarPlaylist } = require("./controllers/playlistController");
const { Session } = require("./controllers/sessionController");

const { crearVideo, obtenerVideoPorUsuario, obtenerVideoPorId, actualizarVideo, eliminarVideo, obtenerVideoPorPlaylistId  } = require("./controllers/videoController");


const app = express();
const sgMail = require('@sendgrid/mail');

const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const mongoString = process.env.DATABASE_URL;
//const accountSid = process.env.TU_ACCOUNT_SID;
//const authToken = process.env.TU_AUTH_TOKEN;
//const verifySid = process.env.TU_VERIFY_SERVICE_SID;

//const client = require('twilio')(accountSid, authToken);

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

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/sendEmail', async (req, res) => {
  const { email } = req.body;
  try {
    // Genera un token de validación
    //const token = jwt.sign({ email }, 'secreto-seguro', { expiresIn: '1h' }); // Personaliza el secreto y el tiempo de expiración
    // Crea la URL de validación
    console.log ("Error TOKEN "+token);
    const validationUrl = `http://localhost:3000/validarEmail/${token}`;
    
    // Enviar correo de validación con la URL
    const msg = {
      to: email,
      from: email,
      subject: 'Validación de correo',
      text: `Por favor, haga clic en el siguiente enlace para validar su correo electrónico: ${validationUrl}`,
      html: `<p>Por favor, haga clic en el siguiente enlace para validar su correo electrónico:</p><a href="${validationUrl}">Validar correo</a>`,
    };

    await sgMail.send(msg);

    res.status(201).json({ message: 'Usuario registrado y correo de validación enviado.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});



app.get('/validarEmail', async (req, res) => {
  const { token } = req.query;
  try {
    const decodedToken = jwt.verify(token, 'secreto-seguro'); // Verifica el token usando el mismo secreto
    const user = await User.findOne({ email: decodedToken.email });
    if (!user) {
      return res.status(404).json({ error: 'El usuario no existe' });
    }
    // Actualizar los datos del usuario
    user.estado = "Activa";
    await user.save();
    res.send('Correo electrónico validado correctamente.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al validar el correo electrónico.');
  }
});

app.post('/sendVerificationCode', async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Enviar el código de verificación por SMS utilizando v2 de Twilio
    const verification = await client.verify.services(verifySid).verifications.create({
      to: phoneNumber,
      channel: 'sms'
    });
    console.log(verification.status); // Imprimir el estado de la verificación (puede ser "pending" o "approved")
    res.status(201).json({ message: 'Código de verificación enviado.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

app.post('/verifyCode', async (req, res) => {
  const { phoneNumber, code } = req.body;

  try {
    // Verificar el código de verificación ingresado por el usuario
    const verificationCheck = await client.verify.services(verifySid).verificationChecks.create({
      to: phoneNumber,
      code: code
    });

    console.log(verificationCheck.status); // Imprimir el estado de la verificación (puede ser "approved" o "pending")

    if (verificationCheck.status === 'approved') {
      res.status(200).json({ message: 'Verificación exitosa.' });
    } else {
      res.status(400).json({ message: 'Código de verificación incorrecto.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

app.get('/activaValidacion', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: 'El usuario no existe' });
    }

    // Actualizar los datos del usuario
    user.validacion = "Activa";
    await user.save();

    res.send('Validació de 2 pasos activada');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al activar la validación de 2 pasos');
  }
});

app.get('/desactivaValidacion', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: 'El usuario no existe' });
    }

    // Actualizar los datos del usuario
    user.validacion = "Inactiva";
    await user.save();

    res.send('Validació de 2 pasos desactivada');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al deasactivar la validación de 2 pasos');
  }
});





app.post('/register', register);

app.post('/login', login);
app.post('/checkPin', checkPin);
app.get('/getUserById/:id', getUserById);
app.put('/updateUserById/:id', updateUserById);
app.delete('/deleteUserById/:id',  Session,  deleteUserById);
app.get('/getUserById/:id', getUserById);
app.put('/updateUserById/:id', updateUserById);
app.delete('/deleteUserById/:id', deleteUserById);

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


app.post('/video', crearVideo);
//app.get('/video/:userId', obtenerVideoPorUsuario);
app.get('/video/:id', obtenerVideoPorId);
app.put('/video/:id', actualizarVideo);
app.delete('/video/:id', eliminarVideo);
app.get('/videos/playlist/:playlistId', obtenerVideoPorPlaylistId );

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
