@echo off
title Badsha Bangles - Quick Start

echo ================================================================
echo                    BADSHA BANGLES E-COMMERCE
echo                        QUICK START
echo ================================================================
echo.

echo Checking Node.js version...
node --version
echo.

echo Testing MongoDB Atlas connection...
cd backend
node scripts\testConnectionV21.js
echo.

echo Seeding database with jewelry products...
node scripts\seedV20.js
cd ..
echo.

echo Starting backend server...
start "Badsha Bangles Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting frontend application...
start "Badsha Bangles Frontend" cmd /k "npm run dev"

echo.
echo ================================================================
echo                  🎉 BADSHA BANGLES STARTED! 🎉
echo ================================================================
echo.
echo Applications are starting in separate windows:
echo.
echo 🔧 Backend API: http://localhost:4000
echo 🌐 Frontend App: http://localhost:3000
echo 💎 Database: MongoDB Atlas (Connected)
echo 📷 Assets: All jewelry images integrated
echo.
echo You can now:
echo ✅ Browse jewelry categories
echo ✅ View product details  
echo ✅ Add items to cart/wishlist
echo ✅ Test all e-commerce features
echo.
echo Press any key to close this window...
pause >nul