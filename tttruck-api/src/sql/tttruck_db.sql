-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: tttruck_db
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB-0ubuntu0.22.04.1-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `tttruck_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `tttruck_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `tttruck_db`;

--
-- Table structure for table `tt_access_log`
--

DROP TABLE IF EXISTS `tt_access_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_access_log` (
  `API_LOG_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '접근 로그 ID',
  `USER_ID` bigint(20) unsigned DEFAULT NULL COMMENT '사용자 ID',
  `ACCESS_IP` varchar(20) NOT NULL COMMENT '접근 IP',
  `ACCESS_DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '접근 날짜',
  `IPv4` int(10) unsigned DEFAULT NULL COMMENT 'IPv4',
  `IPv6` binary(16) DEFAULT NULL COMMENT 'IPv6',
  PRIMARY KEY (`API_LOG_ID`),
  KEY `FK_tt_access_log_USER_ID_tt_user_USER_ID` (`USER_ID`),
  CONSTRAINT `FK_tt_access_log_USER_ID_tt_user_USER_ID` FOREIGN KEY (`USER_ID`) REFERENCES `tt_user` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='메인 접근 API 로그';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_access_log`
--

LOCK TABLES `tt_access_log` WRITE;
/*!40000 ALTER TABLE `tt_access_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_access_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_alarm`
--

DROP TABLE IF EXISTS `tt_alarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_alarm` (
  `ALARM_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `USER_ID` bigint(20) unsigned NOT NULL,
  `SUBJECT` text NOT NULL COMMENT '알림 제목',
  `CONTENTS` text DEFAULT NULL COMMENT '알림 내용',
  `VIEW_TF` tinyint(1) NOT NULL DEFAULT 1,
  `IMAGEURL` text DEFAULT NULL,
  `TIME` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ALARM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='알림 목록';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_alarm`
--

LOCK TABLES `tt_alarm` WRITE;
/*!40000 ALTER TABLE `tt_alarm` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_alarm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_content`
--

DROP TABLE IF EXISTS `tt_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_content` (
  `CONTENT_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '컨텐츠 ID',
  `CONTENT_TYPE` varchar(20) DEFAULT NULL COMMENT '컨텐츠 타입',
  PRIMARY KEY (`CONTENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='base contents';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_content`
--

LOCK TABLES `tt_content` WRITE;
/*!40000 ALTER TABLE `tt_content` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_login_log`
--

DROP TABLE IF EXISTS `tt_login_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_login_log` (
  `LOGIN_LOG_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '로그인 로그 ID',
  `USER_ID` bigint(20) unsigned NOT NULL COMMENT '유저 ID',
  `SNS_TYPE` varchar(20) NOT NULL DEFAULT 'email' COMMENT 'SNS 타입',
  `IPv4` int(10) unsigned DEFAULT NULL COMMENT 'IPv4',
  `IPv6` binary(16) DEFAULT NULL COMMENT 'IPv6',
  `time` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '로그인날짜',
  PRIMARY KEY (`LOGIN_LOG_ID`),
  KEY `FK_tt_login_log_USER_ID_tt_user_USER_ID` (`USER_ID`),
  CONSTRAINT `FK_tt_login_log_USER_ID_tt_user_USER_ID` FOREIGN KEY (`USER_ID`) REFERENCES `tt_user` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='로그인 로그';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_login_log`
--

LOCK TABLES `tt_login_log` WRITE;
/*!40000 ALTER TABLE `tt_login_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_login_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_nickname_log`
--

DROP TABLE IF EXISTS `tt_nickname_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_nickname_log` (
  `NICKNAME_LOG_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '닉네임 변경 로그 ID',
  `ORIGIN_NICKNAME` varchar(30) NOT NULL COMMENT '기존 닉네임',
  `CHANGE_NICKNAME` varchar(30) NOT NULL COMMENT '변경 닉네임',
  `USER_ID` bigint(20) unsigned DEFAULT NULL COMMENT '사용자 ID',
  `IPv4` int(10) unsigned DEFAULT NULL COMMENT 'IPv4',
  `IPv6` binary(16) DEFAULT NULL COMMENT 'IPv6',
  `time` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '변경날짜',
  PRIMARY KEY (`NICKNAME_LOG_ID`),
  KEY `FK_tt_nickname_log_USER_ID_tt_user_USER_ID` (`USER_ID`),
  CONSTRAINT `FK_tt_nickname_log_USER_ID_tt_user_USER_ID` FOREIGN KEY (`USER_ID`) REFERENCES `tt_user` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='닉네임 변경 로그';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_nickname_log`
--

LOCK TABLES `tt_nickname_log` WRITE;
/*!40000 ALTER TABLE `tt_nickname_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_nickname_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_notice`
--

DROP TABLE IF EXISTS `tt_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_notice` (
  `NOTICE_MASTER_ID` bigint(20) unsigned NOT NULL COMMENT '소식 카테고리 ID',
  `NOTICE_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '메인공지 ID',
  `SUBJECT` varchar(100) DEFAULT NULL COMMENT '제목',
  `HTML_TF` tinyint(1) DEFAULT 0 COMMENT 'HTML 여부',
  `CONTENTS` text DEFAULT NULL COMMENT '내용',
  `DISPLAY_TF` tinyint(1) DEFAULT 1 COMMENT '노출 여부',
  `DISPLAY_START_TIME` timestamp NULL DEFAULT current_timestamp() COMMENT '게시 시작일',
  `DISPLAY_END_TIME` timestamp NULL DEFAULT current_timestamp() COMMENT '게시 종료일',
  `POST_USER_ID` bigint(20) unsigned DEFAULT NULL COMMENT '생성자 아이디',
  `POST_TIME` timestamp NULL DEFAULT current_timestamp() COMMENT '작성일',
  `POST_IPv4` int(10) unsigned DEFAULT NULL COMMENT '작성자 IPv4',
  `POST_IPv6` binary(16) DEFAULT NULL COMMENT '작성자 IPv6',
  `UPDATE_USER_ID` bigint(20) unsigned DEFAULT NULL COMMENT '수정자 아이디',
  `UPDATE_TIME` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '수정일',
  `UPDATE_IPv4` int(10) unsigned DEFAULT NULL COMMENT '수정자 IPv4',
  `UPDATE_IPv6` binary(16) DEFAULT NULL COMMENT '수정자 IPv6',
  `CONTENT_ID` bigint(20) unsigned DEFAULT NULL COMMENT '컨텐츠 ID',
  `TOP_FIX_TF` tinyint(1) NOT NULL DEFAULT 0 COMMENT '상단 고정 여부',
  PRIMARY KEY (`NOTICE_ID`),
  KEY `FK_tt_notice_CONTENT_ID_tt_content_CONTENT_ID` (`CONTENT_ID`),
  KEY `FK_tt_notice_NOTICE_MASTER_ID_tt_notice_master_NOTICE_MASTER_ID` (`NOTICE_MASTER_ID`),
  KEY `FK_tt_notice_POST_USER_ID_tt_user_USER_ID` (`POST_USER_ID`),
  KEY `FK_tt_notice_UPDATE_USER_ID_tt_user_USER_ID` (`UPDATE_USER_ID`),
  CONSTRAINT `FK_tt_notice_POST_USER_ID_tt_user_USER_ID` FOREIGN KEY (`POST_USER_ID`) REFERENCES `tt_user` (`USER_ID`),
  CONSTRAINT `FK_tt_notice_UPDATE_USER_ID_tt_user_USER_ID` FOREIGN KEY (`UPDATE_USER_ID`) REFERENCES `tt_user` (`USER_ID`),
  CONSTRAINT `tt_notice_tt_notice_master_null_fk` FOREIGN KEY (`NOTICE_MASTER_ID`) REFERENCES `tt_notice_master` (`NOTICE_MASTER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='메인 소식';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_notice`
--

LOCK TABLES `tt_notice` WRITE;
/*!40000 ALTER TABLE `tt_notice` DISABLE KEYS */;
INSERT INTO `tt_notice` VALUES (1,8,'TEST SUBJECT',0,'TEST CONTENTS',1,'2023-01-02 08:24:31','2023-01-02 08:24:31',21,'2023-01-02 08:24:31',0,NULL,21,'2023-01-02 08:24:31',0,NULL,NULL,0),(1,9,'TEST SUBJECT2',0,'TEST CONTENTS2',1,'2023-01-02 08:24:37','2023-01-02 08:24:37',21,'2023-01-02 08:24:37',0,NULL,21,'2023-01-02 08:24:37',0,NULL,NULL,0),(1,10,'TEST SUBJECT3',0,'TEST CONTENTS3',1,'2023-01-02 08:24:43','2023-01-02 08:24:43',21,'2023-01-02 08:24:43',0,NULL,21,'2023-01-02 08:24:43',0,NULL,NULL,0),(2,11,'TEST SUBJECT4',0,'TEST CONTENTS4',1,'2023-01-02 08:24:49','2023-01-02 08:24:49',21,'2023-01-02 08:24:49',0,NULL,21,'2023-01-02 08:24:49',0,NULL,NULL,0),(3,12,'TEST SUBJECT5',0,'TEST CONTENTS5',1,'2023-01-02 08:24:58','2023-01-02 08:24:58',21,'2023-01-02 08:24:58',0,NULL,21,'2023-01-02 08:24:58',0,NULL,NULL,0);
/*!40000 ALTER TABLE `tt_notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_notice_image`
--

DROP TABLE IF EXISTS `tt_notice_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_notice_image` (
  `NOTICE_IMAGE_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '상품 이미지 ID',
  `NOTICE_ID` bigint(20) unsigned NOT NULL COMMENT '상품 ID',
  `FILE_NAME` varchar(800) DEFAULT NULL COMMENT '첨부파일명',
  `FILE_PATH` varchar(800) DEFAULT NULL COMMENT '첨부파일 경로',
  `FILE_SIZE` int(20) DEFAULT NULL COMMENT '첨부파일 크기',
  `ORG_FILE_SEQ` int(10) DEFAULT NULL COMMENT '기존 파일 시퀀스',
  `FILE_URL` varchar(500) DEFAULT NULL COMMENT '다운로드 URL',
  `THUMB_PATH` varchar(800) DEFAULT NULL COMMENT '썸네일 경로',
  `FILE_ID` bigint(20) unsigned DEFAULT NULL COMMENT '파일 ID',
  `CONTENT_ID` bigint(20) unsigned DEFAULT NULL COMMENT '컨텐츠 ID',
  `TIME` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`NOTICE_IMAGE_ID`),
  KEY `FK_tt_notice_image_CONTENT_ID_tt_content_CONTENT_ID` (`CONTENT_ID`),
  KEY `FK_tt_notice_image_FILE_ID_tt_file_FILE_ID` (`FILE_ID`),
  KEY `tt_notice_image_tt_notice_NOTICE_ID_fk` (`NOTICE_ID`),
  CONSTRAINT `tt_notice_image_tt_notice_NOTICE_ID_fk` FOREIGN KEY (`NOTICE_ID`) REFERENCES `tt_notice` (`NOTICE_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='소식 이미지';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_notice_image`
--

LOCK TABLES `tt_notice_image` WRITE;
/*!40000 ALTER TABLE `tt_notice_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_notice_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_notice_master`
--

DROP TABLE IF EXISTS `tt_notice_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_notice_master` (
  `NOTICE_MASTER_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '소식 카테고리 ID',
  `TITLE` varchar(200) DEFAULT NULL COMMENT '소식 카테고리 이름',
  `COMMENT_TF` tinyint(1) DEFAULT 1 COMMENT '댓글 사용 여부',
  `SECRET_TF` tinyint(1) DEFAULT 0 COMMENT '비밀글 사용 여부',
  `ATTACH_TF` tinyint(1) DEFAULT 1 COMMENT '첨부파일 사용 여부',
  `DISPLAY_TF` tinyint(1) DEFAULT 0 COMMENT '노출 사용 여부',
  `DIV_CODE` varchar(30) DEFAULT NULL COMMENT '분류 코드',
  `CREATE_USER_ID` bigint(20) unsigned DEFAULT NULL COMMENT '생성 사용자 ID',
  `CREATE_TIME` timestamp NULL DEFAULT current_timestamp() COMMENT '생성일',
  `REG_IPv4` int(10) unsigned DEFAULT NULL COMMENT '생성자 IPv4',
  `REG_IPv6` binary(16) DEFAULT NULL COMMENT '생성자 IPv6',
  `UPDATE_USER_ID` bigint(20) unsigned DEFAULT NULL COMMENT '수정 사용자 ID',
  `UPDATE_TIME` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '수정일',
  `UPDATE_IPv4` int(10) unsigned DEFAULT NULL COMMENT '수정자 IPv4',
  `UPDATE_IPv6` binary(16) DEFAULT NULL COMMENT '수정자 IPv6',
  `EXTRA_FIELD_FIRST_LABEL` varchar(30) DEFAULT NULL COMMENT '공통 레이블',
  `EXTRA_FIELD_FIRST_CODE` varchar(30) DEFAULT NULL COMMENT '레이블 값',
  `DELETE_TF` tinyint(1) DEFAULT 0 COMMENT '삭제 여부',
  PRIMARY KEY (`NOTICE_MASTER_ID`),
  KEY `FK_tt_notice_master_CREATE_USER_ID_tt_user_USER_ID` (`CREATE_USER_ID`),
  KEY `FK_tt_notice_master_UPDATE_USER_ID_tt_user_USER_ID` (`UPDATE_USER_ID`),
  CONSTRAINT `FK_tt_notice_master_CREATE_USER_ID_tt_user_USER_ID` FOREIGN KEY (`CREATE_USER_ID`) REFERENCES `tt_user` (`USER_ID`),
  CONSTRAINT `FK_tt_notice_master_UPDATE_USER_ID_tt_user_USER_ID` FOREIGN KEY (`UPDATE_USER_ID`) REFERENCES `tt_user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='소식 카테고리 관리';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_notice_master`
--

LOCK TABLES `tt_notice_master` WRITE;
/*!40000 ALTER TABLE `tt_notice_master` DISABLE KEYS */;
INSERT INTO `tt_notice_master` VALUES (1,'이벤트',1,0,1,0,NULL,1,'2022-12-24 07:17:28',NULL,NULL,NULL,'2022-12-24 07:17:28',NULL,NULL,NULL,NULL,0),(2,'공지사항',1,0,1,0,NULL,1,'2022-12-24 07:17:28',NULL,NULL,NULL,'2022-12-24 07:17:28',NULL,NULL,NULL,NULL,0),(3,'뉴스',1,0,1,0,NULL,1,'2022-12-24 07:17:28',NULL,NULL,NULL,'2022-12-24 07:17:28',NULL,NULL,NULL,NULL,0),(4,'팁',1,0,1,0,NULL,1,'2022-12-24 07:17:28',NULL,NULL,NULL,'2022-12-24 07:17:28',NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `tt_notice_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_phone_auth`
--

DROP TABLE IF EXISTS `tt_phone_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_phone_auth` (
  `AUTH_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `PHONE` varchar(30) DEFAULT NULL,
  `PHONE_AUTH_CODE` varchar(10) DEFAULT NULL,
  `REG_TIME` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPD_TIME` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `PHONE_AUTH_TF` tinyint(1) NOT NULL DEFAULT 0,
  `EXPIRED_TIME` timestamp NOT NULL DEFAULT (current_timestamp() + interval 5 minute),
  PRIMARY KEY (`AUTH_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_phone_auth`
--

LOCK TABLES `tt_phone_auth` WRITE;
/*!40000 ALTER TABLE `tt_phone_auth` DISABLE KEYS */;
INSERT INTO `tt_phone_auth` VALUES (35,'01098810664','1106874','2022-12-24 05:54:43','2022-12-24 05:54:43',0,'2022-12-24 05:59:43'),(36,'01098810664','8908698','2022-12-24 06:01:06','2022-12-24 06:01:06',0,'2022-12-24 06:06:06'),(37,'01098810664','4343521','2022-12-24 06:05:25','2022-12-24 06:05:25',0,'2022-12-24 06:10:25'),(38,'01098810664','3899583','2022-12-24 06:12:34','2022-12-24 06:12:34',0,'2022-12-24 06:17:34'),(39,'01098810664','8525200','2022-12-24 06:13:34','2022-12-24 06:13:34',0,'2022-12-24 06:18:34'),(40,'01098810664','3911945','2022-12-24 06:21:18','2022-12-24 06:21:40',1,'2022-12-24 06:26:18'),(41,'01098810664','4584413','2022-12-24 06:27:12','2022-12-24 06:27:12',0,'2022-12-24 06:32:12'),(42,'01098810664','402974','2022-12-24 06:27:28','2022-12-24 06:27:28',0,'2022-12-24 06:32:28'),(43,'01098810664','4398150','2022-12-24 06:27:48','2022-12-24 06:27:48',0,'2022-12-24 06:32:48'),(44,'01098810664','2545227','2022-12-24 06:28:39','2022-12-24 06:28:39',0,'2022-12-24 06:33:39'),(45,'01098810663','436306','2022-12-24 06:40:37','2022-12-24 06:40:37',0,'2022-12-24 06:45:37'),(46,'0101258584','9661923','2022-12-26 13:13:45','2022-12-26 13:13:45',0,'2022-12-26 13:18:45'),(47,'01012585841','5265345','2022-12-26 13:13:51','2022-12-26 13:13:51',0,'2022-12-26 13:18:51'),(48,'','8043318','2022-12-26 13:15:56','2022-12-26 13:15:56',0,'2022-12-26 13:20:56'),(49,'01012341231','743931','2022-12-26 13:16:44','2022-12-26 13:16:44',0,'2022-12-26 13:21:44'),(50,'01012341233','3370060','2022-12-26 13:24:13','2022-12-26 13:24:13',0,'2022-12-26 13:29:13'),(51,'01012333333','038608','2022-12-26 13:41:20','2022-12-26 13:41:20',0,'2022-12-26 13:46:20'),(52,'01063873134','6540938','2022-12-26 16:03:59','2022-12-26 16:03:59',0,'2022-12-26 16:08:59'),(53,'01063873134','8137620','2022-12-26 16:04:17','2022-12-26 16:04:17',0,'2022-12-26 16:09:17'),(54,'12312312312','2121793','2022-12-26 16:05:16','2022-12-26 16:05:16',0,'2022-12-26 16:10:16'),(55,'01012341242','5274630','2022-12-27 13:11:13','2022-12-27 13:11:13',0,'2022-12-27 13:16:13'),(56,'01012341111','8237343','2022-12-28 03:29:43','2022-12-28 03:29:43',0,'2022-12-28 03:34:43'),(57,'01012111111','6051546','2022-12-28 03:30:12','2022-12-28 03:30:12',0,'2022-12-28 03:35:12'),(58,'01063873134','9940739','2022-12-28 13:29:30','2022-12-28 13:29:30',0,'2022-12-28 13:34:30'),(59,'01063873134','7623425','2022-12-28 13:56:49','2022-12-28 13:56:49',0,'2022-12-28 14:01:49'),(60,'01063873134','5785684','2022-12-28 14:16:31','2022-12-28 14:16:31',0,'2022-12-28 14:21:31'),(61,'01063873134','8347888','2022-12-28 15:07:50','2022-12-28 15:07:50',0,'2022-12-28 15:12:50'),(62,'01063873134','6972894','2022-12-28 15:08:14','2022-12-28 15:08:14',0,'2022-12-28 15:13:14'),(63,'01063873134','6312598','2022-12-28 15:13:59','2022-12-28 15:13:59',0,'2022-12-28 15:18:59'),(64,'01063873134','6730452','2022-12-28 15:23:27','2022-12-28 15:23:27',0,'2022-12-28 15:28:27'),(65,'01063873134','943300','2022-12-28 15:42:55','2022-12-28 15:42:55',0,'2022-12-28 15:47:55'),(66,'01063873134','029914','2022-12-28 15:45:41','2022-12-28 15:45:41',0,'2022-12-28 15:50:41'),(67,'01063873134','207131','2022-12-28 15:47:29','2022-12-28 15:47:29',0,'2022-12-28 15:52:29'),(68,'01098810663','270426','2022-12-28 15:51:46','2022-12-28 15:51:46',0,'2022-12-28 15:56:46'),(69,'01063873134','136886','2022-12-28 15:53:01','2022-12-28 15:53:29',1,'2022-12-28 15:58:01'),(70,'01010101010','087280','2022-12-28 15:56:21','2022-12-28 15:56:21',0,'2022-12-28 16:01:21'),(71,'01011111111','392420','2022-12-28 16:08:56','2022-12-28 16:08:56',0,'2022-12-28 16:13:56'),(72,'13123123123','323688','2022-12-28 16:09:31','2022-12-28 16:09:31',0,'2022-12-28 16:14:31'),(73,'12312312312','457991','2022-12-28 16:09:50','2022-12-28 16:09:50',0,'2022-12-28 16:14:50'),(74,'12312312312','730441','2022-12-28 16:11:51','2022-12-28 16:11:51',0,'2022-12-28 16:16:51'),(75,'12312312312','842855','2022-12-28 16:12:35','2022-12-28 16:12:35',0,'2022-12-28 16:17:35'),(76,'12312312312','893480','2022-12-28 16:13:50','2022-12-28 16:13:50',0,'2022-12-28 16:18:50'),(77,'01063873134','881935','2022-12-28 16:17:08','2022-12-28 16:17:08',0,'2022-12-28 16:22:08'),(78,'12312312312','358818','2022-12-28 16:26:06','2022-12-28 16:26:06',0,'2022-12-28 16:31:06'),(79,'01063873134','168287','2022-12-28 16:29:37','2022-12-28 16:29:37',0,'2022-12-28 16:34:37'),(80,'01063873134','718754','2022-12-28 16:32:10','2022-12-28 16:32:10',0,'2022-12-28 16:37:10'),(81,'01063873134','688735','2022-12-28 16:32:56','2022-12-28 16:33:15',1,'2022-12-28 16:37:56'),(82,'01063873134','235060','2022-12-28 16:35:04','2022-12-28 16:35:04',0,'2022-12-28 16:40:04'),(83,'01063873134','640321','2022-12-28 16:36:29','2022-12-28 16:36:29',0,'2022-12-28 16:41:29'),(84,'01063873134','757383','2022-12-28 16:37:34','2022-12-28 16:37:34',0,'2022-12-28 16:42:34'),(85,'01063873134','764477','2022-12-28 16:39:43','2022-12-28 16:39:43',0,'2022-12-28 16:44:43'),(86,'01063873134','852047','2022-12-28 16:41:43','2022-12-28 16:41:43',0,'2022-12-28 16:46:43'),(87,'01063873134','840181','2022-12-28 16:48:29','2022-12-28 16:48:29',0,'2022-12-28 16:53:29'),(88,'01012312412','146297','2022-12-29 04:57:02','2022-12-29 04:57:02',0,'2022-12-29 05:02:02'),(89,'01023833968','324985','2022-12-29 04:57:23','2022-12-29 05:01:15',1,'2022-12-29 05:02:23'),(90,'01080288328','920641','2022-12-29 05:13:35','2022-12-29 05:13:54',1,'2022-12-29 05:18:35'),(91,'01098810663','246241','2022-12-29 07:11:32','2022-12-29 07:13:50',1,'2022-12-29 07:16:32'),(92,'01000000000','151398','2022-12-29 07:16:27','2022-12-29 07:16:56',1,'2022-12-29 07:21:27'),(93,'01000000000','845264','2022-12-29 07:26:56','2022-12-29 07:27:16',1,'2022-12-29 07:31:56'),(94,'01000000000','554914','2022-12-29 07:32:30','2022-12-29 07:33:17',1,'2022-12-29 07:37:30'),(95,'01023833968','674406','2022-12-29 08:37:05','2022-12-29 08:37:05',0,'2022-12-29 08:42:05'),(96,'01023833968','664398','2022-12-29 08:37:11','2022-12-29 08:37:42',1,'2022-12-29 08:42:11'),(97,'01063873134','164381','2022-12-29 09:04:58','2022-12-29 09:04:58',0,'2022-12-29 09:09:58'),(98,'01063873134','202648','2022-12-29 10:12:07','2022-12-29 10:12:07',0,'2022-12-29 10:17:07'),(99,'01063873134','967905','2022-12-29 10:12:09','2022-12-29 10:12:09',0,'2022-12-29 10:17:09'),(100,'01063873134','332437','2022-12-29 10:12:15','2022-12-29 10:12:15',0,'2022-12-29 10:17:15'),(101,'01063873134','064333','2022-12-29 10:34:45','2022-12-29 10:34:59',1,'2022-12-29 10:39:45'),(102,'12312312312','151158','2022-12-30 05:13:40','2022-12-30 05:13:40',0,'2022-12-30 05:18:40'),(103,'01098810664','890266','2023-01-01 04:28:48','2023-01-01 04:29:15',1,'2023-01-01 04:33:48'),(104,'01080688328','362746','2023-01-02 07:14:44','2023-01-02 07:14:44',0,'2023-01-02 07:19:44'),(105,'01080688328','040565','2023-01-02 07:16:29','2023-01-02 07:16:29',0,'2023-01-02 07:21:29'),(106,'01098810664','826547','2023-01-02 07:18:36','2023-01-02 07:18:36',0,'2023-01-02 07:23:36'),(107,'01098810664','265099','2023-01-02 07:19:12','2023-01-02 07:19:12',0,'2023-01-02 07:24:12'),(108,'01080288328','206947','2023-01-02 07:20:01','2023-01-02 07:20:38',1,'2023-01-02 07:25:01'),(109,'01098810664','728715','2023-01-02 08:28:04','2023-01-02 08:28:04',0,'2023-01-02 08:33:04'),(110,'01028333968','499902','2023-01-02 09:02:30','2023-01-02 09:02:30',0,'2023-01-02 09:07:30'),(111,'01098810664','975134','2023-01-03 13:08:45','2023-01-03 13:09:07',1,'2023-01-03 13:13:45'),(112,'02193123712','097677','2023-01-04 13:20:41','2023-01-04 13:20:41',0,'2023-01-04 13:25:41'),(113,'01098810664','354401','2023-01-05 02:23:58','2023-01-05 02:23:58',0,'2023-01-05 02:28:58'),(114,'01098810664','144312','2023-01-05 02:24:09','2023-01-05 02:24:32',1,'2023-01-05 02:29:09'),(115,'01072219372','017313','2023-01-06 01:57:35','2023-01-06 01:58:10',1,'2023-01-06 02:02:35'),(116,'01072219793','838907','2023-01-06 05:27:14','2023-01-06 05:27:14',0,'2023-01-06 05:32:14');
/*!40000 ALTER TABLE `tt_phone_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_product`
--

DROP TABLE IF EXISTS `tt_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_product` (
  `PRODUCT_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '상품 ID',
  `SUBJECT` varchar(100) NOT NULL COMMENT '제목',
  `PRIORITY` int(10) NOT NULL DEFAULT 999 COMMENT '정렬 우선순위',
  `PRODUCT_CATEGORY_ID` bigint(20) unsigned NOT NULL COMMENT '상품 카테고리',
  `PRODUCT_PRICE` bigint(30) unsigned NOT NULL COMMENT '가격',
  `PRODUCT_SIZE` varchar(100) NOT NULL COMMENT '규격 ( 분위별 규격 )',
  `PRODUCT_WEIGHT` int(10) unsigned NOT NULL COMMENT '상품 무게',
  `CONTENTS` text NOT NULL COMMENT '내용',
  `SELLER_USER_ID` bigint(20) unsigned DEFAULT NULL COMMENT '판매 사용자 ID',
  `SELLER_USER_IPv4` int(10) unsigned DEFAULT NULL COMMENT '판매자 IPv4',
  `SELLER_USER_IPv6` binary(16) DEFAULT NULL COMMENT '판매자 IPv6',
  `UPLOAD_TIME` timestamp NULL DEFAULT current_timestamp() COMMENT '판매 업로드일',
  `TAG` varchar(300) DEFAULT NULL COMMENT '태그',
  `ADDRESS` varchar(200) DEFAULT NULL COMMENT '장소',
  `LATITUDE` varchar(15) NOT NULL DEFAULT '37.541',
  `LONGITUDE` varchar(15) NOT NULL DEFAULT '126.986',
  `LOCATION` geometry NOT NULL DEFAULT point(37.541,126.986),
  `UPDATE_USER_ID` bigint(20) unsigned DEFAULT NULL COMMENT '수정 사용자 ID',
  `UPDATE_USER_IPv4` int(10) unsigned DEFAULT NULL COMMENT '수정 사용자 IPv4',
  `UPDATE_USER_IPv6` binary(16) DEFAULT NULL COMMENT '수정 사용자 IPv6',
  `UPDATE_DATE` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '수정일',
  `TRADE_STATUS` int(11) DEFAULT 0,
  `TRADE_TIME` timestamp NULL DEFAULT current_timestamp(),
  `BUYER_USER_ID` bigint(20) unsigned DEFAULT NULL,
  `BUYER_USER_IPv4` int(10) unsigned DEFAULT NULL,
  `BUYER_USER_IPv6` binary(16) DEFAULT NULL,
  `DELETE_TF` tinyint(1) DEFAULT 0,
  `QUANTITY` varchar(30) DEFAULT NULL,
  `CHAT_TF` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`PRODUCT_ID`),
  KEY `tt_product_tt_product_category_null_fk` (`PRODUCT_CATEGORY_ID`),
  KEY `tt_product_tt_user_USER_ID_fk` (`BUYER_USER_ID`),
  KEY `tt_product_SELLER_ID_tt_user_USER_ID_fk` (`SELLER_USER_ID`),
  CONSTRAINT `tt_product_SELLER_ID_tt_user_USER_ID_fk` FOREIGN KEY (`SELLER_USER_ID`) REFERENCES `tt_user` (`USER_ID`) ON DELETE CASCADE,
  CONSTRAINT `tt_product_tt_product_category_null_fk` FOREIGN KEY (`PRODUCT_CATEGORY_ID`) REFERENCES `tt_product_category` (`PRODUCT_CATEGORY_ID`),
  CONSTRAINT `tt_product_tt_user_USER_ID_fk` FOREIGN KEY (`BUYER_USER_ID`) REFERENCES `tt_user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='인테리어 소모품 상품';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_product`
--

LOCK TABLES `tt_product` WRITE;
/*!40000 ALTER TABLE `tt_product` DISABLE KEYS */;
INSERT INTO `tt_product` VALUES (107,'근호의 상품',1,1,123123,'12342',7500,'안녕하세요',22,3717288797,NULL,'2023-01-05 18:25:05','',' 1','37.6228652','127.0753029','\0\0\0\0\0\0\0�Z����_@�Ҟ7��B@',22,3717288797,NULL,'2023-01-05 19:07:06',9,'2023-01-05 18:25:05',22,NULL,NULL,0,'12개',1),(108,'페인트 올렸습니다.',1,7,35000,'21*32*50',20000,'페인트 입니다.',26,3717288797,NULL,'2023-01-05 18:26:07','','서울 노원구 공릉동 566-31','37.6228518','127.0753105','\0\0\0\0\0\0\0��\"��_@es0���B@',26,3717288797,NULL,'2023-01-05 18:34:37',9,'2023-01-05 18:26:07',22,NULL,NULL,0,'3개',1),(109,'테스트 상품',1,1,123123123,'123123',7500,'123',22,3717288797,NULL,'2023-01-05 19:01:50','',' 1','37.6228503','127.0753105','\0\0\0\0\0\0\0�!���_@�f���B@',22,3717288797,NULL,'2023-01-05 19:05:51',9,'2023-01-05 19:01:50',26,NULL,NULL,0,'123123개',1),(110,'구강세정기',1,999,30000,'10*10*10',2500,'이를 잘 닦아줍니다.\n이를 잘 닦아줍니다.\n이를 잘 닦아줍니다.\n이를 잘 닦아줍니다.',21,1794396811,NULL,'2023-01-06 01:24:14','','경기 고양시 일산동구 장항동 869','37.6552157','126.7715631','\0\0\0\0\0\0\09S2Ja�_@�����B@',21,1794396811,NULL,'2023-01-06 02:21:27',9,'2023-01-06 01:24:14',27,NULL,NULL,0,'5개',1),(111,'신발신발',1,2,1000000,'250*250',2500,'신발 예뻐용',21,1794396811,NULL,'2023-01-06 02:36:24','',' 1','37.6552104','126.7716041','\0\0\0\0\0\0\0i�)�a�_@��3���B@',21,1794396811,NULL,'2023-01-06 03:43:40',9,'2023-01-06 02:36:24',22,NULL,NULL,0,'10개',0),(112,'구강2',1,3,30000,'10*10*300',10000000,'아주 무거운 구강세척기',21,1794396811,NULL,'2023-01-06 02:58:28','','경기 고양시 일산동구 장항동 869','37.6552128','126.7716027','\0\0\0\0\0\0\0W�J�a�_@��U��B@',21,1794396811,NULL,'2023-01-06 03:43:09',9,'2023-01-06 02:58:28',22,NULL,NULL,0,'30개',1),(113,'신발팝니다',1,5,10000,'11*11',300000,'내용내용',27,1794396811,NULL,'2023-01-06 03:15:14','','경기 고양시 일산동구 장항동 869','37.6552133','126.7715799','\0\0\0\0\0\0\00��a�_@�����B@',27,1794396811,NULL,'2023-01-06 03:17:21',0,'2023-01-06 03:15:14',NULL,NULL,NULL,0,'213개',1),(114,'참기름 팔아용',1,6,3000,'10*10*300',20000,'고소해용',21,1794396811,NULL,'2023-01-06 04:45:20','','경기 고양시 일산동구 장항동 869','37.6552066','126.771601','\0\0\0\0\0\0\0�#)�a�_@ʏS���B@',21,1794396811,NULL,'2023-01-06 04:54:29',9,'2023-01-06 04:45:20',27,NULL,NULL,0,'20장',1),(115,'신발 팔아용',1,2,300000,'250',20000,'내용내용',21,1794396811,NULL,'2023-01-06 04:51:48','','경기 고양시 일산동구 장항동 869','37.6552135','126.7716','\0\0\0\0\0\0\0�e��a�_@�25	��B@',21,1794396811,NULL,'2023-01-06 04:52:30',0,'2023-01-06 04:51:48',NULL,NULL,NULL,0,'100Box',1),(116,'테스트 상품',1,2,1231,'12',7500,'123',22,1938796541,NULL,'2023-01-06 07:00:31','','충남 천안시 서북구 두정동 2035','36.8352055','127.1461244','\0\0\0\0\0\0\0s�\'\ZZ�_@<���jB@',22,1938796541,NULL,'2023-01-06 07:00:31',0,'2023-01-06 07:00:31',NULL,NULL,NULL,0,'123Box',0);
/*!40000 ALTER TABLE `tt_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_product_category`
--

DROP TABLE IF EXISTS `tt_product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_product_category` (
  `PRODUCT_CATEGORY_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '상품 카테고리 ID',
  `PRODUCT_CATEGORY_NAME` varchar(100) DEFAULT NULL COMMENT '카테고리명',
  `PRODUCT_CATEGORY_PRIORITY` int(11) DEFAULT 0 COMMENT '카테고리 우선순위',
  `VISIBLE_TF` tinyint(1) DEFAULT 1 COMMENT '카테고리 노출 여부',
  `UPDATE_USER_ID` bigint(20) unsigned DEFAULT 1 COMMENT '수정 사용자 ID',
  `UPDATE_USER_IPv4` int(10) unsigned DEFAULT NULL COMMENT '수정 사용자 IPv4',
  `UPDATE_USER_IPv6` binary(16) DEFAULT NULL COMMENT '수정 사용자 IPv6',
  `UPDATE_TIME` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '수정일',
  `CREATE_USER_ID` bigint(20) unsigned DEFAULT 1 COMMENT '생성 사용자 ID',
  `CREATE_USER_IPv4` int(10) unsigned DEFAULT NULL COMMENT '생성 사용자 IPv4',
  `CREATE_USER_IPv6` binary(16) DEFAULT NULL COMMENT '생성 사용자 IPv6',
  `CREATE_TIME` datetime DEFAULT current_timestamp() COMMENT '생성일',
  PRIMARY KEY (`PRODUCT_CATEGORY_ID`),
  KEY `FK_tt_product_category_CREATE_USER_ID_tt_user_USER_ID` (`CREATE_USER_ID`),
  KEY `FK_tt_product_category_UPDATE_USER_ID_tt_user_USER_ID` (`UPDATE_USER_ID`),
  CONSTRAINT `FK_tt_product_category_CREATE_USER_ID_tt_user_USER_ID` FOREIGN KEY (`CREATE_USER_ID`) REFERENCES `tt_user` (`USER_ID`),
  CONSTRAINT `FK_tt_product_category_UPDATE_USER_ID_tt_user_USER_ID` FOREIGN KEY (`UPDATE_USER_ID`) REFERENCES `tt_user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='상품 카테고리';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_product_category`
--

LOCK TABLES `tt_product_category` WRITE;
/*!40000 ALTER TABLE `tt_product_category` DISABLE KEYS */;
INSERT INTO `tt_product_category` VALUES (1,'목자재/도어',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),(2,'석고보드',0,1,1,NULL,NULL,'2022-12-23 10:36:36',1,NULL,NULL,'2022-12-22 08:58:48'),(3,'경량자재/천장재',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),(4,'바닥재/마루/PVC',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),(5,'타일/석재',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),(6,'벽지/필름',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),(7,'페인트',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),(8,'조명',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),(9,'전기자재',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),(10,'철물',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),(11,'금속자재',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),(999,'기타',0,0,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48');
/*!40000 ALTER TABLE `tt_product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_product_image`
--

DROP TABLE IF EXISTS `tt_product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_product_image` (
  `PRODUCT_IMAGE_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '상품 이미지 ID',
  `PRODUCT_ID` bigint(20) unsigned NOT NULL COMMENT '상품 ID',
  `FILE_NAME` varchar(800) NOT NULL COMMENT '첨부파일명',
  `FILE_PATH` varchar(800) DEFAULT NULL COMMENT '첨부파일 경로',
  `FILE_SIZE` int(20) DEFAULT NULL COMMENT '첨부파일 크기',
  `ORG_FILE_SEQ` int(10) DEFAULT NULL COMMENT '기존 파일 시퀀스',
  `FILE_URL` varchar(500) DEFAULT NULL COMMENT '다운로드 URL',
  `THUMB_PATH` varchar(800) DEFAULT NULL COMMENT '썸네일 경로',
  `FILE_ID` bigint(20) unsigned DEFAULT NULL COMMENT '파일 ID',
  `CONTENT_ID` bigint(20) unsigned DEFAULT NULL COMMENT '컨텐츠 ID',
  `TIME` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `PRIORITY` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`PRODUCT_IMAGE_ID`),
  KEY `FK_tt_product_image_CONTENT_ID_tt_content_CONTENT_ID` (`CONTENT_ID`),
  KEY `FK_tt_product_image_FILE_ID_tt_file_FILE_ID` (`FILE_ID`),
  KEY `FK_tt_product_image_PRODUCT_ID_tt_product_update_log_PRODUCT_ID` (`PRODUCT_ID`),
  CONSTRAINT `tt_product_image_tt_product_PRODUCT_ID_fk` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `tt_product` (`PRODUCT_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=272 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='상품 이미지';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_product_image`
--

LOCK TABLES `tt_product_image` WRITE;
/*!40000 ALTER TABLE `tt_product_image` DISABLE KEYS */;
INSERT INTO `tt_product_image` VALUES (240,107,'product/image/1672943106027_Vector.png',NULL,550,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672943106027_Vector.png',NULL,NULL,NULL,'2023-01-05 18:25:06',0),(241,107,'product/image/1672943106042_Frame 4288.png',NULL,3641,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672943106042_Frame%204288.png',NULL,NULL,NULL,'2023-01-05 18:25:06',0),(242,107,'product/image/1672943105996_truck.png',NULL,2789,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672943105996_truck.png',NULL,NULL,NULL,'2023-01-05 18:25:06',0),(243,108,'product/image/1672943167586_áá¦ááµá«áá³.png',NULL,23743,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672943167586_%C3%A1%C2%84%C2%91%C3%A1%C2%85%C2%A6%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%90%C3%A1%C2%85%C2%B3.png',NULL,NULL,NULL,'2023-01-05 18:26:52',1),(244,108,'product/image/1672943167574_áá¦ááµá«áá³2.png',NULL,23618,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672943167574_%C3%A1%C2%84%C2%91%C3%A1%C2%85%C2%A6%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%90%C3%A1%C2%85%C2%B32.png',NULL,NULL,NULL,'2023-01-05 18:26:52',0),(245,108,'product/image/1672943167599_áá¦ááµá«áá³3.png',NULL,20408,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672943167599_%C3%A1%C2%84%C2%91%C3%A1%C2%85%C2%A6%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%90%C3%A1%C2%85%C2%B33.png',NULL,NULL,NULL,'2023-01-05 18:26:09',2),(246,109,'product/image/1672945310830_truck.png',NULL,2789,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672945310830_truck.png',NULL,NULL,NULL,'2023-01-05 19:01:50',0),(247,109,'product/image/1672945310811_Vector.png',NULL,550,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672945310811_Vector.png',NULL,NULL,NULL,'2023-01-05 19:01:50',0),(249,110,'product/image/1672968254873_áá¢á¸áá¥ (3).png',NULL,23161,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672968254873_%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%A2%C3%A1%C2%86%C2%B8%C3%A1%C2%84%C2%8E%C3%A1%C2%85%C2%A5%20%283%29.png',NULL,NULL,NULL,'2023-01-06 01:24:16',3),(250,110,'product/image/1672968254871_áá¢á¸áá¥ (2).png',NULL,65354,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672968254871_%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%A2%C3%A1%C2%86%C2%B8%C3%A1%C2%84%C2%8E%C3%A1%C2%85%C2%A5%20%282%29.png',NULL,NULL,NULL,'2023-01-06 01:24:16',2),(251,110,'product/image/1672968254838_áá¢á¸áá¥ (1).png',NULL,14061,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672968254838_%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%A2%C3%A1%C2%86%C2%B8%C3%A1%C2%84%C2%8E%C3%A1%C2%85%C2%A5%20%281%29.png',NULL,NULL,NULL,'2023-01-06 01:24:16',1),(252,110,'product/image/1672968254858_áá¢á¸áá¥.png',NULL,139623,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672968254858_%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%A2%C3%A1%C2%86%C2%B8%C3%A1%C2%84%C2%8E%C3%A1%C2%85%C2%A5.png',NULL,NULL,NULL,'2023-01-06 01:24:15',0),(253,111,'product/image/1672972584890_ááµá«áá¡á¯1.png',NULL,61143,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672972584890_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%87%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%AF1.png',NULL,NULL,NULL,'2023-01-06 02:36:25',0),(254,111,'product/image/1672972584884_ááµá«áá¡á¯2.jpg',NULL,1265031,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672972584884_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%87%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%AF2.jpg',NULL,NULL,NULL,'2023-01-06 02:36:25',0),(255,111,'product/image/1672972584912_ááµá«áá¡á¯3.jpeg',NULL,572846,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672972584912_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%87%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%AF3.jpeg',NULL,NULL,NULL,'2023-01-06 02:36:25',0),(256,112,'product/image/1672973908386_áá¢á¸áá¥ (1).png',NULL,14061,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672973908386_%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%A2%C3%A1%C2%86%C2%B8%C3%A1%C2%84%C2%8E%C3%A1%C2%85%C2%A5%20%281%29.png',NULL,NULL,NULL,'2023-01-06 02:58:28',0),(257,112,'product/image/1672973908415_áá¢á¸áá¥ (3).png',NULL,23161,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672973908415_%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%A2%C3%A1%C2%86%C2%B8%C3%A1%C2%84%C2%8E%C3%A1%C2%85%C2%A5%20%283%29.png',NULL,NULL,NULL,'2023-01-06 02:58:29',2),(258,112,'product/image/1672973908380_áá¢á¸áá¥ (2).png',NULL,65354,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672973908380_%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%A2%C3%A1%C2%86%C2%B8%C3%A1%C2%84%C2%8E%C3%A1%C2%85%C2%A5%20%282%29.png',NULL,NULL,NULL,'2023-01-06 02:58:29',1),(259,112,'product/image/1672973908425_áá¢á¸áá¥.png',NULL,139623,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672973908425_%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%A2%C3%A1%C2%86%C2%B8%C3%A1%C2%84%C2%8E%C3%A1%C2%85%C2%A5.png',NULL,NULL,NULL,'2023-01-06 02:58:29',3),(260,113,'product/image/1672974914874_ááµá«áá¡á¯1.png',NULL,61143,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672974914874_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%87%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%AF1.png',NULL,NULL,NULL,'2023-01-06 03:15:15',0),(261,113,'product/image/1672974914864_ááµá«áá¡á¯2.jpg',NULL,1265031,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672974914864_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%87%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%AF2.jpg',NULL,NULL,NULL,'2023-01-06 03:15:16',1),(262,113,'product/image/1672974914875_ááµá«áá¡á¯3.jpeg',NULL,572846,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672974914875_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%87%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%AF3.jpeg',NULL,NULL,NULL,'2023-01-06 03:15:16',2),(263,114,'product/image/1672980320358_áá¡á·ááµáá³á·.png',NULL,147709,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672980320358_%C3%A1%C2%84%C2%8E%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%B7%C3%A1%C2%84%C2%80%C3%A1%C2%85%C2%B5%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B3%C3%A1%C2%86%C2%B7.png',NULL,NULL,NULL,'2023-01-06 04:45:20',0),(264,114,'product/image/1672980320348_ááµá«áá¡á¯1.png',NULL,61143,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672980320348_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%87%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%AF1.png',NULL,NULL,NULL,'2023-01-06 04:45:21',1),(265,114,'product/image/1672980320388_ááµá«áá¡á¯2.jpg',NULL,1265031,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672980320388_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%87%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%AF2.jpg',NULL,NULL,NULL,'2023-01-06 04:45:21',2),(266,115,'product/image/1672980708205_ááµá«áá¡á¯1.png',NULL,61143,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672980708205_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%87%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%AF1.png',NULL,NULL,NULL,'2023-01-06 04:51:49',2),(267,115,'product/image/1672980708209_ááµá«áá¡á¯3.jpeg',NULL,572846,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672980708209_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%87%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%AF3.jpeg',NULL,NULL,NULL,'2023-01-06 04:51:49',1),(268,115,'product/image/1672980708200_ááµá«áá¡á¯2.jpg',NULL,1265031,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672980708200_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%87%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%AF2.jpg',NULL,NULL,NULL,'2023-01-06 04:51:48',0),(269,116,'product/image/1672988431990_truck.png',NULL,2789,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672988431990_truck.png',NULL,NULL,NULL,'2023-01-06 07:00:32',0),(270,116,'product/image/1672988432007_Vector.png',NULL,550,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672988432007_Vector.png',NULL,NULL,NULL,'2023-01-06 07:00:34',1),(271,116,'product/image/1672988432020_banner.jpg',NULL,13779,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1672988432020_banner.jpg',NULL,NULL,NULL,'2023-01-06 07:00:34',2);
/*!40000 ALTER TABLE `tt_product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_sns_auth`
--

DROP TABLE IF EXISTS `tt_sns_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_sns_auth` (
  `SNS_AUTH_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'SNS AUTH ID',
  `USER_ID` bigint(20) unsigned DEFAULT NULL COMMENT '사용자 ID',
  `SNS_TYPE` varchar(20) NOT NULL COMMENT 'SNS 타입',
  `APP_ID` varchar(128) NOT NULL COMMENT '앱 사용자 고유ID (일련번호)',
  `PASSWORD` varchar(500) DEFAULT NULL COMMENT 'SNS 패스워드',
  `APP_USER_NAME` varchar(100) NOT NULL COMMENT '앱 사용자 Username (ex. 앱 아이디, 앱 별명)',
  `SNS_TOKEN_KEY` varchar(500) DEFAULT NULL COMMENT 'SNS 인증 토큰 키',
  `NICKNAME` varchar(500) DEFAULT NULL COMMENT '닉네임',
  `RETURN_DATA` mediumtext DEFAULT NULL COMMENT '롤백 URL 반환값',
  `REGISTER_TIME` timestamp NULL DEFAULT current_timestamp() COMMENT '가입일',
  `UPDATE_TIME` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '수정일',
  PRIMARY KEY (`SNS_AUTH_ID`),
  KEY `FK_tt_sns_auth_USER_ID_tt_user_USER_ID` (`USER_ID`),
  CONSTRAINT `FK_tt_sns_auth_USER_ID_tt_user_USER_ID` FOREIGN KEY (`USER_ID`) REFERENCES `tt_user` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_sns_auth`
--

LOCK TABLES `tt_sns_auth` WRITE;
/*!40000 ALTER TABLE `tt_sns_auth` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_sns_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_talkplus_channel`
--

DROP TABLE IF EXISTS `tt_talkplus_channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_talkplus_channel` (
  `CHANNEL_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `TALKPLUS_CHANNEL_ID` varchar(100) NOT NULL,
  `PRODUCT_ID` bigint(20) unsigned NOT NULL,
  `NAME` varchar(30) DEFAULT NULL,
  `BUYER_ID` varchar(100) NOT NULL,
  `TYPE` varchar(30) DEFAULT NULL,
  `IMAGE_URL` varchar(300) DEFAULT NULL,
  `MAX_MEMBER_COUNT` int(11) NOT NULL DEFAULT 2,
  `STATUS` int(11) NOT NULL DEFAULT 0,
  `SELLER_ID` varchar(100) DEFAULT NULL,
  `LASTCHAT_TIME` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`CHANNEL_ID`),
  UNIQUE KEY `tt_talkplus_channel_pk` (`TALKPLUS_CHANNEL_ID`),
  UNIQUE KEY `tt_talkplus_channel_product_buyer` (`BUYER_ID`,`PRODUCT_ID`),
  KEY `tt_talkplus_channel_tt_product_null_fk` (`PRODUCT_ID`),
  KEY `tt_talkplus_channel_tt_user_talkplus_TALKPLUS_ID_fk` (`SELLER_ID`),
  CONSTRAINT `tt_talkplus_channel_tt_product_null_fk` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `tt_product` (`PRODUCT_ID`),
  CONSTRAINT `tt_talkplus_channel_tt_user_talkplus_TALKPLUS_ID_fk` FOREIGN KEY (`SELLER_ID`) REFERENCES `tt_user_talkplus` (`TALKPLUS_ID`),
  CONSTRAINT `tt_talkplus_channel_tt_user_talkplus_null_fk` FOREIGN KEY (`BUYER_ID`) REFERENCES `tt_user_talkplus` (`TALKPLUS_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_talkplus_channel`
--

LOCK TABLES `tt_talkplus_channel` WRITE;
/*!40000 ALTER TABLE `tt_talkplus_channel` DISABLE KEYS */;
INSERT INTO `tt_talkplus_channel` VALUES (51,'63b7160f6ece6a00010017e3',107,'근호의 상품','tttruck22','private','https://cdn.tttruck.co.kr/product/image/1672943106027_Vector.png',2,0,'tttruck22','2023-01-05 18:25:19'),(52,'63b716e8e860e00001001098',108,'페인트 올렸습니다.','tttruck22','private','https://cdn.tttruck.co.kr/product/image/1672943167574_áá¦ááµá«áá³2.png',2,0,'tttruck26','2023-01-05 18:28:56'),(53,'63b71ec1bb4782000102580e',109,'테스트 상품','tttruck26','private','https://cdn.tttruck.co.kr/product/image/1672945310811_Vector.png',2,0,'tttruck22','2023-01-05 19:02:25'),(54,'63b7788bf703cb0001001f7f',110,'구강세정기','tttruck24','private','https://cdn.tttruck.co.kr/product/image/1672968254858_áá¢á¸áá¥.png',2,0,'tttruck21','2023-01-06 01:25:31'),(55,'63b7803a5ad182000100e9de',110,'구강세정기','tttruck27','private','https://cdn.tttruck.co.kr/product/image/1672968254858_áá¢á¸áá¥.png',2,0,'tttruck21','2023-01-06 01:58:18'),(56,'63b792c1f6a5f000010060c6',113,'신발팝니다','tttruck21','private','https://cdn.tttruck.co.kr/product/image/1672974914874_ááµá«áá¡á¯1.png',2,0,'tttruck27','2023-01-06 03:17:21'),(57,'63b793d1f703cb000100664b',112,'구강2','tttruck27','private','https://cdn.tttruck.co.kr/product/image/1672973908386_áá¢á¸áá¥ (1).png',2,0,'tttruck21','2023-01-06 03:21:53'),(58,'63b7a7895ad18200010146ad',114,'참기름 팔아용','tttruck27','private','https://cdn.tttruck.co.kr/product/image/1672980320358_áá¡á·ááµáá³á·.png',2,0,'tttruck21','2023-01-06 04:46:01'),(59,'63b7a90e9c492f000100025b',115,'신발 팔아용','tttruck27','private','https://cdn.tttruck.co.kr/product/image/1672980708200_ááµá«áá¡á¯2.jpg',2,0,'tttruck21','2023-01-06 04:52:30');
/*!40000 ALTER TABLE `tt_talkplus_channel` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tttruck`@`%`*/ /*!50003 TRIGGER tt_talkplus_channel AFTER INSERT ON tt_talkplus_channel
    FOR EACH ROW
    UPDATE tt_product SET CHAT_TF = true where PRODUCT_ID = NEW.PRODUCT_ID */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tt_talkplus_message`
--

DROP TABLE IF EXISTS `tt_talkplus_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_talkplus_message` (
  `MESSAGE_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `TALKPLUS_CHANNEL_ID` varchar(100) NOT NULL,
  `SEND_USER_ID` bigint(20) unsigned NOT NULL,
  `SEND_USER_TALKPLUS_ID` varchar(100) NOT NULL,
  `TEXT` text NOT NULL,
  `DATA` text DEFAULT NULL,
  PRIMARY KEY (`MESSAGE_ID`),
  KEY `tt_talkplus_message_tt_user_null_fk` (`SEND_USER_ID`),
  KEY `tt_talkplus_message_tt_user_talkplus_null_fk` (`SEND_USER_TALKPLUS_ID`),
  KEY `tt_talkplus_message_tt_talkplus_channel_null_fk` (`TALKPLUS_CHANNEL_ID`),
  CONSTRAINT `tt_talkplus_message_tt_talkplus_channel_null_fk` FOREIGN KEY (`TALKPLUS_CHANNEL_ID`) REFERENCES `tt_talkplus_channel` (`TALKPLUS_CHANNEL_ID`),
  CONSTRAINT `tt_talkplus_message_tt_user_null_fk` FOREIGN KEY (`SEND_USER_ID`) REFERENCES `tt_user` (`USER_ID`),
  CONSTRAINT `tt_talkplus_message_tt_user_talkplus_null_fk` FOREIGN KEY (`SEND_USER_TALKPLUS_ID`) REFERENCES `tt_user_talkplus` (`TALKPLUS_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_talkplus_message`
--

LOCK TABLES `tt_talkplus_message` WRITE;
/*!40000 ALTER TABLE `tt_talkplus_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_talkplus_message` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tttruck`@`%`*/ /*!50003 trigger tt_talkplus_message
    after insert
    on tt_talkplus_message
    for each row
    UPDATE tt_talkplus_channel SET LASTCHAT_TIME = current_timestamp where TALKPLUS_CHANNEL_ID = NEW.TALKPLUS_CHANNEL_ID */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tt_trade_review`
--

DROP TABLE IF EXISTS `tt_trade_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_trade_review` (
  `TRADE_REVIEW_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PRODUCT_ID` bigint(20) unsigned DEFAULT NULL,
  `TRADE_REVIEW_TYPE` int(11) DEFAULT NULL,
  `USER_ID` bigint(20) unsigned DEFAULT NULL,
  `RATINGS` int(11) NOT NULL DEFAULT 0,
  `SUBJECT` text DEFAULT NULL,
  `CONTENTS` text DEFAULT NULL,
  `IPv4` int(10) unsigned DEFAULT NULL,
  `IPv6` binary(16) DEFAULT NULL,
  `CREATE_TIME` timestamp NULL DEFAULT current_timestamp(),
  `UPDATE_TIME` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `DELETE_TF` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`TRADE_REVIEW_ID`),
  KEY `tt_trade_review_tt_trade_null_fk` (`PRODUCT_ID`),
  KEY `tt_trade_review_tt_user_USER_ID_fk` (`USER_ID`),
  CONSTRAINT `tt_trade_review_tt_trade_null_fk` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `tt_product` (`PRODUCT_ID`),
  CONSTRAINT `tt_trade_review_tt_user_USER_ID_fk` FOREIGN KEY (`USER_ID`) REFERENCES `tt_user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_trade_review`
--

LOCK TABLES `tt_trade_review` WRITE;
/*!40000 ALTER TABLE `tt_trade_review` DISABLE KEYS */;
INSERT INTO `tt_trade_review` VALUES (21,108,0,22,4,NULL,'123',NULL,NULL,'2023-01-05 18:57:13','2023-01-05 18:57:13',0),(22,108,0,22,5,NULL,'sdfasdfewaf',NULL,NULL,'2023-01-05 18:57:45','2023-01-05 18:57:45',0),(23,109,1,22,4,NULL,'123123123',NULL,NULL,'2023-01-05 19:04:34','2023-01-05 19:04:34',0),(24,107,1,22,3,NULL,'qwe',NULL,NULL,'2023-01-05 19:07:23','2023-01-05 19:07:23',0),(25,108,1,26,4,NULL,'123',NULL,NULL,'2023-01-05 19:24:09','2023-01-05 19:24:09',0),(26,109,0,26,5,NULL,'132',NULL,NULL,'2023-01-05 19:24:24','2023-01-05 19:24:24',0),(27,110,1,21,4,NULL,'거\n래\n좋\n아',NULL,NULL,'2023-01-06 02:43:48','2023-01-06 02:43:48',0),(28,110,0,27,5,NULL,'너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤너무 좋아욤',NULL,NULL,'2023-01-06 02:47:30','2023-01-06 02:47:30',0),(29,111,0,22,4,NULL,'good',NULL,NULL,'2023-01-06 07:02:04','2023-01-06 07:02:04',0);
/*!40000 ALTER TABLE `tt_trade_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_user`
--

DROP TABLE IF EXISTS `tt_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_user` (
  `USER_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '유저 ID',
  `PHONE` varchar(20) NOT NULL COMMENT '전화번호',
  `PASSWORD` varchar(500) NOT NULL COMMENT '패스워드',
  `NICKNAME` varchar(30) DEFAULT NULL COMMENT '닉네임',
  `NAME` varchar(300) DEFAULT NULL COMMENT '이름',
  `ACCESSTOKEN` varchar(500) NOT NULL COMMENT '접근 토큰',
  `WASTE_SAVINGS` bigint(30) NOT NULL DEFAULT 0 COMMENT '폐기절감량',
  `GREENGAS_SAVINGS` bigint(30) GENERATED ALWAYS AS (`WASTE_SAVINGS` * 14) VIRTUAL,
  `COST_SAVINGS` bigint(30) GENERATED ALWAYS AS (`WASTE_SAVINGS` * 500) VIRTUAL,
  `GROUP` bigint(4) NOT NULL COMMENT '사용자 그룹 (01: 일반, 99:관리자)',
  `PROFILE_IMAGE` varchar(300) DEFAULT NULL COMMENT '프로필 이미지',
  `INTERIOR_COMPANY_TF` tinyint(1) NOT NULL DEFAULT 0 COMMENT '인테리어 회사 소속 여부',
  `INTERIOR_COMPANY_NAME` varchar(100) DEFAULT NULL COMMENT '인테리어 회사 이름 (NULL :무소속)',
  `BIRTHDAY` varchar(30) DEFAULT NULL COMMENT '생일 (YYYYMMDD)',
  `GENDER` int(2) DEFAULT NULL COMMENT '성별 (남 : 0 ; 여 : 1, etc : 9)',
  `ZIP_CODE` varchar(100) DEFAULT NULL COMMENT '우편번호',
  `ADDRESS` varchar(200) DEFAULT NULL COMMENT '주소',
  `DETAIL_ADDRESS` varchar(200) DEFAULT NULL COMMENT '상세 주소',
  `JOIN_STATE` varchar(5) DEFAULT NULL COMMENT '가입 상태 (01:승인대기, 02:승인거부, 03:관리자승인대기, 04:완료)',
  `RESTING_TF` tinyint(1) NOT NULL DEFAULT 0 COMMENT '휴면 여부',
  `LEAVE_TF` tinyint(1) NOT NULL DEFAULT 0 COMMENT '탈퇴 여부',
  `PHONE_AUTH_CODE` varchar(10) DEFAULT NULL COMMENT '휴대폰 인증코드',
  `PHONE_AUTH_DATE` datetime DEFAULT NULL COMMENT '휴대폰 인증유효 시간',
  `PHONE_AUTH_SUCCEED_DATE` datetime DEFAULT NULL COMMENT '휴대폰 인증 완료 시간',
  `PHONE_AUTH_TF` tinyint(1) NOT NULL DEFAULT 0 COMMENT '휴대폰 인증 여부',
  `REG_TIME` timestamp NULL DEFAULT current_timestamp() COMMENT '가입일',
  `UPD_TIME` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '수정일',
  `JOIN_TIME` timestamp NULL DEFAULT current_timestamp() COMMENT '가입 승인 날짜',
  `JOIN_PERMIT_USER_ID` bigint(20) unsigned DEFAULT NULL COMMENT '가입 승인해준 USER_ID',
  `JOIN_AGREE` varchar(10) DEFAULT NULL COMMENT '가입 약관 동의 여부(0: 개인정보 수집 및 이용동의 1: 개인정보 수집 목적 내 제3자 제공 동의 2: 14세 미만 법정 대리인 동의)',
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `tt_user_unique_key` (`PHONE`),
  KEY `FK_tt_user_JOIN_PERMIT_USER_ID_tt_user_USER_ID` (`JOIN_PERMIT_USER_ID`),
  CONSTRAINT `FK_tt_user_JOIN_PERMIT_USER_ID_tt_user_USER_ID` FOREIGN KEY (`JOIN_PERMIT_USER_ID`) REFERENCES `tt_user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='회원정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_user`
--

LOCK TABLES `tt_user` WRITE;
/*!40000 ALTER TABLE `tt_user` DISABLE KEYS */;
INSERT INTO `tt_user` VALUES (1,'01000000000','masteraccount','masteraccount','master','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDIzODMzOTY4IiwicGFzc3dvcmQiOiIkMmIkMTIkVTBFdFBraVF0Z0lGS2xJeWNhS0VUT1BKOGJNQW9CU0VFeGxua1UzaERjcnQ2QWN5SUJRbG0iLCJpYXQiOjE2NzIzMDMwNjIsImV4cCI6MTY3MjU2MjI2Mn0.HTmFO-1mfZRlXA_zvSDezVv9gdOUU8kHFPEU1PD-SNg',2500,35000,1250000,99,NULL,0,NULL,'200001212',0,NULL,NULL,NULL,NULL,0,0,'2154482',NULL,NULL,1,'2022-12-22 02:27:40','2023-01-06 03:44:06','2022-12-22 02:27:40',NULL,NULL),(21,'01023833968','$2b$12$U0EtPkiQtgIFKlIycaKETOPJ8bMAoBSEExlnkU3hDcrt6AcyIBQlm','너그러운북극곰',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDIzODMzOTY4IiwicGFzc3dvcmQiOiIkMmIkMTIkVTBFdFBraVF0Z0lGS2xJeWNhS0VUT1BKOGJNQW9CU0VFeGxua1UzaERjcnQ2QWN5SUJRbG0iLCJpYXQiOjE2NzI5OTAyMDcsImV4cCI6MTY3MzI0OTQwN30.V1-AUy6vLF6UOUb4LiHNBQQdIq1VJTFANyKgFtZP0s0',20000,280000,10000000,99,'profile/1672990035903_9E71B7EF-D19C-4AFE-9D32-E38A8B6C411A.jpeg',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'664398',NULL,NULL,1,'2022-12-29 08:37:42','2023-01-06 07:30:07','2022-12-29 08:37:42',NULL,NULL),(22,'01063873134','$2b$12$SX24wtDlynGHrAERx82e9O79wIzo933DzC9WKoy/ejG4ydwGgOw6i','얌이아빠',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDYzODczMTM0IiwicGFzc3dvcmQiOiIkMmIkMTIkU1gyNHd0RGx5bkdIckFFUng4MmU5Tzc5d0l6bzkzM0R6QzlXS295L2VqRzR5ZHdHZ093NmkiLCJpYXQiOjE2NzI5OTA0MzgsImV4cCI6MTY3MzI0OTYzOH0.EXrGRBtVGAkAu_-fFNcfTaeuOq066dTFpGJ4EPIDDwI',2500,35000,1250000,99,'profile/1672990300562_9AFB98F3-D4FD-4E9C-A3A7-127B6E69D73B.jpeg',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'064333',NULL,NULL,1,'2022-12-29 10:34:59','2023-01-06 07:33:58','2022-12-29 10:34:59',NULL,NULL),(23,'01098811234','$2b$12$FxBYmsaUvcljOg7IfTWqhOCYq6MQAT6kC9HV1cCMh/8Bw8.Podnku','차가운염소4146',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDk4ODEwNjY0IiwicGFzc3dvcmQiOiIkMmIkMTIkRnhCWW1zYVV2Y2xqT2c3SWZUV3FoT0NZcTZNUUFUNmtDOUhWMWNDTWgvOEJ3OC5Qb2Rua3UiLCJpYXQiOjE2NzI1NTk4MzgsImV4cCI6MTY3MjgxOTAzOH0.Elu0XtgZWZW_yMAAE1sWJ4k-6EExUd6BoYz1LLDM6ls',0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'890266',NULL,NULL,1,'2023-01-01 04:29:15','2023-01-02 07:18:25','2023-01-01 04:29:15',NULL,NULL),(24,'01080288328','$2b$12$KymyQBacuEy46w1pMuEbVO5DWNSVI4GbgMTdWhhE3YDqTABcYJxye','괜찮은토끼78',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDgwMjg4MzI4IiwicGFzc3dvcmQiOiIkMmIkMTIkS3lteVFCYWN1RXk0NncxcE11RWJWTzVEV05TVkk0R2JnTVRkV2hoRTNZRHFUQUJjWUp4eWUiLCJpYXQiOjE2NzI5NjgzMjYsImV4cCI6MTY3MzIyNzUyNn0._0hef_R6AGod8CTgjZ1G7C3Ltp9wfa2S7OQ7bA9t5XQ',0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'206947',NULL,NULL,1,'2023-01-02 07:20:38','2023-01-06 01:53:35','2023-01-02 07:20:38',NULL,NULL),(25,'01098810000','$2b$12$q3nHkdZRvESCZVst.5O0vOvz7aiLT76Ewv/yRgM1tbpRvnG3nXzom','반가운토끼8008',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDk4ODEwNjY0IiwicGFzc3dvcmQiOiIkMmIkMTIkcTNuSGtkWlJ2RVNDWlZzdC41TzB2T3Z6N2FpTFQ3NkV3di95UmdNMXRicFJ2bkczblh6b20iLCJpYXQiOjE2NzI4NjAyNzcsImV4cCI6MTY3MzExOTQ3N30.3OYl4tIF0LsOMogiqe9hm4vD_G8jajeDEWMHpDZqb_E',0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,'975134',NULL,NULL,1,'2023-01-03 13:09:07','2023-01-05 07:57:05','2023-01-03 13:09:07',NULL,NULL),(26,'01098810664','$2b$12$7h0IYZe8H5JtXgiQLN2NV.yYTbRY8cF9C1qlQ9dLOq8P3Z1cD4QH2','희망찬사자2391',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDk4ODEwNjY0IiwicGFzc3dvcmQiOiIkMmIkMTIkN2gwSVlaZThINUp0WGdpUUxOMk5WLnlZVGJSWThjRjlDMXFsUTlkTE9xOFAzWjFjRDRRSDIiLCJpYXQiOjE2NzI5NDU3MzAsImV4cCI6MTY3MzIwNDkzMH0.B8_mDIxlq_UFIr-ZFESXSTKWgz93SdpulPEKm6KApc0',0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,'144312',NULL,NULL,1,'2023-01-05 02:24:32','2023-01-06 04:42:01','2023-01-05 02:24:32',NULL,NULL),(27,'01072219372','$2b$12$zxJ6h6JopDbO1IUBHySIxesk.1Hb5jgdhQACxigAU6j1dnAm.svL6','차가운갈매기80',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDcyMjE5MzcyIiwicGFzc3dvcmQiOiIkMmIkMTIkenhKNmg2Sm9wRGJPMUlVQkh5U0l4ZXNrLjFIYjVqZ2RoUUFDeGlnQVU2ajFkbkFtLnN2TDYiLCJpYXQiOjE2NzI5ODI4NTEsImV4cCI6MTY3MzI0MjA1MX0.DIwPxu7QytzWUzIK1D98OHGlNlTdEJC1y7ICbb3xLAE',20000,280000,10000000,0,'profile/1672988221291_ááµá«áá¡á¯3.jpeg',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'017313',NULL,NULL,1,'2023-01-06 01:58:10','2023-01-06 06:57:01','2023-01-06 01:58:10',NULL,NULL);
/*!40000 ALTER TABLE `tt_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tttruck`@`%`*/ /*!50003 trigger tt_user
    after update
    on tt_user
    for each row
    UPDATE tt_user_talkplus SET LEAVE_TF = NEW.LEAVE_TF
    WHERE USER_ID = NEW.USER_ID */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tt_user_signout`
--

DROP TABLE IF EXISTS `tt_user_signout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_user_signout` (
  `SIGNOUT_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `USER_ID` bigint(20) unsigned NOT NULL,
  `TEXT` text DEFAULT NULL,
  `TIME` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`SIGNOUT_ID`),
  KEY `tt_user_signout_tt_user_null_fk` (`USER_ID`),
  CONSTRAINT `tt_user_signout_tt_user_null_fk` FOREIGN KEY (`USER_ID`) REFERENCES `tt_user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_user_signout`
--

LOCK TABLES `tt_user_signout` WRITE;
/*!40000 ALTER TABLE `tt_user_signout` DISABLE KEYS */;
INSERT INTO `tt_user_signout` VALUES (1,22,'재가입 할겁니닫','2023-01-06 04:40:06'),(2,22,'재가입할겁니다','2023-01-06 04:40:42'),(3,26,'ofefwf','2023-01-06 04:42:01'),(4,22,'ofefwf','2023-01-06 04:43:05'),(5,22,'123','2023-01-06 04:43:22'),(6,22,'재가입 할거에요./테스트','2023-01-06 05:31:24'),(7,22,'재가입 할거에요./테스트','2023-01-06 05:41:02'),(8,22,'재가입 할거에요./테스트','2023-01-06 06:37:53');
/*!40000 ALTER TABLE `tt_user_signout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_user_talkplus`
--

DROP TABLE IF EXISTS `tt_user_talkplus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_user_talkplus` (
  `USER_ID` bigint(20) unsigned NOT NULL,
  `TALKPLUS_ID` varchar(100) NOT NULL,
  `TALKPLUS_PASSWORD` varchar(100) DEFAULT NULL,
  `TALKPLUS_USERNAME` varchar(100) DEFAULT NULL,
  `TALKPLUS_PROFILE_IMAGE_URL` varchar(300) DEFAULT NULL,
  `TALKPLUS_LOGIN_TOKEN` varchar(300) DEFAULT NULL,
  `LEAVE_TF` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`TALKPLUS_ID`),
  UNIQUE KEY `tt_user_talkplus_pk` (`TALKPLUS_ID`),
  UNIQUE KEY `tt_user_ID_talkplus_pk` (`USER_ID`),
  CONSTRAINT `tt_user_talkplus_tt_user_USER_ID_fk` FOREIGN KEY (`USER_ID`) REFERENCES `tt_user` (`USER_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_user_talkplus`
--

LOCK TABLES `tt_user_talkplus` WRITE;
/*!40000 ALTER TABLE `tt_user_talkplus` DISABLE KEYS */;
INSERT INTO `tt_user_talkplus` VALUES (21,'tttruck21','$2b$12$U0EtPkiQtgIFKlIycaKETOPJ8bMAoBSEExlnkU3hDcrt6AcyIBQlm','너그러운북극곰','https://cdn.tttruck.co.kr/profile/1672990035903_9E71B7EF-D19C-4AFE-9D32-E38A8B6C411A.jpeg','$2a$06$LTWVWACo/ysbN0.Sure/XeudYjjFJwAqyZpl26qKUL3Z4AaQ9bvSm',0),(22,'tttruck22','$2b$12$SX24wtDlynGHrAERx82e9O79wIzo933DzC9WKoy/ejG4ydwGgOw6i','얌이아빠','https://cdn.tttruck.co.kr/profile/1672990300562_9AFB98F3-D4FD-4E9C-A3A7-127B6E69D73B.jpeg','$2a$06$cuwN97vfedW0kUWNLHSEMufChHvjXhxI5FIunkhNnrM.PcZGu0OJ6',0),(23,'tttruck23','$2b$12$FxBYmsaUvcljOg7IfTWqhOCYq6MQAT6kC9HV1cCMh/8Bw8.Podnku','차가운염소4146','','$2a$06$iivr57teUk8V6k9i0Q13E.2nPwkcWa91HmYHgz98DW4UegtdA.WKG',0),(24,'tttruck24','$2b$12$KymyQBacuEy46w1pMuEbVO5DWNSVI4GbgMTdWhhE3YDqTABcYJxye','괜찮은토끼78','https://cdn.tttruck.co.kr/','$2a$06$QYE7b9vTLZ.dPcEgiw3aVeSwUk/20zn4KU7xlF6w58.kpVoH0Xr5a',0),(25,'tttruck25','$2b$12$q3nHkdZRvESCZVst.5O0vOvz7aiLT76Ewv/yRgM1tbpRvnG3nXzom','반가운토끼8008','','$2a$06$HVRnAR5g8rBY.0PP3PmWoOIxLut864v3lhBfa6F9pQYPXBDKqNoYS',1),(26,'tttruck26','$2b$12$7h0IYZe8H5JtXgiQLN2NV.yYTbRY8cF9C1qlQ9dLOq8P3Z1cD4QH2','희망찬사자2391','','$2a$06$d9Dz2h.7AlFCC.0cg7Jt5.Qq077TCulnYp7./ONhW1qxkR4h86Amq',1),(27,'tttruck27','$2b$12$zxJ6h6JopDbO1IUBHySIxesk.1Hb5jgdhQACxigAU6j1dnAm.svL6','차가운갈매기80','https://cdn.tttruck.co.kr/profile/1672988221291_ááµá«áá¡á¯3.jpeg','$2a$06$6i3BRpxQchoSYHSc5JgjiO1.NLtstVdYYrvCHSMl4EhKJYiP53Fny',0);
/*!40000 ALTER TABLE `tt_user_talkplus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_view_log`
--

DROP TABLE IF EXISTS `tt_view_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_view_log` (
  `VIEW_LOG_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '뷰 로그 ID',
  `CONTENT_TYPE` varchar(20) NOT NULL COMMENT '컨텐츠 타입',
  `USER_ID` bigint(20) unsigned DEFAULT NULL COMMENT '로그인 아이디',
  `TIME` timestamp NULL DEFAULT current_timestamp() COMMENT '날짜',
  `IPv4` int(10) unsigned DEFAULT NULL COMMENT 'IPv4',
  `IPv6` binary(16) DEFAULT NULL COMMENT 'IPv6',
  PRIMARY KEY (`VIEW_LOG_ID`),
  KEY `FK_tt_view_log_USER_ID_tt_user_USER_ID` (`USER_ID`),
  CONSTRAINT `FK_tt_view_log_USER_ID_tt_user_USER_ID` FOREIGN KEY (`USER_ID`) REFERENCES `tt_user` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='뷰 로그';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_view_log`
--

LOCK TABLES `tt_view_log` WRITE;
/*!40000 ALTER TABLE `tt_view_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_view_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-01 12:44:31
