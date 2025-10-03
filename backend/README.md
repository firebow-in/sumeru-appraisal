# Sumeru Appraisal Backend (Spring Boot)

A comprehensive HRMS backend supporting employees, feedback, appraisals, and projects management.

## 🚀 Quick Start (H2 in-memory)

1. **Prerequisites:** Java 17 and Maven installed
2. **Build:** `mvn clean package`
3. **Run:** `mvn spring-boot:run`
4. **Access:** Backend starts on port 8081

## 📊 Sample Data Included

The backend comes pre-loaded with **real organizational hierarchy**:


### 📈 Data Summary
- **10 Employees** with realistic roles and hierarchy
- **13 Feedback entries** with manager and HR feedback
- **10 Appraisals** with performance ratings (1-5 scale)
- **10 Projects** with diverse technical assignments

## 🔗 API Endpoints

### Employee Management
- `GET /api/employees` - List all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/employees` - Create employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee
- `GET /api/employees/department/{department}` - Get employees by department
- `GET /api/employees/active` - Get active employees
- `GET /api/employees/search` - Search employees

### Feedback Management
- `GET /api/employees/{id}/feedback` - Get feedback for employee
- `POST /api/employees/{id}/feedback` - Add feedback for employee
- `GET /api/employees/feedback/authority/{authority}` - Get feedback by authority

### Appraisal Management
- `GET /api/employees/{id}/appraisals` - Get appraisals for employee
- `POST /api/employees/{id}/appraisals` - Create appraisal for employee
- `GET /api/employees/appraisals/status/{status}` - Get appraisals by status

### Project Management
- `GET /api/employees/{id}/projects` - Get projects for employee
- `POST /api/employees/{id}/projects` - Create project for employee
- `GET /api/employees/projects/status/{status}` - Get projects by status

### Dashboard & Analytics
- `GET /api/employees/dashboard/stats` - Get dashboard statistics
- `GET /api/admin/dashboard` - Get admin dashboard
- `GET /api/admin/appraisals` - Get all appraisals
- `GET /api/admin/projects` - Get all projects
- `GET /api/admin/appraisals/analytics` - Get appraisal analytics
- `GET /api/admin/projects/analytics` - Get project analytics

## 🗄️ Database Access

### H2 Console (Development)
- **URL:** http://localhost:8081/h2-console
- **JDBC URL:** `jdbc:h2:mem:sumerudb`
- **Username:** `sa`
- **Password:** (leave empty)

## 🔧 Frontend Integration

1. **Start Backend:** `cd backend && mvn spring-boot:run`
2. **Start Frontend:** `cd frontend && npm start`
3. **Test Connection:** The frontend's ConnectionTest component will verify the API

### Frontend .env quick setup (recommended)
Create a file `frontend/.env` and add:
```
REACT_APP_API_BASE=http://localhost:8081/api
```
For production builds (`npm run build`), set `frontend/.env.production`:
```
REACT_APP_API_BASE=https://api.yourdomain.com/api
```
Restart the dev server after changing `.env`.

## 🏭 Production Setup (MySQL)

1. **Install MySQL** and create database `sumerudb`
2. **Update application.properties:**
   ```properties
   # Comment out H2 lines and uncomment MySQL lines
   spring.datasource.url=jdbc:mysql://localhost:3306/sumerudb?useSSL=false&serverTimezone=UTC&createDatabaseIfNotExist=true
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
   ```
3. **Restart application**

## 🧪 Testing the API

### Get all employees:
```bash
curl http://localhost:8081/api/employees
```

### Get feedback for employee 1:
```bash
curl http://localhost:8081/api/employees/1/feedback
```

### Get dashboard stats:
```bash
curl http://localhost:8081/api/employees/dashboard/stats
```

## 📝 Example cURL Commands

### Create Employee:
```bash
curl -X POST http://localhost:8081/api/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@company.com","designation":"Developer","department":"IT","dateOfJoining":"2024-01-01","status":"Active"}'
```

### Add Feedback:
```bash
curl -X POST http://localhost:8081/api/employees/1/feedback \
  -H "Content-Type: application/json" \
  -d '{"authority":"Manager","feedbackText":"Great work on the project!","dateReceived":"2024-01-15"}'
```

## 🌐 Going Live (Deploy to Domain)

This checklist ensures your API is production‑ready and the frontend connects without issues.

### Required public endpoints
- `GET /api/employees` – used by Members and dropdowns
- `GET /api/employees/{id}` – detail fetches
- `POST /api/employees` – create (if needed)
- `GET /api/employees/{id}/feedback`, `POST /api/employees/{id}/feedback` – feedback pages
- `GET /api/employees/{id}/appraisals`, `POST /api/employees/{id}/appraisals` – appraisal
- `GET /api/employees/dashboard/stats` – dashboard tiles/insights

### Health endpoint (optional but recommended)
Expose a simple health endpoint for uptime checks:
```java
// Example
// @RestController
// @RequestMapping("/api")
// public class HealthController { @GetMapping("/health") public Map<String,String> ok(){ return Map.of("status","UP"); } }
```

### Environment configuration
- Backend base URL (public): `https://api.yourdomain.com`
- Frontend should call: `https://api.yourdomain.com/api/...`
- For React, set at build time:
  - Option A (env file): create `frontend/.env.production` with
    ```
    REACT_APP_API_BASE=https://api.yourdomain.com/api
    ```
  - Option B (hardcoded) keep `API_BASE_URL` as above (not preferred for prod).

### CORS for production
Allow only your web origin:
```java
@CrossOrigin(origins = "https://app.yourdomain.com")
```
Or configure globally via Spring Security/CORS if used.

### Build & run (production)
1) Backend
```bash
mvn -DskipTests clean package
java -jar target/*.jar
```

2) Frontend
```bash
cd frontend
npm ci
npm run build
# Serve build/ via your web server or CDN
```

### Reverse proxy (Nginx) example
```nginx
server {
  server_name api.yourdomain.com;
  listen 443 ssl;
  ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

  location / {
    proxy_pass http://127.0.0.1:8081/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

### Docker (optional)
Dockerfile
```dockerfile
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","/app/app.jar"]
```

Run
```bash
docker build -t sumeru-appraisal-api:prod .
docker run -d -p 8081:8081 --name appraisal-api sumeru-appraisal-api:prod
```

### Security & operations
- Enforce HTTPS at the proxy (Let’s Encrypt/ACME recommended)
- Set proper CORS origins
- Set DB credentials via environment variables (never commit secrets)
- Configure logging rotation and monitoring (health, latency, errors)

---

With the above, a teammate can deploy the API behind `https://api.yourdomain.com`, point the frontend `REACT_APP_API_BASE` to `https://api.yourdomain.com/api`, and go live without UI changes.

## 🔍 Troubleshooting

- **Port 8081 already in use:** Change `server.port` in application.properties
- **CORS issues:** Verify `@CrossOrigin` annotations include your frontend URL
- **Database connection:** Check H2 console or MySQL connection settings
- **Frontend not connecting:** Verify API_BASE_URL in frontend matches backend port