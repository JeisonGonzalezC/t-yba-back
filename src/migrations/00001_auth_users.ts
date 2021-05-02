import * as Knex from "knex";

export async function up(knex: Knex) {
    await knex.schema.createTable('users', table => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).unique().index().notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.boolean('status_login').notNullable().defaultTo(false);
        table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
        table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
    });
}  

export async function down(knex: Knex) {
    await knex.schema.raw('DROP TABLE IF EXISTS users CASCADE');
}
