import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/default-avatar.webp";
import { showToast } from "../utils/toast";
import { updateUsuario } from "../api/userApi";
import REGIONES_COMUNAS from '../data/regiones';

export default function Perfil() {
  const { user, isLoggedIn, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const AVATAR_KEY = "spa_profile_avatar";

  const [perfil, setPerfil] = useState(null);
  const [foto, setFoto] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    region: "",
    comuna: "",
    fechaNacimiento: "",
  });


  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fecha máxima permitida: hoy menos 18 años
  const today = new Date();
  const maxBirthDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .slice(0, 10); // 'yyyy-MM-dd'


  // Cargar foto de perfil desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem(AVATAR_KEY);
    if (saved) setFoto(saved);
  }, []);

  // Cargar datos del usuario
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (user) {
      // Normalizar fecha para el input type="date"
      let fechaNacimiento = user.fechaNacimiento ?? "";
      if (fechaNacimiento) {
        // Si viene como "2025-12-09T00:00:00" o similar, nos quedamos con los primeros 10 caracteres
        fechaNacimiento = fechaNacimiento.toString().slice(0, 10);
      }

      const basePerfil = {
        nombre: user.nombres ?? user.nombre ?? "",
        apellido: user.apellidos ?? user.apellido ?? "",
        email: user.email ?? "",
        telefono: user.telefono ?? "",
        fechaNacimiento,
        region: user.region ?? "",
        comuna: user.comuna ?? "",
      };

      setPerfil(basePerfil);
      setForm(basePerfil);
    }
  }, [isLoggedIn, navigate, user]);


  // Mock de historial de reservas (futuro GET /reservas/:userId)
  const [reservas] = useState([
    {
      id: "R001",
      servicio: "Masaje de relajación",
      fecha: "12-04-2025",
      hora: "15:00",
      estado: "Completada",
    },
    {
      id: "R002",
      servicio: "Circuito de aguas",
      fecha: "03-05-2025",
      hora: "18:30",
      estado: "Pendiente",
    },
  ]);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setFoto(dataUrl);
      localStorage.setItem(AVATAR_KEY, dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSelect= (field) => (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [field]: value,
      // Si cambia la región, limpiamos comuna
      ...(field === "region" ? { comuna: "" } : {}),
      }));
  };
  const comunasDisponibles = form.region
            ? REGIONES_COMUNAS[form.region]
            : [];

  const handleStartEdit = () => {
    if (perfil) setForm(perfil);
    setEditing(true);
  };

  const handleCancelEdit = () => {
    if (perfil) setForm(perfil);
    setEditing(false);
  };

  const handleSave = async () => {
    if (!user) return;
    if (!form.nombre.trim() || !form.apellido.trim()) {
      showToast("error", "Nombre y apellido son obligatorios");
      return;
    }

    setSaving(true);
    try {
    
      const payload = {
        nombres: form.nombre.trim(),
        apellidos: form.apellido.trim(),
        telefono: form.telefono,
        region: form.region,
        comuna: form.comuna,
        fechaNacimiento: form.fechaNacimiento || null, // yyyy-MM-dd
      };

      const updated = await updateUsuario(user.id, payload);

      let fechaNacimientoNormalizada = updated.fechaNacimiento ?? "";
      if (fechaNacimientoNormalizada) {
          fechaNacimientoNormalizada = fechaNacimientoNormalizada.toString().slice(0, 10);
    }

      const nuevoPerfil = {
        nombre: updated.nombres,
        apellido: updated.apellidos,
        email: updated.email,
        telefono: updated.telefono,
        fechaNacimiento: fechaNacimientoNormalizada,
        region: updated.region ?? "",
        comuna: updated.comuna ?? "",
      };

      setPerfil(nuevoPerfil);
      setForm(nuevoPerfil);
      updateUserProfile(updated);

      showToast("success", "Perfil actualizado correctamente");
      setEditing(false);
    } catch (err) {
      console.error("Error al actualizar perfil", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "No se pudo actualizar el perfil.";
      showToast("error", msg);
    } finally {
      setSaving(false);
    }
  };

  if (!perfil) return null;

  return (
    <div className="container py-4 bg-mint-light rounded-4 shadow-sm">
      <h1 className="h3 mb-4">Mi perfil</h1>

      {/* Datos personales */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="row align-items-center">
            {/* Foto */}
            <div className="col-md-3 text-center">
              <div className="position-relative d-inline-block">
                <img
                  src={foto || defaultAvatar}
                  alt="Foto de perfil"
                  className="rounded-circle border border-3 border-success"
                  width="130"
                  height="130"
                  style={{ objectFit: "cover" }}
                />
                <label
                  htmlFor="fotoInput"
                  className="btn btn-outline-success btn-sm position-absolute start-50"
                  style={{ bottom: "-35px", transform: "translateX(-50%)" }}
                >
                  Cambiar
                </label>
                <input
                  type="file"
                  id="fotoInput"
                  accept="image/*"
                  className="d-none"
                  onChange={handleFotoChange}
                />
              </div>
            </div>

            {/* Datos */}
            <div className="col-md-9 mt-4 mt-md-0">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small text-muted">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.nombre}
                    onChange={handleChange("nombre")}
                    readOnly={!editing}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small text-muted">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.apellido}
                    onChange={handleChange("apellido")}
                    readOnly={!editing}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small text-muted">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    value={form.email}
                    readOnly // el correo no se edita
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small text-muted">Teléfono</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.telefono}
                    onChange={handleChange("telefono")}
                    readOnly={!editing}
                  />
                </div>
                <div className="col-md-6">
                    <label className="form-label small text-muted">
                      Fecha de nacimiento
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={form.fechaNacimiento || ""}
                      onChange={handleChange("fechaNacimiento")}
                      disabled={!editing}       
                      max={maxBirthDate}                      //no menores de 18 años
                      min="1900-01-01"                        //fecha mínima razonable
                    />
                </div>
                <div className="col-md-6">
                  <label className="form-label small text-muted">Región</label>
                  <select
                      className="form-select"
                      value={form.region}
                      onChange={handleSelect("region")}
                      disabled={!editing}
                    >
                      <option value="">Selecciona tu región</option>
                      {Object.keys(REGIONES_COMUNAS).map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label small text-muted">Comuna</label>
                  <select
                      className="form-select"
                      value={form.comuna}
                      onChange={handleSelect("comuna")}
                      disabled={!editing || !form.region} 
                    >
                      <option value="">Selecciona tu comuna</option>
                      {comunasDisponibles.map((comuna) => (
                        <option key={comuna} value={comuna}>
                          {comuna}
                        </option>
                      ))}
                  </select>
                </div>
              
              <div className="d-flex justify-content-end mt-4">
                {editing ? (
                  <>
                    <button
                      className="btn btn-outline-secondary me-2"
                      onClick={handleCancelEdit}
                      disabled={saving}
                    >
                      Cancelar
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? "Guardando..." : "Guardar cambios"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-outline-success me-2"
                      onClick={handleStartEdit}
                    >
                      Editar datos
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historial de reservas */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Historial de reservas</h5>
          {!reservas.length ? (
            <p className="text-muted">No tienes reservas registradas aún.</p>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Servicio</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Estado</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {reservas.map((r) => (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>{r.servicio}</td>
                      <td>{r.fecha}</td>
                      <td>{r.hora}</td>
                      <td>
                        <span
                          className={
                            "badge " +
                            (r.estado === "Completada"
                              ? "bg-success"
                              : r.estado === "Pendiente"
                              ? "bg-warning text-dark"
                              : "bg-secondary")
                          }
                        >
                          {r.estado}
                        </span>
                      </td>
                      <td className="text-end">
                        <button className="btn btn-outline-success btn-sm" disabled>
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>  
  );
}
