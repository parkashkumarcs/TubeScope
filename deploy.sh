#!/bin/bash

echo "🚀 TubeScope Full-Stack Deployment"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d "tube-scope" ] || [ ! -d "backend" ]; then
    echo -e "${RED}❌ Error: Please run this script from the TubeScope root directory${NC}"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

echo -e "${BLUE}📋 Deployment Steps:${NC}"
echo "1. Deploy Backend to Vercel"
echo "2. Deploy Frontend to Vercel"
echo "3. Configure Environment Variables"
echo ""

read -p "Do you want to continue? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Deploy Backend
echo -e "${BLUE}🔧 Deploying Backend...${NC}"
cd backend

# Check for .env file
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  No .env file found in backend directory${NC}"
    echo "Please make sure to set YOUTUBE_API_KEY in Vercel dashboard after deployment"
fi

echo "Installing backend dependencies..."
npm install

echo "Deploying backend to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend deployed successfully!${NC}"
    echo -e "${YELLOW}📝 Note: Don't forget to set YOUTUBE_API_KEY in Vercel dashboard${NC}"
else
    echo -e "${RED}❌ Backend deployment failed!${NC}"
    exit 1
fi

cd ..

# Deploy Frontend
echo -e "${BLUE}🎨 Deploying Frontend...${NC}"
cd tube-scope

echo "Installing frontend dependencies..."
npm install

echo "Building frontend..."
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend build successful!${NC}"
else
    echo -e "${RED}❌ Frontend build failed!${NC}"
    exit 1
fi

echo "Deploying frontend to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend deployed successfully!${NC}"
else
    echo -e "${RED}❌ Frontend deployment failed!${NC}"
    exit 1
fi

cd ..

echo ""
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Go to Vercel dashboard"
echo "2. Set YOUTUBE_API_KEY environment variable in backend project"
echo "3. Update VITE_API_URL in frontend project with your backend URL"
echo "4. Redeploy frontend if needed"
echo ""
echo -e "${BLUE}🔗 Your app will be live at your Vercel frontend URL${NC}"
echo ""
echo -e "${YELLOW}📖 See DEPLOYMENT.md for detailed instructions${NC}"
