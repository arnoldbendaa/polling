/*
SQLyog Professional v12.09 (64 bit)
MySQL - 10.1.31-MariaDB : Database - polling
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`polling` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `polling`;

/*Table structure for table `client` */

DROP TABLE IF EXISTS `client`;

CREATE TABLE `client` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(512) DEFAULT NULL,
  `phoneNumber` varchar(512) DEFAULT NULL,
  `firstName` varchar(512) DEFAULT NULL,
  `lastName` varchar(512) DEFAULT NULL,
  `birthDay` datetime DEFAULT NULL,
  `address` varchar(512) DEFAULT NULL,
  `realm` varchar(512) DEFAULT NULL,
  `username` varchar(512) DEFAULT NULL,
  `email` varchar(512) NOT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `verificationToken` varchar(512) DEFAULT NULL,
  `locationId` int(11) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

/*Data for the table `client` */

insert  into `client`(`userId`,`password`,`phoneNumber`,`firstName`,`lastName`,`birthDay`,`address`,`realm`,`username`,`email`,`emailVerified`,`verificationToken`,`locationId`) values (1,'$2a$10$fyNPI1Hlbqz6lCgLeValB.NpmH6xD9//cIxjnSk1DwUnG6cTD6KNm',NULL,NULL,NULL,NULL,NULL,NULL,'arnoldbendac','arnoldbendab@gmail.com',1,'eb140b0fbe644cb627b01bf649555665e6be4b953621eea392fe9dbb03f62ea10d8a589921d986f23deb44d0254759c353f6fb0eb210afad09752249c76f31ba',12),(2,'$2a$10$EklGUte36bO05y96WHaNV.DesfhZ7lJtxEyHlORUlcU0uERSRCfty',NULL,NULL,NULL,NULL,NULL,NULL,'arnold','arnoldbendaa@gmail.com',0,'ad9b443f6fc8a38712e1e29bf397d671cae4a4c27c8468513ebeb17e18dba601f2ded6dea80ec72193cf4d43b30a4820fc80b9a8712221797a81328713646823',12),(3,'$2a$10$KlVa3uM5UCd7DB7hwiAdnubQtm6u5e5cvYVYLJ1fWMsrKIk/rYaOi',NULL,NULL,NULL,NULL,NULL,NULL,'fullnname','arnoldbendac@gmail.com',0,'7dbf6487bb6cf853f959546320b00bc2ec29190e41c02272042b606fb9816a0be22fcc9a48492ea775b20c2f606c0e171a1f2a218d8ada2985bb16997936037c',8),(4,'$2a$10$ZIhLOLTwgb7FaUeThq5HUevSco896eg48sHUPIOKDlkx0uUJewfoe',NULL,NULL,NULL,NULL,NULL,NULL,'arnoldbendad','arnoldbendad@gmail.com',0,'c03313a39a29c60025c6fb75e0b25f521f05334b8817ebc802e2d9910b1e8c28ce0cc0c3aa7ef01386dfd177c1f278b39c8593f350920b6fbd3ce147847af33a',8),(13,'$2a$10$FuNRFObOJD6V72tQqRu4K.pDkuabW8JiFgq.TRP2.9r8KqUKX/VC6',NULL,NULL,NULL,NULL,NULL,NULL,'alex2','alexkruts@gmail.com',0,'54d5c5ed0ed06406be1ef7f93e03a0c50fb9b5b0e53cce4ed4a63e02354f01364c265f27d144d139f28323b3d463a56e544efc67bd5a8bae7c0c09533f8ba839',43);

/*Table structure for table `govproposal` */

DROP TABLE IF EXISTS `govproposal`;

