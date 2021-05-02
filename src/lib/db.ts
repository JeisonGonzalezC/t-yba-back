import Knex from 'knex';
import * as dbConfig from './knexfile';

const db = Knex(dbConfig);
const client: Knex.Client = db.client;

client.on('start', (builder: Knex.QueryBuilder) => {
    builder.on('query', ({ sql, bindings }: Knex.Sql) => {
    });
});

process.on('exit', async () => {
    await db.destroy();
});

export default db;
