const URLmp = "http://localhost:3000/";
const URLsuccess = "paymentSuccess";
const URLfailure = "paymentFailure";

const mercadopago = require("mercadopago"); // npm install mercadopago
// Agrega credenciales de mp
mercadopago.configure({
  access_token:
    "APP_USR-3165543253229123-102923-7e846c48429d8c5d99d4da622ae38cff-1009370863", // token de la persona que recibe los pagos
});

async function mercadoPagoPost(req, res) {
  const { title, unit_price, reservation } = req.body;

  var newSuccessURL = new URL(URLmp + URLsuccess);
  var newFailureURL = new URL(URLmp + URLfailure)

  for (element of Object.keys(reservation)) {
    newSuccessURL.searchParams.append(element, reservation[element]);
    newFailureURL.searchParams.append(element, reservation[element]);
  }

  let preference = {
    items: [
      {
        title: title.toString(),
        quantity: parseInt(1),
        unit_price: parseFloat(unit_price),
      },
    ],
    back_urls: {
      success: String(newSuccessURL),
      failure: String(newFailureURL),
      //"pending": "http://localhost:3001/pending"
    },
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      let arr = [{ url: `${response.body.init_point}` }];
      res.send(arr);
    })
    .catch(function (error) {
      console.log(error);
    });
}

module.exports = {
  mercadoPagoPost,
  //getUserInfo,
  //optionsUser,
};