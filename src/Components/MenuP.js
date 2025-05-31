import '../CSS/MenuP.css';

function MenuP() {

    return (

    <div class="menu-container">
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