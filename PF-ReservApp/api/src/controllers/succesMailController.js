const { getAuth } = require("firebase/auth");
// nodemailer
const nodemailer = require('nodemailer');  // npm i nodemailer
const nodemailerSendgrid = require('nodemailer-sendgrid');  // npm i nodemailer-sendgrid
const { templateSuccessEmail } = require('../utils/Templates/templateHTML');
const { token2 } = require("./sessionController.js");

const createTrans = () => {
  var transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: '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'
    })
  );
  return transport
}

async function succesMail(req, res) {
  // console.log(`pago exitoso!`);
  const auth = getAuth();
  const user = auth.currentUser;
  let mail
  if (user) mail = user.email
  if (token2.mail) mail = token2.mail
  let preference_Id = 1234567890, title_cancha = "cancha 1", title_complejo = "solo futbol", pago = 2000
  try {
    const transporter = createTrans()
    const info = await transporter.sendMail({
      from: '"reservapp" <torressebastian014@gmail.com>',
      to: mail,
      subject: 'reservapp',
      // html: "<h3> pago exitoso, has reservado la cancha ...<h3>" 
      html: templateSuccessEmail(preference_Id, title_cancha, title_complejo, pago),
    })

  } catch (error) {
    console.log(error);
  }
  res.redirect('http://localhost:3000/')
}

module.exports = {
  succesMail,
  //getUserInfo,
  //optionsUser,
};