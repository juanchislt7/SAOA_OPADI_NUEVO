import React, { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import '../CSS/Llamado_Turnos.css';

const Llamado_Turnos = () => {
  const { data, loading, error, fetchData, createData } = useApi('/llamados');
  const [formData, setFormData] = useState({
    Fecha_Atencion: '',
    Hora_Atencion: '',
    Servicio_Atendido: '',
    Cliente_Id_Cliente: ''
  });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createData(formData);
      setFormData({
        Fecha_Atencion: '',
        Hora_Atencion: '',
        Servicio_Atendido: '',
        Cliente_Id_Cliente: ''
      });
      fetchData();
    } catch (err) {
      console.error('Error al crear llamado:', err);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='password-recovery-containerC'>
      <h1>Registro de Llamado</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fecha de Atención:</label>
          <input type="date" name="Fecha_Atencion" value={formData.Fecha_Atencion} onChange={handleChange} required />
        </div>
        <div>
          <label>Hora de Atención:</label>
          <input type="time" name="Hora_Atencion" value={formData.Hora_Atencion} onChange={handleChange} required />
        </div>
        <div>
          <label>Servicio Atendido:</label>
          <input type="text" name="Servicio_Atendido" value={formData.Servicio_Atendido} onChange={handleChange} required />
        </div>
        <div>
          <label>ID Cliente:</label>
          <input type="number" name="Cliente_Id_Cliente" value={formData.Cliente_Id_Cliente} onChange={handleChange} required />
        </div>
        <button type="submit">Registrar Llamado</button>
      </form>

      <h2>Lista de Llamados</h2>
      {data?.data.map(llamado => (
        <div key={llamado.id}>
          <h3>Cliente ID: {llamado.Cliente_Id_Cliente}</h3>
          <p>Servicio: {llamado.Servicio_Atendido}</p>
          <p>Fecha: {new Date(llamado.Fecha_Atencion).toLocaleDateString()}</p>
          <p>Hora: {llamado.Hora_Atencion}</p>
        </div>
      ))}
    </div>
  );
};

export default Llamado_Turnos;