const {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");
const { token2 } = require("./sessionController.js");

async function logIn(req, res) {
  const auth = getAuth();
  const user = auth.currentUser;
  const { mail, password } = req.body;

  if (user || token2.mail) res.json("Ya estas logeado");
  else {
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        res.json({
          result: "success",
          data: user.email + " ha iniciado sesion",
        });
      })
      .catch((error) => {
        console.log(error);
        res.json({
          result: "failure",
          data: error.message,
        });
      });
  }
}

async function logOut(req, res) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          res.json({
            result: "success",
            data: "La sesión ha sido cerrada",
          });
        })
        .catch((error) => {
          console.log(error);
          res.json({
            result: "failure",
            data: error,
          });
          // An error happened.
        });
    } catch {
      res.json({
        result: "failure",
        data: "Error en el cierre de sesión",
      });
    }
  } else
    res.json({
      result: "failure",
      data: "No hay sesión iniciada",
    });
}

module.exports = {
  logIn,
  logOut,
};