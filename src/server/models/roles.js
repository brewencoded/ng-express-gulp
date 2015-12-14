var DB = require('../db').DB;

var Role = DB.Model.extend({
   tableName: 'tbl_Roles',
   idAttribute: 'roleId',
   UserRoles: function() {
     return this.morphMany(require('./userRoles'), 'userroles');
   }
});

module.exports = DB.model('Role', Role);