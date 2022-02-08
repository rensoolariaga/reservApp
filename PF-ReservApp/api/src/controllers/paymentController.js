// importo el componente para utilizarlo en las funciones
const { Payment } = require("../db");

const postPayment = async (req, res) => {

    // atributos del body para pasarle a postman
    const {

        date,
        informacion  // modifique ¡¡¡¡¡ ME DEVUELVE NULL POR POSTMAN AAAAAAAAAAAAA!!!!!
    } = req.query;

    try {

        // lo creo con los datos del body
        const newPayment = await Payment.create({

            date,
            informacion  // modifique ¡¡¡¡¡ ME DEVUELVE NULL POR POSTMAN AAAAAAAAAAAAA!!!!!
        });

        //  me pasan por body? lo devuelvo, si no, mensaje 
        newPayment ? res.json(newPayment) : res.json('No se ha podido crear el pago')
    }
    catch (error) {
        // si se rompe algo
        console.log(error)
    }
};

const getPayment = async (req, res) => {
    // recibo el id por query (url)
    const { id } = req.query;

    try {

        if (id) { // si me pasan un id por query, busco en database que coincida
            const paymentById = await Payment.findByPk(id);

            // existe pago? (?) lo mando, no existe? (:) le mando mensaje
            paymentById ? res.json(paymentById) : res.json(`No se ha encontrado un pago con el id ${id}`);

        }
        else { // no me mandan id? devuelvo todos los complejos
            const allPayment = await Payment.findAll();

            // valido que haya pagos para devolverlos. Existen? (?) los mando, no existen? (:) le mando mensaje
            allPayment ? res.json(allPayment) : res.json('Error buscando pagos');

        }

    }
    catch (error) {
        // si se rompe algo
        console.log(error)
    }
};

module.exports = {

    postPayment,
    getPayment
}