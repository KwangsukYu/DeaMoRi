-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: j7c208.p.ssafy.io    Database: demori
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_pk` int NOT NULL AUTO_INCREMENT,
  `badge` varchar(255) DEFAULT NULL,
  `create_date` datetime(6) DEFAULT NULL,
  `donation` int NOT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  `ranking` int NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `uni_pk` int DEFAULT NULL,
  `uni_auth_pk` int DEFAULT NULL,
  `wallet_pk` int DEFAULT NULL,
  PRIMARY KEY (`user_pk`),
  UNIQUE KEY `UK_s2t1a7743tcs3dkd1r3meam3f` (`wallet_pk`),
  KEY `FK7jx37v7nro4r48mgcc3j4uvk6` (`uni_pk`),
  KEY `FK78k2c86w0r0smem07i3759may` (`uni_auth_pk`),
  CONSTRAINT `FK78k2c86w0r0smem07i3759may` FOREIGN KEY (`uni_auth_pk`) REFERENCES `university_auth` (`uni_auth_pk`),
  CONSTRAINT `FK7jx37v7nro4r48mgcc3j4uvk6` FOREIGN KEY (`uni_pk`) REFERENCES `university` (`t_pk`),
  CONSTRAINT `FKa31j601xr23xx5jpecjboa9nn` FOREIGN KEY (`wallet_pk`) REFERENCES `wallet` (`wallet_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/B/B_unrank.PNG','2022-10-06 17:35:40.837000',0,'admin','$2a$10$yFLTBDeLvOdSVZiWTGl1O..bHJqnpzGsEs4SlLJxsWuF2XXtuZcNC','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/U/basicProfile.png',12,'ROLE_ADMIN','admin','admin',NULL,NULL,NULL),(2,'https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/B/B_plu.PNG','2022-10-07 00:14:12.668000',9000000,'OngLas','$2a$10$1CWywylAPndM5EtiTS/RfOsYNH6tvmviucGy6HYt3K5OvctnzrFDK','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/U/basicProfile.png',4,'ROLE_AUTH','wow2867','홍석호',14,2,1),(3,'https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/B/B_unrank.PNG','2022-10-07 00:24:42.624000',0,'후건이','$2a$10$o9vnO/NCDXy16iHMPSVr8usZRMwbLyWdESNfbep0KZriL66o.ICUi','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/U/basicProfile.png',12,'ROLE_USER','lgh3806','이건후',354,1,2),(4,'https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/B/B_plu.PNG','2022-10-07 00:28:03.951000',8000000,'싸피최고','$2a$10$8hKb7mWdHs1Ze7LWLHMbv.A9pp/ApOXSp/T9.Hg1dO7NN./N7nw8W','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/U/basicProfile.png',6,'ROLE_USER','lgh2308','김광용',100,13,12),(5,'https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/B/B_unrank.PNG','2022-10-07 00:28:20.298000',10000000,'대학모아리그운영자','$2a$10$5jDAeEVK4YtEtjLk2vTtCOC/GSdhxPDB1fK9vdtigCxJLUOIVL4ze','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/U/basicProfile.png',2,'ROLE_USER','soye','유광석',116,3,4),(6,'https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/B/B_unrank.PNG','2022-10-07 00:35:30.910000',0,'MSG','$2a$10$bPyROaXMGjJEMUrERLEvdun2UWJOoTyx3ED9KPTmDH6SC3newMYNO','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/U/basicProfile.png',12,'ROLE_AUTH','msg0037','김성민',NULL,4,NULL),(7,'https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/B/B_unrank.PNG','2022-10-07 00:39:19.908000',0,'광운사랑','$2a$10$kVdFYrbw2QlS9x1a70APMOcoRFyp4ZGlc0fy9r7ZZlUHqobnxFf5i','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/U/basicProfile.png',12,'ROLE_AUTH','kwu008','김광훈',47,5,3),(8,'https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/B/B_slver.PNG','2022-10-07 00:48:46.378000',500000,'inseoul','$2a$10$/BN.QTU49ZjRjDGCMrAqlOC6wZouCQBgHXh6HWOIpaTv8oT.6s2eq','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/U/basicProfile.png',11,'ROLE_USER','ong2867','김유겸',11,6,5),(9,'https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/B/B_unrank.PNG','2022-10-07 01:04:35.087000',9000000,'조대조대','$2a$10$qniLUSw92OQLb7bK0myASeGVdtvpXEeht2ro1DlI1SDyu7/E4SEMG','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/U/basicProfile.png',4,'ROLE_USER','soye2','조대조대',116,7,6),(10,'https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/B/B_unrank.PNG','2022-10-07 01:12:19.861000',10000000,'조대신사','$2a$10$P1NWzszoqB4bnU9d23jSk.xhfwxiMsEb4xK/OtKqrPXU538fMVUjS','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/U/basicProfile.png',2,'ROLE_USER','soye3','조대신사',116,8,8),(11,'https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/B/B_unrank.PNG','2022-10-07 01:12:37.174000',0,'상명사랑','$2a$10$3wbK75SlI1DWZxTiHyRA.e2JBz6gK644qj.UqTFDX1cWlOnwzJjya','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/U/basicProfile.png',12,'ROLE_USER','smlover','상명사랑',NULL,NULL,7),(12,'https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/B/B_plu.PNG','2022-10-07 01:15:55.206000',2000000,'이만득','$2a$10$OrTx58Ubza4760nSrbwjweXx6yEsRqWc8kMn2k0Q8Bex9UUQ8dVG6','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/U/basicProfile.png',10,'ROLE_USER','dlalswo9801','이민재',116,9,9),(13,'https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/B/B_unrank.PNG','2022-10-07 01:16:45.266000',0,'yeon','$2a$10$d7ffXaZ1mMedfBH2r.yEluxSIwsF6J5h7NPN6vz0./MILXsg6N5ZW','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/U/basicProfile.png',12,'ROLE_AUTH','hong2867','최재성',100,10,10),(14,'https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/B/B_plu.PNG','2022-10-07 01:19:18.414000',3000000,'kulover1','$2a$10$m6BmPDSWX0HV1IG3w5Mgcu5lNs9dn96PmDus6Iad2NSYRg.YSx4fi','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/U/basicProfile.png',9,'ROLE_AUTH','kulover1','kulover1',47,11,11),(15,'https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/B/B_plu.PNG','2022-10-07 01:23:33.906000',17000000,'yu1004','$2a$10$OZ8uacgMAHdSEUxn5Eib/uwZODAdPOvZlJvSWjgwFzrn/35JtTVY2','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/U/basicProfile.png',1,'ROLE_AUTH','yu1004','yu1004',100,12,13),(16,'https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/B/B_plu.PNG','2022-10-07 01:32:00.274000',7000000,'godae','$2a$10$WPraBhzi6hhvrlShUDic1Ofi3WT2a9CXOQhJa2FiYgyLqHmBrHYOu','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/U/basicProfile.png',8,'ROLE_USER','pippo2867','양우진',354,14,14),(17,'https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/B/B_plu.PNG','2022-10-07 01:33:36.406000',8000000,'후후건이','$2a$10$8jJoXjlK7eeVuDG8EcqO.OYGxDJaQV48CpJmznDZceV4U089yl.GC','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/U/basicProfile.png',6,'ROLE_USER','lgh38066','건후',354,15,15);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 10:46:19
