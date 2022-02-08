const { getAuth } = require("firebase/auth");
// nodemailer
const nodemailer = require("nodemailer"); // npm i nodemailer
const nodemailerSendgrid = require("nodemailer-sendgrid"); // npm i nodemailer-sendgrid
const { templateFailmail } = require("../utils/Templates/templateHTML");
const { token2 } = require("./sessionController.js");

// const createTrans = () => {
//   var transport = nodemailer.createTransport(
//     nodemailerSendgrid({
//       apiKey:
//         "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",
//     })
//   );
//   return transport;
// };

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

async function failMail(req, res) {
  const auth = getAuth();
  const user = auth.currentUser;
  let mail
  if (user) mail = user.email
  if (token2.mail) mail = token2.mail

  const validatedBody = {
    fieldID: req.body.fieldID,
    date: req.body.date,
    startTime: parseInt(req.body.startTime),
    startHalf: req.body.startHalf === "true" ? true : false,
    endTime: parseInt(req.body.endTime),
    endHalf: req.body.endHalf === "true" ? true : false,
    cost: parseInt(req.body.cost),
    mpID: req.body.mpID,
  };

  try {
    const transporter = createTrans();
    const info = await transporter.sendMail({
      from: '"reservapp" <rreservapp@gmail.com>',
      to: mail,
      subject: "reservapp",
      html: templateFailmail(
        validatedBody.fieldID,
        validatedBody.date,
        mail
      ),
    });
  } catch (error) {
    console.log(error.response.body);
  }
  res.send("email enviado");
}

module.exports = {
  failMail
};