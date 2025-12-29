# 🌾 Agricultural Crop Management System (ACM)

A comprehensive **agricultural seasonal management platform** with AI assistant capabilities, designed to help farmers efficiently manage their farms, plots, seasons, crops, and related agricultural operations.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Architecture](#architecture)
- [License](#license)

---

## 🌟 Overview

The Agricultural Crop Management System is a full-stack web application that provides farmers with tools to:

- Manage multiple farms and plots
- Plan and track seasonal crop cycles
- Monitor harvests and calculate yields
- Track expenses and financial performance
- Manage tasks and daily operations
- Handle inventory and supplies
- Document incidents and field logs
- Generate reports and analytics
- AI-powered assistant for agricultural guidance

---

## ✨ Features

### 🏡 Farm & Plot Management

- Create and manage multiple farms with geographic location data
- Define plots with soil types, area, and cultivation status
- Track plot utilization and status

### 📅 Season Management

- Plan seasonal crop cycles with start/end dates
- Track expected vs actual yields
- Monitor season status (Draft, Active, Completed, Cancelled, Archived)

### 🌱 Crop & Variety Tracking

- Maintain crop database with varieties
- Associate crops with seasons and plots

### 🚜 Harvest Management

- Record harvest events with quantity and pricing
- Calculate revenue per harvest
- Track total seasonal yields

### 💰 Expense Management

- Log expenses by category
- Track costs per season
- Financial performance analysis

### ✅ Task Management

- Create and assign tasks with priorities
- Task workspace for daily operations
- Status tracking (Pending, In Progress, Done, Cancelled)

### 📦 Inventory & Supplies

- Manage warehouse inventory
- Track stock movements (In/Out/Adjust)
- Supplier management
- Supply lot tracking with expiry dates

### 📝 Field Logs & Incidents

- Document daily field activities
- Record and resolve incidents
- Severity and impact tracking

### 📄 Document Management

- Upload and organize documents
- Favorite and recent documents tracking

### 📊 Dashboard & Reports

- Performance KPIs and metrics
- Financial reports
- Harvest analytics

### 🤖 AI Assistant

- Agricultural guidance and recommendations
- Intelligent query responses

---

## 🛠️ Technology Stack

### Backend

| Technology            | Version  | Purpose                        |
| --------------------- | -------- | ------------------------------ |
| **Java**              | 17 (LTS) | Programming Language           |
| **Spring Boot**       | 3.5.3    | Application Framework          |
| **Spring Data JPA**   | -        | Data Persistence               |
| **Spring Security**   | -        | Authentication & Authorization |
| **MySQL**             | 8.0      | Database                       |
| **Maven**             | -        | Build Tool                     |
| **Lombok**            | 1.18.30  | Code Generation                |
| **MapStruct**         | 1.5.5    | Object Mapping                 |
| **Nimbus JOSE JWT**   | 9.37.3   | JWT Authentication             |
| **SpringDoc OpenAPI** | 2.7.0    | API Documentation              |

### Frontend

| Technology          | Version | Purpose                 |
| ------------------- | ------- | ----------------------- |
| **React**           | 18.3.1  | UI Framework            |
| **TypeScript**      | 5.6.0   | Programming Language    |
| **Vite**            | 6.3.5   | Build Tool              |
| **TanStack Query**  | 5.59.0  | Data Fetching & Caching |
| **Redux Toolkit**   | 2.2.0   | State Management        |
| **React Router**    | 6.26.0  | Routing                 |
| **Radix UI**        | -       | UI Components           |
| **React Hook Form** | 7.55.0  | Form Management         |
| **Zod**             | 3.23.0  | Schema Validation       |
| **Recharts**        | 2.15.2  | Charts & Visualization  |
| **Axios**           | 1.13.2  | HTTP Client             |

---

## 📁 Project Structure

```
SE357.Q12_Agricultural-Crop-Management-System/
├── 📂 ACM Web Platform Design System/      # Frontend Application
│   ├── src/
│   │   ├── api/                            # API configuration
│   │   ├── app/                            # Application setup & routes
│   │   ├── components/                     # Shared UI components
│   │   ├── entities/                       # Domain entities (FSD)
│   │   │   ├── ai/
│   │   │   ├── crop/
│   │   │   ├── dashboard/
│   │   │   ├── document/
│   │   │   ├── expense/
│   │   │   ├── farm/
│   │   │   ├── field-log/
│   │   │   ├── harvest/
│   │   │   ├── incident/
│   │   │   ├── inventory/
│   │   │   ├── plot/
│   │   │   ├── season/
│   │   │   ├── supplies/
│   │   │   ├── task/
│   │   │   └── user/
│   │   ├── features/                       # Business features
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── buyer/
│   │   │   ├── farmer/
│   │   │   └── shared/
│   │   ├── pages/                          # Route pages
│   │   │   ├── admin/
│   │   │   ├── ai/
│   │   │   ├── buyer/
│   │   │   ├── farmer/
│   │   │   └── shared/
│   │   ├── shared/                         # Shared utilities
│   │   └── widgets/                        # Composite components
│   ├── package.json
│   └── vite.config.ts
│
├── 📂 agricultural-crop-management-backend/ # Backend Application
│   ├── src/main/java/org/example/QuanLyMuaVu/
│   │   ├── Config/                         # Configuration classes
│   │   ├── Controller/                     # REST API controllers
│   │   │   ├── AuthenticationController
│   │   │   ├── FarmController
│   │   │   ├── PlotController
│   │   │   ├── SeasonController
│   │   │   ├── CropController
│   │   │   ├── HarvestController
│   │   │   ├── TaskController
│   │   │   ├── ExpenseController
│   │   │   ├── InventoryController
│   │   │   ├── IncidentController
│   │   │   ├── DocumentController
│   │   │   ├── DashboardController
│   │   │   ├── AIController
│   │   │   └── ... (27 total)
│   │   ├── DTO/                            # Data Transfer Objects
│   │   ├── Entity/                         # JPA Entities
│   │   │   ├── User
│   │   │   ├── Farm
│   │   │   ├── Plot
│   │   │   ├── Season
│   │   │   ├── Crop
│   │   │   ├── Harvest
│   │   │   ├── Task
│   │   │   ├── Expense
│   │   │   ├── Incident
│   │   │   ├── Document
│   │   │   └── ... (26 total)
│   │   ├── Enums/                          # Enumeration types
│   │   ├── Exception/                      # Custom exceptions
│   │   ├── Mapper/                         # MapStruct mappers
│   │   ├── Repository/                     # JPA repositories
│   │   ├── Service/                        # Business logic services
│   │   └── Util/                           # Utility classes
│   ├── docker-compose.yml                  # MySQL container setup
│   └── pom.xml
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Java 17** or higher
- **Node.js v20+** and npm
- **MySQL 8.0** (or use Docker)
- **Maven** (or use the included Maven wrapper)

### Backend Setup

1. **Start MySQL Database (using Docker)**

   ```bash
   cd agricultural-crop-management-backend
   docker-compose up -d
   ```

   This creates a MySQL instance with:

   - Database: `quanlymuavu`
   - User: `springuser`
   - Password: `springpass`
   - Port: `3306`

2. **Configure Application**

   Update `src/main/resources/application.properties` with your database credentials if not using Docker defaults.

3. **Build and Run Backend**

   ```bash
   # Using Maven wrapper
   ./mvnw clean install
   ./mvnw spring-boot:run

   # Or using Maven directly
   mvn clean install
   mvn spring-boot:run
   ```

   Backend will start at: `http://localhost:8080`

### Frontend Setup

1. **Install Dependencies**

   ```bash
   cd "ACM Web Platform Design System"
   npm install
   ```

2. **Configure Environment**

   Create or update `.env` file with backend API URL:

   ```
   VITE_API_URL=http://localhost:8080
   ```

3. **Run Development Server**

   ```bash
   npm run dev
   ```

   Frontend will start at: `http://localhost:3000`

4. **Build for Production**

   ```bash
   npm run build
   ```

---

## 📖 API Documentation

Once the backend is running, access the interactive API documentation at:

- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI Spec**: `http://localhost:8080/v3/api-docs`

### Key API Endpoints

| Endpoint              | Description                              |
| --------------------- | ---------------------------------------- |
| `/api/v1/auth/*`      | Authentication (login, register, logout) |
| `/api/v1/farms/*`     | Farm management                          |
| `/api/v1/plots/*`     | Plot management                          |
| `/api/v1/seasons/*`   | Season management                        |
| `/api/v1/crops/*`     | Crop management                          |
| `/api/v1/harvests/*`  | Harvest management                       |
| `/api/v1/tasks/*`     | Task management                          |
| `/api/v1/expenses/*`  | Expense tracking                         |
| `/api/v1/inventory/*` | Inventory management                     |
| `/api/v1/incidents/*` | Incident reporting                       |
| `/api/v1/documents/*` | Document management                      |
| `/api/v1/dashboard/*` | Dashboard analytics                      |
| `/api/v1/ai/*`        | AI assistant                             |

---

## 🏗️ Architecture

### Backend Architecture

The backend follows a **layered architecture**:

```
Controller → Service → Repository → Entity
     ↓           ↓
    DTO       Mapper
```

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Repositories**: Data access layer (Spring Data JPA)
- **Entities**: JPA entity classes
- **DTOs**: Data Transfer Objects for API contracts
- **Mappers**: Convert between entities and DTOs (MapStruct)

### Frontend Architecture

The frontend follows **Feature-Sliced Design (FSD)**:

```
app → pages → features → entities → shared
```

- **app/**: Application configuration and routing
- **pages/**: Route components (composition only)
- **features/**: Business feature implementations
- **entities/**: Domain entities with API clients and hooks
- **shared/**: Shared utilities, UI components, and infrastructure

---

## 👥 User Roles

| Role       | Description                                        |
| ---------- | -------------------------------------------------- |
| **Admin**  | System administration, user management             |
| **Farmer** | Farm operations, season planning, harvest tracking |
| **Buyer**  | View available products (future feature)           |

---

## 📜 License

This project is **private** - All rights reserved.

---

## 🤝 Contributors
Instructor: Nguyễn Trịnh Đông
Võ Sĩ Trí Thông - Hồ Ngọc Quỳnh
- Nhóm 31 - SE357.Q12 - University of Information Technology

---

<p align="center">
  Made with 💚 for sustainable agriculture
</p>
