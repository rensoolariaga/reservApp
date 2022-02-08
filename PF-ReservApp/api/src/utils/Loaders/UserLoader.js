const { User } = require("../../db.js");

const users = [

    {
        mail: "derek@reservapp.com",
        superuser: true,
        password: "asd12345",
        name: "Derek",
        surname: "Dannevig",
        birthdate: "1991-11-28",
        province: "CABA",
        district: "Belgrano"
    },
    {
        mail: "renso@reservapp.com",
        password: "asd12345",
        name: "Renso",
        surname: "Olariaga",
        birthdate: "1996-06-06",
        province: "Buenos Aires",
        district: "La Plata"
    },
    {
        mail: "carlos@reservapp.com",
        password: "asd12345",
        name: "Carlos",
        surname: "Medina",
        birthdate: "1990-11-01",
        province: "CABA",
        district: "Villa Devoto"
    },
    {
        mail: "ezecatmaster@reservapp.com",
        password: "asd12345",
        name: "Ezequiel",
        surname: "Camargo",
        birthdate: "1996-12-30",
        province: "Cordoba",
        district: "Capital"
    },
];

async function loadUsers(array) {
    User.bulkCreate(array);
}

module.exports = {
    users: users,
    loadUsers: loadUsers,
};