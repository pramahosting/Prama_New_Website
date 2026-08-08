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
        echo Open it and add your DATABASE_URL ^(Neon Postgres^) and ANTHROPIC_API_KEY
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

REM --- Start the server ---
echo Starting Prama AI server on http://localhost:8787
echo Press Ctrl+C in this window to stop the server.
echo.

start "" http://localhost:8787

call npm run start --prefix server
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
