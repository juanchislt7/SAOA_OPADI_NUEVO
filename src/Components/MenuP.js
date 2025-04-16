import '../CSS/MenuP.css';

function MenuP() {

    return (

        <div class="menu-container">
        <div class="sidebar">
            <h1>Menú Principal - Administrador</h1>
            <nav>
                <ul>
                    <li><a href="#">Administración de Usuarios</a></li>
                    <li><a href="#">Asignación de Citas</a></li>
                    <li><a href="#">Reportes</a></li>
                    <li><a href="#">Salir</a></li>
                </ul>
            </nav>
        </div>
        <div class="video-container">
            <h2>Espacio para Video</h2>
            <video width="100%" controls>
                <source src="video.mp4" type="video/mp4"/>
                Tu navegador no soporta el formato de video.
            </video>
        </div>
    </div>

    )
}
export default MenuP;