CREATE TABLE `govproposal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `effective` varchar(128) DEFAULT NULL,
  `depth` int(11) DEFAULT NULL COMMENT '0:country,1:province,2:city',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

/*Data for the table `govproposal` */

insert  into `govproposal`(`id`,`effective`,`depth`) values (1,'Health',0),(2,'Education',0),(3,'Transportation',0),(4,'Justice',0),(5,'Social Services',0),(6,'International Trade',0),(7,'Agriculture',0),(8,'Fisheries',0),(9,'Natural Resources',0),(10,'Environment',0),(11,'Foreign affairs',0),(12,'National Defense',0),(13,'Economy',0),(14,'Tourism',0),(15,'Treasury',0),(16,'Finance and Banking',0),(17,'Taxation',0),(18,'Education',1),(19,'Tourism',1),(20,'Natural Resources',1),(21,'Environment',1),(22,'Transportation',1),(23,'Taxation',1),(24,'Justice',1),(25,'Law Enforcement',1),(26,'Social Services',1),(27,'Health',2),(28,'Education',2),(29,'Tourism',2),(30,'Taxation',3),(31,'Social Services',3);

/*Table structure for table `govvote` */

DROP TABLE IF EXISTS `govvote`;

CREATE TABLE `govvote` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `voteTime` datetime DEFAULT NULL,
  `votingResult` int(11) DEFAULT NULL,
  `proposalId` int(11) DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `locationId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

/*Data for the table `govvote` */

insert  into `govvote`(`id`,`userId`,`voteTime`,`votingResult`,`proposalId`,`priority`,`locationId`) values (1,1,'2018-01-28 03:15:24',1,1,56,1),(2,1,'2018-01-28 03:15:24',1,2,23,1),(3,1,'2018-01-28 03:15:24',1,3,36,1),(4,1,'2018-01-28 03:15:24',0,13,0,1),(5,1,'2018-01-28 03:15:24',1,9,0,1),(6,1,'2018-01-28 03:15:24',0,10,0,1),(7,1,'2018-01-28 03:15:24',0,11,0,1),(8,1,'2018-01-28 03:15:24',0,12,0,1),(9,1,'2018-01-28 06:51:40',0,19,3,10),(10,1,'2018-01-28 06:51:40',1,20,3,10),(11,1,'2018-01-28 06:51:40',0,18,56,10),(12,1,'2018-01-28 06:51:40',0,21,54,10),(13,1,'2018-01-28 06:51:40',1,22,23,10),(14,1,'2018-01-28 06:51:40',0,23,1,10),(15,1,'2018-01-28 06:51:40',1,24,23,10),(16,1,'2018-01-28 06:51:40',0,25,12,10),(17,1,'2018-01-28 06:51:40',1,26,31,10),(18,1,'2018-03-17 15:36:23',0,27,0,7),(19,1,'2018-03-17 15:36:23',1,28,0,7);

/*Table structure for table `location` */

DROP TABLE IF EXISTS `location`;

