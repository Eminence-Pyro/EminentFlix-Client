# 🎬 EminentFlix

**EminentFlix** is a fullstack movie recommendation app built with **React**, **Express**, and **MongoDB**. Users can search movies via the TMDB API, register and log in, save favorite movies, and revisit them anytime.


## 🚀 Features

- 🔎 Search for movies using filters (year, rating, popularity)
- 🎥 View movie details with poster, rating, and overview
- ❤️ Save favorite movies to your account
- 🔐 Register and login with JWT-based authentication
- 🌙 Responsive UI with clean design

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Axios
- CSS Modules (Custom)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- Dotenv for environment config

---

## 📦 Folder Structure

### `/client`
- `src/components` – Navbar, Search
- `src/pages` – Login, Register, Favorites, MovieDetail
- `public` – Favicon, Manifest, Logo

### `/server`
- `models` – User, FavoriteMovie
- `routes` – Auth and Movie routes
- `middleware` – JWT verification
- `.env` – Database URI & Secret key



## 🧪 Running Locally

### 📦 Prerequisites
- Node.js and npm
- MongoDB installed or running via Atlas

### 🔧 Clone the project
```bash
git clone https://github.com/your-username/eminentflix.git
cd eminentflix
````

### 🔑 Setup Environment

Create `.env` in `/server`:

```env
MONGO_URI=mongodb://localhost:27017/movierecommender
JWT_SECRET=your_jwt_secret
PORT=5000
```

Create `.env` in `/client`:

```env
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
```

---

### ▶️ Start Development

Start the backend:

```bash
cd server
npm install
npm run dev
```

Start the frontend:

```bash
cd client
npm install
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📁 Deployment Instructions

### Backend (Render):

* Create a new service on [https://render.com](https://render.com)
* Point to your GitHub repo
* Set environment variables (`MONGO_URI`, `JWT_SECRET`)
* Choose Node environment and auto-deploy

### Frontend (Netlify):

* Build: `npm run build`
* Publish directory: `/client/build`
* Set `REACT_APP_TMDB_API_KEY` in environment settings



## 🙌 Author

**Divine Nnata** – FStudent ullstack developer | Passionate about solving real problems with code.


## 📄 License

MIT © 2025 – EminentFlix
