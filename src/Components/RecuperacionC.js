import '../CSS/Recuperacion.css';

function RecuperacionC() {

    return (
  
        <div>
        <h1>Recuperar Contraseña</h1>
        <form>
            <div class="form-group">
                <label for="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" placeholder="Ingrese su correo"/>
            </div>
            <div class="form-group">
                <button type="submit">Enviar Enlace</button>
            </div>
        </form>
    </div>
  )
  }
  
  export default RecuperacionC;