import { useDispatch } from "react-redux";
import { GoogleLogin/*, GoogleLogout */} from "react-google-login";
import { gRegistration/*, logoutG */} from "../../redux/actions"; //actual

export function GoogleLn() {
  const dispatch = useDispatch();
  //actual

  //actual
  const responseGoogle = (respuesta) => {
    const mail = respuesta.profileObj.email;
    const tokenId = respuesta.tokenId;
    const name = respuesta.profileObj.givenName;
    const surname = respuesta.profileObj.familyName;

    //actual
    dispatch(
      gRegistration({
        mail: mail,
        tokenId: tokenId,
        name: name,
        surname: surname,
      })
    );
  };

  return (
    <div>
      <div>
        <GoogleLogin
          clientId="466690440359-5vqeuq9phv2er29r0jcpmlq43240cg54.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={
            {
              /*responseGoogle*/
            }
          }
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
}