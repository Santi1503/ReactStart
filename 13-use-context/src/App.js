
import { useEffect, useState } from 'react';
import './App.css';
import { PruebaContext } from './Context/PruebaContext';
import { AppRouter } from './Router/AppRouter';

function App() {

  const [usuario, setUsuario] = useState({})

  useEffect(() => {
    let usuario_local = JSON.parse(localStorage.getItem("usuario"))

    setUsuario(usuario_local)
  }, [])

  useEffect(() => {
    // Cada vez que se actualice el estado se guarda en el LS
    localStorage.setItem("usuario", JSON.stringify(usuario))
  }, [usuario])

  const curso = {
    id: 1,
    titulo: "Master en React",
    contenido: "39H de React"
  }

  return (
    <div className="App">
      <PruebaContext.Provider value={{
        usuario,
        setUsuario
      }}>
        <AppRouter />
      </PruebaContext.Provider>
    </div>
  );
}

export default App;
