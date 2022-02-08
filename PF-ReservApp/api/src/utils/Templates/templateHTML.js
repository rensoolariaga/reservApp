function templateSuccessEmail(
  fieldID,
  date,
  // startTime,
  // endTime,
  cost,
  mpID,
  mail
) {
  let html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title></title>
  </head>
  <body>
  <h1>PAGO APROBADO</h1>
  <h2>Hola ${mail} has reservado la cancha con el Id:${fieldID}</h2>
  <h2>Fecha de la reserva: ${date}</h2>
  <h2>Precio por fracción: ${cost}</h2>
  <h2>Comprobante Mercado Pago: ${mpID}</h2>
  </body>
  </html>
`;
  return html;
}

function templateFailmail(fieldID, date, mail) {
  let html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title></title>
  </head>
  <body>
  <h1>PAGO NO REALIZADO</h1>
  <h2>Hola ${mail} no se ha podido reservar la cancha con el Id: ${fieldID}</h2>
  <h2>fecha de la reserva: ${date}</h2>
  </body>
  </html>
`;
  return html;
}

function userMessageTemplate(nombre, ciudad, telefono, correo, mensaje) {
  let html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title></title>
  </head>
  <body>
  <h2>Usuario: ${correo}</h2>
  <h3>Nombre: ${nombre}</h3>
  <h3>Ciudad: ${ciudad}</h3>
  <h3>Comunicado: ${mensaje}</h3>
  </body>
  </html>
`;
  return html;
}

module.exports = { templateSuccessEmail, templateFailmail, userMessageTemplate };