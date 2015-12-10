drop database if exists Users;

create database if not exists Users;

use Users;

drop table if exists tbl_Users;

create table if not exists tbl_Users(
   userId integer primary key auto_increment,
   username varchar(100) unique,
   password varchar(100)
)engine=innodb;