import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/default-avatar.webp";
import { showToast } from "../utils/toast";

export default function Perfil() {
    const { user, isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const AVATAR_KEY = "spa_profile_avatar";

    const [perfil, setPerfil] = useState(null);
    const [foto, setFoto] = useState(null);

    // Cargar foto de perfil desde localStorage mejorar a futuro con backend
    useEffect(() => {
        const saved = localStorage.getItem(AVATAR_KEY);
        if (saved) setFoto(saved);
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }
        if (user) {
            setPerfil({
                nombre: user.nombre || "",
                apellido: user.apellido || "",
                correo: user.email || "",
                telefono: user.telefono || "",
                region: user.region || "",
                comuna: user.comuna || "",
            });
        }
    }, [isLoggedIn, navigate, user]);

    // Mock de historial de reservas (futuro GET /reservas/:userId)
    const [reservas, setReservas] = useState([
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
            const dataUrl = reader.result; // base64
            setFoto(dataUrl);
            localStorage.setItem(AVATAR_KEY, dataUrl);
        };
        reader.readAsDataURL(file);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
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
                                    <input type="text" className="form-control" value={perfil.nombre} readOnly />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small text-muted">Apellido</label>
                                    <input type="text" className="form-control" value={perfil.apellido} readOnly />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small text-muted">Correo</label>
                                    <input type="email" className="form-control" value={perfil.correo} readOnly />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small text-muted">Teléfono</label>
                                    <input type="text" className="form-control" value={perfil.telefono} readOnly />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small text-muted">Región</label>
                                    <input type="text" className="form-control" value={perfil.region} readOnly />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small text-muted">Comuna</label>
                                    <input type="text" className="form-control" value={perfil.comuna} readOnly />
                                </div>
                            </div>

                            <div className="d-flex justify-content-end mt-4">
                                <button className="btn btn-outline-success me-2" disabled>
                                    Editar datos (próx.)
                                </button>
                                <button className="btn btn-outline-danger" onClick={handleLogout}>
                                    Cerrar sesión
                                </button>
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
    );
}



