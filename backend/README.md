# Sumeru Appraisal System

## Project Structure

```
sumeru-appraisal/                  <- Root project
│
├─ src/main/java/com/sumeru/appraisal/
│   ├─ controller/                 <- Controllers for handling HTTP requests
│   │   ├─ EmployeeController.java
│   │   ├─ AdminController.java
│   │   ├─ PMController.java
│   │   └─ CEOController.java
│   │
│   ├─ service/                    <- Business logic
│   │   ├─ EmployeeService.java
│   │   ├─ AdminService.java
│   │   └─ PMService.java
│   │
│   ├─ repository/                 <- JPA Repositories for DB access
│   │   ├─ EmployeeRepository.java
│   │   └─ ProjectRepository.java
│   │
│   ├─ entity/                     <- JPA Entities / Models
│   │   ├─ Employee.java
│   │   ├─ Project.java
│   │   └─ Appraisal.java
│   │
│   └─ dto/                        <- Optional Data Transfer Objects
│       └─ EmployeeDTO.java
│
├─ src/main/resources/
│   ├─ application.properties      <- DB & app config
│   ├─ static/                     <- Static frontend files
│   │   ├─ css/
│   │   ├─ js/
│   │   └─ images/
│   └─ templates/                   <- Thymeleaf/JSP templates
│       ├─ employee/
│       │   ├─ dashboard.html
│       │   └─ profile.html
│       ├─ admin/
│       ├─ pm/
│       └─ ceo/
│
├─ src/test/java/com/sumeru/appraisal/  <- Unit & integration tests
│
├─ pom.xml                        <- Maven dependencies
└─ README.md                      <- Project instructions
```

## Getting Started

### Prerequisites
- Java 21
- Maven
- MySQL Database

### Installation

1. Clone the repository
2. Configure database in `application.properties`
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### API Endpoints

- **Employee Management**: `/api/employees`
- **Admin Management**: `/api/admin`
- **Project Management**: `/api/pm`
- **CEO Dashboard**: `/api/ceo`

## TODO

- [ ] Implement entity relationships
- [ ] Add service layer business logic
- [ ] Create REST API endpoints
- [ ] Add authentication and security
- [ ] Implement frontend templates
- [ ] Add unit and integration tests
- [ ] Configure database migrations
- [ ] Add API documentation
