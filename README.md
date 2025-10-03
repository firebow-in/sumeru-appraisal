# Sumeru Appraisal System

A comprehensive employee appraisal management system built with Spring Boot backend and React frontend.

## 📁 Project Structure

This is a **monorepo** containing two independent applications:

```
sumeru-appraisal/
├── 📁 backend/          # Spring Boot REST API
├── 📁 frontend/         # React Web Application
├── 📄 README.md         # This file
├── 📄 ENV_INSTRUCTIONS.md
└── 📄 INTEGRATION_TEST.md
```

## 🚀 Quick Start

### Prerequisites

- **Java 17+** (for backend)
- **Node.js 16+** (for frontend)
- **Maven 3.6+** (or use Maven wrapper)
- **npm** or **yarn**

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Run the Spring Boot application
./mvnw spring-boot:run
# On Windows: mvnw.cmd spring-boot:run

# The API will be available at: http://localhost:8080
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm start

# The app will be available at: http://localhost:3000
```

## 🔧 Configuration

### Backend Configuration

The backend configuration is in `backend/src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true

# H2 Console (for development)
spring.h2.console.enabled=true
```

### Frontend Configuration

The frontend configuration is in `frontend/.env`:

```bash
# Backend API Configuration
REACT_APP_API_BASE_URL=http://localhost:8080

# Development settings
REACT_APP_ENV=development
```

## 📚 API Documentation

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| POST | `/api/employees` | Create new employee |
| GET | `/api/employees/{id}` | Get employee by ID |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Create new project |
| GET | `/api/projects/{id}` | Get project by ID |
| PUT | `/api/projects/{id}` | Update project |
| DELETE | `/api/projects/{id}` | Delete project |
| GET | `/api/appraisals` | Get all appraisals |
| POST | `/api/appraisals` | Create new appraisal |
| GET | `/api/appraisals/{id}` | Get appraisal by ID |
| PUT | `/api/appraisals/{id}` | Update appraisal |
| DELETE | `/api/appraisals/{id}` | Delete appraisal |
| GET | `/api/dashboard` | Get dashboard data |
| GET | `/api/feedbacks` | Get all feedbacks |
| POST | `/api/feedbacks` | Create new feedback |

### H2 Database Console

During development, you can access the H2 database console at:
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (leave empty)

## 🏗️ Architecture

### Backend (Spring Boot)

- **Controllers**: REST API endpoints (`@RestController`)
- **Services**: Business logic layer (`@Service`)
- **Repositories**: Data access layer (`@Repository`)
- **Entities**: JPA database entities (`@Entity`)
- **Models**: Data transfer objects

### Frontend (React)

- **Components**: Reusable UI components
- **Services**: API communication layer
- **Pages**: Route-based page components
- **Styles**: CSS modules and global styles

## 🧪 Testing

### Backend Testing

```bash
cd backend
./mvnw test
```

### Frontend Testing

```bash
cd frontend
npm test
```

### Integration Testing

See `INTEGRATION_TEST.md` for detailed integration testing instructions.

## 📦 Building for Production

### Backend

```bash
cd backend
./mvnw clean package
# JAR file will be created in target/ directory
```

### Frontend

```bash
cd frontend
npm run build
# Build files will be created in build/ directory
```

## 🔍 Development

### Adding New Features

1. **Backend**: Add controllers, services, repositories, and entities
2. **Frontend**: Add components, pages, and API service methods
3. **Database**: Update `data.sql` for initial data
4. **Testing**: Add unit and integration tests

### Code Style

- **Backend**: Follow Spring Boot conventions
- **Frontend**: Follow React best practices
- **Database**: Use consistent naming conventions

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in `application.properties` and `.env`
2. **CORS issues**: Backend includes CORS configuration
3. **Database connection**: Ensure H2 is properly configured
4. **API calls failing**: Check if backend is running on correct port

### Logs

- **Backend logs**: Check console output or `logs/` directory
- **Frontend logs**: Check browser console and terminal

## 📄 Additional Documentation

- `ENV_INSTRUCTIONS.md` - Environment setup details
- `INTEGRATION_TEST.md` - Integration testing guide
- `backend/README.md` - Backend-specific documentation
- `frontend/README.md` - Frontend-specific documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

---

**Happy Coding! 🚀**