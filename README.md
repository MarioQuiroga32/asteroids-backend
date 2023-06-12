# Asteroids Backend

This project serves as the backend for the Asteroids List web application. It is built with Node.js and TypeScript, providing the necessary APIs to fetch and manage asteroid data from NASA's API. The backend utilizes MongoDB for storing favorite asteroids and is set up for continuous integration and deployment (CI/CD) with Railway.

## Features

- Exposes RESTful APIs for fetching a list of asteroids and managing favorite asteroids.
- Integrates with NASA's API to fetch asteroid data.
- Stores favorite asteroids in a MongoDB database.
- Provides endpoints for marking asteroids as favorites, removing favorites, and retrieving favorite asteroids.

## Technologies Used

- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose
- Jest (for testing)
- CI/CD with Railway

## Getting Started

To get a local copy of the backend up and running, follow these steps:

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd asteroids-backend
```

3. Install the dependencies:

```bash
npm install
```

4. Set up environment variables:

Create a .env file in the root directory.
Specify the following environment variables in the .env file:
MONGODB_URI: The URI for connecting to your MongoDB database.
NASA_API_KEY: Your API key for accessing NASA's API.

5. Start the backend server:

```bash
npm run start
```

The backend server will be running at http://localhost:8000.

## Deployment
The project is set up for deployment with Railway, utilizing its CI/CD capabilities. Whenever changes are pushed to the main branch, Railway will automatically build and deploy the backend.

To set up the deployment, follow the instructions provided by Railway, including configuring the necessary environment variables for the backend to run in the deployment environment.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.

Please follow the project's code of conduct and guidelines when contributing.

## License
This project is licensed under the MIT License.
