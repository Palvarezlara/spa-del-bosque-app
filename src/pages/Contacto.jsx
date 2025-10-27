
import ContactForm from "../components/ContactForm";

export default function Contacto() {
  return (
    <main className="py-5">
      <div className="container" style={{ maxWidth: 720 }}>
        <h1 className="h3 mb-4">Contacto</h1>

        <div className="card shadow-sm">
          <div className="card-body">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
