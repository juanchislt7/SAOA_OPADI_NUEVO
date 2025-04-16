import '../CSS/CambioP.css';

function CambioP() {

    return (

<div>
<h1>Escribe Nueva Contraseña</h1>
<form>
<div class="form-group">
        <label for="codigorecuperacion">Ingrese Codigo Verificación:</label>
        <input type="texto" id="texto" name="texto" placeholder="Codigo Verificación"/>
    </div>
    <div class="form-group">
        <label for="new-password">Nueva Contraseña:</label>
        <input type="password" id="new-password" name="new-password" placeholder="Nueva contraseña"/>
    </div>
    <div class="form-group">
        <label for="confirm-password">Confirmar Nueva Contraseña:</label>
        <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirmar contraseña"/>
    </div>
    <div class="form-group">
        <button type="submit">Restablecer</button>
    </div>
</form>
</div>
    )
}
export default CambioP;