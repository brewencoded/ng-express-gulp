var DB = require('../db').DB;

var User = DB.Model.extend({
   tableName: 'tbl_Users',
   idAttribute: 'userId'
});

module.exports = {
   User: User
};