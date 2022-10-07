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
-- Table structure for table `university_league`
--

DROP TABLE IF EXISTS `university_league`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `university_league` (
  `uni_league_pk` int NOT NULL AUTO_INCREMENT,
  `league_id` int DEFAULT NULL,
  `university_id` int DEFAULT NULL,
  PRIMARY KEY (`uni_league_pk`),
  KEY `FKednn3fvwqo07y7vduuo5le41t` (`league_id`),
  KEY `FKifu38myvvryky86l8vhrboxyn` (`university_id`),
  CONSTRAINT `FKednn3fvwqo07y7vduuo5le41t` FOREIGN KEY (`league_id`) REFERENCES `league` (`league_pk`),
  CONSTRAINT `FKifu38myvvryky86l8vhrboxyn` FOREIGN KEY (`university_id`) REFERENCES `university` (`t_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university_league`
--

LOCK TABLES `university_league` WRITE;
/*!40000 ALTER TABLE `university_league` DISABLE KEYS */;
INSERT INTO `university_league` VALUES (1,1,116),(2,1,14),(3,2,14),(4,2,116),(5,3,14),(6,3,116),(7,4,14),(8,4,116),(9,5,27),(10,5,11),(11,6,76),(12,6,47),(13,7,100),(14,7,354),(15,8,135),(16,8,1),(17,9,100),(18,9,354),(19,10,10),(20,10,11),(21,11,100),(22,11,354),(23,12,100),(24,12,354),(25,13,354),(26,13,11),(27,14,100),(28,14,354),(29,15,354),(30,15,100);
/*!40000 ALTER TABLE `university_league` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 10:46:10
