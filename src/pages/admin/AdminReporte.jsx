import React from "react";

const AdminReporte = () => {
    const path = typeof window !== "undefined" ? window.location.pathname : "";

    return (
        <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ marginBottom: 12 }}>Admin — Reporte (placeholder)</h1>

            <div
                style={{
                    border: "1px dashed #cfcfcf",
                    background: "#fafafa",
                    padding: 16,
                    borderRadius: 6,
                    maxWidth: 720,
                }}
            >
                <p style={{ margin: "0 0 8px 0", color: "#444" }}>
                    Esta vista es un placeholder para la ruta:
                </p>
                <pre
                    style={{
                        margin: 0,
                        padding: 10,
                        background: "#fff",
                        border: "1px solid #eee",
                        borderRadius: 4,
                        color: "#222",
                        overflowX: "auto",
                    }}
                >
                    {path}
                </pre>

                <p style={{ marginTop: 12, color: "#666" }}>
                    Implementar aquí el componente de reporte del panel de administración.
                </p>
            </div>
        </div>
    );
};

export default AdminReporte;