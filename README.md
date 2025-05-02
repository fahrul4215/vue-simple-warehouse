# Warehouse Frontend

A Vue.js single-page application for managing products in a simple warehouse system. It connects to a Go backend (`warehouse-backend`) via a JWT‑protected REST API and provides full CRUD, filtering, pagination, CSV export, and barcode display.

---

## Requirements

- **Node.js** v16 or higher
- **npm** v8 or higher (or Yarn)
- **Tailwind CSS** v3
- **Go Backend** running at `http://localhost:8080` (see [warehouse-backend](https://github.com/fahrul4215/go-simple-warehouse))

---

## Installation

1. **Install dependencies**

   ```bash
   # Core libraries
   npm install axios pinia vue-router@4

   # Tailwind CSS v3 and its PostCSS plugins
   npm install -D tailwindcss@^3 postcss@^8 autoprefixer@^10

   # Initialize Tailwind config
   npx tailwindcss@^3 init -p
   ```

2. **Configure environment variables**
   Create a file named `.env` in the project root with:

   ```ini
   VITE_API_BASE_URL=http://localhost:8080
   ```

   > This URL should point to your running Go backend.

---

## Available Scripts

- **`npm run dev`**: Start the Vite development server (normally on `http://localhost:5173`).
- **`npm run build`**: Bundle the app for production into the `dist/` folder.
- **`npm run serve`**: (Optional) Serve the production build locally for testing.

---

## Project Structure

```plaintext
warehouse-frontend/
├── src/
│   ├── assets/           # static assets
│   ├── components/       # reusable Vue components
│   ├── pages/            # route-level page components
│   ├── router/           # vue-router configuration
│   ├── services/         # API client modules (axios)
│   ├── store/            # Pinia state stores
│   ├── App.vue           # root component
│   ├── main.js           # app bootstrap
│   └── index.css         # Tailwind CSS import
├── .env                  # environment variables
├── tailwind.config.js    # Tailwind v3 config
├── postcss.config.js     # PostCSS plugins
├── package.json          # npm scripts & dependencies
└── vite.config.js        # Vite config
```

---

## License

MIT © Your Name
