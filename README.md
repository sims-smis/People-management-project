# Angular People Management App

This application is built using **Angular 7.3.10** that allows you to manage a list of people. It supports listing, editing, viewing and deleting individuals using predefined REST API endpoints.

## 📹 Demo

https://github.com/user-attachments/assets/8271d7fc-0a88-484d-a516-deaecdb42cfe

## 🧾 Features

- List all people
- Edit a person
- View a person's detail
- Delete a person

## 🛠️ Technologies Used

- Angular 7
- Angular Material
- TypeScript
- HTML/CSS
- REST API endpoints

## 🔗 REST API Endpoints Used

This app fetches and updates people data using the following REST API:

| Method | Endpoint              | Description                            |
|--------|------------------------|----------------------------------------|
| GET    | `/people`              | Fetches the list of all people         |
| GET    | `/people/:id`          | Fetches details of a single person     |
| POST   | `/people`              | Adds a new person                      |
| PUT    | `/people/:id`          | Updates an existing person's details   |
| DELETE | `/people/:id`          | Deletes a person by ID                 |
| GET    | `/people?q=term`       | Searches for people by a search term   |

All API calls are managed through the `PeopleService` using Angular's `HttpClient`. Each request includes error handling using RxJS's `catchError` operator to ensure smooth user experience and easier debugging.

(Data is mocked using `db.json` with `json-server` for development)

## 🚀 Getting Started

### 1. Clone the Repository

```
https://github.com/sims-smis/People-management-project.git
cd people-management
```
Run `npm install` to install dependencies.

### 2. Start the Backend (Choose One Option)
**Option A: Use Mock Server using json-server (Quick Setup)**

```
npx json-server --watch db.json --port 3000
ng serve --open
```
Your mock server is now running at `http://localhost:3000/`

This will navigate to `http://localhost:4200/people`. The app will automatically reload if you change any of the source files.

**Option B: Use Real Backend (Assignment 2 - Node + MongoDB)**

Clone and set up the backend from your Assignment 2 repository:

```
git clone https://github.com/sims-smis/people-api.git
cd people-api
npm install
node index.js
```
Your Node backend is now running at `http://localhost:3000/`

Open a new terminal and run `ng serve --open`. This will navigate to `http://localhost:4200/people`. The app will automatically reload if you change any of the source files.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
