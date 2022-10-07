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
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `team_pk` int NOT NULL AUTO_INCREMENT,
  `team_color` varchar(255) DEFAULT NULL,
  `team_id` varchar(255) DEFAULT NULL,
  `university_id` int DEFAULT NULL,
  `leader_wallet` int DEFAULT NULL,
  PRIMARY KEY (`team_pk`),
  KEY `FKr3br08ps7davlgaowju7xx0u8` (`university_id`),
  KEY `FKaov93aej1sxny01djjl61cuyf` (`leader_wallet`),
  CONSTRAINT `FKaov93aej1sxny01djjl61cuyf` FOREIGN KEY (`leader_wallet`) REFERENCES `wallet` (`wallet_pk`) ON DELETE CASCADE,
  CONSTRAINT `FKr3br08ps7davlgaowju7xx0u8` FOREIGN KEY (`university_id`) REFERENCES `university` (`t_pk`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'#287336','FC시스템',14,1),(2,'#3344a5','FC어벤져스',116,1),(3,'#4dbca7','조대최고',116,4),(4,'#70c889','전대최고',14,4),(5,'#ca10b4','펠프스',116,4),(6,'#8cd68c','박태환',14,4),(7,'#c6c67f','댄스대회',116,4),(8,'#5bb161','댄스대회우승팀',14,4),(9,'#4659d6','서울대러너',11,5),(10,'#81c43c','매드러너',27,5),(11,'#5d0f10','광운',47,1),(12,'#8f99ce','상명',76,1),(13,'#760023','고려사랑',354,2),(14,' #003876','연세사랑',100,2),(15,'#393d55','강릉원주',1,1),(16,'#20359d','한라',135,1),(17,'#760023','고려축구동아리',354,2),(18,' #003876','연세축구동아리',100,2),(19,'#3f51c0','서울최고',11,5),(20,'#d0982a','부산최고',10,5),(21,' #760023','고려야구동아리',354,2),(22,' #003876','연세야구동아리',100,2),(23,'#760023','고려탁구동아리',354,2),(24,' #003876','연세탁구동아리',100,2),(25,'#465bd0','태권도는우리',11,5),(26,'#da973f','국대예정',354,5),(27,'#760023','고려댄스동아리',354,2),(28,'#003876','연세댄스동아리',100,2),(29,'#354ed6','연아시스',100,5),(30,'#e53d4b','고다수',354,5);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 10:44:56
