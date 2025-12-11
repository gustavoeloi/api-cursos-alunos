import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("students", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid()),
      table.string("name").notNullable(),
      table.string("email").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("students");
}
