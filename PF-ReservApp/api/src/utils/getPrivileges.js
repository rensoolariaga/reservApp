const { Privileges } = require("../db");

getPrivileges = async function (userID) {
  const cPriv = await Privileges.findAll({ where: { userId: userID }, include: "complex" });

  let rPriv = [];
  for (element of cPriv) {
    rPriv.push(element.dataValues);
  }

  return rPriv;
};

module.exports = {
  getPrivileges: getPrivileges,
};