# 🚀 Quick Deploy TubeScope

## One-Click Deployment

### Option 1: Automated Script (Recommended)

**Windows:**
```bash
deploy.bat
```

**Mac/Linux:**
```bash
./deploy.sh
```

### Option 2: Manual Deployment

1. **Deploy Backend:**
   ```bash
   cd backend
   vercel --prod
   ```

2. **Deploy Frontend:**
   ```bash
   cd tube-scope
   vercel --prod
   ```

3. **Set Environment Variables:**
   - Backend: Add `YOUTUBE_API_KEY` in Vercel dashboard
   - Frontend: Update `VITE_API_URL` in vercel.json with your backend URL

## 🔑 Required Environment Variables

**Backend (.env or Vercel dashboard):**
```
YOUTUBE_API_KEY=your_youtube_api_key_here
```

**Frontend (vercel.json):**
```json
{
  "env": {
    "VITE_API_URL": "https://your-backend-url.vercel.app"
  }
}
```

## 🌐 Live Features

✅ **Full YouTube Integration**
- Real channel data fetching
- Video search with YouTube-style algorithm
- Live pagination and filtering

✅ **Professional UI/UX**
- Responsive design for all devices
- Modern chatbot integration
- Real-time search functionality

✅ **Production Ready**
- Optimized builds
- Environment variable configuration
- CORS and security configured

## 🔗 Share Your App

After deployment, your TubeScope app will be live at:
`https://your-app-name.vercel.app`

## 📞 Support

If you encounter any issues:
1. Check DEPLOYMENT.md for detailed instructions
2. Verify environment variables are set correctly
3. Ensure YouTube API key has proper permissions

## 🎯 Test Your Deployment

Visit: `https://your-app.vercel.app/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw`

This will load the Google Developers channel to test all features!
