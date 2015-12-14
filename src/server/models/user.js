var DB = require('../db').DB;

var User = DB.Model.extend({
   tableName: 'tbl_Users',
   idAttribute: 'userId',
   UserRoles: function () {
   	return this.morphMany(requre('./userRoles'), 'userroles');
   }
});

module.exports = DB.model('User', User);