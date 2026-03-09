# Preguntados - Trivia Game

## Descripción

Aplicación web de trivia desarrollada como tarea académica. Permite a los usuarios jugar partidas de preguntas con opciones múltiples, guardar resultados y consultar el historial de juegos.

## Tecnologías Utilizadas

### Backend
- Node.js con Express
- Persistencia de datos en archivos JSON
- CORS para comunicación con frontend

### Frontend
- React con Vite
- CSS Modules para estilos
- Axios para llamadas HTTP
- Lucide React para iconos

## Requisitos del Sistema

- Node.js (versión 14 o superior)
- npm o yarn

## Instalación y Ejecución

### Backend
```bash
cd backend
npm install
npm start o npm run dev
```
El servidor se ejecutará en http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
La aplicación estará disponible en http://localhost:5173

## Funcionalidades

### Juego
- Ingreso de nombre del jugador
- 10 preguntas aleatorias de un banco de 25
- 3 opciones de respuesta por pregunta
- Retroalimentación inmediata después de cada respuesta
- Conteo de aciertos
- Victoria con 6 o más respuestas correctas

### Historial
- Visualización de todas las partidas jugadas
- Información de jugador, puntaje y resultado
- Tabla organizada con fechas

### Tema
- Modo claro y oscuro
- Persistencia de preferencia en localStorage

## Estructura del Proyecto

```
preguntados/
├── backend/
│   ├── server.js
│   ├── Data/
│   │   ├── questions.json
│   │   └── results.json
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── Pages/
│   │   │   ├── Home/
│   │   │   ├── Game/
│   │   │   └── Results/
│   │   ├── Components/
│   │   │   └── Historial/
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
└── README.md
```

## API Endpoints

### GET /api/questions/random
Devuelve 10 preguntas aleatorias con opciones y respuesta correcta.

### POST /api/questions/check
Verifica la respuesta del usuario.
- Body: { questionId, selectedOption }
- Respuesta: { isCorrect, correctAnswer }

### POST /api/results
Guarda el resultado de una partida.
- Body: { userName, score, win }

### GET /api/results
Devuelve todos los resultados guardados.

## Desarrollo

### Scripts Disponibles

#### Backend
- `npm run dev`: Inicia el servidor en modo desarrollo

#### Frontend
- `npm run dev`: Inicia el servidor de desarrollo


## Información Académica
Nombre del curso: Lenguajes de Programacion
Numero de semestre y ano lectivo: Semestre I, 2026
Nombre del Estudiante: Luis Carlos Trejos Rivera
Numero de carnet del estudiante: 2022437816
Numero de tarea: TC1
Fecha de entrega: 8 de marzo de 2026
Estatus de la entrega: Excelente

## Contribución

Proyecto académico individual. No se aceptan contribuciones externas.

## Licencia

Este proyecto es parte de una tarea académica y no tiene licencia específica.