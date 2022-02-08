const { off } = require("superagent");
const { Complex, Field } = require("../../db.js");

const FieldExamples = [
  {
    cost: 500,
    name: "Cancha 1",
    fieldtypeId: "2",
  },
  {
    cost: 800,
    name: "Cancha 2",
    fieldtypeId: "3",
  },
  {
    cost: 900,
    name: "Cancha 3",
    fieldtypeId: "7",
  },
  {
    cost: 1000,
    name: "Cancha 4",
    fieldtypeId: "13",
  },
  {
    cost: 1500,
    name: "Cancha 5",
    fieldtypeId: "5",
  },
  {
    cost: 1050,
    name: "Cancha 6",
    fieldtypeId: "6",
  },
  {
    cost: 1200,
    name: "Cancha 7",
    fieldtypeId: "8",
  },
  {
    cost: 1250,
    name: "Cancha 8",
    fieldtypeId: "10",
  },
  {
    cost: 1250,
    name: "Cancha 9",
    fieldtypeId: "11",
  },
  {
    cost: 200,
    name: "Cancha 10",
    fieldtypeId: "16",
  },
  {
    cost: 500,
    name: "Cancha 11",
    fieldtypeId: "2",
  },
  {
    cost: 600,
    name: "Cancha 12",
    fieldtypeId: "4",
  },
  {
    cost: 750,
    name: "Cancha 13",
    fieldtypeId: "3",
  },
  {
    cost: 800,
    name: "Cancha 14",
    fieldtypeId: "5",
  },
  {
    cost: 650,
    name: "Cancha 15",
    fieldtypeId: "10",
  },
  {
    cost: 1200,
    name: "Cancha 16",
    fieldtypeId: "2",
  },
  {
    cost: 700,
    name: "Cancha 17",
    fieldtypeId: "9",
  },
  {
    cost: 1050,
    name: "Cancha 18",
    fieldtypeId: "2",
  },
];
async function LoadField(fieldExamples) {
  await Complex.findAll().then((cres) => {
    let resarr = [];
    let index = 0;
    fieldExamples.forEach((element) => {
      resarr.push({
        name: element.name,
        cost: element.cost,
        complexId: cres[index].dataValues.id,
        fieldtypeId: element.fieldtypeId,
      });
      index++;
      if (index >= cres.length) index = 0;
    });
    return Field.bulkCreate(resarr);
  });
}

module.exports = {
  FieldExamples: FieldExamples,
  LoadField: LoadField,
};