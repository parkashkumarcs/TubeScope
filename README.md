````markdown
# TubeScope 🎥

TubeScope is a full-stack web application that allows users to fetch and display YouTube channel videos and related content using the **YouTube Data API v3**.  
The project is built with **React (Vite)** on the frontend and **Node.js + Express** on the backend.

🌐 **Live Project:** [TubeScope on Vercel](https://tube-scope.vercel.app/)

---

## 🚀 Features
- 🔍 Search YouTube channels by **Channel ID**.  
- 📺 Display channel videos with **pagination**.  
- 📊 Fetch detailed channel information using the **YouTube Data API**.  
- 💻 Responsive design with a modern, clean UI.  
- ☁️ Frontend hosted on **Vercel**.  
- ⚡ Backend hosted on **Vercel** as serverless functions.  

---

## 🛠️ Tech Stack

### Frontend
- [React (Vite)](https://vitejs.dev/)  
- [React Router](https://reactrouter.com/)  
- [Axios](https://axios-http.com/)  
- [Tailwind CSS](https://tailwindcss.com/)  

### Backend
- [Node.js](https://nodejs.org/)  
- [Express.js](https://expressjs.com/)  
- [CORS](https://www.npmjs.com/package/cors)  
- [YouTube Data API v3](https://developers.google.com/youtube/v3)  

---

## 📦 Requirements
Before running the project locally, ensure you have:
- **Node.js** v16 or higher  
- **npm** or **yarn**  
- A valid **YouTube Data API key** from [Google Cloud Console](https://console.cloud.google.com/)  

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/tube-scope.git
cd tube-scope
````

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the **backend** folder and add:

```env
API_KEY=your_youtube_api_key
PORT=5000
```

Run the backend locally:

```bash
npm run dev
```

➡️ Backend will be running at: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the **frontend** folder and add:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Run the frontend locally:

```bash
npm run dev
```

➡️ Frontend will be running at: `http://localhost:5173`

---

## 🌍 Deployment

* **Frontend:** [Vercel](https://vercel.com/)
* **Backend:** [Vercel](https://vercel.com/) (serverless functions)

Update the **frontend `.env`** file with your deployed backend URL:

```env
VITE_BACKEND_URL=https://your-backend.vercel.app
```

---

## 📸 Screenshots

### 🔎 Home - Search Mode

<img width="960" height="418" alt="home" src="https://github.com/user-attachments/assets/7f75c15a-54a6-4293-b67c-b4a337781de2" />

### ⭐ Recommended Popular Channels

<img width="960" height="418" alt="home2" src="https://github.com/user-attachments/assets/29497294-f809-41b9-80a9-4e9bd9b84e00" />

### 📌 Channel Page - Header

<img width="960" height="419" alt="channelPage1" src="https://github.com/user-attachments/assets/cc17354f-c7f8-4b9b-a3b8-e1dd3f5e9538" />

### 🎞️ Channel Page - Video List

<img width="960" height="425" alt="channelPage2" src="https://github.com/user-attachments/assets/b84e31c5-d6db-4ced-99a0-46d18c06a31d" />

### 🤖 Chatbot Feature

<img width="960" height="423" alt="channelPage3" src="https://github.com/user-attachments/assets/bae1bf1f-8ead-404c-9a6a-3941d5ccffee" />

### 🎬 Video Modal UI

<img width="960" height="413" alt="videoModal" src="https://github.com/user-attachments/assets/87ec175f-4385-438f-9195-2fd63aa2a49b" />

### 📍 Footer with Quick Links

<img width="960" height="442" alt="footer" src="https://github.com/user-attachments/assets/348dcd02-4806-47e2-b7fb-56b7d6ced628" />

---

## 🤝 Contributing

Contributions are welcome!
To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Submit a Pull Request 🎉

---

## 📄 License

This project is licensed under the **MIT License**.

---

```
