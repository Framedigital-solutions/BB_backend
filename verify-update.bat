@echo off
echo ================================================================
echo            BADSHA BANGLES - NODE.JS UPDATE VERIFICATION
echo ================================================================
echo.

echo 1. Checking Node.js version...
node --version
echo.

echo 2. Checking npm version...
npm --version
echo.

echo 3. Expected versions:
echo    Node.js: v20.x.x (LTS)
echo    npm: 10.x.x or higher
echo.

echo ================================================================
echo            DEPENDENCY REINSTALLATION
echo ================================================================
echo.

echo 4. Reinstalling frontend dependencies...
npm install
echo.

echo 5. Reinstalling backend dependencies...
cd backend
npm install
cd ..
echo.

echo ================================================================
echo            MONGODB ATLAS CONNECTION TEST
echo ================================================================
echo.

echo 6. Testing MongoDB Atlas connection...
cd backend
node scripts\testConnectionV21.js
cd ..
echo.

echo ================================================================
echo            DATABASE SEEDING
echo ================================================================
echo.

echo 7. Seeding database with jewelry products...
cd backend
node scripts\seed.js
cd ..
echo.

echo ================================================================
echo            STARTING APPLICATIONS
echo ================================================================
echo.

echo 8. Applications will start automatically...
echo    - Backend: http://localhost:4000
echo    - Frontend: http://localhost:3000
echo.

echo Starting backend server...
start /B "Backend Server" cmd /c "cd backend && npm run dev"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak >nul

echo Starting frontend server...
start /B "Frontend Server" cmd /c "npm run dev"

echo.
echo ================================================================
echo                    SETUP COMPLETE!
echo ================================================================
echo.
echo Your Badsha Bangles application should now be running:
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:4000
echo - MongoDB: Connected to Atlas
echo - Assets: All jewelry images integrated
echo.
echo If everything worked correctly, you should be able to:
echo 1. Browse products by category
echo 2. View individual product details
echo 3. Add items to cart and wishlist
echo 4. Test all e-commerce features
echo.
echo Press any key to close this window...
pause >nul