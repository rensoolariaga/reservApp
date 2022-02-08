const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const { userMessageTemplate } = require("../utils/Templates/templateHTML");

// configuracion para nodemailer
// const createTrans = () => {
//     var transport = nodemailer.createTransport(
//       nodemailerSendgrid({
//         apiKey:
//           "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",
//       })
//     );
//     return transport;
//   };

<<<<<<< Updated upstream
const createTrans = () => {
    let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'rreservapp@gmail.com',
            pass: 'Nodemailer*098123',
        },
    });
    return transport;
}


async function userMessage(req, res) {
    const { nombre, ciudad, telefono, correo, mensaje } = req.body;

    if (nombre && ciudad && telefono && correo && mensaje) {
        try {
            const transporter = createTrans();
            const info = await transporter.sendMail({
                from: '"reservapp" <rreservapp@gmail.com>',
                to: "torressebastian014@gmail.com",
                subject: "comunicado de un usuario de reservapp",
                html: userMessageTemplate(nombre, ciudad, telefono, correo, mensaje)
            });
            res.send('su mensaje ha sido enviado')
        } catch (error) {
            console.log(error.body.errors);
            res.send('su mensaje no ha sido enviado')
        }
    } else {
        res.send('su mensaje no ha sido enviado')
=======
  const createTrans = () => {
    let transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: 'rreservapp@gmail.com',
          pass: 'Nodemailer*098123',
      },
  });
  return transport;
  }


async function userMessage(req, res) {
  const { nombre, ciudad, telefono, correo, mensaje } = req.body;
    
  if (nombre && ciudad && telefono && correo && mensaje) {
    try {
      const transporter = createTrans();
      const info = await transporter.sendMail({
        from: '"reservapp" <rreservapp@gmail.com>',
        to: "torressebastian014@gmail.com",
        subject: "comunicado de un usuario de reservapp",
        html: userMessageTemplate(nombre, ciudad, telefono, correo, mensaje)
      });
      res.send('su mensaje ha sido enviado')
    } catch (error) {
      console.log(error.body.errors);
      res.send('su mensaje no ha sido enviado')
>>>>>>> Stashed changes
    }
}

module.exports = {
    userMessage,
};