angular.module('myApp')
    .factory('ValidationSvc', function() {
        return {
            validate: function(type, fields) {
            	//check if empty
                if (Object.keys(fields).length > 0) {
                    angular.forEach(fields, function(value, key) {
                        if (value) {
                            if (value === '' || value === undefined) {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    });
                } else {
                    return false;
                }

                return true;


            }
        };
    });
