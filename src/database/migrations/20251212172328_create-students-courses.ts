import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("enrollments", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid()),
      table.timestamp("registered_at").defaultTo(knex.fn.now());
    // chaves estrangeiras, relacionamentos n:n
    table
      .uuid("student_id")
      .references("id")
      .inTable("students")
      .onDelete("CASCADE"),
      table
        .uuid("course_id")
        .references("id")
        .inTable("courses")
        .onDelete("CASCADE");

    table.unique(["student_id", "course_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("enrollments");
}
