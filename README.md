# Events Management Application

A full-stack application for managing events built with NestJS (backend) and React with TypeScript (frontend).

## Project Structure

This project consists of two main parts:

1. **Backend API** - NestJS REST API for managing events
2. **Frontend App** - React TypeScript application for the user interface

## Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd events-management
```

### 2. Set up and start the Backend API

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run start:dev
```

The API will be available at http://localhost:3000

### 3. Set up and start the Frontend App

```bash
# In a new terminal, navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The React application will be available at http://localhost:5173

## API Endpoints

- `GET /events` - List all events
- `POST /events` - Create a new event

## Project Features

### Backend (NestJS)

- RESTful API for event management
- Data validation for all inputs
- Proper error handling
- Unit tests for controllers

### Frontend (React + TypeScript)

- Responsive UI for both desktop and mobile
- Event listing page
- Event creation form with validation
- TypeScript for type safety
- Integration with the NestJS backend

## Event Properties

Each event has the following properties:

- **name** - Limited to 32 characters
- **description** - Optional description of the event
- **startDate** - When the event begins
- **endDate** - When the event ends (must be after startDate)
- **timezone** - The event's timezone

## Development

### Backend Testing

```bash
# Run unit tests
cd backend
npm run test
```

### Frontend Type Checking

```bash
# Run TypeScript type checking
cd frontend
npm run typecheck
```

## Building for Production

### Backend

```bash
cd backend
npm run build
```

### Frontend

```bash
cd frontend
npm run build
```

The production build will be output to the `dist` directory in each project.
