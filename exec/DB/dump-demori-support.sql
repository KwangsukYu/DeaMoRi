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
-- Table structure for table `support`
--

DROP TABLE IF EXISTS `support`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `support` (
  `uni_user_pk` int NOT NULL AUTO_INCREMENT,
  `send_university` varchar(255) DEFAULT NULL,
  `support_balance` int NOT NULL,
  `support_name` varchar(255) DEFAULT NULL,
  `transaction_hash` varchar(255) DEFAULT NULL,
  `league_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`uni_user_pk`),
  KEY `FKbo52xjm012p9m40fdwmfdtovj` (`league_id`),
  KEY `FKog1o7qfuuwlsyy8qbqlmulmhv` (`user_id`),
  CONSTRAINT `FKbo52xjm012p9m40fdwmfdtovj` FOREIGN KEY (`league_id`) REFERENCES `league` (`league_pk`),
  CONSTRAINT `FKog1o7qfuuwlsyy8qbqlmulmhv` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `support`
--

LOCK TABLES `support` WRITE;
/*!40000 ALTER TABLE `support` DISABLE KEYS */;
INSERT INTO `support` VALUES (1,'1',10000000,'대학모아리그','0x16644bbde12c2791000bd5c1cde81a0c274ca2680e5d6794a08c8bcb02babdf5',1,5),(2,'0',9000000,'조대조대','0xbbf2f11488c772acc487dbc545d837297124b52e860f0422991bfb4f5b58ea62',2,9),(3,'0',10000000,'하이하이','0x0454bb3b695b592046004860bb6dfca184f3f797130af11008b3967be13d5ce4',3,10),(4,'0',3000000,'광운사랑','0x4a7be83c66af40ba436c8192f2a8b3226d8c04f77b3f0899f0eb1d23f0aa73c5',6,14),(5,'0',10000,'사랑해요 조선대','0xbf41547a0f4ae68650c63ec7c369129c417bbfc03a95a037129742db872b070e',4,12),(6,'0',100000,'화이팅~~','0x687e99fe87b9e916b9a7a61d5e0bb9ca72281a344e07a4af9c901fc5c726974b',4,12),(7,'1',5000000,'싸피최고','0x5bfd83b77b6720f0f3e066aa6b2a084b0617222cbd047e5b0d627b285ec5bade',14,4),(8,'1',3000000,'싸피최고','0xf07d58caf386212368ae43e5752af3a33a3453dcaca91184e674347e455b200d',7,4),(9,'1',5000000,'내가연세','0xca22c4d8c3ee3ad25b8e427c000be5ffabd5964fca444b5104f91bcc199c25b9',9,15),(10,'0',12000000,'내가 연세','0xb7c2e70df16183603a2f34c2497eda560f11005246d707d02239ed876f4132df',15,15),(11,'0',500000,'서울대총동창회','0xf92dfed0d55de451fdd2e99a9e9a6d1986b90c832b23a026597be1b5cd679406',5,8),(12,'1',7000000,'고려대공대','0xf39613d4d8f5a1fcb22bf87aec0e40f08da31189e8963c92b2b8b7a53eac346e',15,16),(13,'1',5000000,'후후건이','0x9017c97b253d2d1ad3e1e6b95776097afa780e250dc6e90df973465f11cf13e4',15,17),(14,'1',3000000,'후후건이','0xb4686950c7c471670d71c3cd6ede847c5809a8df74a0687d17cfd38296e602d0',15,17),(15,'0',9000000,'전대총동창회','0xcabc72260a71ca42b4195a1ee2008860da77636ccfaba738604c490c8f3288f9',1,2),(16,'1',1890000,'고대 맨쓰','0xf906c45b3cf6355e540db0c722d691bcdca5bece4f90350051e4e05cac8f1f45',15,12);
/*!40000 ALTER TABLE `support` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 10:44:33
