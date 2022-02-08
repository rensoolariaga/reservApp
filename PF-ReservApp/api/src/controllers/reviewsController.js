// importo el componente para utilizarlo en las funciones
const { Reviews, User } = require("../db");
const { getAuth } = require("firebase/auth");
const { token2 } = require("./sessionController.js");

const postReview = async (req, res) => {
    const auth = getAuth();
    const user = auth.currentUser;

    let email = "";
    if (!user && !token2.mail) return res.json("No hay sesión iniciada");
    if (token2.mail) email = token2.mail;
    else {
        email = user.email;
    }

    let userID = "";
    await User.findOne({ where: { mail: email } }).then((ureg) => {
        userID = ureg.id;
    });

    // atributos del body para pasarle a postman
    const {
        rating, // array con validacion de 0 a 5
        comment,
        complexID,
    } = req.body;


    const reviewsReg = await Reviews.findAll({
        where: { userId: userID, complexId: complexID },
    });

    if (reviewsReg.length !== 0) return res.json("Ya has opinado sobre este complejo");

    const objCreate = {
        "rating": rating,
        "complexId": complexID,
        "userId": userID,
    };

    if (comment) objCreate.comment = comment;

    // lo creo con los datos del body
    await Reviews.create(objCreate)
        .then((response) => {
            response.setUser(userID);
            response.setComplex(complexID);
            res.json(response.dataValues);
        })
        .catch((error) => res.json(error));
};

const getReviews = async (req, res) => {
    // recibo el id por query (url)
    const { id, complexID, userID } = req.query;

    let paramsObj = {};

    if (id) paramsObj.id = id;
    if (complexID) paramsObj.complexId = complexID;
    if (userID) paramsObj.userId = userID;

    try {
        const reviews = await Reviews.findAll({ where: paramsObj });

        // existe review? (?) lo mando, no existe? (:) le mando mensaje
        reviews ? res.json(reviews) : res.json("No se ha encontrado tu crítica");
    } catch (error) {
        // si se rompe algo
        console.log(error);
    }
};

module.exports = {
    postReview,
    getReviews,
};