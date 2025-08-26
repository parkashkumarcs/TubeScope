# 🚀 TubeScope Deployment Guide

## Quick Deployment Steps

### 1. Deploy Backend to Vercel

1. **Create a new Vercel project for backend:**
   ```bash
   cd backend
   vercel --prod
   ```

2. **Set environment variables in Vercel dashboard:**
   - Go to your Vercel project settings
   - Add environment variable: `YOUTUBE_API_KEY` = `your_youtube_api_key`

3. **Note your backend URL** (e.g., `https://your-backend.vercel.app`)

### 2. Deploy Frontend to Vercel

1. **Update the API URL in frontend vercel.json:**
   - Replace `VITE_API_URL` with your actual backend URL

2. **Deploy frontend:**
   ```bash
   cd tube-scope
   vercel --prod
   ```

### 3. Environment Variables Needed

**Backend (.env):**
```
YOUTUBE_API_KEY=your_youtube_api_key_here
NODE_ENV=production
```

**Frontend (Vercel Environment Variables):**
```
VITE_API_URL=https://your-backend-url.vercel.app
```

## 🔧 Manual Deployment Steps

### Prerequisites
- Vercel CLI installed: `npm i -g vercel`
- YouTube API Key from Google Cloud Console
- GitHub account (optional but recommended)

### Backend Deployment

1. **Prepare backend:**
   ```bash
   cd backend
   npm install
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel login
   vercel --prod
   ```

3. **Set environment variables:**
   - Go to Vercel dashboard → Your project → Settings → Environment Variables
   - Add: `YOUTUBE_API_KEY` with your API key

### Frontend Deployment

1. **Update API URL:**
   - Edit `tube-scope/vercel.json`
   - Replace the `VITE_API_URL` with your backend URL

2. **Deploy frontend:**
   ```bash
   cd tube-scope
   npm install
   npm run build
   vercel --prod
   ```

## 🌐 Alternative: GitHub + Vercel Auto-Deploy

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy TubeScope"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to vercel.com
   - Import your GitHub repository
   - Deploy both backend and frontend as separate projects

## ✅ Verification

After deployment, test these endpoints:
- Backend: `https://your-backend.vercel.app/api/channel?id=UC_x5XG1OV2P6uZZ5FSM9Ttw`
- Frontend: `https://your-frontend.vercel.app`

## 🔗 Share Your Live URL

Your TubeScope app will be live at:
`https://your-frontend-name.vercel.app`

## 🛠 Troubleshooting

**Common Issues:**
1. **CORS errors:** Backend already has CORS configured
2. **API key errors:** Check environment variables in Vercel
3. **Build errors:** Ensure all dependencies are in package.json

**Environment Variables:**
- Backend needs `YOUTUBE_API_KEY`
- Frontend needs `VITE_API_URL` pointing to backend

## 📱 Features Working Live

✅ Channel data fetching
✅ Video search with YouTube-style algorithm
✅ Responsive design
✅ Chatbot integration
✅ Real-time search
✅ Pagination
✅ Professional UI/UX
