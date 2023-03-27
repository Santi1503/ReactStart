import logo from './logo.svg';
import './App.css';
import { PruebasComponent } from './Components/PruebasComponent';
import { AJAXComponent } from './Components/AJAXComponent';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PruebasComponent />
        <AJAXComponent />
      </header>
    </div>
  );
}

export default App;
