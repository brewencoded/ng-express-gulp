/**
 * Database connection info
 */

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'Password1!',
    database : 'Users',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

module.exports.DB = bookshelf;
