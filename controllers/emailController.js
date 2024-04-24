const confMail = require('@sendgrid/mail'); 
const User = require('./models/User');
require('dotenv').config();

confMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (req, res) => {
    const {email} = req.body;
    try {
      // Enviar correo de validación
      const user = await User.findOne({ email }); // Obtener el usuario por su correo electrónico

      if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
      // Enviar correo de validación
      const msg = {
        to: email,
        from: 'ldsb20020611@gmail.com',
        subject: 'Verificación de correo electrónico',
        text: 'Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico y activar tu cuenta.',
        html: `<p>Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico y activar tu cuenta:</p>
               <a href="${process.env.BASE_URL}/verify/${user._id}">Verificar correo electrónico</a>`
    };
  
      await sgMail.send(msg);
  
      res.status(201).json({ message: 'Usuario registrado y correo de validación enviado.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor.' });
    }
  }
  
  module.ex = sendEmail;