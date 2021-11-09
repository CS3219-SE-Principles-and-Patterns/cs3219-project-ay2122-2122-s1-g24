# Deployment

You can visit the deployed app [here](https://peerprep24.herokuapp.com/).

# Server

## Configurations

1. `cd` into the `/server` directory.
2. Run the following command to ensure you are on the correct version of node. Ensure you have node version manager installed.
```bash
$ nvm use
```
3. Add a `.env` file at the root of the project directory.
4. Within the `.env` file, enter the environment variables for
```bash
LISTEN_PORT                 # The port used for the app. Defaults to 8080.
MONGODB_HOST                # Include port number here if needed ie. 'localhost:27017'.
MONGODB_PROTOCOL            # Either 'mongodb' or 'mongodb+srv'. Defaults to 'mongodb'.
MONGODB_DATABASE            # Name of database used in mongo.
MONGODB_USERNAME            # Depends on your authentication, might not be needed.
MONGODB_PASSWORD            # Depends on your authentication, might not be needed.
OAUTH_GOOGLE_ID             # Client ID for your Google OAuth Client
OAUTH_GOOGLE_SECRET         # Secret used for your Google OAuth Client
OAUTH_GOOGLE_REDIRECT_URL   # It should redirect back to the backend GET /login endpoint
FRONTEND_URL                # URL to your frontend
JWT_SECRET                  # Secret used to sign JWT
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```

# Frontend

## Configurations

1. `cd` into the `/frontend` directory.
2. Run the following command to ensure you are on the correct version of node. Ensure you have node version manager installed.
```bash
$ nvm use
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```
