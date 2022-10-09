
# NPHC Software Engineer (Frontend) Assignment

Employee salary management webapp


## Authors

- [@imeshujith](https://www.github.com/imeshujith)


## Tech Stack

**Client:** React, TypeScript

**Server:** Node, Express

**Database:** MySQL


## Frontend

[Frontend Github Repo](https://github.com/imeshujith/fronend)
## Backend

[Backend Github Repo](https://github.com/imeshujith/backend)
## Installation

Database Configurations 

- Create a new MySQL database called backend
```bash
backend
```
- Inside the backend folder change the config/db.js for database configurarions
```javascript
module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'backend',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
```
Backend Configurations  

- Do you want to change backend port, change the index.js PORT variable

```bash
const PORT = 8081;
```
- Do you want to change frontend cross URL, change the index.js coreOptions variable
```bash
let coreOptions = {
  origin: "http://localhost:3000",
};
```
Frontend Configurations  

- Do you want to change backend cross URL, change the .env file REACT_APP_API_URL
```bash
REACT_APP_API_URL=http://localhost:8081
```
   

## Running

To run backend, run the following command

```bash
  cd backend
  npm install
  npm start
```

To run frontend, run the following command

```bash
  cd frontend
  npm install
  npm start
```
## API Reference

#### Get all employees

```http
  GET /api/employees
```

#### Upload Employees

```http
  POST /api/employees/upload
```

#### Update Employee

```http
  PUT /api/employees/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Delete Employee

```http
  DELETE /api/employees/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

