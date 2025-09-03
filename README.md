# AppTeam Web  

A full-stack web application built with the **MERN stack** (MongoDB, Express.js, React, Node.js) and styled with **Tailwind CSS**.  
The project is split into two parts:  

- **Frontend** (`frontend/`) → React (Vite) + Tailwind + Nginx  
- **Backend** (`backend/`) → Node.js + Express + MongoDB  

Both frontend and backend include **Dockerfiles** for containerized deployment.  

---

## 📂 Project Structure  

appTeam_web/
├── backend/              # Express + MongoDB backend
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── app.js            # Main server file
│   ├── connection.js     # DB connection config
│   ├── Dockerfile
│   └── package.json
│
├── frontend/             # React + Vite + Tailwind frontend
│   ├── public/           
│   ├── src/              # React components & pages
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── Dockerfile
│   └── package.json

---

## 🚀 Features  

- **Backend (Express + MongoDB)**  
  - RESTful API architecture  
  - Models & routes separated for clean structure  
  - MongoDB connection via `connection.js`  
  - Dockerized for deployment  

- **Frontend (React + Vite + Tailwind)**  
  - Fast Vite bundling  
  - TailwindCSS styling  
  - Configured with PostCSS and ESLint  
  - Nginx configuration for serving in production  

---

## ⚡ Getting Started  

### 1. Clone the repository  
git clone https://github.com/ayush00git/appTeam_web.git
cd appTeam_web

### 2. Setup Backend  
cd backend
npm install
# add your MongoDB URI in connection.js or as ENV variable
npm start

### 3. Setup Frontend  
cd frontend
npm install
npm run dev   # starts development server

---

## 🐳 Run with Docker  

Each service has its own `Dockerfile`. You can build and run them separately:  

# Backend
cd backend
docker build -t appteam-backend .
docker run -p 5000:5000 appteam-backend

# Frontend
cd frontend
docker build -t appteam-frontend .
docker run -p 3000:3000 appteam-frontend

Or you can add a `docker-compose.yml` later to orchestrate both.  

---

## ⚙️ Environment Variables  

Create a `.env` file inside `backend/` with:  

MONGO_URI=<your-mongodb-uri>
PORT=5000

(Optional for frontend if you use APIs)  

---

## 📜 Scripts  

### Backend  
- `npm start` → start Express server  
- `npm run dev` → (if nodemon configured) run in dev mode  

### Frontend  
- `npm run dev` → start Vite dev server  
- `npm run build` → build production bundle  
- `npm run preview` → preview production build  

---

## 🛠 Tech Stack  

- **Frontend:** React, Vite, TailwindCSS  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Deployment:** Docker  

---

## 🤝 Contributing  

1. Fork this repo  
2. Create your feature branch (`git checkout -b feature-name`)  
3. Commit changes (`git commit -m "Add feature"`)  
4. Push to branch (`git push origin feature-name`)  
5. Open a Pull Request  

---
