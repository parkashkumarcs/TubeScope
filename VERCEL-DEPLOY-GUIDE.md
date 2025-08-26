# 🚀 TubeScope Vercel Deployment Guide

## 🎯 Quick Deploy Steps

### Step 1: Deploy Backend

1. **Go to Vercel Dashboard**: https://vercel.com/parkashkumarcs
2. **Click "New Project"**
3. **Import from GitHub**: Select `TubeScope` repository
4. **Configure Backend Project**:
   - **Project Name**: `tubescope-backend`
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. **Environment Variables** (IMPORTANT):
   - Add: `YOUTUBE_API_KEY` = `your_youtube_api_key_here`

6. **Deploy Backend**

### Step 2: Deploy Frontend

1. **Create Another New Project** on Vercel
2. **Import Same Repository**: `TubeScope`
3. **Configure Frontend Project**:
   - **Project Name**: `tubescope-frontend`
   - **Framework Preset**: Vite
   - **Root Directory**: `tube-scope`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables**:
   - Add: `VITE_API_URL` = `https://tubescope-backend.vercel.app`
   - (Replace with your actual backend URL from Step 1)

5. **Deploy Frontend**

## 🔧 Alternative: Manual CLI Deployment

### Backend:
```bash
cd backend
vercel --prod
# Follow prompts, set project name as "tubescope-backend"
```

### Frontend:
```bash
cd tube-scope
vercel --prod
# Follow prompts, set project name as "tubescope-frontend"
```

## 🔑 Required Environment Variables

### Backend Project:
```
YOUTUBE_API_KEY=your_youtube_api_key_here
```

### Frontend Project:
```
VITE_API_URL=https://your-backend-url.vercel.app
```

## 🧪 Test Your Deployment

### Test Backend:
Visit: `https://tubescope-backend.vercel.app/api/channel?id=UC_x5XG1OV2P6uZZ5FSM9Ttw`

Should return JSON with channel data.

### Test Frontend:
Visit: `https://tubescope-frontend.vercel.app`

Should show the TubeScope application.

## 🎯 Expected URLs

- **Backend API**: `https://tubescope-backend.vercel.app`
- **Frontend App**: `https://tubescope-frontend.vercel.app`
- **Share URL**: `https://tubescope-frontend.vercel.app`

## 🛠 Troubleshooting

### If Backend Fails:
1. Check environment variables are set
2. Verify YouTube API key is valid
3. Check build logs in Vercel dashboard

### If Frontend Fails:
1. Verify VITE_API_URL points to correct backend
2. Check if backend is responding
3. Verify build command is `npm run build`

## 🎉 Success Indicators

✅ Backend returns JSON data at `/api/channel` endpoint
✅ Frontend loads without errors
✅ Search functionality works
✅ Channel data displays correctly
✅ Responsive design works on mobile

## 📱 Features That Will Work Live

- Real YouTube channel data
- Video search with advanced algorithms
- Responsive design for all devices
- Professional chatbot integration
- Real-time search functionality
- Pagination and filtering
- Modern UI/UX design
