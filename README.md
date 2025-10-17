# Task Manager - Full Stack Application

A modern task management application built with React + TypeScript (Frontend) and FastAPI (Backend).

## 🚀 Live Demo

- **Frontend**: [https://task-manager-ui.vercel.app](https://task-manager-ui.vercel.app)
- **Backend API**: Running locally on `http://localhost:8000`
- **API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

## 📋 Features

- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter tasks (All, Pending, Completed)
- ✅ Generate and download PDF reports
- ✅ Responsive design with Tailwind CSS
- ✅ Real-time updates with Zustand state management
- ✅ RESTful API with FastAPI
- ✅ Type-safe with TypeScript

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- Zustand (State management)
- Axios (HTTP client)
- jsPDF (PDF generation)

### Backend
- Python 3.11
- FastAPI (Web framework)
- Pydantic (Data validation)
- Uvicorn (ASGI server)

## 📁 Project Structure
```
task-manager/
├── backend/          # FastAPI backend
│   ├── main.py
│   └── requirements.txt
├── frontend/         # React frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🏃‍♂️ Running Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

Backend runs on: http://localhost:8000

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

## 🌐 Deployment

- **Frontend**: Deployed on Vercel
- **Backend**: Running locally (default port 8000)

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a new task |
| GET | `/tasks/{id}` | Get task by ID |
| PUT | `/tasks/{id}` | Update a task |
| PATCH | `/tasks/{id}/toggle` | Toggle task completion |
| DELETE | `/tasks/{id}` | Delete a task |

## 👨‍💻 Author

Built as a technical assessment for Frontend Developer position.