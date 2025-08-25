@echo off
cd /d "c:\Users\manas\OneDrive\Desktop\frame_digitals internship\Badsha_Bangles\backend"
echo Current directory: %CD%
echo.
echo Testing MongoDB Atlas connection...
echo.
node scripts\directMongoTest.js
echo.
echo ================================================================
echo If connection failed due to SSL/TLS errors:
echo 1. This confirms Node.js v21.x compatibility issue
echo 2. Update to Node.js LTS v20.x: https://nodejs.org/
echo 3. Or try the alternative backend server below
echo ================================================================
pause