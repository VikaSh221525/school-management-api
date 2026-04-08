# 🏫 School Management API

A RESTful API built with **Node.js**, **Express.js**, and **MySQL** that allows users to add schools and retrieve them sorted by proximity to a given location.

## 🔗 Live API

> Base URL: `https://school-management-api-vmdd.onrender.com`

---

## 📁 Project Structure

```
SchoolManagementSQLAPI/
├── src/
│   ├── controllers/
│   │   └── school.controller.js   # Business logic
│   ├── db/
│   │   └── db.js                  # MySQL connection pool
│   └── routes/
│       └── school.route.js        # Route definitions
├── .env                           # Environment variables (not committed)
├── .gitignore
├── package.json
└── server.js                      # Entry point
```

---

## ⚙️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MySQL2 | Database driver |
| dotenv | Environment variable management |
| Render | API hosting |
| FreeSQLDatabase | Cloud MySQL hosting |

---

## 🗄️ Database Schema

```sql
CREATE TABLE schools (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    name      VARCHAR(255) NOT NULL,
    address   VARCHAR(255) NOT NULL,
    latitude  FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js installed
- MySQL installed and running

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/school-management-api.git
cd school-management-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up the database
Open MySQL and run:
```sql
CREATE DATABASE school_management;
USE school_management;

CREATE TABLE schools (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    name      VARCHAR(255) NOT NULL,
    address   VARCHAR(255) NOT NULL,
    latitude  FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

### 4. Configure environment variables
Create a `.env` file in the root directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
DB_PORT=3306
PORT=3000
```

### 5. Start the server
```bash
node server.js
```

Server will run at `http://localhost:3000`

---

## 📡 API Endpoints

### ➕ Add School

**POST** `/addSchool`

Adds a new school to the database after validating all input fields.

**Request Body:**
```json
{
  "name": "Delhi Public School",
  "address": "Sector 45, Gurugram",
  "latitude": 28.4089,
  "longitude": 77.0727
}
```

**Success Response (201):**
```json
{
  "message": "School added successfully!",
  "schoolId": 1
}
```

**Validation Error Response (400):**
```json
{
  "error": "Name is required and must be a non-empty string."
}
```

---

### 📋 List Schools

**GET** `/listSchools`

Fetches all schools sorted by distance from the user's location (closest first).

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| latitude | Float | Yes | User's latitude |
| longitude | Float | Yes | User's longitude |

**Example Request:**
```
GET /listSchools?latitude=28.6315&longitude=77.2167
```

**Success Response (200):**
```json
{
  "message": "Schools fetched successfully.",
  "count": 3,
  "schools": [
    {
      "id": 2,
      "name": "Kendriya Vidyalaya No. 1",
      "address": "Sector 8, R.K. Puram, New Delhi",
      "latitude": 28.5672,
      "longitude": 77.1833,
      "distance_km": 7.86
    },
    {
      "id": 4,
      "name": "The Shri Ram School",
      "address": "Vasant Vihar, New Delhi",
      "latitude": 28.5592,
      "longitude": 77.1575,
      "distance_km": 9.90
    }
  ]
}
```

---

## 📐 Distance Calculation

Schools are sorted using the **Haversine Formula**, which calculates the great-circle distance between two points on Earth given their latitude and longitude coordinates.

```
a = sin²(Δlat/2) + cos(lat1) × cos(lat2) × sin²(Δlon/2)
distance = 2 × R × atan2(√a, √(1−a))
```
where R = 6371 km (Earth's radius)

---

## 🧪 Sample Test Data

Use these with the `POST /addSchool` endpoint:

```json
{ "name": "Kendriya Vidyalaya No. 1", "address": "Sector 8, R.K. Puram, New Delhi", "latitude": 28.5672, "longitude": 77.1833 }
{ "name": "Ryan International School", "address": "Mayur Vihar Phase 3, New Delhi", "latitude": 28.6142, "longitude": 77.3201 }
{ "name": "The Shri Ram School", "address": "Vasant Vihar, New Delhi", "latitude": 28.5592, "longitude": 77.1575 }
{ "name": "Amity International School", "address": "Sector 46, Noida", "latitude": 28.5621, "longitude": 77.3310 }
```

---

## 🌐 Live API Testing

| Endpoint | Method | Live URL |
|----------|--------|----------|
| Add School | POST | `https://school-management-api-vmdd.onrender.com/addSchool` |
| List Schools | GET | `https://school-management-api-vmdd.onrender.com/listSchools?latitude=28.6315&longitude=77.2167` |

---

## 📬 Postman Collection

Import the Postman collection to test all endpoints with pre-filled examples.

> 🔗 [Click here to open Postman Collection](#) ← replace with your actual link

---

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `DB_HOST` | MySQL host |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name |
| `DB_PORT` | MySQL port (3306) |
| `PORT` | Server port (3000) |

---

## 👨‍💻 Author

Built as part of a Node.js + MySQL backend assignment.