@echo off
title Badsha Bangles - Temporary Server (Mock Data)

echo ================================================================
echo          BADSHA BANGLES - TEMPORARY SERVER STARTING
echo                    (No MongoDB Required)
echo ================================================================
echo.

cd /d "c:\Users\manas\OneDrive\Desktop\frame_digitals internship\Badsha_Bangles\backend"

echo Starting temporary server with mock jewelry data...
echo.
echo 📊 Products: 10 jewelry items ready
echo 📁 Categories: 9 jewelry categories
echo 🚀 Backend: http://localhost:4000
echo 🌐 Frontend: http://localhost:3000
echo.

node tempServer.js

echo.
echo ================================================================
echo Server stopped. Press any key to restart or close window.
echo ================================================================
pause >nul
goto :eof