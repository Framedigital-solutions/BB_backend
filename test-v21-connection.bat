@echo off
cd /d "c:\Users\manas\OneDrive\Desktop\frame_digitals internship\Badsha_Bangles\backend"
echo Testing MongoDB Atlas with Node.js v21.x compatibility fixes...
echo.
node scripts\testConnectionV21.js
echo.
echo ================================================================
echo If the test failed due to SSL/TLS errors:
echo 1. Download Node.js LTS v20.x from: https://nodejs.org/
echo 2. Install the new version
echo 3. Restart your terminal
echo 4. Run this test again
echo ================================================================
pause