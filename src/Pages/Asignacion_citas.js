import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Asignacion_Citas.css';

const AsignacionCitas = () => {
  const [citas, setCitas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCita, setEditingCita] = useState(null);
  const [citaToDelete, setCitaToDelete] = useState(null);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    Entidad: '',
    Servicio_Agendado: '',
    Fecha_cita: '',
    Observaciones: '',
    Usuarios_Id_Usuarios: '',
    Identificacion_Cliente: ''
  });

  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/usuarios', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const usuariosData = Array.isArray(response.data) ? response.data : 
                          response.data.data ? response.data.data : 
                          [];
      
      console.log('Datos de usuarios recibidos:', usuariosData);
      setUsuarios(usuariosData);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      setNotification({ type: 'error', message: 'Error al cargar la lista de usuarios' });
      setUsuarios([]);
    }
  };

  const fetchCitas = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/citas', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const citasData = Array.isArray(response.data) ? response.data : 
                       response.data.data ? response.data.data : 
                       [];
      
      console.log('Datos de citas recibidos:', citasData);
      setCitas(citasData);
      setError(null);
    } catch (err) {
      console.error('Error al cargar citas:', err);
      setError('Error al cargar las citas. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitas();
    fetchUsuarios();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editingCita) {
        await axios.put(`http://localhost:3000/api/citas/${editingCita.Id_cita}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setNotification({ type: 'success', message: 'Cita actualizada exitosamente' });
      } else {
        await axios.post('http://localhost:3000/api/citas', formData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setNotification({ type: 'success', message: 'Cita creada exitosamente' });
      }
      setShowModal(false);
      fetchCitas();
      resetForm();
    } catch (err) {
      console.error('Error al procesar la cita:', err);
      setNotification({ type: 'error', message: 'Error al procesar la cita' });
    }
  };

  const handleEdit = (cita) => {
    setEditingCita(cita);
    setFormData({
      Entidad: cita.Entidad || '',
      Servicio_Agendado: cita.Servicio_Agendado || '',
      Fecha_cita: cita.Fecha_cita ? new Date(cita.Fecha_cita).toISOString().slice(0, 16) : '',
      Observaciones: cita.Observaciones || '',
      Usuarios_Id_Usuarios: cita.Usuarios_Id_Usuarios || '',
      Identificacion_Cliente: cita.Identificacion_Cliente || ''
    });
    setShowModal(true);
  };

  const handleDelete = (cita) => {
    setCitaToDelete(cita);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/citas/${citaToDelete.Id_cita}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNotification({ type: 'success', message: 'Cita eliminada exitosamente' });
      setShowDeleteModal(false);
      fetchCitas();
    } catch (err) {
      console.error('Error al eliminar la cita:', err);
      setNotification({ type: 'error', message: 'Error al eliminar la cita' });
    }
  };

  const resetForm = () => {
    setFormData({
      Entidad: '',
      Servicio_Agendado: '',
      Fecha_cita: '',
      Observaciones: '',
      Usuarios_Id_Usuarios: '',
      Identificacion_Cliente: ''
    });
    setEditingCita(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  if (loading) return <div className="loading">Cargando citas...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="asignacion-citas-container">
      <div className="page-header">
        <h1>Asignación de Citas</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          Asignar Nueva Cita
        </button>
      </div>

      <div className="table-container">
        <table className="citas-table">
          <thead>
            <tr>
              <th>Entidad</th>
              <th>Servicio</th>
              <th>Fecha</th>
              <th>Observaciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas && citas.length > 0 ? (
              citas.map((cita) => (
                <tr key={cita.id || cita.Id_cita}>
                  <td>{cita.Entidad}</td>
                  <td>{cita.Servicio_Agendado}</td>
                  <td>{new Date(cita.Fecha_cita).toLocaleString()}</td>
                  <td>{cita.Observaciones || 'Sin observaciones'}</td>
                  <td>
                    <button className="btn-editar" onClick={() => handleEdit(cita)}>
                      Editar
                    </button>
                    <button className="btn-eliminar" onClick={() => handleDelete(cita)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  No hay citas registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para crear/editar cita */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingCita ? 'Editar Cita' : 'Nueva Cita'}</h2>
              <button className="modal-close" onClick={handleCloseModal}>&times;</button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Entidad:</label>
                <input
                  type="text"
                  name="Entidad"
                  className="form-control"
                  value={formData.Entidad}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Servicio Agendado:</label>
                <input
                  type="text"
                  name="Servicio_Agendado"
                  className="form-control"
                  value={formData.Servicio_Agendado}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Fecha de Cita:</label>
                <input
                  type="datetime-local"
                  name="Fecha_cita"
                  className="form-control"
                  value={formData.Fecha_cita}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Observaciones:</label>
                <textarea
                  name="Observaciones"
                  className="form-control"
                  value={formData.Observaciones}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Usuario:</label>
                <select
                  name="Usuarios_Id_Usuarios"
                  className="form-control"
                  value={formData.Usuarios_Id_Usuarios}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un usuario</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.Id_Usuario} value={usuario.Id_Usuario}>
                      {usuario.Nombre} {usuario.Apellido}({usuario.Tipo_Usuario})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Identificación del Cliente:</label>
                <input
                  type="text"
                  name="Identificacion_Cliente"
                  className="form-control"
                  value={formData.Identificacion_Cliente}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese la identificación del cliente"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingCita ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar */}
      {showDeleteModal && citaToDelete && (
        <div className="modal-overlay">
          <div className="modal-content delete-modal">
            <div className="modal-header">
              <h2>Confirmar Eliminación</h2>
              <button className="modal-close" onClick={() => setShowDeleteModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="delete-cita-info">
                <p><strong>Entidad:</strong> {citaToDelete.Entidad}</p>
                <p><strong>Servicio:</strong> {citaToDelete.Servicio_Agendado}</p>
                <p><strong>Fecha:</strong> {new Date(citaToDelete.Fecha_cita).toLocaleString()}</p>
              </div>
              <div className="delete-warning">
                ¿Está seguro que desea eliminar esta cita? Esta acción no se puede deshacer.
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </button>
              <button className="btn-danger" onClick={handleDeleteConfirm}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notificación */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default AsignacionCitas;