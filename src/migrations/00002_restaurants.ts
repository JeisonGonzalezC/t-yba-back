import * as Knex from "knex";

export async function up(knex: Knex) {
    await knex.schema.createTable('restaurants', table => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).unique().index().notNullable();
        table.jsonb('transaction').notNullable();
        table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
        table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
    });
}  

export async function down(knex: Knex) {
    await knex.schema.raw('DROP TABLE IF EXISTS restaurants CASCADE');
}
