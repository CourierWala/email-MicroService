@echo off
echo =========================================
echo Starting Email Microservice (Docker)
echo =========================================

REM Check if Docker is running
docker info >nul 2>&1
IF ERRORLEVEL 1 (
    echo Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

REM Build and start containers in detached mode
echo Building and starting containers...
docker-compose up -d --build

IF ERRORLEVEL 1 (
    echo Failed to start Docker Compose services.
    pause
    exit /b 1
)

echo.
echo =========================================
echo Email Microservice started successfully!
echo =========================================
echo.
echo API URL: http://localhost:3000
echo.
echo Useful commands:
echo   docker-compose ps
echo   docker-compose stop
echo   docker-compose start
echo   docker-compose logs -f
echo   docker-compose down //to completely remove 
echo.

pause
