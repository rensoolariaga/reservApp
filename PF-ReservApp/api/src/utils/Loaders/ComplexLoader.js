const { Complex, Privileges, User } = require("../../db.js");

const ComplexExamples = [
  {
    name: "Justo futbol 5",
    province: "Ciudad Autónoma de Buenos Aires",
    district: "Palermo",
    address: "J.B justo 2002",
    images: [
      "https://www.hoysejuega.com/uploads/Modules/ImagenesComplejos/800_600_justo-futbol.jpg",
    ],
    description: "FUtbol 5 en JB justo",
    openfrom: "10:00",
    opento: "24:00",
  },
  {
    name: "Serrano Corner",
    province: "Ciudad Autónoma de Buenos Aires",
    district: "Villa Crespo",
    address: "Serrano 250",
    images: [
      "https://alquilatucancha.com/uploads/clubs/bg/serrano-caba.jpeg?691296",
    ],
    description: "FUtbol 5 en Serrano",
    openfrom: "10:00",
    opento: "24:00",
  },
  {
    name: "Kick FC",
    province: "Buenos Aires",
    district: "Mataderos",
    address: "Mataderos, Saladillos 2051",
    images: [
      "https://alquilatucancha.com/uploads/clubs/bg/kick-fc-caba.jpeg?457824",
    ],
    description: "Kick en Mataderos",
    openfrom: "10:00",
    opento: "24:00",
  },
  {
    name: "La Goleada",
    province: "Santiago del Estero",
    district: "La Banda",
    address: "Av. San Martin 57",
    images: [
      "https://alquilatucancha.com/uploads/clubs/bg/goleada-caba.jpeg?74701",
    ],
    description: "Goleada en Floresta",
    openfrom: "10:00",
    opento: "24:00",
  },
  {
    name: "Las Palmeras",
    province: "Chubut",
    district: "Trelew",
    address: "Scalabrini Ortiz 699",
    images: [
      "https://alquilatucancha.com/uploads/clubs/bg/las-palmeras-caba.jpeg?268513",
    ],
    description: "Palmeras en Villa Urquiza",
    openfrom: "10:00",
    opento: "24:00",
  },
  {
    name: "Solanas Futbol",
    province: "Córdoba",
    district: "Capilla De Los Remedios",
    address: "Bernardino Rivadavia 530",
    images: [
      "https://alquilatucancha.com/uploads/clubs/bg/solanas-caba.jpeg?304134",
    ],
    description: "Solanas en Villa Urquiza",
    openfrom: "12:00",
    opento: "24:00",
  },

  {
    name: "Complejo San Diego",
    province: "Catamarca",
    district: "San Fernando del Valle de Catamarca",
    address: "Villa S/N",
    images: [
      "https://lh5.googleusercontent.com/p/AF1QipO6ApS5lnW5LmF7SXkOSksTIarZ3L5Kk3XDaR04=w600-h988-p-k-no",
    ],
    description: "De los mejores predios y complejos de Catamarca",
    openfrom: "10:00",
    opento: "24:00",
  },
  {
    name: "Complejo Bicicross",
    province: "Neuquén",
    district: "Senillosa",
    address: "Bernardino Rivadavia 730",
    images: [
      "https://lh5.googleusercontent.com/p/AF1QipOpgMf3uMrB2wfJWTz-bNm5gIOm5NtMTefMV-MG=w600-h485-p-k-no",
    ],
    description: "A puro Neuquén",
    openfrom: "11:00",
    opento: "24:00",
  },
  {
    name: "Club 9 de Julio",
    province: "Santa Fe",
    district: "Rafaela",
    address: "Ayacucho 309",
    images: [
      "https://lh5.googleusercontent.com/p/AF1QipN3N-kiuNkNFimNNgF5Wzy9lQcipzmtJr4eB0U5=w600-h321-p-k-no",
    ],
    description: "Los mejores precios y las mejores canchas del condado",
    openfrom: "11:00",
    opento: "24:00",
  },
  {
    name: "Club Atletico Ñuñorco",
    province: "Tucumán",
    district: "Monteros",
    address: "Belgrano 701",
    images: [
      "https://lh5.googleusercontent.com/p/AF1QipPHLPoUXTt-sALiFoN8GWQAO0fY8VrlYclxXHl6=w600-h650-p-k-no",
    ],
    description: "El mejor club atlético de Tucumán, al menos de Monteros",
    openfrom: "12:00",
    opento: "24:00",
  },
  {
    name: "Club Hipico Payubre",
    province: "Corrientes",
    district: "Mercedes",
    address: "Dr. Camacho 250",
    images: [
      "https://lh5.googleusercontent.com/p/AF1QipPj2W73zBu2QN8QyDZLV7CjJ3D-ceQNau-HYZDm=w600-h650-p-k-no",
    ],
    description: "Canchas del Club Hipico Payubre",
    openfrom: "11:00",
    opento: "24:00",
  },
  {
    name: "Futbol City 2",
    province: "San Luis",
    district: "Estancia Grande",
    address: "Aristobulo del Valle 141",
    images: [
      "https://lh5.googleusercontent.com/p/AF1QipPSen3hmJ2pRy_7oy5BhOYv2blGSXBSObjQWXeu=w600-h988-p-k-no",
    ],
    description: "Donde puedes jugar al futbol",
    openfrom: "10:00",
    opento: "24:00",
  },
];


async function loadComplexExamples(carray) {
  let users = await User.findAll({ where: { superuser: false } });
  let cres = await Complex.bulkCreate(carray);
  let index = 0;
  for (element of cres) {
    await Privileges.create({
      owner: true,
      userId: users[index].id,
      complexId: element.dataValues.id,
    });
    index++;
    if (index >= users.length) index = 0;
  }
}

module.exports = {
  ComplexExamples: ComplexExamples,
  loadComplex: loadComplexExamples,
};