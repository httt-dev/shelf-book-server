CREATE TABLE demo_user.`user` (
	id INT auto_increment NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT user_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


INSERT  INTO demo_user.`user`(email,password) VALUES('test@gmail.com','Abc12345')

CREATE TABLE `drfid_log_move` (
  `dlm_id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `dlm_date` date DEFAULT '0000-00-00',
  `dlm_rfid_cd` varchar(45) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `dlm_cnt` int(11) DEFAULT NULL,
  `dlm_outdate` timestamp NULL DEFAULT NULL,
  `dlm_indate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`dlm_id`),
  KEY `dlm_rfid_cd_index` (`dlm_rfid_cd`)
) ENGINE=InnoDB AUTO_INCREMENT=9642 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;


CREATE TABLE `drfid_product_pos` (
  `dpp_id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `dpp_shelf_pos` int(7) DEFAULT NULL,
  `dpp_shelf_col_pos` int(7) DEFAULT NULL,
  `dpp_rfid_cd` varchar(45) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `dpp_isbn` varchar(13) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `dpp_product_name` varchar(200) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `dpp_scaner_name` varchar(45) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`dpp_id`),
  KEY `dpp_rfid_cd_index` (`dpp_rfid_cd`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
