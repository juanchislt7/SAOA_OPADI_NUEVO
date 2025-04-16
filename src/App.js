import AsignacionCitas from './Pages/Asignacion_citas';
import IngresoC from './Pages/Ingreso';
import RecuperacionC from './Pages/Recuperacion';
import CambioPC from './Pages/CambioP';
import MenuP from './Pages/Menu';
import Layout from './Components/Layout';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";




function App() {
  return (
    <div className="App">
     <BrowserRouter>
       <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="Asignacion_citas" element={<AsignacionCitas/>}/>
        <Route path="Ingreso" element={<IngresoC/>}/>
        <Route path="Recuperacion" element={<RecuperacionC/>}/>
        <Route path="CambioContrasena" element={<CambioPC/>}/>
        <Route path="Menu" element={<MenuP/>}/>
        </Route>
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
