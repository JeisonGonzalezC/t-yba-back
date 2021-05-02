import * as path from 'path';
import config from "../config/config";

const dbConfig = {
    client: 'pg',
    connection: config.DB_CONNECTION,
    searchPath: 'public',
    extensions: ['js', 'ts'],
    migrations: {
        directory: path.join(path.dirname(__filename), '../migrations'),
        tableName: 'database_migrations',
    },
    pool: {},
    debug: false,
};

// NOTE: using module.exports because knex cli requires it
module.exports = dbConfig;
