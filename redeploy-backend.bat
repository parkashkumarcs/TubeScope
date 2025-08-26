@echo off
echo 🔄 Redeploying Backend with Fixes...
echo =====================================

cd backend

echo 📦 Installing dependencies...
call npm install

echo 🚀 Deploying to Vercel...
call vercel --prod

echo ✅ Backend redeployment complete!
echo.
echo 📝 Next steps:
echo 1. Copy the new deployment URL from above
echo 2. Set YOUTUBE_API_KEY environment variable in Vercel dashboard
echo 3. Test the API endpoint: https://your-new-url.vercel.app/api/channel?id=UC_x5XG1OV2P6uZZ5FSM9Ttw

pause
