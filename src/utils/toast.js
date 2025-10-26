import Toast from 'bootstrap/js/dist/toast';

export function showToast(msg, variant = "success", delay = 1600) {
  const area = document.getElementById("toastArea");
  if (!area) return;

  const el = document.createElement("div");
  el.className = `toast align-items-center text-bg-${variant} border-0`;
  el.setAttribute("role", "status");
  el.setAttribute("aria-live", "polite");
  el.setAttribute("aria-atomic", "true");
  el.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${msg}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
    </div>
  `;
  area.appendChild(el);


  const toast = new Toast(el, { delay });
  toast.show();
  el.addEventListener("hidden.bs.toast", () => el.remove());
}
