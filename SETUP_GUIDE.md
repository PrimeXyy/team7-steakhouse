# 🚀 Restaurant POS & QR System — Complete Setup & Run Guide

Welcome to the **Restaurant POS & QR System**! This guide walks you step-by-step through setting up, configuring, and running the entire full-stack application (PostgreSQL, Spring Boot 3.5 backend, and React 19 frontend).

---

## 📋 Table of Contents
1. [Prerequisites](#-prerequisites)
2. [Step 1: Environment Configuration (`.env`)](#-step-1-environment-configuration-env)
3. [Method 1: Run with Docker Compose (Recommended)](#-method-1-run-with-docker-compose-recommended)
4. [Method 2: Run Manually (Local Java & Node.js)](#-method-2-run-manually-local-java--nodejs)
5. [Step 3: Database Seeding (Menu & Modifiers)](#-step-3-database-seeding-menu--modifiers)
6. [🔑 Access Points & Default Credentials](#-access-points--default-credentials)
7. [📱 Testing Customer QR Ordering from Your Phone](#-testing-customer-qr-ordering-from-your-phone)
8. [🛠️ Troubleshooting Common Issues](#-troubleshooting-common-issues)

---

## 📦 Prerequisites

Choose one of the two run methods:

### For Method 1 (Docker Compose — Recommended):
- **Docker Desktop** installed on your machine.
- Make sure Docker Desktop is launched and running (green icon in system tray).

### For Method 2 (Manual Local Setup):
- **Java 21 LTS JDK** (e.g. OpenJDK 21, Eclipse Temurin 21, or Microsoft OpenJDK 21).
- **Node.js 20+** and **npm** installed.
- **PostgreSQL 17** running locally.

---

## ⚙️ Step 1: Environment Configuration (`.env`)

The project requires an environment file `.env` in the root folder (`restaurant/.env`). 

If not already present, create `.env` by copying `.env.example`:

### On Windows PowerShell:
```powershell
Copy-Item .env.example .env
```

### On macOS / Linux:
```bash
cp .env.example .env
```

### `.env` Reference Configuration:
```env
# Database Settings
POSTGRES_DB=restaurant_pos
POSTGRES_USER=pos_user
POSTGRES_PASSWORD=pos_password

# Application Security (Must be at least 32 characters in production)
JWT_SECRET=super-secret-jwt-key-for-local-development-pos-system-min-32-bytes
UPLOAD_DIR=uploads
TAX_RATE=0.10
RESTAURANT_NAME=Malantang Restaurant

# Initial First-Boot Administrator Credentials
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@restaurant-pos.local
ADMIN_PASSWORD=Admin@123

# CORS Allowed Origins
CORS_ALLOWED_ORIGINS=http://localhost:*,http://127.0.0.1:*,http://192.168.*:*,https://*
```

---

## 🐳 Method 1: Run with Docker Compose (Recommended)

Docker Compose starts all 3 services automatically with a single command:
- **`restaurant-pos-db`**: PostgreSQL 17 (exposed on port `5435` to avoid conflicting with existing local PostgreSQL databases).
- **`restaurant-pos-backend`**: Spring Boot 3.5 API server (port `8080`).
- **`restaurant-pos-frontend`**: React 19 production build served via Nginx (port `80`).

### 1. Launch Docker Desktop
Ensure Docker Desktop is open and running on your system.

### 2. Build and Start the Containers
Open a terminal in the root `restaurant` directory and run:
```powershell
docker compose up -d --build
```

### 3. Check Container Health
```powershell
docker compose ps
```
You should see all three containers with status `Up` (healthy).

### 4. View Container Logs (if needed)
```powershell
# View all logs
docker compose logs -f

# View backend logs only
docker compose logs -f backend
```

### 5. Stop the System
```powershell
docker compose down
```

---

## 💻 Method 2: Run Manually (Local Java & Node.js)

If you prefer running services directly on your host machine for development:

### 1. Start PostgreSQL 17
Ensure PostgreSQL is running on port `5432` with a database named `restaurant_pos` and user `pos_user` (password `pos_password`).

> **Tip via Docker**: You can run just the database container if you have Docker:
> ```powershell
> docker run --name restaurant-pos-db -e POSTGRES_DB=restaurant_pos -e POSTGRES_USER=pos_user -e POSTGRES_PASSWORD=pos_password -p 5432:5432 -d postgres:17-alpine
> ```

### 2. Run the Spring Boot Backend
Open a terminal in `restaurant/backend`:

**On Windows:**
```powershell
# Set JAVA_HOME if not in your global system PATH
$env:JAVA_HOME = "C:\Program Files\Android\openjdk\jdk-21.0.8"
$env:Path = "$env:JAVA_HOME\bin;$env:Path"

# Run Spring Boot
.\mvnw.cmd clean spring-boot:run
```

**On macOS / Linux:**
```bash
./mvnw clean spring-boot:run
```
The backend will automatically apply Flyway migrations `V1` to `V24` on boot and listen on `http://localhost:8080`.

### 3. Run the React Frontend
Open a new terminal in `restaurant/frontend`:
```powershell
# Install dependencies (only needed once)
npm install

# Start Vite development server
npm run dev
```
The frontend dev server starts on `http://localhost:5173`. Vite's proxy automatically routes `/api` and `/uploads` requests to the backend on `http://localhost:8080`.

---

## 🌱 Step 3: Database Seeding (Menu & Modifiers)

To populate categories, menu items, modifier groups, and sample tables (DIY Malatang test menu):

### Using the Seed Script:
Make sure the backend is running, then run:
```bash
chmod +x ./backend/scripts/seed.sh
./backend/scripts/seed.sh
```

### Or using SQL directly:
You can also run the bundled SQL seeds:
```powershell
# If using Docker:
docker exec -i restaurant-pos-db psql -U pos_user -d restaurant_pos < promo_seed.sql
```

---

## 🔑 Access Points & Default Credentials

| Portal / Interface | URL (Docker) | URL (Dev Server) | Credentials / Notes |
|---|---|---|---|
| **Frontend Web App** | `http://localhost` | `http://localhost:5173` | Auto-routes based on role |
| **Admin & Cashier Login** | `http://localhost/login` | `http://localhost:5173/login` | **Username:** `admin`<br>**Password:** `Admin@123` |
| **Cashier Table Board** | `http://localhost/cashier` | `http://localhost:5173/cashier` | Visual floor layout & settlement |
| **Kitchen KDS Display** | `http://localhost/kitchen` | `http://localhost:5173/kitchen` | Cook tickets with audio alert |
| **Customer QR Ordering** | `http://localhost/guest?token=...` | `http://localhost:5173/guest?token=...` | Generated per table in Admin |
| **Swagger / OpenAPI** | `http://localhost:8080/swagger-ui.html` | `http://localhost:8080/swagger-ui.html` | Interactive API documentation |

---

## 📱 Testing Customer QR Ordering from Your Phone

You can test customer ordering directly from your smartphone on the same local Wi-Fi without needing a public domain:

1. Connect both your computer and your smartphone to the **same Wi-Fi router**.
2. Find your computer's local Wi-Fi IPv4 address (e.g. `192.168.1.161`):
   ```powershell
   ipconfig
   ```
3. Open your browser on your computer, log in as `admin` at `http://localhost:5173/login`, and navigate to **Tables**.
4. Click on a table's QR icon. The QR code encodes your local IP URL:
   `http://192.168.1.161:5173/guest?token=<qrToken>`
5. Open your phone camera, scan the QR code on the screen, and order directly on your phone!

---

## 🛠️ Troubleshooting Common Issues

### 1. `failed to connect to the docker API at npipe:////./pipe/dockerDesktopLinuxEngine`
- **Cause:** Docker Desktop is installed but the background engine is not running.
- **Fix:** Launch **Docker Desktop** from your Windows Start Menu, wait until the Docker whale icon in your taskbar turns steady green/white, and then retry `docker compose up -d`.

### 2. Port `5432` or `8080` already in use
- **Cause:** An existing service (like an older Postgres or Apache server) is running on that port.
- **Fix:** In `docker-compose.yml`, the database port is mapped to `5435:5432` by default to prevent conflicts. For backend, change the port in `application.yml` or stop the conflicting service.

### 3. Missing `JAVA_HOME` when running Maven
- **Cause:** Java is not in your system environment path.
- **Fix:** Point your environment to Java 21 before running `mvnw`:
  ```powershell
  $env:JAVA_HOME = "C:\Program Files\Android\openjdk\jdk-21.0.8"
  $env:Path = "$env:JAVA_HOME\bin;$env:Path"
  .\mvnw.cmd spring-boot:run
  ```

### 4. Running Unit Tests
To verify all unit tests:
```powershell
# Frontend tests (Vitest - 140 tests):
cd frontend
npm test

# Backend tests (JUnit 5 / Mockito):
cd backend
.\mvnw.cmd test
```
