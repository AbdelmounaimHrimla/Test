-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: cars
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `conducteurs`
--

DROP TABLE IF EXISTS `conducteurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conducteurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(20) DEFAULT NULL,
  `prenom` varchar(20) DEFAULT NULL,
  `dateNais` date DEFAULT NULL,
  `salaire` float DEFAULT NULL,
  `dateEmbauche` date DEFAULT NULL,
  `image` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conducteurs`
--

LOCK TABLES `conducteurs` WRITE;
/*!40000 ALTER TABLE `conducteurs` DISABLE KEYS */;
INSERT INTO `conducteurs` VALUES (1,'Update Name','Update Prenom','2000-12-10',12556,'2019-02-03','https://i.imgur.com/pD3kuOg.jpg'),(2,'Name 2','Prénom 2','1992-09-19',1500,'2013-01-20','https://i.imgur.com/0jWLbSw.jpg'),(3,'Name 3','Prénom 3','1993-08-20',8000,'2012-02-19','https://i.imgur.com/pD3kuOg.jpg'),(4,'Name 4','Prénom 4','1994-05-21',6000,'2016-05-11','https://i.imgur.com/pD3kuOg.jpg'),(5,'Name 5','Prénom 5','1995-02-07',5000,'2011-04-05','https://i.imgur.com/0jWLbSw.jpg'),(12,'SALSA','TANGO','1982-12-12',10001,'1999-12-02','https://i.imgur.com/0jWLbSw.jpg');
/*!40000 ALTER TABLE `conducteurs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-06 15:36:48
