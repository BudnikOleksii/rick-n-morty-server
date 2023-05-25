require("dotenv").config();

const {
  SERVER_PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

const env = process.env.NODE_ENV;

const serverPort = parseInt(SERVER_PORT) || 8080;
const development = {
  server: {
    port: serverPort,
  },
  db: {
    type: "postgresql",
    host: DB_HOST || "localhost",
    port: DB_PORT || 5432,
    user: POSTGRES_USER || "root",
    name: DB_NAME || "db",
    password: POSTGRES_PASSWORD || "root",
  },
};

const config = {
  development,
  test: development,
  production: development,
};

module.exports = config[env];