CREATE TABLE `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  `depth` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;

/*Data for the table `location` */

insert  into `location`(`id`,`name`,`parentId`,`depth`) values (1,'Canada',0,0),(2,'US',0,0),(3,'Japan',0,0),(4,'Alberta',1,1),(5,'Nova Scotia',1,1),(6,'Lunenburg',5,2),(7,'Calgary',4,2),(8,'Rocky Ridge',7,3),(9,'Lunenburg Community Centre',6,3),(10,'New York',2,1),(11,'New York City',10,2),(12,'New york community',11,3),(15,'Russia',0,0),(16,'UK',0,0),(18,'France',0,0),(27,'android',2,1),(28,'Rocky Ridge2',7,3),(30,'Rocky Ridge3',7,3),(31,'Alerta2',0,1),(40,'China',0,0),(41,'Shenyang',40,1),(42,'Heping',41,2),(43,'Heping Community',42,3);

/*Table structure for table `logintest` */

DROP TABLE IF EXISTS `logintest`;

CREATE TABLE `logintest` (
  `id` int(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `logintest` */

insert  into `logintest`(`id`) values (1);

/*Table structure for table `proposal` */

DROP TABLE IF EXISTS `proposal`;

CREATE TABLE `proposal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locationId` int(11) DEFAULT NULL,
  `title` varchar(512) DEFAULT NULL,
  `details` text,
  `createdUser` int(11) DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `displayUserName` int(11) DEFAULT NULL,
  `locationLink` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

/*Data for the table `proposal` */

insert  into `proposal`(`id`,`locationId`,`title`,`details`,`createdUser`,`priority`,`date`,`displayUserName`,`locationLink`) values (1,1,'title','New stop sign at the corner of rocky ridge drive and rocky ridge drive and rocky ridge road would be an improvment to protect children from the area crossing at this\r\n    intersection.Currently there is only a yield sign as right into the right driving lane',2,5,'2018-02-06 23:25:08',1,'https://www.google.com/maps/@51.0454966,-114.0595868,384m/data=!3m1!1e3'),(2,1,'title','New stop sign at the corner of rocky ridge drive and rocky ridge drive and rocky ridge road would be an improvment to protect children from the area crossing at this\r\n    intersection.Currently there is only a yield sign as right into the right driving lanecontent',2,5,'2018-02-06 23:25:08',1,'https://www.google.com/maps/@51.0454966,-114.0595868,384m/data=!3m1!1e3'),(3,5,'string','New stop sign at the corner of rocky ridge drive and rocky ridge drive and rocky ridge road would be an improvment to protect children from the area crossing at this\r\n    intersection.Currently there is only a yield sign as right into the right driving lane',1,0,'2018-02-06 23:33:59',1,'https://www.google.com/maps/@51.0454966,-114.0595868,384m/data=!3m1!1e3'),(4,8,'qwe','ewqewqeqw',1,23,'2018-02-03 08:00:00',1,'https://www.google.com/maps/@51.0454966,-114.0595868,384m/data=!3m1!1e3'),(5,12,'rwrew','New stop sign at the corner of rocky ridge drive and rocky ridge drive and rocky ridge road would be an improvment to protect children from the area crossing at this\r\n    intersection.Currently there is only a yield sign as right into the right driving lane',1,29,'2018-02-03 08:00:00',1,'https://www.google.com/maps/@51.0454966,-114.0595868,384m/data=!3m1!1e3'),(6,9,'test title','Please vote in this Proposal.\nThanks.',1,29,'2018-02-02 08:00:00',1,'https://www.google.com/maps/@51.0454966,-114.0595868,384m/data=!3m1!1e3'),(7,4,'alberta','alberat details',1,76,'2018-02-15 08:00:00',1,'https://www.google.com/maps/@51.0454966,-114.0595868,384m/data=!3m1!1e3'),(8,8,'First proposal in calgary','First proposal in calgary.\nThis is detail content. \nThanks.',1,61,'2018-02-13 08:00:00',0,'https://www.google.com/maps/@51.0454966,-114.0595868,384m/data=!3m1!1e3'),(9,1,'rewqrweq','rewqrwerqwrewqrewqrewqrewqe',1,13,'2018-01-11 16:00:00',1,'https://www.google.com/maps/@51.0454966,-114.0595868,384m/data=!3m1!1e3'),(10,9,'fdsafdsafdsdsa','fdsafdsadsa',1,0,'2018-01-11 16:00:00',0,'https://www.google.com/maps/@51.0454966,-114.0595868,384m/data=!3m1!1e3'),(11,9,'title1','fsdafds',1,83,'2018-01-11 16:00:00',1,'https://www.google.com/maps/@51.0454966,-114.0595868,384m/data=!3m1!1e3'),(12,12,'title1','details.',1,0,'2018-01-11 17:00:00',1,'https://www.google.com/maps/@19.106904,72.8846674,117m/data=!3m1!1e3'),(13,12,'right corner','a stop right corner need in this new york city.',1,0,'2018-01-11 17:00:00',1,'https://www.google.com/maps/@42.5565961,64.2574459,99274m/data=!3m1!1e3');

/*Table structure for table `vote` */

DROP TABLE IF EXISTS `vote`;

CREATE TABLE `vote` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `voteTime` datetime DEFAULT NULL,
  `votingResult` int(11) DEFAULT NULL,
  `proposalId` int(11) DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

/*Data for the table `vote` */

insert  into `vote`(`id`,`userId`,`voteTime`,`votingResult`,`proposalId`,`priority`) values (1,1,'2018-03-09 04:17:00',0,1,65),(2,2,'2018-02-10 13:47:58',1,2,3),(4,1,'2018-03-09 04:17:00',1,4,42),(5,1,'2018-03-11 04:54:13',0,5,29),(7,1,'2018-03-09 04:17:00',1,2,3),(8,1,'2018-03-09 04:17:00',0,3,3),(9,2,'2018-02-10 13:49:09',0,4,3),(10,3,'2018-02-10 13:49:07',0,5,3),(11,1,'2018-03-09 04:17:00',0,7,3),(12,1,'2018-03-09 04:17:00',1,8,3),(13,1,'2018-03-09 04:17:00',1,6,3),(14,1,'2018-03-16 07:27:47',1,12,16),(15,1,'2018-03-16 07:10:10',0,12,NULL),(16,1,'2018-03-16 07:10:16',0,12,NULL),(17,1,'2018-03-16 07:10:22',0,12,NULL),(18,1,'2018-03-16 07:10:24',0,12,8),(19,1,'2018-03-16 07:10:25',0,12,8),(20,1,'2018-03-16 07:10:25',0,12,8),(21,1,'2018-03-16 07:10:25',0,12,8),(22,8,'2018-03-16 09:27:34',1,13,62);

/* Function  structure for function  `checkLocationContains` */

/*!50003 DROP FUNCTION IF EXISTS `checkLocationContains` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` FUNCTION `checkLocationContains`(myId VARCHAR(32),locationId varchar(32)) RETURNS int(11)
BEGIN 
DECLARE res int DEFAULT -1;
DECLARE myDepth INT DEFAULT 0;
DECLARE locDepth INT DEFAULT 0;
declare pId int default 0;
SELECT depth INTO locDepth FROM location WHERE id = locationId;
IF locDepth=3 THEN 
	if locationId = myId then 
		set res = 1;
	else 
		set res = 0;
	end if;
