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
-- Table structure for table `league`
--

DROP TABLE IF EXISTS `league`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `league` (
  `league_pk` int NOT NULL AUTO_INCREMENT,
  `all_donation` int NOT NULL,
  `contract_address` varchar(255) DEFAULT NULL,
  `is_broadcast` varchar(255) DEFAULT NULL,
  `league_end_date` date DEFAULT NULL,
  `league_id` varchar(255) DEFAULT NULL,
  `league_start_date` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `posterurl` varchar(255) DEFAULT NULL,
  `prize_money` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `team_one_donation` int NOT NULL,
  `team_two_donation` int NOT NULL,
  `owner` int DEFAULT NULL,
  `team1` int DEFAULT NULL,
  `team2` int DEFAULT NULL,
  PRIMARY KEY (`league_pk`),
  KEY `FKnpft4623g7ph9w2e934ry356b` (`owner`),
  KEY `FKp036dviyn0mkt65in8038ijpu` (`team1`),
  KEY `FK1d5yxrbuqaxwjkb4ml5d4o22h` (`team2`),
  CONSTRAINT `FK1d5yxrbuqaxwjkb4ml5d4o22h` FOREIGN KEY (`team2`) REFERENCES `team` (`team_pk`),
  CONSTRAINT `FKnpft4623g7ph9w2e934ry356b` FOREIGN KEY (`owner`) REFERENCES `user` (`user_pk`),
  CONSTRAINT `FKp036dviyn0mkt65in8038ijpu` FOREIGN KEY (`team1`) REFERENCES `team` (`team_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `league`
--

LOCK TABLES `league` WRITE;
/*!40000 ALTER TABLE `league` DISABLE KEYS */;
INSERT INTO `league` VALUES (1,19000000,'0xC0390d5ca8Bcb60c6257aaCEc0d234B477Ff0d19','1','2022-10-08','전조대 풋살대회','2022-10-08','조대대운동장','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/P/P_52369d68-16bd-4703-ae65-255776da8594_%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-001.jpg',500000,'2',9000000,10000000,2,1,2),(2,9000000,'0x20F443eFa415414E1B397e8f41e5a7bD07622C12','1','2022-10-09','전대, 조대 배드민턴 대회','2022-10-08','전남대','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/P/P_cb2b049f-769c-4d9c-9701-1c58183c1773_%EC%A0%84%EB%8C%80%EC%A1%B0%EB%8C%80%EB%B0%B0%EB%93%9C%EB%AF%BC%ED%84%B4%EB%8C%80%ED%9A%8C.png',10000,'2',9000000,0,5,3,4),(3,10000000,'0x51CdAcE4d5852b3d71B6e1c1929A32561E88584b','1','2022-10-13','가을에 수영대회','2022-10-12','수영장','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/P/P_cf8f475d-4e7e-4377-a0c6-afc9204b351c_%EC%A0%84%EB%8C%80%EC%A1%B0%EB%8C%80%EC%88%98%EC%98%81%EB%8C%80%ED%9A%8C.png',1230000,'2',10000000,0,5,5,6),(4,110000,'0xa37bc7E8fd6c3B095bDa1bA97601174DfE92b842','','2022-10-16','대학 댄스대회','2022-10-15','경기장','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/P/P_f32c1511-2d8c-4129-87ae-0587020db99d_%EB%8C%80%ED%95%99%EA%B5%90%EB%8C%84%EC%8A%A4%EB%8C%80%ED%9A%8C.png',123300,'1',110000,0,5,7,8),(5,500000,'0xF485d6872776D673A6044F3F13e3Fbac1A5fEfE4','1','2022-10-15','IN서울 마라톤!','2022-10-15','서울대역 3번출구','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/P/P_57db68b8-98a4-4c16-8de8-3496c3e64597_%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-001%20%281%29.jpg',300000,'2',500000,0,8,9,10),(6,3000000,'0xd76068d4d9A6B6D6a1BE29b077E2824aAeBF2276','','2022-10-09','광운상명제','2022-10-07','광운대','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/P/P_c014e38f-e6a8-44eb-9a43-fdb84d4c260e_%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-001.png',100000,'0',3000000,0,7,11,12),(7,3000000,'0xB8f9A6E74ce9f9dB97aD6677205133fEf4D4b5F5','1','2022-11-12','대학교','2022-11-11','서울생활실내체육관','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/P/P_00f0a8fb-7307-45e9-8ce0-21545d19763d_%EC%A0%84%EA%B5%AD%EB%8C%80%ED%95%99%EA%B5%90%EC%88%98%EC%98%81%EB%8C%80%ED%9A%8C.png',500000,'0',0,3000000,3,13,14),(8,0,'0xaC2b97c6203ed66a9c62d467A99f96eE84f218F0','','2022-10-14','대동제 테니스대회','2022-10-07','강릉원주대','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/P/P_62bb900f-9d9d-44e7-b45e-4d32a3d73560_%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-001.png',20000,'0',0,0,7,15,16),(9,5000000,'0x9A9b5f17f6E954Dc1733435951261728209E38Fd','1','2022-11-05','축구대회(연고전)','2022-11-05','고려대학교 체육관','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/P/P_54e00884-4f9a-461a-a503-ad9e64aa96bd_%EA%B3%A0%EB%A0%A4%EB%8C%80vs%EC%97%B0%EC%84%B8%EB%8C%80%20%EC%B6%95%EA%B5%AC%EB%8C%80%ED%9A%8C.png',500000,'0',0,5000000,3,17,18),(10,0,'0xaCF7aE5285Bd5Ae1Cc4286194A30435B44C780A2','','2022-10-22','서울vs부산','2022-10-22','서울대 대운동장','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/P/P_25eb31d3-3cae-4c8f-89c4-b31fb67afc28_%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-001%20%282%29.jpg',1000000,'0',0,0,8,19,20),(11,0,'0xBd5f748Cbd69fc782c11E23bD7a3c91B04DAF3ac','1','2022-11-12','야구대회(고연전)','2022-11-12','XX야구장','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/P/P_0e7e6190-4e0d-4b57-9f18-2cef545a2b46_%EA%B3%A0%EB%A0%A4%EB%8C%80vs%EC%97%B0%EC%84%B8%EB%8C%80%20%EC%95%BC%EA%B5%AC%EB%8C%80%ED%9A%8C.png',1000000,'0',0,0,3,21,22),(12,0,'0x5F6bd27D13344805478043cad26850341FF5040F','1','2022-10-22','탁구대회(연고전)','2022-10-22','고려대학교 체육관','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/P/P_a63d4214-ef58-4ebe-8b1c-f326c0f84c73_%EA%B3%A0%EB%A0%A4%EB%8C%80vs%EC%97%B0%EC%84%B8%EB%8C%80%20%ED%83%81%EA%B5%AC%EB%8C%80%ED%9A%8C.png',500000,'0',0,0,3,23,24),(13,0,'0xe525F4065A3bF1981Da59e7950D70192DBB8A3fC','','2022-10-29','태권도최고는!?','2022-10-29','잠실 종합 체육관','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/P/P_e6b15f66-90bb-43a8-845c-10ae6543de83_%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-001%20%284%29.jpg',300000,'0',0,0,8,25,26),(14,5000000,'0x108EC3036f7F70eF5d741C82527cC481f5ddE145','1','2022-11-12','대학 댄스대회','2022-11-12','XX광장','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/P/P_93b70f0d-70f5-43bd-92e0-ea81836110e1_%EB%8C%80%ED%95%99%EA%B5%90%EB%8C%84%EC%8A%A4%EB%8C%80%ED%9A%8C.png',500000,'1',0,5000000,3,27,28),(15,28890000,'0x8a741a28eED30E4eda5f3c4874cc019A834f5A05','','2022-10-07','물병세우기','2022-10-07','장덕동','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/P/P_43647eab-a161-4ac0-896c-9d0b85f5c8a8_%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-001%20%285%29.jpg',30000,'0',12000000,16890000,13,29,30);
/*!40000 ALTER TABLE `league` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 10:44:20
