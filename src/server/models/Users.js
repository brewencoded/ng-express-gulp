var DB = require('../db').DB;

var Role = DB.Model.extend({
    tableName: 'tbl_Roles',
    idAttribute: 'roleId',
    users: function() {
        return this.belongsToMany(User);
    }
});

var User = DB.Model.extend({
    tableName: 'tbl_Users',
    idAttribute: 'userId',
    roles: function() {
        return this.hasMany(Role);
    }
});

var UserRole = DB.Model.extend({
   tableName: 'tbl_UserRoles',
   users: function() {
     return this.belongsToMany(User);
   },
   roles: function () {
   	return this.belongsToMany(Role);
   }
});

module.exports = {
	User: User,
	Role: Role
};
