Here’s a clean and professional `README.md` content for your **TubeScope** project including the live project link:

````markdown
# TubeScope 🎥

TubeScope is a web application built with **React (Vite)** for the frontend and **Node.js + Express** for the backend.  
It allows users to fetch and display YouTube channel videos and related content using the **YouTube Data API**.

🌐 **Live Project:** [TubeScope on Vercel](https://tube-scope.vercel.app/)

---

## 🚀 Features
- Search YouTube channels by channel ID.
- Display channel videos with pagination.
- Fetch channel details using the YouTube Data API.
- Responsive design with a clean UI.
- Frontend hosted on **Vercel**.
- Backend hosted on **Vercel** (API server).

---

## 🛠️ Tech Stack
### Frontend
- React (Vite)
- Axios
- React Router
- TailwindCSS

### Backend
- Node.js
- Express.js
- CORS
- YouTube Data API v3

---

## 📦 Requirements
Before running the project locally, make sure you have:
- **Node.js** (v16+ recommended)
- **npm** or **yarn**
- A valid **YouTube Data API key** from [Google Cloud Console](https://console.cloud.google.com/)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/tube-scope.git
cd tube-scope
````

### 2. Setup Backend

```bash
cd backend
npm install
```

* Create a `.env` file in the `backend` folder and add:

```
API_KEY=your_youtube_api_key
PORT=5000
```

* Run the backend locally:

```bash
npm run dev
```

Backend will run at: `http://localhost:5000`

---

### 3. Setup Frontend

```bash
cd frontend
npm install
```

* Create a `.env` file in the `frontend` folder and add:

```
VITE_BACKEND_URL=http://localhost:5000
```

* Run the frontend locally:

```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## 🌍 Deployment

* **Frontend:** Deployed on [Vercel](https://vercel.com/)
* **Backend:** Deployed on [Vercel](https://vercel.com/) as serverless functions

Make sure to update your **frontend `.env`** with the deployed backend URL:

```
VITE_BACKEND_URL=https://your-backend.vercel.app
```

---

## 📸 Screenshots
### Home Search Mode:
<img width="960" height="418" alt="home" src="https://github.com/user-attachments/assets/7f75c15a-54a6-4293-b67c-b4a337781de2" />
### Home Recommended YT Popular Channel IDs:
<img width="960" height="418" alt="home2" src="https://github.com/user-attachments/assets/29497294-f809-41b9-80a9-4e9bd9b84e00" />
### Channel Page with Header:
<img width="960" height="419" alt="channelPage1" src="https://github.com/user-attachments/assets/cc17354f-c7f8-4b9b-a3b8-e1dd3f5e9538" />
### Channel Page with Video List:
<img width="960" height="425" alt="channelPage2" src="https://github.com/user-attachments/assets/b84e31c5-d6db-4ced-99a0-46d18c06a31d" />
### Chatbot Feature:
<img width="960" height="423" alt="channelPage3" src="https://github.com/user-attachments/assets/bae1bf1f-8ead-404c-9a6a-3941d5ccffee" />
### Video Modal UI:
<img width="960" height="413" alt="videoModal" src="https://github.com/user-attachments/assets/87ec175f-4385-438f-9195-2fd63aa2a49b" />
### Footer with Quick Links:
<img width="960" height="442" alt="footer" src="https://github.com/user-attachments/assets/348dcd02-4806-47e2-b7fb-56b7d6ced628" />








---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

```

Would you like me to also **create this `README.md` file in your project folder structure** (frontend root) so you can directly commit & push it?
```
