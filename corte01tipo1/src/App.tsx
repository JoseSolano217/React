import './App.css';

import { Cabecera } from './app/componentes/contenedores/Cabecera';
import { Ruteo } from './app/utilidades/rutas/Ruteo';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="container-fluid">
        <BrowserRouter>
          <Cabecera/>
          <Ruteo/>
        </BrowserRouter>
    </div>
  );
}

export default App;
