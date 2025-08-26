@echo off
echo 🚀 TubeScope Vercel Deployment
echo ==============================

echo.
echo 📋 This script will help you deploy TubeScope to Vercel
echo.
echo 🔧 Prerequisites:
echo - Vercel CLI installed (npm i -g vercel)
echo - YouTube API Key ready
echo - Vercel account logged in
echo.

set /p continue="Ready to deploy? (y/n): "
if /i not "%continue%"=="y" exit /b 1

echo.
echo 🔧 Step 1: Deploy Backend
echo ========================
cd backend

echo Installing backend dependencies...
call npm install

echo.
echo 🚀 Deploying backend to Vercel...
echo When prompted:
echo - Project name: tubescope-backend
echo - Link to existing project: No
echo.
call vercel --prod

if errorlevel 1 (
    echo ❌ Backend deployment failed!
    pause
    exit /b 1
)

echo.
echo ✅ Backend deployed successfully!
echo.
echo 📝 IMPORTANT: Copy the backend URL from above
echo Example: https://tubescope-backend-xyz.vercel.app
echo.
set /p backend_url="Enter your backend URL: "

cd ..

echo.
echo 🎨 Step 2: Deploy Frontend
echo =========================
cd tube-scope

echo Installing frontend dependencies...
call npm install

echo Building frontend...
call npm run build

if errorlevel 1 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
)

echo.
echo 🚀 Deploying frontend to Vercel...
echo When prompted:
echo - Project name: tubescope-frontend
echo - Link to existing project: No
echo.
call vercel --prod

if errorlevel 1 (
    echo ❌ Frontend deployment failed!
    pause
    exit /b 1
)

cd ..

echo.
echo 🎉 Deployment Complete!
echo ======================
echo.
echo 📋 Next Steps:
echo 1. Go to https://vercel.com/parkashkumarcs
echo 2. Open your backend project (tubescope-backend)
echo 3. Go to Settings → Environment Variables
echo 4. Add: YOUTUBE_API_KEY = your_youtube_api_key
echo.
echo 5. Open your frontend project (tubescope-frontend)
echo 6. Go to Settings → Environment Variables
echo 7. Add: VITE_API_URL = %backend_url%
echo.
echo 🔗 Your live app will be at:
echo https://tubescope-frontend-xyz.vercel.app
echo.
echo 🧪 Test your backend at:
echo %backend_url%/api/channel?id=UC_x5XG1OV2P6uZZ5FSM9Ttw
echo.

pause
