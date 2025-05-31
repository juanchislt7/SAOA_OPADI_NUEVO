import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Ingreso from './Pages/Ingreso';
import CreacionUsuario from './Pages/Creacion_Usuario';
import AsignacionCitas from './Pages/Asignacion_citas';
import TotemCliente from './Pages/Totem_Cliente';
import Reportesp from './Pages/Reportesp';
import LlamadoTurnos from './Pages/Llamado_Turnos';
import Menu from './Pages/Menu';
import RecuperacionC from './Pages/Recuperacion';
import CambioPC from './Pages/CambioP';
import ModificacionU from './Pages/Modificacion_Usuario';
import ServiciosT from './Pages/Servicios_Totem';
import OtrosS from './Pages/Otros_Servicios';
import Televisor from './Pages/Televisor_Llamado';
import GestionUsuarios from './Pages/Gestion_Usuarios';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ingreso" element={<Ingreso />} />
        <Route path="/creacion-usuario" element={<CreacionUsuario />} />
        <Route path="/" element={<Layout />}>
          <Route path="/menu" element={<Menu />} />
          <Route path="/gestion-usuarios" element={<GestionUsuarios />} />
          <Route path="/asignacion-citas" element={<AsignacionCitas />} />
          <Route path="/reportes" element={<Reportesp />} />
          <Route path="/llamados" element={<LlamadoTurnos />} />
          <Route path="/Recuperacion" element={<RecuperacionC />} />
          <Route path="/CambioContrasena" element={<CambioPC />} />
          <Route path="/Modificacion_Usuario" element={<ModificacionU />} />
          <Route path="/Totem_Cliente" element={<TotemCliente />} />
          <Route path="/Servicios_Totem" element={<ServiciosT />} />
          <Route path="/Otros_Servicios" element={<OtrosS />} />
          <Route path="/Televisor_Llamado" element={<Televisor />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
