import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gestion_Usuarios.css';

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [usuarioToDelete, setUsuarioToDelete] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    ID_Usuario: '',
    Nombre: '',
    Apellido: '',
    Email: '',
    Tipo_Usuario: '',
    Estado: ''
  });

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 1
  });

  const fetchUsuarios = async (page = 1, limit = pagination.limit) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No hay token de autenticación');
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:3000/api/usuarios?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setUsuarios(response.data.data);
      setPagination({
        total: response.data.pagination.total,
        page: response.data.pagination.page,
        limit: response.data.pagination.limit,
        totalPages: response.data.pagination.totalPages
      });
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Sesión expirada. Por favor, vuelva a iniciar sesión.');
      } else {
        setError('Error al cargar los usuarios');
      }
      setLoading(false);
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchUsuarios(newPage);
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    fetchUsuarios(1, newLimit);
  };

  const handleEdit = (usuario) => {
    setEditingUser(usuario);
    setFormData({
      ID_Usuario: usuario.Id_Usuario,
      Nombre: usuario.Nombre || '',
      Apellido: usuario.Apellido || '',
      Email: usuario.Email || '',
      Tipo_Usuario: usuario.Tipo_Usuario || '',
      Estado: usuario.Estado || ''
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editingUser) {
        // Actualizar usuario existente
        const { ID_Usuario, ...userData } = formData;
        await axios.put(`http://localhost:3000/api/usuarios/${editingUser.Id_Usuario}`, userData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        showNotification('Usuario actualizado exitosamente', 'success');
      } else {
        // Crear nuevo usuario
        const { ID_Usuario, ...userData } = formData;
        await axios.post('http://localhost:3000/api/usuarios', userData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        showNotification('Usuario creado exitosamente', 'success');
      }
      setShowModal(false);
      setEditingUser(null);
      setFormData({
        ID_Usuario: '',
        Nombre: '',
        Apellido: '',
        Email: '',
        Tipo_Usuario: '',
        Estado: ''
      });
      fetchUsuarios(pagination.page);
    } catch (err) {
      console.error('Error al guardar el usuario:', err);
      showNotification(err.response?.data?.message || 'Error al guardar el usuario', 'error');
    }
  };

  const getEstadoUsuario = (estado) => {
    if (estado === "1") return "Activo (1)";
    if (estado === "0") return "Inactivo (0)";
    return "No definido";
  };

  const getTipoUsuario = (tipo) => {
    const tipos = {
      'registrador': 'Registrador',
      'operario_enlace': 'Operario Enlace',
      'coordinador_enlace': 'Coordinador Enlace',
      'operario_rnec': 'Operario RNEC'
    };
    return tipos[tipo] || 'No definido';
  };

  const handleDeleteClick = (usuario) => {
    setUsuarioToDelete(usuario);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!usuarioToDelete || !usuarioToDelete.ID_Usuario) {
      showNotification('Error: ID de usuario no válido', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/usuarios/${usuarioToDelete.ID_Usuario}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setShowDeleteModal(false);
      setUsuarioToDelete(null);
      showNotification('Usuario eliminado exitosamente', 'success');
      fetchUsuarios(pagination.page);
    } catch (err) {
      console.error('Error al eliminar usuario:', err);
      showNotification(err.response?.data?.message || 'Error al eliminar el usuario', 'error');
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setUsuarioToDelete(null);
  };

  if (loading) return <div className="loading">Cargando usuarios...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="gestion-usuarios-container">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <div className="page-header">
        <h1>Gestión de Usuarios</h1>
        <button className="btn btn-primary btn-crear-usuario" onClick={() => {
          setEditingUser(null);
          setFormData({
            ID_Usuario: '',
            Nombre: '',
            Apellido: '',
            Email: '',
            Tipo_Usuario: '',
            Estado: ''
          });
          setShowModal(true);
        }}>
          Crear Nuevo Usuario
        </button>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div className="records-per-page">
            <label htmlFor="recordsPerPage">Registros por página:</label>
            <select 
              id="recordsPerPage" 
              value={pagination.limit} 
              onChange={handleLimitChange}
              className="form-control"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        <table className="usuarios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Tipo Usuario</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.ID_Usuario}>
                <td>{usuario.ID_Usuario}</td>
                <td>{usuario.Nombre || 'No definido'}</td>
                <td>{usuario.Apellido || 'No definido'}</td>
                <td>{usuario.Email || 'No definido'}</td>
                <td>
                  <span className="tipo-usuario-badge">
                    {getTipoUsuario(usuario.Tipo_Usuario)}
                  </span>
                </td>
                <td>
                  <span className={`estado-badge ${getEstadoUsuario(usuario.Estado).toLowerCase()}`}>
                    {getEstadoUsuario(usuario.Estado)}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn-editar"
                    onClick={() => handleEdit(usuario)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn-eliminar"
                    onClick={() => handleDeleteClick(usuario)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(1)}
            disabled={pagination.page === 1}
            className="pagination-btn"
          >
            Primera
          </button>
          <button 
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="pagination-btn"
          >
            Anterior
          </button>
          <span className="pagination-info">
            Página {pagination.page} de {pagination.totalPages}
            <span className="total-records"> (Total: {pagination.total} registros)</span>
          </span>
          <button 
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className="pagination-btn"
          >
            Siguiente
          </button>
          <button 
            onClick={() => handlePageChange(pagination.totalPages)}
            disabled={pagination.page === pagination.totalPages}
            className="pagination-btn"
          >
            Última
          </button>
        </div>
      )}

      {showDeleteModal && usuarioToDelete && (
        <div className="modal-overlay">
          <div className="modal-content delete-modal">
            <div className="modal-header">
              <h2>Confirmar Eliminación</h2>
              <button className="modal-close" onClick={handleDeleteCancel}>×</button>
            </div>
            <div className="modal-body">
              <p>¿Está seguro que desea eliminar al usuario?</p>
              <div className="delete-user-info">
                <p><strong>Nombre:</strong> {usuarioToDelete.Nombre} {usuarioToDelete.Apellido}</p>
                <p><strong>Email:</strong> {usuarioToDelete.Email}</p>
                <p><strong>Tipo:</strong> {getTipoUsuario(usuarioToDelete.Tipo_Usuario)}</p>
              </div>
              <p className="delete-warning">Esta acción no se puede deshacer.</p>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleDeleteCancel}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                className="btn btn-danger" 
                onClick={handleDeleteConfirm}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="Nombre">Nombre</label>
                <input
                  type="text"
                  id="Nombre"
                  name="Nombre"
                  value={formData.Nombre}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="Apellido">Apellido</label>
                <input
                  type="text"
                  id="Apellido"
                  name="Apellido"
                  value={formData.Apellido}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="Tipo_Usuario">Tipo de Usuario</label>
                <select
                  id="Tipo_Usuario"
                  name="Tipo_Usuario"
                  value={formData.Tipo_Usuario}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="registrador">Registrador</option>
                  <option value="operario_enlace">Operario Enlace</option>
                  <option value="coordinador_enlace">Coordinador Enlace</option>
                  <option value="operario_rnec">Operario RNEC</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="Estado">Estado</label>
                <select
                  id="Estado"
                  name="Estado"
                  value={formData.Estado}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Seleccione un estado</option>
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionUsuarios; 