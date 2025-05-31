import React, { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import '../CSS/Reportes.css';

const Reportesp = () => {
  const { data, loading, error, fetchData, createData } = useApi('/asistencias');
  const [formData, setFormData] = useState({
    Estado_Cliente: '',
    Fecha_Asistencia: '',
    Hora_Asistencia: '',
    Cliente_Id_cliente: ''
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
        Estado_Cliente: '',
        Fecha_Asistencia: '',
        Hora_Asistencia: '',
        Cliente_Id_cliente: ''
      });
      fetchData();
    } catch (err) {
      console.error('Error al crear asistencia:', err);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='password-recovery-containerC'>
      <h1>Registro de Asistencia</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Estado del Cliente:</label>
          <input type="text" name="Estado_Cliente" value={formData.Estado_Cliente} onChange={handleChange} required />
        </div>
        <div>
          <label>Fecha de Asistencia:</label>
          <input type="date" name="Fecha_Asistencia" value={formData.Fecha_Asistencia} onChange={handleChange} required />
        </div>
        <div>
          <label>Hora de Asistencia:</label>
          <input type="time" name="Hora_Asistencia" value={formData.Hora_Asistencia} onChange={handleChange} required />
        </div>
        <div>
          <label>ID Cliente:</label>
          <input type="number" name="Cliente_Id_cliente" value={formData.Cliente_Id_cliente} onChange={handleChange} required />
        </div>
        <button type="submit">Registrar Asistencia</button>
      </form>

      <h2>Lista de Asistencias</h2>
      {data?.data.map(asistencia => (
        <div key={asistencia.id}>
          <h3>Cliente ID: {asistencia.Cliente_Id_cliente}</h3>
          <p>Estado: {asistencia.Estado_Cliente}</p>
          <p>Fecha: {new Date(asistencia.Fecha_Asistencia).toLocaleDateString()}</p>
          <p>Hora: {asistencia.Hora_Asistencia}</p>
        </div>
      ))}
    </div>
  );
};

export default Reportesp;