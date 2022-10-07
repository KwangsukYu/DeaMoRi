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
-- Table structure for table `university_auth`
--

DROP TABLE IF EXISTS `university_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `university_auth` (
  `uni_auth_pk` int NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uni_auth_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university_auth`
--

LOCK TABLES `university_auth` WRITE;
/*!40000 ALTER TABLE `university_auth` DISABLE KEYS */;
INSERT INTO `university_auth` VALUES (1,'A_86ed1273-2bdf-44a2-831d-f4903c02b01d_고려대학생증.jpg','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/A/A_86ed1273-2bdf-44a2-831d-f4903c02b01d_%EA%B3%A0%EB%A0%A4%EB%8C%80%ED%95%99%EC%83%9D%EC%A6%9D.jpg'),(2,'A_f055e6dc-b54d-4eb4-9150-bec9fc84c3f9_사진.jpg','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/A/A_f055e6dc-b54d-4eb4-9150-bec9fc84c3f9_%EC%82%AC%EC%A7%84.jpg'),(3,'A_38d306d1-642f-479a-a93e-50112c69cbc0_대모리 1.png','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/A/A_38d306d1-642f-479a-a93e-50112c69cbc0_%EB%8C%80%EB%AA%A8%EB%A6%AC%201.png'),(4,'A_acdfa8ab-9db6-4c83-9a6f-f9f33559aef4_man-light-skin-tone-bald_1f468-1f3fb-200d-1f9b2.png','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/A/A_acdfa8ab-9db6-4c83-9a6f-f9f33559aef4_man-light-skin-tone-bald_1f468-1f3fb-200d-1f9b2.png'),(5,'A_f3d6d1f2-42a8-436f-a2a3-c6ba8aa54b58_man-light-skin-tone-bald_1f468-1f3fb-200d-1f9b2.png','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/A/A_f3d6d1f2-42a8-436f-a2a3-c6ba8aa54b58_man-light-skin-tone-bald_1f468-1f3fb-200d-1f9b2.png'),(6,'A_03c3dfed-e484-4e42-9980-8cd7b4cf0cf7_사진.jpg','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/A/A_03c3dfed-e484-4e42-9980-8cd7b4cf0cf7_%EC%82%AC%EC%A7%84.jpg'),(7,'A_66270352-5c63-416a-966e-c8872ad8ef15_defaultSchool.png','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/A/A_66270352-5c63-416a-966e-c8872ad8ef15_defaultSchool.png'),(8,'A_59e09606-7a1e-4735-9089-252594aa6c66_전대조대배드민턴대회.png','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/A/A_59e09606-7a1e-4735-9089-252594aa6c66_%EC%A0%84%EB%8C%80%EC%A1%B0%EB%8C%80%EB%B0%B0%EB%93%9C%EB%AF%BC%ED%84%B4%EB%8C%80%ED%9A%8C.png'),(9,'A_d9191a29-fdbc-4839-b6e6-a4feaf1cfb63_캡처.PNG','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/A/A_d9191a29-fdbc-4839-b6e6-a4feaf1cfb63_%EC%BA%A1%EC%B2%98.PNG'),(10,'A_5d88eaf8-9467-4b78-90c5-c1744569668b_제목을 입력해주세요_-001.jpg','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/A/A_5d88eaf8-9467-4b78-90c5-c1744569668b_%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-001.jpg'),(11,'A_048beb8c-6c15-42d0-a0fc-2f8c874d26f5_제목을 입력해주세요_-001.png','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/A/A_048beb8c-6c15-42d0-a0fc-2f8c874d26f5_%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-001.png'),(12,'A_b76106de-9018-40b3-873c-d5f2e8aa1097_제목을 입력해주세요_-001.png','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/A/A_b76106de-9018-40b3-873c-d5f2e8aa1097_%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-001.png'),(13,'A_bd4bc426-40ba-419e-aff9-d1ec73dd09f7_고려대학생증.jpg','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/A/A_bd4bc426-40ba-419e-aff9-d1ec73dd09f7_%EA%B3%A0%EB%A0%A4%EB%8C%80%ED%95%99%EC%83%9D%EC%A6%9D.jpg'),(14,'A_2f64c1b0-2fbe-4251-b1ff-24ecfb63ac3d_제목을 입력해주세요_-001 (5).jpg','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/A/A_2f64c1b0-2fbe-4251-b1ff-24ecfb63ac3d_%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-001%20%285%29.jpg'),(15,'A_0185d76b-3840-418d-ba4d-79dd19d173eb_고려대학생증.jpg','https://s3.ap-northeast-2.amazonaws.com/aws.ssafybucket/A/A_0185d76b-3840-418d-ba4d-79dd19d173eb_%EA%B3%A0%EB%A0%A4%EB%8C%80%ED%95%99%EC%83%9D%EC%A6%9D.jpg');
/*!40000 ALTER TABLE `university_auth` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 10:45:59
