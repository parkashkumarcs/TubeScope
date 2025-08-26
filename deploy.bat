@echo off
echo 🚀 TubeScope Full-Stack Deployment
echo ==================================

REM Check if we're in the right directory
if not exist "tube-scope" (
    echo ❌ Error: tube-scope directory not found
    echo Please run this script from the TubeScope root directory
    pause
    exit /b 1
)

if not exist "backend" (
    echo ❌ Error: backend directory not found
    echo Please run this script from the TubeScope root directory
    pause
    exit /b 1
)

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Vercel CLI not found. Installing...
    npm install -g vercel
)

echo 📋 Deployment Steps:
echo 1. Deploy Backend to Vercel
echo 2. Deploy Frontend to Vercel
echo 3. Configure Environment Variables
echo.

set /p continue="Do you want to continue? (y/n): "
if /i not "%continue%"=="y" exit /b 1

REM Deploy Backend
echo 🔧 Deploying Backend...
cd backend

REM Check for .env file
if not exist ".env" (
    echo ⚠️  No .env file found in backend directory
    echo Please make sure to set YOUTUBE_API_KEY in Vercel dashboard after deployment
)

echo Installing backend dependencies...
call npm install

echo Deploying backend to Vercel...
call vercel --prod

if errorlevel 1 (
    echo ❌ Backend deployment failed!
    pause
    exit /b 1
) else (
    echo ✅ Backend deployed successfully!
    echo 📝 Note: Don't forget to set YOUTUBE_API_KEY in Vercel dashboard
)

cd ..

REM Deploy Frontend
echo 🎨 Deploying Frontend...
cd tube-scope

echo Installing frontend dependencies...
call npm install

echo Building frontend...
call npm run build

if errorlevel 1 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
) else (
    echo ✅ Frontend build successful!
)

echo Deploying frontend to Vercel...
call vercel --prod

if errorlevel 1 (
    echo ❌ Frontend deployment failed!
    pause
    exit /b 1
) else (
    echo ✅ Frontend deployed successfully!
)

cd ..

echo.
echo 🎉 Deployment Complete!
echo.
echo 📋 Next Steps:
echo 1. Go to Vercel dashboard
echo 2. Set YOUTUBE_API_KEY environment variable in backend project
echo 3. Update VITE_API_URL in frontend project with your backend URL
echo 4. Redeploy frontend if needed
echo.
echo 🔗 Your app will be live at your Vercel frontend URL
echo.
echo 📖 See DEPLOYMENT.md for detailed instructions

pause
