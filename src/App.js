import AsignacionCitas from './Pages/Asignacion_citas';
import IngresoC from './Pages/Ingreso';
import RecuperacionC from './Pages/Recuperacion';
import CambioPC from './Pages/CambioP';
import MenuP from './Pages/Menu';
import Layout from './Components/Layout';
import CreacionU from './Pages/Creacion_Usuario';
import ModificacionU from './Pages/Modificacion_Usuario';
import Reportes from './Pages/Reportesp';
import TotemC from './Pages/Totem_Cliente';
import ServiciosT from './Pages/Servicios_Totem';
import OtrosS from './Pages/Otros_Servicios';
import LlamadoT from './Pages/Llamado_Turnos';
import Televisor from './Pages/Televisor_Llamado';
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
        <Route path="Creacion_Usuario" element={<CreacionU/>}/>
        <Route path="Modificacion_Usuario" element={<ModificacionU/>}/>
        <Route path="Totem_Cliente" element={<TotemC/>}/>
        <Route path="Reportesp" element={<Reportes/>}/>
        <Route path="Servicios_Totem" element={<ServiciosT/>}/>
        <Route path="Otros_Servicios" element={<OtrosS/>}/>
        <Route path="Llamado_Turnos" element={<LlamadoT/>}/>
        <Route path="Televisor_Llamado" element={<Televisor/>}/>
        <Route path="Menu" element={<MenuP/>}/>
        </Route>
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
