var DB = require('../db').DB;

var Role = DB.Model.extend({
    tableName: 'tbl_Roles',
    idAttribute: 'roleId'
});

var User = DB.Model.extend({
    tableName: 'tbl_Users',
    idAttribute: 'userId',
    roles: function() {
        return this.belongsToMany(Role, 'tbl_UserRoles', 'userId', 'roleId'); 
    }
});

var UserRole = DB.Model.extend({
   tableName: 'tbl_UserRoles'
});

module.exports = {
	User: User,
	Role: Role,
	UserRole: UserRole
};
