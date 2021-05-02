import * as Knex from 'knex';

export async function up(knex: Knex) {
    await knex.raw('create extension if not exists "uuid-ossp"');
}
 
export async function down(knex: Knex) {
    knex.raw('drop extension if exists "uuid-ossp"');
}
