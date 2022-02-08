import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/landingPage/LandingPage";
import Home from "./Components/home/Home.js";
import ComplexDetail from "./Components/complexDetail/ComplexDetail";
import CrearComplejo from "./Components/crearComplejo/CrearComplejo";
import UpdateDeleteComplex from "./Components/panel/panelComplex/ModificarComplejo.js";
import UpdateDeleteSUPComplex from "./Components/panel/PanelSuperUser/ModificarComplejoSUP.js";
import UpdateDeleteSUPUser from "./Components/panel/PanelSuperUser/ModificarUsuarioSUP.js"
import AboutUs from "./Components/quienesSomos/AboutUs";
import TuCancha from "./Components/tuCancha/TuCancha";
import CreateReserva from "./Components/reservas/CreateReserva";
import ComplexReserva from "./Components/panel/panelComplex/ComplexReservations.js";
import DetailDeleteReserva from "./Components/panel/panelComplex/ComplexReservationsComponent.js";
import CrearCancha from "./Components/crearCancha/CrearCancha";
import UpdateDeleteCancha from "./Components/panel/panelComplex/ModificarCancha.js";
import UpdateDeleteSUPCancha from "./Components/panel/PanelSuperUser/ModificarCanchaSUP.js";

import ComplexId from './Components/ComplexId/ComplexId';
import Panel from "./Components/panel/Panel.js";
import successMercadoPago from "./Components/mercadoPago/successMercadoPago.js";
import failureMercadoPago from "./Components/mercadoPago/failureMercadoPago";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/home/panel" component={Panel} />
          <Route exact path="/reservation" component={CreateReserva} />
          <Route exact path="/about" component={AboutUs} />
          <Route exact path="/fields" component={TuCancha} />
          <Route exact path="/agregarComplejo" component={CrearComplejo} />
          <Route exact path="/detailComplejo/:id" component={UpdateDeleteComplex} />
          <Route exact path="/complexReservations" component={ComplexReserva} />
          <Route exact path="/complexReservationsDet/:id" component={DetailDeleteReserva} />
          <Route exact path="/detailSUPComplejo/:id" component={UpdateDeleteSUPComplex} />
          <Route exact path="/agregarCancha" component={CrearCancha} />
          <Route exact path="/detailCancha/:id" component={UpdateDeleteCancha} />
          <Route exact path="/detailSUPCancha/:id" component={UpdateDeleteSUPCancha} />
          <Route exact path="/detailSUPUsuario/:id" component={UpdateDeleteSUPUser} />
          <Route exact path='/details' component={ComplexDetail} />
          <Route exact path='/complex/:id' component={ComplexId} />
          <Route exact path="/paymentSuccess" component={successMercadoPago} />
          <Route exact path="/paymentFailure" component={failureMercadoPago} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;