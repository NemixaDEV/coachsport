# CoachSport.

## Para crear un proyecto nuevo en PNPM.

```bash
    pnpm create next-app@latest . --typescript
```

Si prefieres usar un gestor distinto a **pnpm**, utiliza el comando correspondiente:

- **pnpm:** `pnpm create next-app@latest . --typescript`
- **npm:** `npx create-next-app@latest . --typescript`
- **yarn:** `yarn create next-app . --typescript`
- **bun:** `bun create next-app@latest . --typescript`

## 2. Instalar dependencias

Para instalar los paquetes necesarios de un proyecto existente:

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
