import { Gestion } from './Components/Gestion';
import logo from './logo.svg';
import  './App.css';
import { Tareas } from './Components/Tareas';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        {/*Ejercicio con hook UseMemo */}
        {/*<Tareas /> */}

        {/*Metodo memos componentes */}
        <Gestion />

      </header>
    </div>
  );
}

export default App;
