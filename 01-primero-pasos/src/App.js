import logo from './logo.svg';
import './App.css';
import MiComponente from './MiComponente';
import { SegundoComponente } from './SegundoComponente';
import { TercerComponente } from './TercerComponente';
import { EventosComponente } from './EventosComponente';

function App() {

  const fichaMedica={
    tipoDeSangre:"A+",
    alergias:"No padece",
    edad:20

  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="top">
          <h2>
            Y asi como dijo Toreto, lo mas importante es la familia
          </h2>
          <hr />
        </div>
        <div className="App-content">
          <EventosComponente />
          <hr />
          <TercerComponente 
            nombre = "Santiago"
            apellidos = "Gomez de la Torre Romero"
            ficha={fichaMedica}
          />
          <hr />
          <SegundoComponente />
          <hr />
          <MiComponente />
        </div>
      </header>

      

    </div>
  );
}

export default App;
