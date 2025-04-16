import DatosCliente from '../Components/Datos_Cliente';
import AgendaCitas from '../Components/Agenda_Citas';
import Observaciones from '../Components/Observaciones';
import '../CSS/Agenda_CitasC.css';



function AsignacionCitas() {
  return (
    <div className='container'>
<DatosCliente/>
<AgendaCitas/>
<Observaciones/>
    </div>
  );
}

export default AsignacionCitas;