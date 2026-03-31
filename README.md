# 🧠 ML Viz Lab — Interactive Machine Learning Platform

> Learn Machine Learning through real-time, interactive visualizations — not formulas.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Vairamuthu18/ML-SAAS)

---

## ✨ Features

- 🎓 **16 Interactive ML Modules** — Foundations to Neural Networks
- 📊 **Live Algorithm Visualizations** — Watch models train in real time
- 🧪 **Data Playground** — Experiment with your own datasets
- 💡 **"Why Did This Happen?" Explainers** — Intuitive breakdowns
- 📝 **Quizzes & Progress Tracking** — Track learning across sessions
- 💎 **Free + Pro Plans** — Tiered access model

---

## 🗂 Project Structure

```
Ml-SAAS--main/
├── index.html          # Main SPA entry point
├── css/
│   └── style.css       # Global styles
├── js/
│   ├── app.js          # Router & app shell
│   ├── config.js       # App configuration
│   ├── progress.js     # Progress tracking
│   ├── quizComponent.js
│   ├── quizData.js
│   ├── ml/             # ML algorithm implementations
│   └── pages/          # One JS file per module/page
└── backend/
    ├── main.py         # FastAPI entry point
    ├── requirements.txt
    └── api/            # ML algorithm API routes
```

---

## 🚀 Running Locally

### Frontend (Static — No build step needed)

1. Open `Ml-SAAS--main/index.html` directly in your browser, **or** serve it with Python:

```bash
cd Ml-SAAS--main
python -m http.server 8080
```

Then visit: [http://localhost:8080](http://localhost:8080)

### Backend (FastAPI)

```bash
cd Ml-SAAS--main/backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API docs available at: [http://localhost:8000/docs](http://localhost:8000/docs)  
Health check: [http://localhost:8000/health](http://localhost:8000/health)

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` in the `backend/` folder:

```bash
cp backend/.env.example backend/.env
```

| Variable | Default | Description |
|---|---|---|
| `PORT` | `8000` | Backend server port |
| `ALLOWED_ORIGINS` | `*` | CORS allowed origins |
| `DEBUG` | `false` | Enable debug mode |

---

## ☁️ Deployment

### Vercel (Frontend — Recommended)

```bash
npm i -g vercel
vercel --prod
```

Or click the **Deploy with Vercel** button at the top of this README.

### Backend (Render.com — Free Tier)

1. Create a new **Web Service** on [render.com](https://render.com)
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Set `ALLOWED_ORIGINS` env var to your Vercel frontend URL

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML5, CSS3, JavaScript (ES Modules) |
| Backend | Python 3, FastAPI, Uvicorn |
| ML Engine | scikit-learn, NumPy, Pandas |
| Hosting | Vercel (frontend) + Render (backend) |

---

## 📄 License

MIT © [Vairamuthu18](https://github.com/Vairamuthu18)
