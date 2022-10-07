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
-- Table structure for table `trophy`
--

DROP TABLE IF EXISTS `trophy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trophy` (
  `trophy_pk` int NOT NULL AUTO_INCREMENT,
  `file_url` varchar(255) DEFAULT NULL,
  `league_id` int DEFAULT NULL,
  `university_id` int DEFAULT NULL,
  PRIMARY KEY (`trophy_pk`),
  KEY `FK6lonwwpkk6b87qtl0l0hg7qda` (`league_id`),
  KEY `FKlh8ln1o9srh4bl4y57iq4s6b0` (`university_id`),
  CONSTRAINT `FK6lonwwpkk6b87qtl0l0hg7qda` FOREIGN KEY (`league_id`) REFERENCES `league` (`league_pk`),
  CONSTRAINT `FKlh8ln1o9srh4bl4y57iq4s6b0` FOREIGN KEY (`university_id`) REFERENCES `university` (`t_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trophy`
--

LOCK TABLES `trophy` WRITE;
/*!40000 ALTER TABLE `trophy` DISABLE KEYS */;
INSERT INTO `trophy` VALUES (1,'https://gateway.pinata.cloud/ipfs/QmR95tvFFUH6Brg2daGoSzzqtQyoPTczuJGAmEJ26sJDw7',2,116),(2,'https://gateway.pinata.cloud/ipfs/Qmaw2AsGFNmdMBFhaRPHyQZTVVTVqi7Cg3DdeaavPfqdNf',3,116),(3,'https://gateway.pinata.cloud/ipfs/QmUBWR79dCshFkB8KgwU4cAU3cZzgyR6CgdUWBq8BWeU2t',5,11),(4,'https://gateway.pinata.cloud/ipfs/undefined',1,14);
/*!40000 ALTER TABLE `trophy` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 10:45:26
