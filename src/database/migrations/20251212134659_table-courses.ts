import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("courses", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid()),
      table.text("name").notNullable(),
      table.text("description").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("courses");
}
