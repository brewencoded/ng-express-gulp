drop database if exists Users;

create database if not exists Users;

use Users;

drop table if exists tbl_Users;

CREATE TABLE tbl_Users (
  userId int(11) NOT NULL AUTO_INCREMENT,
  username varchar(100) DEFAULT NULL,
  password varchar(100) DEFAULT NULL,
  salt varchar(256) DEFAULT NULL,
  PRIMARY KEY (userId),
  UNIQUE KEY username (username)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

CREATE TABLE tbl_Roles (
  roleId int(11) NOT NULL AUTO_INCREMENT,
  role varchar(25) NOT NULL,
  PRIMARY KEY (roleId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE tbl_UserRoles (
  userId int(11) NOT NULL,
  roleId int(11) NOT NULL,
  PRIMARY KEY (userId,roleId),
  KEY roleId (roleId),
  CONSTRAINT tbl_userroles_ibfk_1 FOREIGN KEY (userId) REFERENCES tbl_Users (userId),
  CONSTRAINT tbl_userroles_ibfk_2 FOREIGN KEY (roleId) REFERENCES tbl_Roles (roleId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO tbl_Roles (role) 
  VALUES("user"), ("admin");
