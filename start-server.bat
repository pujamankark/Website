@echo off
echo Starting local web server for 3D Portfolio...
echo.
echo The website will open at: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0"
python -m http.server 8000
