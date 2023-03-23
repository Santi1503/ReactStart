import logo from './logo.svg';
import './App.css';
import { /* MiPrimerEstado */} from './Components/MiPrimerEstado';
import { EjercicioComponent } from './Components/EjercicioComponent';

function App() {

  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>El estado de React - Hook useState</h1>
        <div>
          {/*<MiPrimerEstado />*/}
          <hr />
          <EjercicioComponent year={year}/>
        </div>
      </header>
    </div>
  );
}

export default App;
