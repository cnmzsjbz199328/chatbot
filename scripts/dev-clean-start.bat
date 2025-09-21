@echo off
echo Stopping all Node.js processes...
taskkill /F /IM node.exe /T 2>nul

echo Checking port usage...
netstat -ano | findstr :3000
netstat -ano | findstr :3001

echo Cleaning up .next directory...
if exist ".next" (
    rmdir /s /q ".next"
)

echo Starting development server...
npm run dev
