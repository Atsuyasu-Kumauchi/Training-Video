# Department API - Request & Response

## 1. Get All Departments
```
GET /departments
```
**Response:**
```json
[
  {
    "department_id": 1,
    "name": "IT Department",
    "status": true,
    "created": "2025-09-03T12:50:00.000Z",
    "modified": "2025-09-03T12:50:00.000Z"
  },
  {
    "department_id": 2,
    "name": "HR Department",
    "status": true,
    "created": "2025-09-03T12:50:00.000Z",
    "modified": "2025-09-03T12:50:00.000Z"
  }
]
```

---

## 2. Get Department by ID
```
GET /departments/{id}
```
**Response:**
```json
{
  "department_id": 1,
  "name": "IT Department",
  "status": true,
  "created": "2025-09-03T12:50:00.000Z",
  "modified": "2025-09-03T12:50:00.000Z"
}
```

---

## 3. Create Department
```
POST /departments
```
**Request Body:**
```json
{
  "name": "Finance Department"
}
```
**Response:**
```json
{
  "department_id": 5,
  "name": "Finance Department",
  "status": true,
  "created": "2025-09-03T12:55:00.000Z",
  "modified": "2025-09-03T12:55:00.000Z"
}
```

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Successfully retrieved data |
| 201 | Created - Successfully created resource |
| 400 | Bad Request - Invalid request data |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |
