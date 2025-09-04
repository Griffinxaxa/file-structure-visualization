# GitHub Repo Tree Visualizer

A web application that allows users to input a GitHub repository URL and generates an ASCII tree visualization of the repository's file structure.

## Features

- Input any public GitHub repository URL
- Generates an ASCII tree structure of the repository
- Clean and modern UI
- Real-time visualization

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Dependencies:
  - simple-git: For cloning repositories
  - treeify: For generating ASCII trees
  - axios: For making HTTP requests

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd github-repo-tree-visualizer
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
node index.js
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

1. Enter a GitHub repository URL in the input field (e.g., `https://github.com/username/repo`)
2. Click "Generate Tree"
3. View the ASCII tree structure of the repository

## License

idk
