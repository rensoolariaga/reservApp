const { Privileges, User } = require("../db");
const { getAuth } = require("firebase/auth");
const { token2 } = require("./sessionController.js");

const postPrivileges = async (req, res) => {

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user)
        return res.json("Entrá en sesion para poder registrar un complejo");

    // if( !user && !token2.mail ) return res.json("Entrá en sesion para poder registrar un complejo")

    // let mail;
    // if (user) mail = user.email;
    // if (token2.mail) mail = token2.mail;

    let userDB;
    // try {
    //     // Busco en la base de datos al mail que me trae el Firebase del usuario loggeado
    //     userDB = await User.findOne({
    //         where: {
    //             mail: mail,
    //         },
    //     });
    // } catch { }

    try {
        // Busco en la base de datos al mail que me trae el Firebase del usuario loggeado
        userDB = await User.findOne({
            where: {
                mail: user.email,
            },
        });
    } catch { }

    const { superUser, owner, administrator } = req.body;
    if (!userDB) return res.json("No existe ese usuario en la base de datos");
    try {
        // lo creo con los datos del body
        await Privileges.create({
            superUser,
            owner,
            administrator,
        }).then((priv) => {
            // console.log(priv)
            priv.setUser(userDB.dataValues.id).catch(console.log('me rompi, estoy en el privileges')); // modifique, le agregue el catch

            //  fue creado el privilige? Entonces lo devuelvo.
            priv ? res.json(priv) : res.json("No se ha podido crear privilegio");
        });
    } catch (error) {
        console.log(error);
    }
};

const getPrivileges = async (req, res) => {
    // recibo el id por query (url)
    const { id } = req.query;

    try {
        if (id) {
            // si me pasan un id por query, busco en database que coincida
            const privilegeById = await Privileges.findByPk(id);

            // existe privilegio? (?) lo mando, no existe? (:) le mando mensaje
            privilegeById
                ? res.json(privilegeById)
                : res.json(`No se ha encontrado un privilegio con el ID ${id}`);
        } else {
            // no me mandan id? devuelvo todos los complejos
            const allPrivileges = await Privileges.findAll();

            // valido que haya complejos para devolverlos. Existen? (?) los mando, no existen? (:) le mando mensaje
            allPrivileges
                ? res.json(allPrivileges)
                : res.json("Error buscando privilegios");
        }
    } catch (error) {
        // si se rompe algo
        console.log(error);
    }
};

module.exports = {
    postPrivileges,
    getPrivileges,
};