# CoachSport.

**Funcionalidades Principal**

- Auth: Registro, Login y Logout con Firebase.
- Roles: Niveles de acceso para Admin y Cliente.
- Membresías: Diferenciación entre Usuario Free y Premium (Pago).
- Entrenamiento, Biblioteca, Progreso, Gestión, Persistencia.

**Suscripciones**

- (Stripe / Mercado Pago)

  **Deploy**

- Vercel

# Metodología: Vibe Coding & Refactor

El desarrollo se divide en dos fases:

- Fase Vibe (UI/UX): Generación masiva de componentes, layouts y flujos visuales utilizando prompts de IA. Objetivo: llegar al MVP visual en tiempo récord.

- Fase de Adaptación (Coding):
  - Tipado: Sustituir los any generados por interfaces de TypeScript reales.
  - Data Binding: Conectar los componentes "vibe-coded" con Firestore y Firebase Auth y eliminar todo lo de localStorage que se uso para un Mockup/Demo.
  - Lógica de Pagos: Implementar manualmente el flujo de Stripe/Mercado Pago y Webhooks en Vercel para asegurar la integridad de las transacciones.
  - Seguridad: Escribir las Firestore Rules para proteger los datos que la IA dejó abiertos por defecto(Vamos a validar desde el front y desde el back).

# Proceso

## Para crear un proyecto nuevo en PNPM.

```bash
    pnpm create next-app@latest . --typescript
```

Para usar un gestor distinto a **pnpm**:

- **pnpm:** `pnpm create next-app@latest . --typescript`
- **npm:** `npx create-next-app@latest . --typescript`
- **yarn:** `yarn create next-app . --typescript`
- **bun:** `bun create next-app@latest . --typescript`

## Instalar dependencias.

Para instalar los paquetes necesarios:

```bash
# Con pnpm
pnpm install

# Con npm
npm install

# Con yarn
yarn install
```

## Correr proyecto.

| Acción         | pnpm         | npm             | yarn         |
| :------------- | :----------- | :-------------- | :----------- |
| **Desarrollo** | `pnpm dev`   | `npm run dev`   | `yarn dev`   |
| **Build**      | `pnpm build` | `npm run build` | `yarn build` |
| **Producción** | `pnpm start` | `npm run start` | `yarn start` |

## Stack

- React, TypeScript, TailwindCSS

## Auth y DB

Para el Auth y Base de datos vamos a utilizar Firebase y Firestore.

[GOOGLE FIREBASE](https://firebase.google.com/)

- Firebase y Firestore Database.

### Instalar Firebase

Desde la terminal del proyecto:

```bash
pnpm add firebase
```

Con esto ya podemos configurar el Auth utilizando lo que nos da la consola de Firebase.

Luego para reglas de validacion basicas en la base de datos vamos a usar **Rules** en Firestore, pero esto no va a ser suficiente ya que podemos validar lo minimo, vamos a necesitar **Cloud Functions**

Para esto lo instalamos de la siguiente manera desde la terminal:

```bash
pnpm add -g firebase-tools
```

Cuando intentamos instalar tuvimos un pequeño error con pnpm:

```bash
 ERR_PNPM_NO_GLOBAL_BIN_DIR  Unable to find the global bin directory
```

Para solucionarlo usamos:

```bash
pnpm setup
```

Luego cerramos e iniciamos terminal nuevamente para asegurar que tome las variables de entorno, y volvemos a ejecutar `pnpm add -g firebase-tools`
