🔄 Flujo de trabajo para cada feature

1.- Crear rama:

    Desde tu terminal, estando en la carpeta del proyecto:

    git checkout main        # asegurarte de estar en main
    git pull origin main     # traerte la última versión de GitHub
    git checkout -b feature/nombre


2.-Hacer cambios, probar.

3.-Commit y push:

    git add .
    git commit -m "feat: crear index.html con estructura semántica"
    git push -u origin feature/estructura-html


4.-En GitHub → abrir Pull Request hacia main.

5.-Revisar, hacer merge a main.
    Puedes escribir un resumen profesional, ejemplo:

        ✨ Estructura inicial

        Se crean todas las páginas requeridas (index, productos, blogs, etc.).

        Se incluye HTML semántico mínimo (header, main, footer).

6.-Crear la siguiente rama:

    git checkout main
    git pull origin main
    git checkout -b feature/otroNombre

------------------------------------------------------
1) Convenciones de nombres
Ramas

feature/<kebab-case> – nuevas funcionalidades
Ej: feature/estructura-html, feature/bootstrap-layout, feature/react-migration

fix/<kebab-case> – correcciones de bugs
Ej: fix/validacion-form-registro

chore/<kebab-case> – tareas de mantenimiento
Ej: chore/config-eslint

hotfix/<kebab-case> – parche urgente sobre main

🔑 Convención usada para commit:

<tipo>(alcance opcional): <resumen en presente y conciso>

Tipos más usados:
feat     -> nueva funcionalidad
fix      -> corrección de bug
refactor -> cambio interno sin funcionalidad nueva (mejora de código)
style    -> estilos/markup sin lógica (CSS, formateo)
chore    -> tareas menores (config, scripts, limpieza)
docs     -> documentación
test     -> tests (Jasmine/Karma, etc.)
build    -> cambios de build, deps
ci       -> pipelines, acciones

Ejemplos:

feat(producto): abrir modal agenda con SKU

fix(auth): corregir validación de token expirado

style(forms): ajustar spacing en inputs

chore: actualizar .gitignore y scripts npm

Regla de oro: un commit = una idea/cambio coherente.

2) Mantener tu rama al día con main

Opción A: merge (simple y seguro)
git checkout <tu-rama>
git fetch origin
git merge origin/main     # crea un commit de merge
# resolver conflictos si aparecen
git add .
git commit                # si Git lo requiere tras resolver
git push

Opción B: rebase (historial más lineal)
git checkout <tu-rama>
git fetch origin
git rebase origin/main    # re-aplica tus commits encima de main
# resolver conflictos (git add .) y continuar
git rebase --continue
git push --force-with-lease


Usa merge si estás comenzando. Cuando te sientas cómoda, prueba rebase para un historial más limpio.

3) Enfoque para la migración a React

Crea una rama dedicada:

git checkout main
git pull origin main
git checkout -b feature/react-migration


Sugerencia de sub-tareas (y commits):

chore: inicializar proyecto React (Vite/CRA) y .gitignore

feat(router): configurar rutas (home, productos, producto/:sku, blogs, blog/:id, nosotros, contacto, login, registro)

feat(ui): migrar layout con Bootstrap/React-Bootstrap o clases

feat(state): crear store simple (Context/Redux/Zustand) para auth y carrito

feat(producto): migrar lógica de agenda (modal) y SKU

feat(forms): migrar validaciones con React Hook Form/Yup (si te enseña el ramo, sino HTML5 primero)

refactor: separar componentes (Navbar, Footer, Card, ModalAgenda, etc.)

chore: scripts npm, lint, prettier

docs: actualizar README con instrucciones de ejecución

Tip: mantén la app clásica y la de React en carpetas separadas mientras migras, o crea un repo nuevo para la app React.

###################################################################################################################################
Comandos de bolsillo

# iniciar repo
git init
git remote add origin <URL>

# estado y diferencias
git status
git diff
git log --oneline --graph --decorate --all

# staging y commit
git add .
git commit -m "feat: mensaje"

# ramas
git branch
git checkout -b feature/react-migration
git switch -c feature/react-migration      # alternativa moderna
git switch main

# sincronización
git fetch origin
git pull origin main
git push -u origin feature/react-migration
git push

# merge y rebase
git merge origin/main
git rebase origin/main
git rebase --continue
git rebase --abort

# arreglar último commit (mensaje o añadir archivos)
git commit --amend
# (si ya lo subiste, push con --force-with-lease)
git push --force-with-lease

# descartar cambios locales de un archivo
git checkout -- ruta/archivo
# o
git restore ruta/archivo