ELSEIF locDepth=2 THEN 
	select parentId into pId from location where id = myId;
	if locationId = pId then 
		set res = 1;
	else 
		set res = 0 ;
	end if;
ELSEIF locDepth=1 THEN 
	select parentId into pId from location where id = myId;
	select parentId into pId from location where id = pId;
		IF locationId = pId THEN 
		SET res = 1;
	ELSE 
		SET res = 0 ;
	END IF;
ELSEIF locDepth=0 THEN 
	SELECT parentId INTO pId FROM location WHERE id = myId;
	SELECT parentId INTO pId FROM location WHERE id = pId;
	SELECT parentId INTO pId FROM location WHERE id = pId;
		IF locationId = pId THEN 
		SET res = 1;
	ELSE 
		SET res = 0 ;
	END IF;
END IF;
RETURN res;
END */$$
DELIMITER ;

/* Function  structure for function  `fnGetLocIds` */

/*!50003 DROP FUNCTION IF EXISTS `fnGetLocIds` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` FUNCTION `fnGetLocIds`(locId varchar(32)) RETURNS text CHARSET latin1
begin 
declare res text default "";
declare locDepth int default 0;
declare childrens text default "";
select depth into locDepth from location where id = locId;
if locDepth=3 then 
	set res = locId;
elseif locDepth=2 then 
	call getChildLocation(locId,res);
	SET res = concat(res,locId);
elseif locDepth=1 then 
	call getChildLocation(locId,childrens);
	SET res = concat(res,childrens);
	call getChildLocation(res,childrens);
	SET res = concat(res,childrens);
	SET res = concat(res,locId);
elseif locDepth=0 then 
	call getChildLocation(locId,childrens);
	SET res = concat(res,childrens);
	call getChildLocation(res,childrens);
	SET res = concat(res,childrens);
	call getChildLocation(res,childrens);
	SET res = concat(res,childrens);
	SET res = concat(res,locId);
end if;
return res;
end */$$
DELIMITER ;

/* Procedure structure for procedure `getChildLocation` */

/*!50003 DROP PROCEDURE IF EXISTS  `getChildLocation` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `getChildLocation`(
in locationIds varchar(8092),
inout result varchar(8092))
begin 
declare v_finished int default 0;
declare v_Id varchar(100) default "";
declare location_cursor cursor for 
select id from  location 
where find_in_set(parentId,locationIds);
declare continue handler 
for not found set v_finished=1;
set result = "";
open location_cursor;
get_location:loop
fetch location_cursor into v_Id;
if v_finished = 1 then 
leave get_location;
end if;
set result = concat(v_Id,",",result);
end loop get_location;
close location_cursor;
end */$$
DELIMITER ;

/* Procedure structure for procedure `getLocationIds` */

/*!50003 DROP PROCEDURE IF EXISTS  `getLocationIds` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `getLocationIds`(
	IN locId VARCHAR(32)
    )
BEGIN
	select fnGetLocIds(locId) as result;
    END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
