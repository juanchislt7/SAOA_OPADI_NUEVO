import '../CSS/Televisor.css';

function Televisor_Llamado() {

    return (

        <div class="tv-container">

        <div class="left-side">
            <h1>Turnos</h1>
            <ul>
                <li>Cliente: Juan Pérez - Turno 001</li>
                <li>Cliente: Ana Gómez - Turno 002</li>
            </ul>
        </div>


        <div class="right-side">
            <h1>Descripción del Turno</h1>
            <p>Turno 001: Cliente Juan Pérez, asignado para la consulta a las 10:30 AM.</p>
            <p>Turno 002: Cliente Ana Gómez, asignado para seguimiento a las 11:00 AM.</p>


            <div class="video-container">
                <h2>Video de Proyección</h2>
                <video width="100%" controls>
                    <source src="video.mp4" type="video/mp4"/>
                    Tu navegador no soporta el formato de video.
                </video>
            </div>
        </div>
    </div>

    )
}
export default Televisor_Llamado;