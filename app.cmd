@echo off
setlocal enabledelayedexpansion
title Prama AI — Local Server
cd /d "%~dp0"

echo ============================================
echo   Prama AI website — local launcher
echo ============================================
echo.

REM --- Check Node.js is installed ---
where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js was not found on this machine.
    echo Please install Node.js 20+ from https://nodejs.org and run this again.
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('node -v') do set NODE_VERSION=%%v
echo Using Node.js %NODE_VERSION%
echo.

REM --- Remove known-obsolete files left behind by older versions of this project ---
REM (zip extraction overwrites matching files but never deletes files that were
REM  removed upstream, so stale files from an older download can linger and break
REM  the build even after re-extracting a newer zip on top of the same folder.)
set CLEANED=0
for %%F in (
    "client\src\components\LedgerTicker.tsx"
    "client\src\components\NodeGraph.tsx"
) do (
    if exist %%F (
        echo Removing obsolete file: %%F
        del /q %%F
        set CLEANED=1
    )
)
if !CLEANED! equ 1 (
    echo Obsolete files removed. Continuing...
    echo.
)

REM --- Install / sync dependencies ---
REM Always run npm install rather than skipping when node_modules already
REM exists — npm is fast when everything's already satisfied, and this is the
REM only reliable way to pick up new dependencies added between versions of
REM this project (an existing-but-stale node_modules folder would otherwise
REM cause "Cannot find module" errors for anything added since your last run).
echo Installing/syncing client dependencies...
call npm install --prefix client
if errorlevel 1 goto :fail

echo Installing/syncing server dependencies...
call npm install --prefix server
if errorlevel 1 goto :fail

REM --- Set up local environment file ---
if not exist "server\.env" (
    if exist "server\.env.example" (
        copy "server\.env.example" "server\.env" >nul
        echo.
        echo A blank server\.env file was created from server\.env.example.
        echo Open it and add your DATABASE_URL ^(Neon Postgres^) and GROQ_API_KEY
        echo if you want the contact form and AI concierge to work fully.
        echo The site will still run without them.
        echo.
    )
)

REM --- Build the frontend ---
echo Building the website...
call npm run build --prefix client
if errorlevel 1 goto :fail
echo.

REM --- Stop any stale server from a previous run still holding the port ---
REM (if a previous window was closed via the X button instead of Ctrl+C, or
REM the server crashed without releasing the socket, the next run fails
REM immediately with "port already in use" — which, combined with the bug
REM fixed below, used to close this window with no visible error at all.)
for /f "tokens=5" %%p in ('netstat -ano ^| findstr :8787 ^| findstr LISTENING') do (
    echo Stopping a previous server still running on port 8787 ^(PID %%p^)...
    taskkill /PID %%p /F >nul 2>&1
)

REM --- Start the server ---
echo Starting Prama AI server on http://localhost:8787
echo Your browser will open automatically once the server is ready.
echo Press Ctrl+C in this window to stop the server.
echo.

REM Open the browser a few seconds after launch, giving the Node server time
REM to actually finish starting and bind to the port first. Opening it
REM immediately (before the server is listening) is a race condition — the
REM browser hits "can't reach this page" because nothing is serving yet.
REM This runs as a small detached background timer so it doesn't block the
REM server itself from starting in the foreground below. Uses "explorer" (not
REM a nested "start") to hand off the URL to the default browser, since
REM nested quoted "start" commands inside "cmd /c "...""" are unreliable.
start "" /min cmd /c "timeout /t 4 /nobreak >nul & explorer http://localhost:8787"

call npm run start --prefix server
if errorlevel 1 (
    echo.
    echo [ERROR] The server exited unexpectedly — see the error above for details.
    echo.
    echo Common causes:
    echo   - DATABASE_URL in server\.env is malformed. It must start with
    echo     "postgresql://" ^(not "postgresql+asyncpg://" — that "+asyncpg"
    echo     suffix is a Python/SQLAlchemy convention and does not work with
    echo     this Node.js server^).
    echo   - Port 8787 was still in use by another process ^(this script now
    echo     tries to free it automatically above, but a firewall or
    echo     antivirus tool could still be blocking it^).
    echo.
    pause
    exit /b 1
)
goto :eof

:fail
echo.
echo [ERROR] Something went wrong during setup. See the messages above.
echo.
echo If the error mentions a file that no longer exists in the current version
echo of this project (e.g. a "Property does not exist" TypeScript error), your
echo local folder likely has leftover files from an older download. Delete this
echo whole project folder, extract the latest zip fresh into an empty location,
echo and run app.cmd again.
echo.
pause
exit /b 1
