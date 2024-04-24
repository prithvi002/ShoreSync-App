# ShoreSync Project
This application uses a citizen-science approach to collect data on the ever-changing coastline by asking users to fill out shoreline feature forms, upload images, and tag GPS coordinates.

This repository contains the code for both the frontend and backend of the ShoreSync project. Below are the instructions to set up and run each part of the project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have `npm` installed on your computer. If you do not have `npm` installed, you can download and install Node.js (which includes `npm`) from [Node.js official website](https://nodejs.org/).


# Database Configuration for ShoreSync

This section covers setting up the PostgreSQL database for the ShoreSync project using Node.js and pgAdmin.

## Prerequisites

Ensure you have PostgreSQL installed on your machine. If it is not installed, download and install it from the [official PostgreSQL website](https://www.postgresql.org/download/).

## Setting Up the Database with Node.js

The project uses a PostgreSQL database. The connection details are as follows:

- **User**: `postgres`
- **Host**: `localhost`
- **Database**: `ShoreSyncDB`
- **Password**: `capstone24`
- **Port**: `5433`

### Configuration in Node.js

Check and confirm the following configuration to set up your database connection in Node.js:

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ShoreSyncDB',
  password: 'capstone24',
  port: 5433,
});

module.exports = pool;
```


# Setting Up the Backend

To set up and run the backend, follow these steps:

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd Shoresync-backend
   ```
2. Once you're in the project directory, install the required dependencies (node modules) by running:

    ```bash
    $ npm install
    ```

3. After installing the dependencies, you can then start the backend application using the following command:

    ```bash
    $ npm run dev
    ```

# Setting Up the Frontend

To set up and run the frontend, follow these steps:

1. Open a terminal and navigate to the frontend directory:
   ```bash
   cd Shoresync-frontend
   ```
2. Once you're in the project directory, install the required dependencies (node modules) by running:

    ```bash
    $ npm install
    ```

3. After installing the dependencies, you can then start the frontend application using the following command:

    ```bash
    $ npm start
    ```