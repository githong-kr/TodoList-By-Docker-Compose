CREATE TABLE todos (
          id int(11) NOT NULL AUTO_INCREMENT,
          text varchar(100) DEFAULT NULL,
          color varchar(20) NOT NULL,
          checked tinyint(1) DEFAULT 0,
          deleted varchar(1) NOT NULL DEFAULT 'N',
          PRIMARY KEY (id)
);