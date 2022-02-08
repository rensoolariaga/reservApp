const { getAuth, updatePassword } = require("firebase/auth");
const { token2 } = require("./sessionController.js");

async function updatePasswordG(req, res) {
  const { password } = req.body
  const auth = getAuth();

  const user = auth.currentUser;
  const newPassword = password;

  updatePassword(user, newPassword).then(() => {
    // Update successful.
    res.send('Update successful')
  }).catch((error) => {
    // An error ocurred
    res.send('An error ocurred')
  });
}

module.exports = {
  updatePasswordG,
};