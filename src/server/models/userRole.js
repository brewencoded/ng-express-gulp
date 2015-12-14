var DB = require('../db').DB;

var UserRole = DB.Model.extend({
   tableName: 'tbl_UserRoles',
   idAttribute: 'userId',
   userroles: function() {
     return this.morphTo('userroles', require('./user'), require('./roles'));
   }
});

module.exports = DB.model('Role', Role);