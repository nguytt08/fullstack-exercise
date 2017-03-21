var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname + '/../db/github-fetcher.sqlite3')
  }
});
var db = require('bookshelf')(knex);

exports.db = db;

//Insert data into database
exports.insert = function(repoName, userName, stargazers) {
  db.knex.raw(`INSERT OR REPLACE into repos ('repoName', 'userName', 'stargazers') VALUES ('${repoName}', '${userName}', ${stargazers})`)
  .then(function (id) {
    //Empty function because won't insert without it.
});
};

//Query for Top 25 sorted by stargazers
exports.returnTop25 = function() {

  return db.knex.raw('SELECT * FROM repos ORDER BY stargazers DESC LIMIT 25')
  .then(function(results) {
   return results;
  });

}