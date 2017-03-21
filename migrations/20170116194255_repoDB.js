exports.up = function(knex, Promise) {

  return knex.schema.createTable('repos', function(table) {
        // table.increments('id').primary();
        table.primary('repoName', 'userName');
        table.string('repoName', 255);
        table.string('userName', 255);
        table.integer('stargazers');
      }).then(function(table) {
        console.log('Created Table', table);
      });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('repos');
};
