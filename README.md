# TaskingIt

TaskingIt is a todoist inspire task-management application

## Live Link

https://taskingit.onrender.com/

## Tech Stack

#### Frameworks | Libraries | API

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Flask](https://img.shields.io/badge/Flask-black?style=for-the-badge&logo=flask)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)

#### Database

![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

#### Hosting

![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

## Index

[Feature List](https://github.com/nbmagallanes/TaskingIt/wiki/MVP's-Feature-List) |
[Schema](https://github.com/nbmagallanes/TaskingIt/wiki/TaskingIt-Schema) |
[User Stories](https://github.com/nbmagallanes/TaskingIt/wiki/TaskingIt-Schema)

## Features

## Site Preview

### Landing Page

image

### Today Page

image

### Upcoming Page

image

### User's Project Page

image

## Endpoints

### Auth

**`GET /`**  
 Authenticates the current user.

**Successful Response:**

**Error Response:**  

**`POST /login`**  
Logs a user in. Requires email and password. Returns user details on successful login.

**Successful Response:**

**Error Response:**  

**`POST /signup`**
Creates a new user and logs them in. Requires username, first name, last name, email, and password. Returns user details on successful signup.

**Successful Response:**

**`GET /unauthorized`**

**`GET /logout`**

### Projects

**`GET /`**
Retrieves all Projects.

**Successful Response:**

**Error Response:**

**`GET /<int:project_id>`**
Retrieves a specific project by its ID.

**Successful Response:**

**Error Response:**

**`POST /create`**

Creates a new Project

**Successful Response:**

**Error Response:**

**`PUT /<int:project_id>`**

Updates a specific project by its ID.

**Successful Response:**

**Error Response:**

**`DELETE /<int:project_id>`**
Deletes a specific project by its ID.

**Successful Response:**

**Error Response:**
