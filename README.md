# Ya-pe App

Aplicación web de billetera digital inspirada en aplicaciones de pagos móviles peruanas. Proyecto educativo desarrollado con React y Tailwind CSS.

![Ya-pe](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3.0-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Características

- ✅ **Sistema de autenticación** - Login y registro de usuarios
- 💰 **Dashboard interactivo** - Visualización de saldo y transacciones
- 📱 **Carrusel de promociones** - Ofertas de marcas reales con swipe
- 💸 **Envío de dinero** - Sistema completo de transferencias
- 👥 **Gestión de contactos** - Favoritos y contactos recientes
- ✏️ **Entrada manual** - Registro de nuevos destinatarios
- ✨ **Pantalla de confirmación** - Con animación de confeti
- 📊 **Historial de movimientos** - Listado de transacciones
- 📱 **Diseño responsive** - Optimizado para móviles
- 🎨 **Interfaz moderna** - Diseño profesional y atractivo

## 🚀 Demo en vivo

[Ver demo desplegada en Vercel](https://tu-proyecto-ya-pe.vercel.app) *(Actualiza este link después de desplegar)*

## 📸 Screenshots

### Pantalla de Login
![Login](./screenshots/login.png)

### Dashboard Principal
![Home](./screenshots/home.png)

### Envío de Dinero
![Send](./screenshots/send.png)

### Confirmación Exitosa
![Success](./screenshots/success.png)

## 🛠️ Tecnologías

- **React 18.2** - Biblioteca de JavaScript para interfaces de usuario
- **Tailwind CSS 3.3** - Framework de CSS utilitario
- **Lucide React** - Biblioteca de iconos
- **React Scripts** - Herramientas de desarrollo

## 📦 Instalación

### Prerrequisitos

- Node.js 14+ 
- npm o yarn

### Pasos de instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/ya-pe.git
cd ya-pe
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Instala Tailwind CSS**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. **Inicia el servidor de desarrollo**
```bash
npm start
```

5. **Abre tu navegador en** [http://localhost:3000](http://localhost:3000)

## 🏗️ Scripts disponibles

### `npm start`
Inicia el servidor de desarrollo en modo local.

### `npm run build`
Compila la aplicación para producción en la carpeta `build`.

### `npm test`
Ejecuta los tests en modo interactivo.

### `npm run eject`
⚠️ **Operación irreversible.** Expone la configuración de webpack.

## 📂 Estructura del proyecto
```
ya-pe/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Confetti.jsx           # Animación de confeti
│   │   ├── HomeScreen.jsx         # Pantalla principal
│   │   ├── LoginScreen.jsx        # Pantalla de login
│   │   ├── PromoBanner.jsx        # Carrusel de promociones
│   │   ├── SendMoneyScreen.jsx    # Flujo de envío de dinero
│   │   ├── SettingsScreen.jsx     # Configuración
│   │   ├── SuccessScreen.jsx      # Confirmación exitosa
│   │   └── TransactionCard.jsx    # Tarjeta de transacción
│   ├── styles/
│   │   └── globals.css            # Estilos globales
│   ├── utils/
│   │   └── helpers.js             # Funciones auxiliares
│   ├── App.js                     # Componente principal
│   └── index.js                   # Punto de entrada
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Componentes principales

### `LoginScreen`
Sistema de autenticación con registro e inicio de sesión.

### `HomeScreen`
Dashboard principal con:
- Carrusel de promociones
- Acciones rápidas
- Saldo disponible
- Historial de transacciones

### `SendMoneyScreen`
Flujo completo de envío de dinero con 4 pasos:
1. Selección de contacto o entrada manual
2. Ingreso de monto
3. Confirmación de datos
4. Pantalla de éxito con confeti

### `PromoBanner`
Carrusel swipeable con promociones de:
- Dunkin' Donuts
- Starbucks
- Adidas
- Cineplanet
- KFC
- Rappi
- Nike
- Papa John's

## 🎯 Funcionalidades destacadas

### Envío de dinero
```javascript
// Flujo completo de transferencia
1. Seleccionar contacto o ingresar manualmente
2. Validación de número (9 dígitos, comienza con 9)
3. Ingreso de monto con validación de saldo
4. Confirmación de transacción
5. Pantalla de éxito animada
```

### Validaciones implementadas
- ✅ Número de celular: 9 dígitos, debe comenzar con 9
- ✅ Saldo suficiente para transferencias
- ✅ Campos obligatorios en login y registro
- ✅ Formato de moneda peruano (S/)

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (320px - 480px)
- 📱 Tablets (481px - 768px)
- 💻 Desktop (769px+)

Características móviles:
- Banner inferior fijo siempre visible
- Scroll optimizado para touch
- Prevención de pull-to-refresh
- Tamaño máximo de 448px en pantallas grandes

## 🚀 Despliegue

### Desplegar en Vercel

1. **Instala Vercel CLI**
```bash
npm install -g vercel
```

2. **Login en Vercel**
```bash
vercel login
```

3. **Despliega**
```bash
vercel --prod
```

### O desde GitHub

1. Push tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. Vercel detectará automáticamente React
5. Click en "Deploy"

### Configuración de Vercel
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Notas importantes

### Datos de prueba

Para testing puedes usar:
- **Teléfono**: Cualquier número de 9 dígitos que comience con 9
- **Contraseña**: Cualquier contraseña
- **Saldo inicial**: S/ 1,250.00

### Limitaciones actuales

- ❌ Sin backend real (datos en memoria)
- ❌ Sin persistencia de datos
- ❌ Sin autenticación real
- ❌ Transacciones simuladas

### Funcionalidades futuras

- 🔜 Integración con backend real
- 🔜 Base de datos para persistencia
- 🔜 Autenticación JWT
- 🔜 Códigos QR funcionales
- 🔜 Historial completo de transacciones
- 🔜 Notificaciones push
- 🔜 Modo oscuro

## 🐛 Problemas conocidos

- Los warnings de `@tailwind` en VS Code son normales y no afectan funcionalidad
- La app no persiste datos al recargar (por diseño, sin backend)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).

## 👨‍💻 Autor

**ValenPRO**

## 🙏 Agradecimientos

- Inspirado en Yape (BCP - Banco de Crédito del Perú)
- Iconos por [Lucide](https://lucide.dev)
- Estilos con [Tailwind CSS](https://tailwindcss.com)

---

⭐ Si te gustó este proyecto, dale una estrella en GitHub!

Hecho con ❤️ en Perú 🇵🇪
```

---

## 📸 Bonus: Carpeta de Screenshots

Crea una carpeta `screenshots/` en la raíz de tu proyecto y agrega capturas de pantalla de tu app para que se vean en el README.
```
ya-pe/
├── screenshots/
│   ├── login.png
│   ├── home.png
│   ├── send.png
│   └── success.png
├── src/
├── public/
└── README.md



**OJO: Esta app no esta hecha para fines de estafa o phishing , es solo una app de broma o prueba**
