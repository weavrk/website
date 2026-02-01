# WEAVRK Portfolio

A React-based portfolio website built with TypeScript, Tailwind CSS, and modern web technologies.

## Development Setup

### Starting the Development Server

The development server is configured to run on **port 3000** and will automatically kill any existing processes on that port before starting.

#### Option 1: Using npm scripts
```bash
npm start
# or
npm run start-clean
```

#### Option 2: Using the shell script
```bash
./start-dev.sh
```

### Port Configuration

- **Default Port**: 3000
- **Auto-kill**: Any existing processes on port 3000 are automatically terminated before starting
- **Environment**: Development server runs with hot reload enabled

### Available Scripts

- `npm start` - Starts the development server on port 3000 (kills existing processes)
- `npm run start-clean` - Same as start, with explicit clean naming
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App (irreversible)

## Technologies Used

- React 19.1.0
- TypeScript 4.9.5
- Tailwind CSS 3.4.3
- React Router DOM 7.6.3
- Framer Motion 12.19.2
- React Slick (for carousels)
- Swiper (for touch interactions)

## Project Structure

```
src/
├── components/     # Reusable React components
├── pages/         # Page components
├── data/          # Static data and configurations
├── utils/         # Utility functions
├── styles/        # Additional stylesheets
└── index.css      # Global styles and Tailwind imports
```

## Development Notes

- The server automatically kills any existing processes on port 3000 before starting
- Hot reload is enabled for development
- TypeScript strict mode is enabled
- Tailwind CSS is configured with custom design tokens
- Mobile-first responsive design approach
