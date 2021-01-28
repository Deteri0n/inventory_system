exports.up = function (knex) {
  return knex.schema.createTable("books", (table) => {
    table.increments("id").unsigned().primary();
    table.string("title");
    table.string("author");
    table.string("summary");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("books");
};
