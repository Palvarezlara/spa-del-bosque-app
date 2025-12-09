import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const reservasPorMes = [
  { mes: "Ago", reservas: 22 },
  { mes: "Sep", reservas: 35 },
  { mes: "Oct", reservas: 28 },
  { mes: "Nov", reservas: 40 },
  { mes: "Dic", reservas: 32 },
];

const AdminReporte = () => {
  return (
    <div className="container py-4">
      <h1 className="h4 mb-3">Reportes de gestión</h1>
      <p className="text-muted mb-4">
        Ejemplo de reportes para el SPA del Bosque. En una siguiente etapa estos
        datos se conectarán al microservicio de reservas/ventas.
      </p>

      {/* Gráfico principal */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Reservas por mes</h5>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={reservasPorMes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reservas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <small className="text-muted">
            Datos de ejemplo utilizados solo con fines académicos.
          </small>
        </div>
      </div>

      {/* Tabla resumen dummy */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Últimas reservas (ejemplo)</h5>
          <div className="table-responsive">
            <table className="table table-sm align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>R-101</td>
                  <td>Pamela Álvarez</td>
                  <td>Masaje relajación 60 min</td>
                  <td>09-12-2025</td>
                  <td><span className="badge bg-success">Completada</span></td>
                </tr>
                <tr>
                  <td>R-102</td>
                  <td>Juan Soto</td>
                  <td>Circuito de aguas</td>
                  <td>10-12-2025</td>
                  <td><span className="badge bg-warning text-dark">Pendiente</span></td>
                </tr>
                <tr>
                  <td>R-103</td>
                  <td>Milenka Díaz</td>
                  <td>Masaje piedras calientes</td>
                  <td>10-12-2025</td>
                  <td><span className="badge bg-secondary">Cancelada</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <small className="text-muted">
            Esta tabla también es un placeholder para el futuro microservicio de reservas.
          </small>
        </div>
      </div>
    </div>
  );
};

export default AdminReporte;
