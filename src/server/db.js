var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'locahost',
    user     : 'root',
    password : 'Password1!',
    database : 'User',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

module.exports.DB = bookshelf;
