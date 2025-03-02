# BD Skills API

This is a simple API built with Express.js and PostgreSQL to manage courses. It includes rate limiting and API key.

## Prerequisites

- Node.js (version 18 or higher)
- PostgreSQL database

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/themaruf/bd-skills-api.git
   cd bd-skills-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```plaintext 
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASS=
    DB_NAME=bdskills_api
    API_KEY=your-api-key
    API_RATE_LIMIT=100
    ```

## Running the Project

To start the server, run:

```bash 
    npm run start
```


The server will be running on `http://localhost:3000`.

## API Endpoints

### GET /courses

Fetch courses with pagination.

**Query Parameters:**

- `page`: The page number (default is 1).
- `limit`: The number of courses per page (default is 10).

**Headers:**

- `x-api-key`: Your API key for authentication.

**Response:**

Returns a JSON object containing the current page, limit, and an array of courses.