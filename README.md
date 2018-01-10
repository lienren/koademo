# Koademo

koa demo project

# Run

```bash
> yarn
> node app.js
```

# Browser

http://localhost:3000/

# Attention

## Mysql table

```bash
DROP TABLE IF EXISTS `sm_user`;
CREATE TABLE `sm_user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(100) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  `isdel` int(1) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;;

SET FOREIGN_KEY_CHECKS = 1;
```

## Configs

./configs/mysql_config.json

```bash
{
  "host": "localhost",
  "port": 3306,
  "user": "root",
  "password": "123456",
  "database": "mydb",
  "charset": "UTF8_GENERAL_CI",
  "dateStrings": true
}
```

## Utils

[mysql-helper-simple](https://github.com/lienren/mysql-helper)

> this is a mysql helper simple plug-in
