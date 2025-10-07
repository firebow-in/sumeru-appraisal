<<<<<<< HEAD
<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Backend Base URL and Environments

Your React app calls the Spring Boot backend via a single base URL. Configure it per environment using `.env` files.

### Option A: .env (Recommended)

Create the file(s) in the `frontend` folder:

**.env** (used by `npm start`)
```
REACT_APP_API_BASE=http://localhost:8081/api
```

**.env.production** (used by `npm run build`)
```
REACT_APP_API_BASE=https://api.yourdomain.com/api
```

In code, the base is read from `process.env.REACT_APP_API_BASE`. The app already uses this in `src/services/api.js`.

Restart the dev server after changing `.env`.

### Option B: package.json proxy (Development only)

Add a proxy to `frontend/package.json` to forward `/api` calls to backend during development:
```json
"proxy": "http://localhost:8081"
```
Then you can set:
```
REACT_APP_API_BASE=/api
```
This avoids CORS in dev. Do not rely on `proxy` in production.

## Going Live (Frontend)

1. Ensure backend is reachable at `https://api.yourdomain.com` and exposes `/api/...` endpoints.
2. Set `REACT_APP_API_BASE` to `https://api.yourdomain.com/api` (via `.env.production` or CI env).
3. Build and deploy static files:
```
npm ci
npm run build
# deploy ./build to your hosting or CDN
```

## Quick Run Commands

Dev:
```
cd frontend
npm install
npm start
```

Production build:
```
cd frontend
npm ci
npm run build
```
=======
=======
>>>>>>> 9844e3c045b81c4f30bd912c2b62748e50b0bf68
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

<<<<<<< HEAD
**Happy Coding! 🚀**
>>>>>>> 9844e3c (Restructured frontend and backend, updated configs and styles)
=======
**Happy Coding! 🚀**
>>>>>>> 9844e3c045b81c4f30bd912c2b62748e50b0bf68
