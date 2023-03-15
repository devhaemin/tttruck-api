-- MariaDB dump 10.19  Distrib 10.11.2-MariaDB, for osx10.18 (x86_64)
--
-- Host: db.tttruck.co.kr    Database: tttruck_db
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
-- Table structure for table `tt_badge`
--

DROP TABLE IF EXISTS `tt_badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_badge` (
  `BADGE_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '뱃지_일련번호',
  `BADGE_SUBJECT` varchar(40) DEFAULT NULL COMMENT '뱃지_제목',
  `BADGE_CONTENT` varchar(255) DEFAULT NULL COMMENT '뱃지_내용',
  `BADGE_FILE_URL` varchar(255) DEFAULT NULL COMMENT '뱃지_이미지_URL',
  `BADGE_REG_DATE` timestamp NULL DEFAULT current_timestamp() COMMENT '뱃지_출시일',
  `BADGE_OP1_CONTENT` varchar(255) DEFAULT NULL COMMENT '뱃지_조건1',
  `BADGE_OP2_CONTENT` varchar(255) DEFAULT NULL COMMENT '뱃지_조건2',
  PRIMARY KEY (`BADGE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='뱃지 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_badge`
--

LOCK TABLES `tt_badge` WRITE;
/*!40000 ALTER TABLE `tt_badge` DISABLE KEYS */;
INSERT INTO `tt_badge` VALUES
(1,'지구환경노조가입','11',NULL,NULL,NULL,NULL),
(2,'초보환경운동가',NULL,NULL,NULL,NULL,NULL),
(3,'피노키오','22',NULL,NULL,NULL,NULL),
(4,'기타리스트','11',NULL,NULL,NULL,NULL),
(5,'그랜드마스터','21',NULL,NULL,NULL,NULL),
(11,'날아라석고보드',NULL,NULL,NULL,NULL,NULL),
(12,'천정뚫고하이킥',NULL,NULL,NULL,NULL,NULL),
(13,'마루파이브',NULL,NULL,NULL,NULL,NULL),
(14,'아이언맥',NULL,NULL,NULL,NULL,NULL),
(15,'맥카츄',NULL,NULL,NULL,NULL,NULL),
(16,'진격의그라인더',NULL,NULL,NULL,NULL,NULL),
(17,'땡땡지물포',NULL,NULL,NULL,NULL,NULL),
(18,'에디슨박사',NULL,NULL,NULL,NULL,NULL),
(19,'대장장이',NULL,NULL,NULL,NULL,NULL),
(20,'액체괴물',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `tt_badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_badge_condition`
--

DROP TABLE IF EXISTS `tt_badge_condition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_badge_condition` (
  `CONDITION_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `PRODUCT_CATEGORY_ID` bigint(20) unsigned DEFAULT NULL,
  `BADGE_ID` bigint(20) unsigned DEFAULT NULL,
  `WEIGHT` int(20) DEFAULT NULL,
  `CONDITION_REG_DATE` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`CONDITION_ID`),
  KEY `FK_tt_badge_condition_CATEGORYID_tt_product_category_CATEGORYID` (`PRODUCT_CATEGORY_ID`),
  KEY `FK_tt_badge_condition_BADGE_ID_tt_badge_BADGE_ID` (`BADGE_ID`),
  CONSTRAINT `FK_tt_badge_condition_BADGE_ID_tt_badge_BADGE_ID` FOREIGN KEY (`BADGE_ID`) REFERENCES `tt_badge` (`BADGE_ID`),
  CONSTRAINT `FK_tt_badge_condition_CATEGORYID_tt_product_category_CATEGORYID` FOREIGN KEY (`PRODUCT_CATEGORY_ID`) REFERENCES `tt_badge_condition` (`CONDITION_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_badge_condition`
--

LOCK TABLES `tt_badge_condition` WRITE;
/*!40000 ALTER TABLE `tt_badge_condition` DISABLE KEYS */;
INSERT INTO `tt_badge_condition` VALUES
(2,2,2,NULL,'2023-03-13 07:50:30'),
(3,NULL,NULL,NULL,'2023-03-13 07:50:30');
/*!40000 ALTER TABLE `tt_badge_condition` ENABLE KEYS */;
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
INSERT INTO `tt_notice_master` VALUES
(1,'이벤트',1,0,1,0,NULL,1,'2022-12-24 07:17:28',NULL,NULL,NULL,'2022-12-24 07:17:28',NULL,NULL,NULL,NULL,0),
(2,'공지사항',1,0,1,0,NULL,1,'2022-12-24 07:17:28',NULL,NULL,NULL,'2022-12-24 07:17:28',NULL,NULL,NULL,NULL,0),
(3,'뉴스',1,0,1,0,NULL,1,'2022-12-24 07:17:28',NULL,NULL,NULL,'2022-12-24 07:17:28',NULL,NULL,NULL,NULL,0),
(4,'팁',1,0,1,0,NULL,1,'2022-12-24 07:17:28',NULL,NULL,NULL,'2022-12-24 07:17:28',NULL,NULL,NULL,NULL,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_phone_auth`
--

LOCK TABLES `tt_phone_auth` WRITE;
/*!40000 ALTER TABLE `tt_phone_auth` DISABLE KEYS */;
INSERT INTO `tt_phone_auth` VALUES
(35,'01098810664','1106874','2022-12-24 05:54:43','2022-12-24 05:54:43',0,'2022-12-24 05:59:43'),
(36,'01098810664','8908698','2022-12-24 06:01:06','2022-12-24 06:01:06',0,'2022-12-24 06:06:06'),
(37,'01098810664','4343521','2022-12-24 06:05:25','2022-12-24 06:05:25',0,'2022-12-24 06:10:25'),
(38,'01098810664','3899583','2022-12-24 06:12:34','2022-12-24 06:12:34',0,'2022-12-24 06:17:34'),
(39,'01098810664','8525200','2022-12-24 06:13:34','2022-12-24 06:13:34',0,'2022-12-24 06:18:34'),
(40,'01098810664','3911945','2022-12-24 06:21:18','2022-12-24 06:21:40',1,'2022-12-24 06:26:18'),
(41,'01098810664','4584413','2022-12-24 06:27:12','2022-12-24 06:27:12',0,'2022-12-24 06:32:12'),
(42,'01098810664','402974','2022-12-24 06:27:28','2022-12-24 06:27:28',0,'2022-12-24 06:32:28'),
(43,'01098810664','4398150','2022-12-24 06:27:48','2022-12-24 06:27:48',0,'2022-12-24 06:32:48'),
(44,'01098810664','2545227','2022-12-24 06:28:39','2022-12-24 06:28:39',0,'2022-12-24 06:33:39'),
(45,'01098810663','436306','2022-12-24 06:40:37','2022-12-24 06:40:37',0,'2022-12-24 06:45:37'),
(46,'0101258584','9661923','2022-12-26 13:13:45','2022-12-26 13:13:45',0,'2022-12-26 13:18:45'),
(47,'01012585841','5265345','2022-12-26 13:13:51','2022-12-26 13:13:51',0,'2022-12-26 13:18:51'),
(48,'','8043318','2022-12-26 13:15:56','2022-12-26 13:15:56',0,'2022-12-26 13:20:56'),
(49,'01012341231','743931','2022-12-26 13:16:44','2022-12-26 13:16:44',0,'2022-12-26 13:21:44'),
(50,'01012341233','3370060','2022-12-26 13:24:13','2022-12-26 13:24:13',0,'2022-12-26 13:29:13'),
(51,'01012333333','038608','2022-12-26 13:41:20','2022-12-26 13:41:20',0,'2022-12-26 13:46:20'),
(52,'01063873134','6540938','2022-12-26 16:03:59','2022-12-26 16:03:59',0,'2022-12-26 16:08:59'),
(53,'01063873134','8137620','2022-12-26 16:04:17','2022-12-26 16:04:17',0,'2022-12-26 16:09:17'),
(54,'12312312312','2121793','2022-12-26 16:05:16','2022-12-26 16:05:16',0,'2022-12-26 16:10:16'),
(55,'01012341242','5274630','2022-12-27 13:11:13','2022-12-27 13:11:13',0,'2022-12-27 13:16:13'),
(56,'01012341111','8237343','2022-12-28 03:29:43','2022-12-28 03:29:43',0,'2022-12-28 03:34:43'),
(57,'01012111111','6051546','2022-12-28 03:30:12','2022-12-28 03:30:12',0,'2022-12-28 03:35:12'),
(58,'01063873134','9940739','2022-12-28 13:29:30','2022-12-28 13:29:30',0,'2022-12-28 13:34:30'),
(59,'01063873134','7623425','2022-12-28 13:56:49','2022-12-28 13:56:49',0,'2022-12-28 14:01:49'),
(60,'01063873134','5785684','2022-12-28 14:16:31','2022-12-28 14:16:31',0,'2022-12-28 14:21:31'),
(61,'01063873134','8347888','2022-12-28 15:07:50','2022-12-28 15:07:50',0,'2022-12-28 15:12:50'),
(62,'01063873134','6972894','2022-12-28 15:08:14','2022-12-28 15:08:14',0,'2022-12-28 15:13:14'),
(63,'01063873134','6312598','2022-12-28 15:13:59','2022-12-28 15:13:59',0,'2022-12-28 15:18:59'),
(64,'01063873134','6730452','2022-12-28 15:23:27','2022-12-28 15:23:27',0,'2022-12-28 15:28:27'),
(65,'01063873134','943300','2022-12-28 15:42:55','2022-12-28 15:42:55',0,'2022-12-28 15:47:55'),
(66,'01063873134','029914','2022-12-28 15:45:41','2022-12-28 15:45:41',0,'2022-12-28 15:50:41'),
(67,'01063873134','207131','2022-12-28 15:47:29','2022-12-28 15:47:29',0,'2022-12-28 15:52:29'),
(68,'01098810663','270426','2022-12-28 15:51:46','2022-12-28 15:51:46',0,'2022-12-28 15:56:46'),
(69,'01063873134','136886','2022-12-28 15:53:01','2022-12-28 15:53:29',1,'2022-12-28 15:58:01'),
(70,'01010101010','087280','2022-12-28 15:56:21','2022-12-28 15:56:21',0,'2022-12-28 16:01:21'),
(71,'01011111111','392420','2022-12-28 16:08:56','2022-12-28 16:08:56',0,'2022-12-28 16:13:56'),
(72,'13123123123','323688','2022-12-28 16:09:31','2022-12-28 16:09:31',0,'2022-12-28 16:14:31'),
(73,'12312312312','457991','2022-12-28 16:09:50','2022-12-28 16:09:50',0,'2022-12-28 16:14:50'),
(74,'12312312312','730441','2022-12-28 16:11:51','2022-12-28 16:11:51',0,'2022-12-28 16:16:51'),
(75,'12312312312','842855','2022-12-28 16:12:35','2022-12-28 16:12:35',0,'2022-12-28 16:17:35'),
(76,'12312312312','893480','2022-12-28 16:13:50','2022-12-28 16:13:50',0,'2022-12-28 16:18:50'),
(77,'01063873134','881935','2022-12-28 16:17:08','2022-12-28 16:17:08',0,'2022-12-28 16:22:08'),
(78,'12312312312','358818','2022-12-28 16:26:06','2022-12-28 16:26:06',0,'2022-12-28 16:31:06'),
(79,'01063873134','168287','2022-12-28 16:29:37','2022-12-28 16:29:37',0,'2022-12-28 16:34:37'),
(80,'01063873134','718754','2022-12-28 16:32:10','2022-12-28 16:32:10',0,'2022-12-28 16:37:10'),
(81,'01063873134','688735','2022-12-28 16:32:56','2022-12-28 16:33:15',1,'2022-12-28 16:37:56'),
(82,'01063873134','235060','2022-12-28 16:35:04','2022-12-28 16:35:04',0,'2022-12-28 16:40:04'),
(83,'01063873134','640321','2022-12-28 16:36:29','2022-12-28 16:36:29',0,'2022-12-28 16:41:29'),
(84,'01063873134','757383','2022-12-28 16:37:34','2022-12-28 16:37:34',0,'2022-12-28 16:42:34'),
(85,'01063873134','764477','2022-12-28 16:39:43','2022-12-28 16:39:43',0,'2022-12-28 16:44:43'),
(86,'01063873134','852047','2022-12-28 16:41:43','2022-12-28 16:41:43',0,'2022-12-28 16:46:43'),
(87,'01063873134','840181','2022-12-28 16:48:29','2022-12-28 16:48:29',0,'2022-12-28 16:53:29'),
(88,'01012312412','146297','2022-12-29 04:57:02','2022-12-29 04:57:02',0,'2022-12-29 05:02:02'),
(89,'01023833968','324985','2022-12-29 04:57:23','2022-12-29 05:01:15',1,'2022-12-29 05:02:23'),
(90,'01080288328','920641','2022-12-29 05:13:35','2022-12-29 05:13:54',1,'2022-12-29 05:18:35'),
(91,'01098810663','246241','2022-12-29 07:11:32','2022-12-29 07:13:50',1,'2022-12-29 07:16:32'),
(92,'01000000000','151398','2022-12-29 07:16:27','2022-12-29 07:16:56',1,'2022-12-29 07:21:27'),
(93,'01000000000','845264','2022-12-29 07:26:56','2022-12-29 07:27:16',1,'2022-12-29 07:31:56'),
(94,'01000000000','554914','2022-12-29 07:32:30','2022-12-29 07:33:17',1,'2022-12-29 07:37:30'),
(95,'01023833968','674406','2022-12-29 08:37:05','2022-12-29 08:37:05',0,'2022-12-29 08:42:05'),
(96,'01023833968','664398','2022-12-29 08:37:11','2022-12-29 08:37:42',1,'2022-12-29 08:42:11'),
(97,'01063873134','164381','2022-12-29 09:04:58','2022-12-29 09:04:58',0,'2022-12-29 09:09:58'),
(98,'01063873134','202648','2022-12-29 10:12:07','2022-12-29 10:12:07',0,'2022-12-29 10:17:07'),
(99,'01063873134','967905','2022-12-29 10:12:09','2022-12-29 10:12:09',0,'2022-12-29 10:17:09'),
(100,'01063873134','332437','2022-12-29 10:12:15','2022-12-29 10:12:15',0,'2022-12-29 10:17:15'),
(101,'01063873134','064333','2022-12-29 10:34:45','2022-12-29 10:34:59',1,'2022-12-29 10:39:45'),
(102,'12312312312','151158','2022-12-30 05:13:40','2022-12-30 05:13:40',0,'2022-12-30 05:18:40'),
(103,'01098810664','890266','2023-01-01 04:28:48','2023-01-01 04:29:15',1,'2023-01-01 04:33:48'),
(104,'01080688328','362746','2023-01-02 07:14:44','2023-01-02 07:14:44',0,'2023-01-02 07:19:44'),
(105,'01080688328','040565','2023-01-02 07:16:29','2023-01-02 07:16:29',0,'2023-01-02 07:21:29'),
(106,'01098810664','826547','2023-01-02 07:18:36','2023-01-02 07:18:36',0,'2023-01-02 07:23:36'),
(107,'01098810664','265099','2023-01-02 07:19:12','2023-01-02 07:19:12',0,'2023-01-02 07:24:12'),
(108,'01080288328','206947','2023-01-02 07:20:01','2023-01-02 07:20:38',1,'2023-01-02 07:25:01'),
(109,'01098810664','728715','2023-01-02 08:28:04','2023-01-02 08:28:04',0,'2023-01-02 08:33:04'),
(110,'01028333968','499902','2023-01-02 09:02:30','2023-01-02 09:02:30',0,'2023-01-02 09:07:30'),
(111,'01098810664','975134','2023-01-03 13:08:45','2023-01-03 13:09:07',1,'2023-01-03 13:13:45'),
(112,'02193123712','097677','2023-01-04 13:20:41','2023-01-04 13:20:41',0,'2023-01-04 13:25:41'),
(113,'01098810664','354401','2023-01-05 02:23:58','2023-01-05 02:23:58',0,'2023-01-05 02:28:58'),
(114,'01098810664','144312','2023-01-05 02:24:09','2023-01-05 02:24:32',1,'2023-01-05 02:29:09'),
(115,'01072219372','017313','2023-01-06 01:57:35','2023-01-06 01:58:10',1,'2023-01-06 02:02:35'),
(116,'01072219793','838907','2023-01-06 05:27:14','2023-01-06 05:27:14',0,'2023-01-06 05:32:14'),
(117,'01040222715','085959','2023-01-06 10:11:32','2023-01-06 10:12:09',1,'2023-01-06 10:16:32'),
(118,'01066189880','079003','2023-01-06 14:16:47','2023-01-06 14:17:10',1,'2023-01-06 14:21:47'),
(119,'01092959776','358191','2023-01-08 13:50:42','2023-01-08 13:50:42',0,'2023-01-08 13:55:42'),
(120,'01080009906','456540','2023-01-10 00:52:33','2023-01-10 00:52:33',0,'2023-01-10 00:57:33'),
(121,'01080009906','293254','2023-01-10 00:52:44','2023-01-10 00:54:09',1,'2023-01-10 00:57:44'),
(122,'01036918426','521380','2023-01-10 08:52:46','2023-01-10 08:53:19',1,'2023-01-10 08:57:46'),
(123,'01087277972','356094','2023-01-17 10:59:19','2023-01-17 10:59:19',0,'2023-01-17 11:04:19'),
(124,'01087277972','518254','2023-01-21 09:41:06','2023-01-21 09:41:06',0,'2023-01-21 09:46:06'),
(125,'01087277972','322929','2023-01-21 09:42:22','2023-01-21 09:42:55',1,'2023-01-21 09:47:22'),
(126,'01041936199','474210','2023-01-25 12:29:17','2023-01-25 12:30:07',1,'2023-01-25 12:34:17'),
(127,'01012341234','178001','2023-01-31 15:09:15','2023-01-31 15:09:15',0,'2023-01-31 15:14:15'),
(128,'01022000125','979743','2023-02-08 03:00:46','2023-02-08 03:02:14',1,'2023-02-08 03:05:46'),
(129,'01033654992','039323','2023-02-10 07:42:38','2023-02-10 07:42:38',0,'2023-02-10 07:47:38'),
(130,'01053873128','495628','2023-02-21 07:49:46','2023-02-21 07:50:12',1,'2023-02-21 07:54:46'),
(131,'01092231433','180434','2023-02-21 09:48:15','2023-02-21 09:48:37',1,'2023-02-21 09:53:15'),
(132,'01012341234','628598','2023-02-27 07:18:10','2023-02-27 07:18:10',0,'2023-02-27 07:23:10'),
(133,'01012312412','975838','2023-02-27 11:38:14','2023-02-27 11:38:14',0,'2023-02-27 11:43:14'),
(134,'12312312312','294838','2023-03-02 12:28:47','2023-03-02 12:28:47',0,'2023-03-02 12:33:47'),
(135,'01024508638','418277','2023-03-02 12:55:31','2023-03-02 12:56:03',1,'2023-03-02 13:00:31'),
(136,'01032133213','373120','2023-03-04 13:10:01','2023-03-04 13:10:01',0,'2023-03-04 13:15:01'),
(137,'01030377903','281332','2023-03-04 13:10:13','2023-03-04 13:10:35',1,'2023-03-04 13:15:13'),
(138,'01096997478','393271','2023-03-06 05:45:10','2023-03-06 05:46:45',1,'2023-03-06 05:50:10'),
(139,'01040974129','827965','2023-03-06 10:04:57','2023-03-06 10:05:48',1,'2023-03-06 10:09:57'),
(140,'01057149182','060062','2023-03-06 10:16:16','2023-03-06 10:17:30',1,'2023-03-06 10:21:16'),
(141,'01037635551','705621','2023-03-06 23:08:20','2023-03-06 23:10:51',1,'2023-03-06 23:13:20'),
(142,'01090470088','899354','2023-03-07 05:46:26','2023-03-07 05:47:26',1,'2023-03-07 05:51:26'),
(143,'01033406155','760726','2023-03-13 12:49:18','2023-03-13 12:49:53',1,'2023-03-13 12:54:18');
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
  `LATITUDE` varchar(30) NOT NULL DEFAULT '37.541',
  `LONGITUDE` varchar(30) NOT NULL DEFAULT '126.986',
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
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='인테리어 소모품 상품';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_product`
--

LOCK TABLES `tt_product` WRITE;
/*!40000 ALTER TABLE `tt_product` DISABLE KEYS */;
INSERT INTO `tt_product` VALUES
(120,'미송집성목 각재 팝니다',1,1,200000,'75*75*600',2500,'사용후 남은 각목 1개 입니다. \n가지러 오셔야합니다. 배송비 부담하시면 다마스 불러드릴 수 있습니다.',28,987833922,NULL,'2023-01-07 04:47:08','','서울 종로구 교남동 36-3','37.5679022452494','126.965358093626','\0\0\0\0\0\0\0]CPmȽ_@�UQ��B@',28,987833922,NULL,'2023-02-28 01:49:19',9,'2023-01-07 04:47:08',31,NULL,NULL,0,'15개',1),
(121,'땡순이',1,1,10000,'100mm ',7500,'집 수리에 필요한 목자재 구하는 중입니다',39,3542388335,NULL,'2023-02-08 03:06:24','','서울 노원구 공릉동 172','37.631189377271426','127.0811208171267','\0\0\0\0\0\0\0`%^1�_@P{B���B@',39,3542388335,NULL,'2023-02-22 08:52:10',0,'2023-02-08 03:06:24',NULL,NULL,NULL,0,'2개',1),
(122,'벤딩한 스텐 가져가세요',1,11,10,'비정형',20000,'사진처럼 벤딩한 스텐 각파이프 50개 나눔합니다.\n길이는 1m에 10파이입니다. 가지러 오셔야해요~',40,3743831285,NULL,'2023-02-21 07:58:01','','서울 노원구 공릉동 172','37.6330789279387','127.076794742851','\0\0\0\0\0\0\00C4��_@H����B@',40,3743831285,NULL,'2023-02-21 07:58:01',0,'2023-02-21 07:58:01',NULL,NULL,NULL,0,'50개',0),
(123,'mdf 5t 네장 가져가세요',1,1,10,'500*420',2500,'작업하고 남은 합판입니다 와서 가져가세요',41,1995115325,NULL,'2023-02-21 09:50:46','','서울 노원구 공릉동 172','37.6330789279387','127.076794742851','\0\0\0\0\0\0\00C4��_@H����B@',41,1995115325,NULL,'2023-02-21 09:50:46',0,'2023-02-21 09:50:46',NULL,NULL,NULL,0,'4개',0),
(124,'테스트입니다',1,6,123123,'123123',20000,'123123',21,3421918658,NULL,'2023-02-27 06:52:53','','서울 노원구 공릉동 172','37.6295383','127.0816727','\0\0\0\0\0\0\0w�! :�_@+\n���B@',21,3421918658,NULL,'2023-02-28 01:45:53',0,'2023-02-27 06:52:53',31,NULL,NULL,0,'123123개',0),
(125,'123123',1,3,123123,'123123',20000,'123213',21,3421918658,NULL,'2023-02-27 06:54:12','','서울 노원구 공릉동 172','37.6295306','127.0816805','\0\0\0\0\0\0\0$�@:�_@gjmu��B@',21,3421918658,NULL,'2023-02-28 01:45:53',0,'2023-02-27 06:54:12',22,NULL,NULL,0,'213개',0),
(126,'123123',1,3,123123,'2222',750000,'123123',21,3421918658,NULL,'2023-02-27 07:09:32','','서울 노원구 공릉동 172','37.6295071','127.0816919','\0\0\0\0\0\0\0G��p:�_@ƌK���B@',21,3421918658,NULL,'2023-02-28 01:45:53',0,'2023-02-27 07:09:32',21,NULL,NULL,0,'222개',0),
(127,'테라조 포세린타일600*600팔아요',1,5,200000,'600*600*10',300000,'테라조 포세린타일 600*600\n13박스판매합니다.\n현장에서 쓰고 남은 자재이고\n의미없지만,\n원가는 헤베당m2당 26.000원입니다\n\n총18.72m2\n평수로는6.5평정도됩니다.\n\nm2당 12.000원해서\n12,000*18.72=224.640원\n20만원받겠습니다.\n(배송별도이니,참조바랍니다\n 박스당30킬로입니다,무게가있으니,트레이나,화물차가필요하실겁니다.)\n\n적당한 네고용의는 있습니다.\n마구찔러봐주세요!! ㅎ',31,3745434156,NULL,'2023-03-06 05:17:21','','서울 성동구 하왕십리동 286-2','37.569533166927','127.029562937984','\0\0\0\0\0\0\0(��[��_@*�zv��B@',31,3745434156,NULL,'2023-03-06 05:17:21',0,'2023-03-06 05:17:21',NULL,NULL,NULL,0,'13Box',0),
(128,'회색압착시멘트20킬로 팝니다',1,999,50000,'380*550*130',300000,'회색압착 20키로짜리 20포 판매합니다.\n포장지터진거 없습니다.\n현장에서 타일 붙이고,남은겁니다.\n1층까지는 내려드릴수 있고 운송은 직접하셔야합니다.\n\n채팅주세요!!\n',31,3745434156,NULL,'2023-03-06 05:29:39','','서울 성동구 하왕십리동 286-2','37.569533166927','127.029562937984','\0\0\0\0\0\0\0(��[��_@*�zv��B@',31,3745434156,NULL,'2023-03-06 05:29:39',0,'2023-03-06 05:29:39',NULL,NULL,NULL,0,'20포',0),
(129,'mdf15티 600*2420팔아요~~~',1,1,180000,'600*2420*15',300000,'mdf 15미리 온장을 세로로길게 재단한\n600*2420짜리 30장입니다.\n\n장당6000원씩 18만원받겠습니다.\n네고는죄송합니다.\n\n차량댈수 있는 건물입근까지만\n내려놓을수 있으니 유의해주십시요.\nw600짜리는 생각보다 가구나 알판등에\n쓰시기좋을겁니닷!',31,3745434156,NULL,'2023-03-06 05:42:39','','서울 성동구 하왕십리동 286-2','37.569533166927','127.029562937984','\0\0\0\0\0\0\0(��[��_@*�zv��B@',31,3745434156,NULL,'2023-03-06 05:42:39',0,'2023-03-06 05:42:39',NULL,NULL,NULL,0,'30장',0),
(131,'직접제작한 스텐발판 판매해요',1,11,40000,'1200*450*180',20000,'스텐제작 경사로발판 판매합니다.\n철거중,버리기너무 아까운 용품이네요!!\n사이즈체크하시고,높이는 가장높은부분이 약18센티정도 하네요!\n\n고물줍는분이 35,000주신다하는데,\n그것보다  필요하신분들이 잘쓰셨으면 좋겠어요^^\n',51,3745434156,NULL,'2023-03-06 06:01:07','','서울 은평구 신사동 335-18','37.5925464609692','126.913125908447','\0\0\0\0\0\0\0@z��p�_@������B@',51,3745434156,NULL,'2023-03-06 06:01:07',0,'2023-03-06 06:01:07',NULL,NULL,NULL,0,'1개',0),
(132,'석고텍스2박스',1,3,30000,'300×600×9.5',20000,'상태 A급. 박스그대로 2박스(36장)이에요.',30,3076593247,NULL,'2023-03-06 10:43:36','','경기 하남시 미사동 609','37.58188545446','127.195181106252','\0\0\0\0\0\0\00j�_@��˶�B@',30,3076593247,NULL,'2023-03-06 10:43:36',0,'2023-03-06 10:43:36',NULL,NULL,NULL,0,'36장',0),
(133,'펜던트조명캡 판매합니다.',1,8,7000,'120*80',2500,'펜던트조명 화이트 조명캡 팔아요.\n후렌치포함이구요\n수량은7개입니다.',31,1964096058,NULL,'2023-03-07 05:05:00','','서울 동대문구 장안동 94-22','37.5811926051315','127.070215633765','\0\0\0\0\0\0\0��i~�_@���d�B@',31,1964096058,NULL,'2023-03-07 05:05:00',0,'2023-03-07 05:05:00',NULL,NULL,NULL,0,'7개',0),
(134,'4인치 주백색 LED매입등 ',1,8,35000,'125*45',2500,'장수조명 4인치 주백색 LED 매입등 판매합니다.수량20개,일괄로35,000원입니다.박스도 개봉안한 새상품입니다.\n택배비는 별도근요^^',31,1964096058,NULL,'2023-03-07 05:09:23','','서울 동대문구 장안동 94-22','37.5811926051315','127.070215633765','\0\0\0\0\0\0\0��i~�_@���d�B@',31,1964096058,NULL,'2023-03-07 05:09:23',0,'2023-03-07 05:09:23',NULL,NULL,NULL,0,'20개',0),
(135,'타카422J,DT64',1,10,1,'130*40*40',7500,'타카판매해요\n근처분들이 가져가시면 더좋을듯합니다.\n건축현장입니다\n422j 4각\ndu64 1각 나눔해욥.!!',51,1964096058,NULL,'2023-03-07 05:15:20','','경기 양평군 서종면 문호리 166-31','37.6024280133717','127.37529120904','\0\0\0\0\0\0\0fSk��_@�s\\�B@',51,1964096058,NULL,'2023-03-07 05:15:20',0,'2023-03-07 05:15:20',NULL,NULL,NULL,0,'5개',0),
(136,'마이톤 3박스',1,3,60000,'300×600×9.5',20000,'새것 3박스에요.\n1박스 (10장) 입니다.',30,3556432829,NULL,'2023-03-07 07:54:48','','경기 하남시 망월동 834-2','37.5758909759561','127.193974778169','\0\0\0\0\0\0\00j�_@��˶�B@',30,3556432829,NULL,'2023-03-07 07:54:48',0,'2023-03-07 07:54:48',NULL,NULL,NULL,0,'30개',0),
(137,'인조데크 (다크그레이)',1,4,150000,'140*2400*18',65000,'현재 재품상태는 A급 입니다.  전화주시고 오시면 옮겨드립니다. ',52,3556432829,NULL,'2023-03-07 08:20:42','','경기 하남시 덕풍동 831-1','37.5588870905129','127.20410418138','\0\0\0\0\0\0\0A\0�\n�_@j�����B@',52,3556432829,NULL,'2023-03-07 08:20:42',0,'2023-03-07 08:20:42',NULL,NULL,NULL,0,'15개',0),
(138,'그라스울 24k50t',1,3,5000,'450 ×1000×50',20000,'그라울 24k50t  3룰 (1롤=28장)\n상태 A급입니다.',30,3076593247,NULL,'2023-03-09 02:00:07','','경기 양평군 양서면 국수리 2-75','37.5232357','127.4083355','\0\0\0\0\0\0\0C����_@�u�݅�B@',30,3076593247,NULL,'2023-03-09 02:00:07',0,'2023-03-09 02:00:07',NULL,NULL,NULL,0,'84개',0),
(139,'6인치 LED 매입등 판매',1,8,18000,'120*120*60',2500,'6인치led 매입등 주광색 \n12개판매합니다.\n주광색이 우리가 알고있는 하얀색조명입니다.참고하세요\n사진상3개이지만,실제같은제품 12개 있습니다.일괄로 판매원합니다.\n',31,1964096058,NULL,'2023-03-09 08:04:29','','서울 성동구 하왕십리동 286-2','37.569533166927','127.029562937984','\0\0\0\0\0\0\0��i~�_@���d�B@',31,1964096058,NULL,'2023-03-09 08:04:29',0,'2023-03-09 08:04:29',NULL,NULL,NULL,0,'12개',0),
(140,'205목공용본드 판매',1,1,40000,'100*220*40',20000,'현장치고 남은 오공 205 목공용본드 \n판매합니다.\n수량 낱개로37개 입니다.\n1박스에 39,000정도 합니다.\n1박스값으로 거의2박스가져가세요!!',31,1964096058,NULL,'2023-03-09 08:11:36','','서울 성동구 하왕십리동 286-2','37.569533166927','127.029562937984','\0\0\0\0\0\0\0(��[��_@*�zv��B@',31,1964096058,NULL,'2023-03-09 08:11:36',0,'2023-03-09 08:11:36',NULL,NULL,NULL,0,'36개',0),
(141,'동아디자인 월',1,1,10000,'300×600×9.5',7500,'동아디자인월 (ROH3) coze shadow. DB1038-0620\n상태 양호',30,3556432829,NULL,'2023-03-10 08:32:45','','경기 하남시 미사동 609','37.58188545446','127.195181106252','\0\0\0\0\0\0\0�	��}�_@?v�8{�B@',30,3556432829,NULL,'2023-03-10 08:32:45',0,'2023-03-10 08:32:45',NULL,NULL,NULL,0,'15개',0),
(142,'우드스틱 타일 16박스',1,5,480000,'300×600×9',300000,'A급 박스 그대로\n1박스- 6매(1.08m2) 18kg\n총 16박스 (17.28m2) 288kg입니다.\n\n현재 업체가 박스당 50,000원입니다.\n박스당 30,000원에 일괄 판매합니다.\n\n',30,3556432829,NULL,'2023-03-10 08:42:47','','경기 하남시 미사동 609','37.58188545446','127.195181106252','\0\0\0\0\0\0\0�	��}�_@?v�8{�B@',30,3556432829,NULL,'2023-03-10 08:42:47',0,'2023-03-10 08:42:47',NULL,NULL,NULL,0,'96개',0),
(143,'3단서랍레일 12조판매',1,10,24000,'200*35',7500,'3단서랍레일 200mm짜리\n12조(24개)판매합니다.\n200mm다보니,키보드레일이나 얕은서랍에 맞습니다.\n일반책상서랍은400mm깊이이니,\n참조하세요!',31,1964096058,NULL,'2023-03-13 04:44:24','','경기 하남시 망월동 1066-2','37.559915924867','127.185547174118','\0\0\0\0\0\0\0�,A��_@�4S��B@',31,1964096058,NULL,'2023-03-13 04:44:24',0,'2023-03-13 04:44:24',NULL,NULL,NULL,0,'12조',0),
(144,'납판0.8t판매',1,999,57000,'900*1800*0.8t',65000,'방사능차폐용으로 사용하는 납판입니다.\n엑스레이실 공사하고 남은자재입니다.\n두께 0.8t이니 참조하십시요!\n상기납판 1장값이 거의6만원합니다.\n한번도사용하지않은 새상품이나,납판특성상 잘구부러져 그런겁니다',31,1964096058,NULL,'2023-03-13 04:49:55','','서울 종로구 평동 233','37.5688537151032','126.965114852628','\0\0\0\0\0\0\0�:qĽ_@�I�2��B@',31,1964096058,NULL,'2023-03-13 04:49:55',0,'2023-03-13 04:49:55',NULL,NULL,NULL,0,'2개',0);
/*!40000 ALTER TABLE `tt_product` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50032 DROP TRIGGER IF EXISTS LOGGING_TRADE */;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tttruck`@`%`*/ /*!50003 TRIGGER LOGGING_TRADE AFTER UPDATE ON tt_product FOR EACH ROW
BEGIN
    IF NEW.TRADE_STATUS <> OLD.TRADE_STATUS AND NEW.TRADE_STATUS=9 AND NEW.BUYER_USER_ID IS NOT NULL THEN
        INSERT INTO tt_trade_log SET PRODUCT_ID=NEW.PRODUCT_ID,
            SELLER_USER_ID=NEW.SELLER_USER_ID,
            BUYER_USER_ID = NEW.BUYER_USER_ID,
            PRODUCT_PRICE=NEW.PRODUCT_PRICE,
            PRODUCT_SIZE=NEW.PRODUCT_SIZE,
            PRODUCT_WEIGHT=NEW.PRODUCT_WEIGHT,
            QUANTITY=NEW.QUANTITY;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tt_product_category`
--

DROP TABLE IF EXISTS `tt_product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_product_category` (
  `PRODUCT_CATEGORY_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '상품 카테고리 ID',
  `PARENT_CATEGORY_ID` bigint(20) unsigned NOT NULL,
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
  KEY `tt_product_category_tt_product_category_PRODUCT_CATEGORY_ID_fk` (`PARENT_CATEGORY_ID`),
  CONSTRAINT `FK_tt_product_category_CREATE_USER_ID_tt_user_USER_ID` FOREIGN KEY (`CREATE_USER_ID`) REFERENCES `tt_user` (`USER_ID`),
  CONSTRAINT `FK_tt_product_category_UPDATE_USER_ID_tt_user_USER_ID` FOREIGN KEY (`UPDATE_USER_ID`) REFERENCES `tt_user` (`USER_ID`),
  CONSTRAINT `tt_product_category_tt_product_category_PRODUCT_CATEGORY_ID_fk` FOREIGN KEY (`PARENT_CATEGORY_ID`) REFERENCES `tt_product_category` (`PRODUCT_CATEGORY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='상품 카테고리';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_product_category`
--

LOCK TABLES `tt_product_category` WRITE;
/*!40000 ALTER TABLE `tt_product_category` DISABLE KEYS */;
INSERT INTO `tt_product_category` VALUES
(0,0,'전체',0,0,1,NULL,NULL,'2023-03-13 03:42:20',1,NULL,NULL,'2023-03-13 03:42:12'),
(1,0,'목자재/도어',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),
(2,0,'석고보드',0,1,1,NULL,NULL,'2022-12-23 10:36:36',1,NULL,NULL,'2022-12-22 08:58:48'),
(3,0,'경량자재/천장재',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),
(4,0,'바닥재/마루/PVC',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),
(5,0,'타일/석재',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),
(6,0,'벽지/필름',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),
(7,0,'페인트',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),
(8,0,'조명',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),
(9,0,'전기자재',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),
(10,0,'철물',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),
(11,0,'금속자재',0,1,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48'),
(999,0,'기타',0,0,1,NULL,NULL,'2022-12-29 08:40:00',1,NULL,NULL,'2022-12-22 08:58:48');
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
) ENGINE=InnoDB AUTO_INCREMENT=366 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='상품 이미지';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_product_image`
--

LOCK TABLES `tt_product_image` WRITE;
/*!40000 ALTER TABLE `tt_product_image` DISABLE KEYS */;
INSERT INTO `tt_product_image` VALUES
(283,120,'product/image/1673066828204_áá³áá³ááµá«áá£áº 2023-01-07 áá©áá® 1.43.09 3.png',NULL,743877,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1673066828204_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-01-07%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%201.43.09%203.png',NULL,NULL,NULL,'2023-01-07 04:47:09',2),
(284,120,'product/image/1673066828212_áá³áá³ááµá«áá£áº 2023-01-07 áá©áá® 1.43.09 2.png',NULL,743877,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1673066828212_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-01-07%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%201.43.09%202.png',NULL,NULL,NULL,'2023-01-07 04:47:09',1),
(285,120,'product/image/1673066828224_áá³áá³ááµá«áá£áº 2023-01-07 áá©áá® 1.43.09 4.png',NULL,743877,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1673066828224_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-01-07%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%201.43.09%204.png',NULL,NULL,NULL,'2023-01-07 04:47:09',3),
(286,120,'product/image/1673066828205_áá³áá³ááµá«áá£áº 2023-01-07 áá©áá® 1.43.09.png',NULL,743877,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1673066828205_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-01-07%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%201.43.09.png',NULL,NULL,NULL,'2023-01-07 04:47:08',0),
(287,121,'product/image/1675825584165_image.jpg',NULL,2412781,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1675825584165_image.jpg',NULL,NULL,NULL,'2023-02-08 03:06:25',0),
(288,121,'product/image/1675825584260_image.jpg',NULL,2664758,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1675825584260_image.jpg',NULL,NULL,NULL,'2023-02-08 03:06:25',1),
(289,121,'product/image/1675825584292_image.jpg',NULL,2070360,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1675825584292_image.jpg',NULL,NULL,NULL,'2023-02-08 03:06:25',2),
(290,122,'product/image/1676966281970_E9599795-7641-4282-9A31-AD84A1E68C67.jpeg',NULL,2846329,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1676966281970_E9599795-7641-4282-9A31-AD84A1E68C67.jpeg',NULL,NULL,NULL,'2023-02-21 07:58:05',0),
(291,122,'product/image/1676966282105_DC2DBE05-01B4-463F-A7F1-C4CB822A0395.jpeg',NULL,3213416,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1676966282105_DC2DBE05-01B4-463F-A7F1-C4CB822A0395.jpeg',NULL,NULL,NULL,'2023-02-21 07:58:05',0),
(292,122,'product/image/1676966282087_27E68F1F-17A1-469D-913E-EDE8D32E2E63.jpeg',NULL,4767728,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1676966282087_27E68F1F-17A1-469D-913E-EDE8D32E2E63.jpeg',NULL,NULL,NULL,'2023-02-21 07:58:05',0),
(293,123,'product/image/1676973046527_9BB34783-7020-4FF5-9D94-383FCB53E041.jpeg',NULL,3143252,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1676973046527_9BB34783-7020-4FF5-9D94-383FCB53E041.jpeg',NULL,NULL,NULL,'2023-02-21 09:50:48',0),
(294,123,'product/image/1676973046614_F7B67F01-E990-41CC-91BA-032DDA033A51.jpeg',NULL,3710035,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1676973046614_F7B67F01-E990-41CC-91BA-032DDA033A51.jpeg',NULL,NULL,NULL,'2023-02-21 09:50:50',1),
(295,123,'product/image/1676973046592_9F02E6F1-330C-4713-8623-AD4C6555B647.jpeg',NULL,3512685,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1676973046592_9F02E6F1-330C-4713-8623-AD4C6555B647.jpeg',NULL,NULL,NULL,'2023-02-21 09:50:50',2),
(296,124,'product/image/1677480773237_áá³áá³ááµá«áá£áº 2023-02-21 áá©áá® 5.17.28.png',NULL,178770,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1677480773237_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-02-21%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%205.17.28.png',NULL,NULL,NULL,'2023-02-27 06:52:54',1),
(297,124,'product/image/1677480773225_áá³áá³ááµá«áá£áº 2023-02-21 áá©áá® 5.16.49.png',NULL,163968,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1677480773225_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-02-21%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%205.16.49.png',NULL,NULL,NULL,'2023-02-27 06:52:53',0),
(298,124,'product/image/1677480773249_áá³áá³ááµá«áá£áº 2023-02-21 áá©áá® 5.18.02.png',NULL,3361066,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1677480773249_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-02-21%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%205.18.02.png',NULL,NULL,NULL,'2023-02-27 06:52:54',2),
(299,125,'product/image/1677480852629_áá³áá³ááµá«áá£áº 2023-02-21 áá©áá® 5.16.49.png',NULL,163968,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1677480852629_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-02-21%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%205.16.49.png',NULL,NULL,NULL,'2023-02-27 06:54:12',0),
(300,125,'product/image/1677480852652_áá³áá³ááµá«áá£áº 2023-02-21 áá©áá® 5.17.28.png',NULL,178770,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1677480852652_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-02-21%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%205.17.28.png',NULL,NULL,NULL,'2023-02-27 06:54:13',1),
(301,125,'product/image/1677480852646_áá³áá³ááµá«áá£áº 2023-02-21 áá©áá® 5.18.02.png',NULL,3361066,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1677480852646_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-02-21%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%205.18.02.png',NULL,NULL,NULL,'2023-02-27 06:54:13',2),
(302,126,'product/image/1677481772838_áá³áá³ááµá«áá£áº 2023-02-21 áá©áá® 5.17.28.png',NULL,178770,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1677481772838_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-02-21%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%205.17.28.png',NULL,NULL,NULL,'2023-02-27 07:09:34',1),
(303,126,'product/image/1677481772786_áá³áá³ááµá«áá£áº 2023-02-21 áá©áá® 5.16.49.png',NULL,163968,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1677481772786_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-02-21%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%205.16.49.png',NULL,NULL,NULL,'2023-02-27 07:09:33',0),
(304,126,'product/image/1677481772873_áá³áá³ááµá«áá£áº 2023-02-21 áá©áá® 5.18.02.png',NULL,3361066,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1677481772873_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-02-21%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%205.18.02.png',NULL,NULL,NULL,'2023-02-27 07:09:34',2),
(305,127,'product/image/1678079841551_2CF8CAC9-F93B-42B3-8E51-D53A999DD14B.jpeg',NULL,3458643,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678079841551_2CF8CAC9-F93B-42B3-8E51-D53A999DD14B.jpeg',NULL,NULL,NULL,'2023-03-06 05:17:26',0),
(306,127,'product/image/1678079841536_E3B3CCC8-0883-407E-A6AB-FAA04898ACB2.jpeg',NULL,4577721,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678079841536_E3B3CCC8-0883-407E-A6AB-FAA04898ACB2.jpeg',NULL,NULL,NULL,'2023-03-06 05:17:27',0),
(307,127,'product/image/1678079841477_C9B0862C-4138-4F29-B2C1-FCF98601A4DA.jpeg',NULL,4757545,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678079841477_C9B0862C-4138-4F29-B2C1-FCF98601A4DA.jpeg',NULL,NULL,NULL,'2023-03-06 05:17:27',0),
(308,128,'product/image/1678080580079_C3D55D70-6E69-45C6-A783-FD1D6C5F99B7.jpeg',NULL,89129,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678080580079_C3D55D70-6E69-45C6-A783-FD1D6C5F99B7.jpeg',NULL,NULL,NULL,'2023-03-06 05:29:40',0),
(309,128,'product/image/1678080580001_A80B6C0D-35B5-4308-AFE3-85D9C55ADD41.jpeg',NULL,3361145,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678080580001_A80B6C0D-35B5-4308-AFE3-85D9C55ADD41.jpeg',NULL,NULL,NULL,'2023-03-06 05:29:44',0),
(310,128,'product/image/1678080580074_297899DF-1F4E-46CC-B36B-39156B6A6266.png',NULL,0,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product%2Fimage%2F1678080580074_297899DF-1F4E-46CC-B36B-39156B6A6266.png',NULL,NULL,NULL,'2023-03-06 05:29:47',0),
(311,129,'product/image/1678081359761_C03321B2-5916-4527-9CC3-DA2EF079A9FA.jpeg',NULL,3309712,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678081359761_C03321B2-5916-4527-9CC3-DA2EF079A9FA.jpeg',NULL,NULL,NULL,'2023-03-06 05:42:44',0),
(312,129,'product/image/1678081359840_3B05D729-4ACF-477B-912B-DF461B1D8B8E.jpeg',NULL,4004247,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678081359840_3B05D729-4ACF-477B-912B-DF461B1D8B8E.jpeg',NULL,NULL,NULL,'2023-03-06 05:42:59',1),
(313,129,'product/image/1678081359893_1A7989A1-7250-46B0-AF67-8FFF8091BDD0.png',NULL,2446762,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678081359893_1A7989A1-7250-46B0-AF67-8FFF8091BDD0.png',NULL,NULL,NULL,'2023-03-06 05:42:59',2),
(317,131,'product/image/1678082468130_C4571BD7-9031-4E34-890F-18F5BC330E76.png',NULL,3276957,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678082468130_C4571BD7-9031-4E34-890F-18F5BC330E76.png',NULL,NULL,NULL,'2023-03-06 06:01:18',2),
(318,131,'product/image/1678082468044_3709D8CB-7532-41D8-A628-7ABE8ED91050.png',NULL,0,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product%2Fimage%2F1678082468044_3709D8CB-7532-41D8-A628-7ABE8ED91050.png',NULL,NULL,NULL,'2023-03-06 06:01:17',0),
(319,131,'product/image/1678082468121_9111D5B2-672C-4A62-BC76-FF1F6907E043.png',NULL,0,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product%2Fimage%2F1678082468121_9111D5B2-672C-4A62-BC76-FF1F6907E043.png',NULL,NULL,NULL,'2023-03-06 06:01:18',1),
(320,132,'product/image/1678099549152_20230306_181539.jpg',NULL,2764469,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678099549152_20230306_181539.jpg',NULL,NULL,NULL,'2023-03-06 10:46:25',3),
(321,132,'product/image/1678099549134_20230306_181509.jpg',NULL,3502776,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678099549134_20230306_181509.jpg',NULL,NULL,NULL,'2023-03-06 10:45:51',0),
(322,132,'product/image/1678099549150_20230306_181519.jpg',NULL,3754331,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678099549150_20230306_181519.jpg',NULL,NULL,NULL,'2023-03-06 10:46:25',2),
(323,132,'product/image/1678099549247_20230306_181528.jpg',NULL,3811355,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678099549247_20230306_181528.jpg',NULL,NULL,NULL,'2023-03-06 10:46:25',1),
(324,133,'product/image/1678165500339_74BB9B64-3AC6-45DB-93A4-DCAD0060E063.jpeg',NULL,2150193,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678165500339_74BB9B64-3AC6-45DB-93A4-DCAD0060E063.jpeg',NULL,NULL,NULL,'2023-03-07 05:05:01',0),
(325,133,'product/image/1678165500402_4D186A14-E20B-4D80-81E6-B99E899C7B10.jpeg',NULL,2588403,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678165500402_4D186A14-E20B-4D80-81E6-B99E899C7B10.jpeg',NULL,NULL,NULL,'2023-03-07 05:05:02',1),
(326,133,'product/image/1678165500425_653D2ED2-8208-4ADE-96B9-BDA7451A4CEC.jpeg',NULL,2570033,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678165500425_653D2ED2-8208-4ADE-96B9-BDA7451A4CEC.jpeg',NULL,NULL,NULL,'2023-03-07 05:05:02',2),
(327,134,'product/image/1678165764018_A9EFB6B0-9164-49F2-B2D9-AEC1E3335888.jpeg',NULL,2402194,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678165764018_A9EFB6B0-9164-49F2-B2D9-AEC1E3335888.jpeg',NULL,NULL,NULL,'2023-03-07 05:09:24',0),
(328,134,'product/image/1678165764110_2263B22D-E13E-4A0C-8510-4B49AEB2DF81.jpeg',NULL,4726929,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678165764110_2263B22D-E13E-4A0C-8510-4B49AEB2DF81.jpeg',NULL,NULL,NULL,'2023-03-07 05:09:25',1),
(329,134,'product/image/1678165764081_651A9612-4A2F-4064-AA60-9C5056982375.jpeg',NULL,3399241,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678165764081_651A9612-4A2F-4064-AA60-9C5056982375.jpeg',NULL,NULL,NULL,'2023-03-07 05:09:25',2),
(330,135,'product/image/1678166120449_A8D5DF85-D356-48EF-A700-441A18FFB291.jpeg',NULL,3539038,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678166120449_A8D5DF85-D356-48EF-A700-441A18FFB291.jpeg',NULL,NULL,NULL,'2023-03-07 05:15:22',0),
(331,135,'product/image/1678166120495_4FD34935-BD10-41AE-B5D8-2907B5B27772.png',NULL,2704391,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678166120495_4FD34935-BD10-41AE-B5D8-2907B5B27772.png',NULL,NULL,NULL,'2023-03-07 05:15:22',0),
(332,135,'product/image/1678166120506_25B035DE-457B-4801-9628-2C1CC07EFC51.jpeg',NULL,3214017,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678166120506_25B035DE-457B-4801-9628-2C1CC07EFC51.jpeg',NULL,NULL,NULL,'2023-03-07 05:15:22',0),
(333,136,'product/image/1678175688617_20230307_162848.jpg',NULL,3171602,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678175688617_20230307_162848.jpg',NULL,NULL,NULL,'2023-03-07 07:54:50',0),
(334,136,'product/image/1678175688613_20230307_162906.jpg',NULL,3181052,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678175688613_20230307_162906.jpg',NULL,NULL,NULL,'2023-03-07 07:54:50',2),
(335,136,'product/image/1678175688599_20230307_162913.jpg',NULL,3123736,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678175688599_20230307_162913.jpg',NULL,NULL,NULL,'2023-03-07 07:54:50',1),
(336,137,'product/image/1678177242514_KakaoTalk_20230307_164328287.jpg',NULL,537587,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678177242514_KakaoTalk_20230307_164328287.jpg',NULL,NULL,NULL,'2023-03-07 08:20:42',0),
(337,137,'product/image/1678177242547_KakaoTalk_20230307_164328287_01.jpg',NULL,340593,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678177242547_KakaoTalk_20230307_164328287_01.jpg',NULL,NULL,NULL,'2023-03-07 08:20:44',3),
(338,137,'product/image/1678177242532_KakaoTalk_20230307_164328287_03.jpg',NULL,575000,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678177242532_KakaoTalk_20230307_164328287_03.jpg',NULL,NULL,NULL,'2023-03-07 08:20:44',2),
(339,137,'product/image/1678177242523_KakaoTalk_20230307_164328287_02.jpg',NULL,563226,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678177242523_KakaoTalk_20230307_164328287_02.jpg',NULL,NULL,NULL,'2023-03-07 08:20:44',1),
(340,138,'product/image/1678327207227_20230307_162419.jpg',NULL,3173811,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678327207227_20230307_162419.jpg',NULL,NULL,NULL,'2023-03-09 02:02:22',2),
(341,138,'product/image/1678327207232_20230307_162321.jpg',NULL,3204373,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678327207232_20230307_162321.jpg',NULL,NULL,NULL,'2023-03-09 02:02:22',1),
(342,138,'product/image/1678327208720_20230307_162341.jpg',NULL,4004453,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678327208720_20230307_162341.jpg',NULL,NULL,NULL,'2023-03-09 02:01:02',0),
(343,139,'product/image/1678349069265_87041D2E-7BD1-4C73-9E77-3E68D8BDEBA2.jpeg',NULL,2678648,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678349069265_87041D2E-7BD1-4C73-9E77-3E68D8BDEBA2.jpeg',NULL,NULL,NULL,'2023-03-09 08:05:50',3),
(344,139,'product/image/1678349069323_5076CCB8-F865-42C7-956B-F639BDFB2766.jpeg',NULL,2554212,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678349069323_5076CCB8-F865-42C7-956B-F639BDFB2766.jpeg',NULL,NULL,NULL,'2023-03-09 08:05:50',2),
(345,139,'product/image/1678349069317_0CFE7819-3CA8-43A6-B945-B3F5C9881F73.jpeg',NULL,2993887,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678349069317_0CFE7819-3CA8-43A6-B945-B3F5C9881F73.jpeg',NULL,NULL,NULL,'2023-03-09 08:05:50',1),
(346,139,'product/image/1678349069321_85BDE65C-0083-4C92-9354-F459D9D919BC.jpeg',NULL,3164706,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678349069321_85BDE65C-0083-4C92-9354-F459D9D919BC.jpeg',NULL,NULL,NULL,'2023-03-09 08:04:33',0),
(348,140,'product/image/1678349496518_98DB6432-28D2-4C43-B951-AF4CE099E115.jpeg',NULL,2767609,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678349496518_98DB6432-28D2-4C43-B951-AF4CE099E115.jpeg',NULL,NULL,NULL,'2023-03-09 08:12:25',0),
(349,140,'product/image/1678349496524_F54880CC-A227-431C-81EB-E11819746E6E.jpeg',NULL,2789918,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678349496524_F54880CC-A227-431C-81EB-E11819746E6E.jpeg',NULL,NULL,NULL,'2023-03-09 08:12:25',1),
(350,140,'product/image/1678349544324_6052EE39-714F-4C41-ACC0-E0FDEF028D10.jpeg',NULL,3039093,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678349544324_6052EE39-714F-4C41-ACC0-E0FDEF028D10.jpeg',NULL,NULL,NULL,'2023-03-09 08:12:25',2),
(351,141,'product/image/1678437165897_20230306_181644.jpg',NULL,3280630,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678437165897_20230306_181644.jpg',NULL,NULL,NULL,'2023-03-10 08:32:49',2),
(352,141,'product/image/1678437165879_20230306_181649.jpg',NULL,3545991,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678437165879_20230306_181649.jpg',NULL,NULL,NULL,'2023-03-10 08:32:49',1),
(353,141,'product/image/1678437165900_20230306_181657.jpg',NULL,4442352,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678437165900_20230306_181657.jpg',NULL,NULL,NULL,'2023-03-10 08:32:49',3),
(354,141,'product/image/1678437165968_20230306_181708.jpg',NULL,2869634,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678437165968_20230306_181708.jpg',NULL,NULL,NULL,'2023-03-10 08:32:47',0),
(355,142,'product/image/1678437767540_20230307_160812.jpg',NULL,3131536,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678437767540_20230307_160812.jpg',NULL,NULL,NULL,'2023-03-10 08:47:45',1),
(356,142,'product/image/1678437767555_20230307_160825.jpg',NULL,2780931,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678437767555_20230307_160825.jpg',NULL,NULL,NULL,'2023-03-10 08:47:45',3),
(357,142,'product/image/1678437767557_20230307_160852.jpg',NULL,2943909,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678437767557_20230307_160852.jpg',NULL,NULL,NULL,'2023-03-10 08:42:49',0),
(358,142,'product/image/1678437767521_20230307_160836.jpg',NULL,4627183,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678437767521_20230307_160836.jpg',NULL,NULL,NULL,'2023-03-10 08:47:45',2),
(359,143,'product/image/1678682664070_3DF517B6-3BFF-46AF-9E3D-9EE800E14301.jpeg',NULL,2663444,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678682664070_3DF517B6-3BFF-46AF-9E3D-9EE800E14301.jpeg',NULL,NULL,NULL,'2023-03-13 04:44:24',0),
(360,143,'product/image/1678682664137_F55494C1-BE25-4602-AACD-F2DC436073C6.jpeg',NULL,4286105,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678682664137_F55494C1-BE25-4602-AACD-F2DC436073C6.jpeg',NULL,NULL,NULL,'2023-03-13 04:44:26',0),
(361,143,'product/image/1678682664156_4D008B7A-28DF-474C-ABF6-931795E1FF25.jpeg',NULL,3616944,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678682664156_4D008B7A-28DF-474C-ABF6-931795E1FF25.jpeg',NULL,NULL,NULL,'2023-03-13 04:44:26',0),
(362,143,'product/image/1678682664132_AF496B59-7B3D-4C83-97F7-079B695B91CA.jpeg',NULL,4672701,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678682664132_AF496B59-7B3D-4C83-97F7-079B695B91CA.jpeg',NULL,NULL,NULL,'2023-03-13 04:44:26',0),
(363,144,'product/image/1678682995171_BE8BC18E-CD9E-4CB7-84FD-29969D3E62FD.jpeg',NULL,2535610,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678682995171_BE8BC18E-CD9E-4CB7-84FD-29969D3E62FD.jpeg',NULL,NULL,NULL,'2023-03-13 04:49:56',0),
(364,144,'product/image/1678682995222_929C8EED-F096-4F77-A747-246FA1C37AFC.jpeg',NULL,2746451,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678682995222_929C8EED-F096-4F77-A747-246FA1C37AFC.jpeg',NULL,NULL,NULL,'2023-03-13 04:49:56',1),
(365,144,'product/image/1678682995206_50ADC0E6-4A9C-446E-8168-C058139ABB3E.jpeg',NULL,2782241,NULL,'https://tttruck-1.s3.ap-northeast-2.amazonaws.com/product/image/1678682995206_50ADC0E6-4A9C-446E-8168-C058139ABB3E.jpeg',NULL,NULL,NULL,'2023-03-13 04:49:56',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_talkplus_channel`
--

LOCK TABLES `tt_talkplus_channel` WRITE;
/*!40000 ALTER TABLE `tt_talkplus_channel` DISABLE KEYS */;
INSERT INTO `tt_talkplus_channel` VALUES
(61,'63b9677c4a725e0001002ae2',120,'(샘플) 미송집성목 각재 팝니다','tttruck26','private','https://cdn.tttruck.co.kr/product/image/1673066828205_áá³áá³ááµá«áá£áº 2023-01-07 áá©áá® 1.43.09.png',2,0,'tttruck28','2023-01-07 12:37:16'),
(62,'63e5f9833ef2370001070c1a',120,'미송집성목 각재 팝니다','tttruck21','private','https://cdn.tttruck.co.kr/product/image/1673066828205_áá³áá³ááµá«áá£áº 2023-01-07 áá©áá® 1.43.09.png',2,0,'tttruck28','2023-02-10 08:00:03'),
(63,'63f5d3d3c7bbfb000102990d',120,'미송집성목 각재 팝니다','tttruck31','private','https://cdn.tttruck.co.kr/product/image/1673066828205_áá³áá³ááµá«áá£áº 2023-01-07 áá©áá® 1.43.09.png',2,0,'tttruck28','2023-02-22 08:35:31'),
(64,'63f5d74a14e7340001034a50',120,'미송집성목 각재 팝니다','tttruck30','private','https://cdn.tttruck.co.kr/product/image/1673066828205_áá³áá³ááµá«áá£áº 2023-01-07 áá©áá® 1.43.09.png',2,0,'tttruck28','2023-02-22 08:50:18'),
(65,'63f5d7ba14e7340001034b0a',121,'땡순이','tttruck30','private','https://cdn.tttruck.co.kr/product/image/1675825584165_image.jpg',2,0,'tttruck39','2023-02-22 08:52:10'),
(66,'6409d3a2edf8540001002972',120,'미송집성목 각재 팝니다','tttruck42','private','https://cdn.tttruck.co.kr/product/image/1673066828205_áá³áá³ááµá«áá£áº 2023-01-07 áá©áá® 1.43.09.png',2,0,'tttruck28','2023-03-09 12:40:02');
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
/*!50032 DROP TRIGGER IF EXISTS tt_talkplus_channel */;
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
-- Table structure for table `tt_talkplus_file`
--

DROP TABLE IF EXISTS `tt_talkplus_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_talkplus_file` (
  `TALKPLUS_FILE_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `MESSAGE_ID` bigint(20) unsigned NOT NULL,
  `USER_ID` bigint(20) unsigned DEFAULT NULL,
  `FILE_NAME` varchar(800) NOT NULL,
  `FILE_PATH` varchar(800) DEFAULT NULL,
  `FILE_SIZE` int(20) DEFAULT NULL,
  `FILE_URL` varchar(500) DEFAULT NULL,
  `FILE_TYPE` varchar(100) DEFAULT NULL,
  `TIME` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`TALKPLUS_FILE_ID`),
  KEY `tt_talkplus_file_tt_talkplus_message_null_fk` (`MESSAGE_ID`),
  KEY `tt_talkplus_file_tt_user_USER_ID_fk` (`USER_ID`),
  CONSTRAINT `tt_talkplus_file_tt_talkplus_message_null_fk` FOREIGN KEY (`MESSAGE_ID`) REFERENCES `tt_talkplus_message` (`MESSAGE_ID`),
  CONSTRAINT `tt_talkplus_file_tt_user_USER_ID_fk` FOREIGN KEY (`USER_ID`) REFERENCES `tt_user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_talkplus_file`
--

LOCK TABLES `tt_talkplus_file` WRITE;
/*!40000 ALTER TABLE `tt_talkplus_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_talkplus_file` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
/*!50032 DROP TRIGGER IF EXISTS tt_talkplus_message */;
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
-- Table structure for table `tt_trade_log`
--

DROP TABLE IF EXISTS `tt_trade_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_trade_log` (
  `TRADE_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `PRODUCT_ID` bigint(20) unsigned DEFAULT NULL,
  `SELLER_USER_ID` bigint(20) unsigned NOT NULL,
  `BUYER_USER_ID` bigint(20) unsigned NOT NULL,
  `PRODUCT_PRICE` bigint(30) unsigned DEFAULT NULL,
  `PRODUCT_WEIGHT` int(10) unsigned NOT NULL,
  `PRODUCT_SIZE` varchar(100) DEFAULT NULL,
  `QUANTITY` varchar(30) DEFAULT NULL,
  `TRADE_TIME` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`TRADE_ID`),
  KEY `tt_trade_log_tt_product_id_fk` (`PRODUCT_ID`),
  KEY `tt_trade_log_tt_user_buyer_user_fk` (`BUYER_USER_ID`),
  KEY `tt_trade_log_tt_user_seller_user_fk` (`SELLER_USER_ID`),
  CONSTRAINT `tt_trade_log_tt_product_id_fk` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `tt_product` (`PRODUCT_ID`),
  CONSTRAINT `tt_trade_log_tt_user_buyer_user_fk` FOREIGN KEY (`BUYER_USER_ID`) REFERENCES `tt_user` (`USER_ID`),
  CONSTRAINT `tt_trade_log_tt_user_seller_user_fk` FOREIGN KEY (`SELLER_USER_ID`) REFERENCES `tt_user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_trade_log`
--

LOCK TABLES `tt_trade_log` WRITE;
/*!40000 ALTER TABLE `tt_trade_log` DISABLE KEYS */;
INSERT INTO `tt_trade_log` VALUES
(5,120,28,31,200000,2500,'75*75*600','15개','2023-02-28 01:49:19');
/*!40000 ALTER TABLE `tt_trade_log` ENABLE KEYS */;
UNLOCK TABLES;

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
/*!40000 ALTER TABLE `tt_trade_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_trucker_center`
--

DROP TABLE IF EXISTS `tt_trucker_center`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_trucker_center` (
  `TRUCKER_CENTER_MASTER_ID` bigint(20) unsigned NOT NULL COMMENT '트러커 센터 카테고리 ID. 소식 카테고리 ID',
  `TRUCKER_CENTER_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '트러커센터 ID. 메인공지 ID',
  `SUBJECT` varchar(100) DEFAULT NULL COMMENT '제목. 제목',
  `HTML_TF` tinyint(1) DEFAULT 0 COMMENT 'HTML 여부. HTML 여부',
  `CONTENTS` text DEFAULT NULL COMMENT '내용. 내용',
  `DISPLAY_TF` tinyint(1) DEFAULT 1 COMMENT '노출 여부. 노출 여부',
  `DISPLAY_START_TIME` timestamp NULL DEFAULT current_timestamp() COMMENT '게시 시작일. 게시 시작일',
  `DISPLAY_END_TIME` timestamp NULL DEFAULT current_timestamp() COMMENT '게시 종료일. 게시 종료일',
  `POST_USER_ID` bigint(20) unsigned DEFAULT NULL COMMENT '생성자 아이디. 생성자 아이디',
  `POST_TIME` timestamp NULL DEFAULT current_timestamp() COMMENT '작성일. 작성일',
  `POST_IPv4` int(10) unsigned DEFAULT NULL COMMENT '작성자 IPv4. 작성자 IPv4',
  `POST_IPv6` binary(16) DEFAULT NULL COMMENT '작성자 IPv6. 작성자 IPv6',
  `UPDATE_USER_ID` bigint(20) unsigned DEFAULT NULL COMMENT '수정자 아이디. 수정자 아이디',
  `UPDATE_TIME` timestamp NULL DEFAULT current_timestamp() COMMENT '수정일. 수정일',
  `UPDATE_IPv4` int(10) unsigned DEFAULT NULL COMMENT '수정자 IPv4. 수정자 IPv4',
  `UPDATE_IPv6` binary(16) DEFAULT NULL COMMENT '수정자 IPv6. 수정자 IPv6',
  `CONTENT_ID` bigint(20) unsigned DEFAULT NULL COMMENT '컨텐츠 ID. 컨텐츠 ID',
  `TOP_FIX_TF` tinyint(1) NOT NULL DEFAULT 0 COMMENT '상단 고정 여부. 상단 고정 여부',
  PRIMARY KEY (`TRUCKER_CENTER_ID`),
  KEY `FK_tt_trucker_center_POST_USER_ID_tt_user_USER_ID` (`POST_USER_ID`),
  KEY `FK_tt_trucker_center_UPDATE_USER_ID_tt_user_USER_ID` (`UPDATE_USER_ID`),
  KEY `tt_trucker_center_tt_trucker_center_master_fk` (`TRUCKER_CENTER_MASTER_ID`),
  CONSTRAINT `FK_tt_trucker_center_POST_USER_ID_tt_user_USER_ID` FOREIGN KEY (`POST_USER_ID`) REFERENCES `tt_user` (`USER_ID`),
  CONSTRAINT `FK_tt_trucker_center_TRUCKER_CENTER_MASTER_ID_tt_trucker_center_` FOREIGN KEY (`TRUCKER_CENTER_MASTER_ID`) REFERENCES `tt_trucker_center_master` (`TRUCKER_CENTER_MASTER_ID`),
  CONSTRAINT `FK_tt_trucker_center_UPDATE_USER_ID_tt_user_USER_ID` FOREIGN KEY (`UPDATE_USER_ID`) REFERENCES `tt_user` (`USER_ID`),
  CONSTRAINT `tt_trucker_center_tt_trucker_center_master_fk` FOREIGN KEY (`TRUCKER_CENTER_MASTER_ID`) REFERENCES `tt_trucker_center_master` (`TRUCKER_CENTER_MASTER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='트러커 센터. 메인 소식';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_trucker_center`
--

LOCK TABLES `tt_trucker_center` WRITE;
/*!40000 ALTER TABLE `tt_trucker_center` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_trucker_center` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_trucker_center_image`
--

DROP TABLE IF EXISTS `tt_trucker_center_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_trucker_center_image` (
  `TRUCKER_CENTER_IMAGE_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '트러커센터 이미지 ID. 상품 이미지 ID',
  `TRUCKER_CENTER_ID` bigint(20) unsigned NOT NULL COMMENT '트러커센터 ID. 상품 ID',
  `FILE_NAME` varchar(800) DEFAULT NULL COMMENT '첨부파일명. 첨부파일명',
  `FILE_PATH` varchar(800) DEFAULT NULL COMMENT '첨부파일 경로. 첨부파일 경로',
  `FILE_SIZE` int(20) DEFAULT NULL COMMENT '첨부파일 크기. 첨부파일 크기',
  `ORG_FILE_SEQ` int(10) DEFAULT NULL COMMENT '기존 파일 시퀀스. 기존 파일 시퀀스',
  `FILE_URL` varchar(500) DEFAULT NULL COMMENT '다운로드 URL. 다운로드 URL',
  `THUMB_PATH` varchar(800) DEFAULT NULL COMMENT '썸네일 경로. 썸네일 경로',
  `FILE_ID` bigint(20) unsigned DEFAULT NULL COMMENT '파일 ID. 파일 ID',
  `CONTENT_ID` bigint(20) unsigned DEFAULT NULL COMMENT '컨텐츠 ID. 컨텐츠 ID',
  `TIME` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`TRUCKER_CENTER_IMAGE_ID`),
  KEY `FK_tt_trucker_center_image_TRUCKER_CENTER_ID_tt_trucker_center_T` (`TRUCKER_CENTER_ID`),
  CONSTRAINT `FK_tt_trucker_center_image_TRUCKER_CENTER_ID_tt_trucker_center_T` FOREIGN KEY (`TRUCKER_CENTER_ID`) REFERENCES `tt_trucker_center` (`TRUCKER_CENTER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='트러커 센터 이미지. 소식 이미지';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_trucker_center_image`
--

LOCK TABLES `tt_trucker_center_image` WRITE;
/*!40000 ALTER TABLE `tt_trucker_center_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_trucker_center_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tt_trucker_center_master`
--

DROP TABLE IF EXISTS `tt_trucker_center_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_trucker_center_master` (
  `TRUCKER_CENTER_MASTER_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '트러커센터 카테고리 ID. 소식 카테고리 ID',
  `TITLE` varchar(200) DEFAULT NULL COMMENT '트러커센터 카테고리 이름. 소식 카테고리 이름',
  `COMMENT_TF` tinyint(1) DEFAULT 1 COMMENT '댓글 사용 여부. 댓글 사용 여부',
  `SECRET_TF` tinyint(1) DEFAULT 0 COMMENT '비밀글 사용 여부. 비밀글 사용 여부',
  `ATTACH_TF` tinyint(1) DEFAULT 1 COMMENT '첨부파일 사용 여부. 첨부파일 사용 여부',
  `DISPLAY_TF` tinyint(1) DEFAULT 0 COMMENT '노출 사용 여부. 노출 사용 여부',
  `DIV_CODE` varchar(30) DEFAULT NULL COMMENT '분류 코드. 분류 코드',
  `CREATE_USER_ID` bigint(20) unsigned DEFAULT 1 COMMENT '생성 사용자 ID. 생성 사용자 ID',
  `CREATE_TIME` timestamp NULL DEFAULT current_timestamp() COMMENT '생성일. 생성일',
  `REG_IPv4` int(10) unsigned DEFAULT NULL COMMENT '생성자 IPv4. 생성자 IPv4',
  `REG_IPv6` binary(16) DEFAULT NULL COMMENT '생성자 IPv6. 생성자 IPv6',
  `UPDATE_USER_ID` bigint(20) unsigned DEFAULT NULL COMMENT '수정 사용자 ID. 수정 사용자 ID',
  `UPDATE_TIME` datetime DEFAULT current_timestamp() COMMENT '수정일. 수정일',
  `UPDATE_IPv4` int(10) unsigned DEFAULT NULL COMMENT '수정자 IPv4. 수정자 IPv4',
  `UPDATE_IPv6` binary(16) DEFAULT NULL COMMENT '수정자 IPv6. 수정자 IPv6',
  `EXTRA_FIELD_FIRST_LABEL` varchar(30) DEFAULT NULL COMMENT '공통 레이블. 공통 레이블',
  `EXTRA_FIELD_FIRST_CODE` varchar(30) DEFAULT NULL COMMENT '레이블 값. 레이블 값',
  `DELETE_TF` tinyint(1) DEFAULT 0 COMMENT '삭제 여부. 삭제 여부',
  PRIMARY KEY (`TRUCKER_CENTER_MASTER_ID`),
  KEY `FK_tt_trucker_center_master_CREATE_USER_ID_tt_user_USER_ID` (`CREATE_USER_ID`),
  KEY `FK_tt_trucker_center_master_UPDATE_USER_ID_tt_user_USER_ID` (`UPDATE_USER_ID`),
  CONSTRAINT `FK_tt_trucker_center_master_CREATE_USER_ID_tt_user_USER_ID` FOREIGN KEY (`CREATE_USER_ID`) REFERENCES `tt_user` (`USER_ID`),
  CONSTRAINT `FK_tt_trucker_center_master_UPDATE_USER_ID_tt_user_USER_ID` FOREIGN KEY (`UPDATE_USER_ID`) REFERENCES `tt_user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='트러커 센터 카테고리 관리. 소식 카테고리 관리';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_trucker_center_master`
--

LOCK TABLES `tt_trucker_center_master` WRITE;
/*!40000 ALTER TABLE `tt_trucker_center_master` DISABLE KEYS */;
INSERT INTO `tt_trucker_center_master` VALUES
(1,'자주묻는질문',1,0,1,0,NULL,1,'2023-03-13 02:09:29',NULL,NULL,1,'2023-03-13 02:09:29',NULL,NULL,NULL,NULL,0),
(2,'구매/판매',1,0,1,0,NULL,1,'2023-03-13 02:10:50',NULL,NULL,NULL,'2023-03-13 02:10:50',NULL,NULL,NULL,NULL,0),
(3,'계정/인증',1,0,1,0,NULL,1,'2023-03-13 02:10:50',NULL,NULL,NULL,'2023-03-13 02:10:50',NULL,NULL,NULL,NULL,0),
(4,'거래품목',1,0,1,0,NULL,1,'2023-03-13 02:10:50',NULL,NULL,NULL,'2023-03-13 02:10:50',NULL,NULL,NULL,NULL,0),
(5,'이용 제재',1,0,1,0,NULL,1,'2023-03-13 02:10:50',NULL,NULL,NULL,'2023-03-13 02:10:50',NULL,NULL,NULL,NULL,0),
(6,'성과관리',1,0,1,0,NULL,1,'2023-03-13 02:10:50',NULL,NULL,NULL,'2023-03-13 02:10:50',NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `tt_trucker_center_master` ENABLE KEYS */;
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
  `BUYING_SAVINGS` bigint(30) NOT NULL DEFAULT 0,
  `SELLING_SAVINGS` bigint(30) NOT NULL DEFAULT 0,
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
  `JOIN_AGREE` varchar(10) NOT NULL DEFAULT '0' COMMENT '가입 약관 동의 여부(0: 개인정보 수집 및 이용동의 1: 개인정보 수집 목적 내 제3자 제공 동의 2: 14세 미만 법정 대리인 동의)',
  `AGREE_UPD_TIME` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `tt_user_unique_key` (`PHONE`),
  KEY `FK_tt_user_JOIN_PERMIT_USER_ID_tt_user_USER_ID` (`JOIN_PERMIT_USER_ID`),
  CONSTRAINT `FK_tt_user_JOIN_PERMIT_USER_ID_tt_user_USER_ID` FOREIGN KEY (`JOIN_PERMIT_USER_ID`) REFERENCES `tt_user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='회원정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_user`
--

LOCK TABLES `tt_user` WRITE;
/*!40000 ALTER TABLE `tt_user` DISABLE KEYS */;
INSERT INTO `tt_user` VALUES
(1,'01000000000','masteraccount','masteraccount','master','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDIzODMzOTY4IiwicGFzc3dvcmQiOiIkMmIkMTIkVTBFdFBraVF0Z0lGS2xJeWNhS0VUT1BKOGJNQW9CU0VFeGxua1UzaERjcnQ2QWN5SUJRbG0iLCJpYXQiOjE2NzIzMDMwNjIsImV4cCI6MTY3MjU2MjI2Mn0.HTmFO-1mfZRlXA_zvSDezVv9gdOUU8kHFPEU1PD-SNg',0,0,0,0,0,99,NULL,0,NULL,'200001212',0,NULL,NULL,NULL,NULL,0,0,'2154482',NULL,NULL,1,'2022-12-22 02:27:40','2023-02-28 01:48:18','2022-12-22 02:27:40',NULL,'11100','2023-02-27 07:35:30'),
(21,'01023833968','$2b$12$U0EtPkiQtgIFKlIycaKETOPJ8bMAoBSEExlnkU3hDcrt6AcyIBQlm','너그러운북극곰곰',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDIzODMzOTY4IiwicGFzc3dvcmQiOiIkMmIkMTIkVTBFdFBraVF0Z0lGS2xJeWNhS0VUT1BKOGJNQW9CU0VFeGxua1UzaERjcnQ2QWN5SUJRbG0iLCJpYXQiOjE2Nzg2ODgxNzgsImV4cCI6MTY3ODk0NzM3OH0.fedm90Brjp-K1ypV7aTOOeP7EcsC9rARURFX3VZpg-c',0,0,0,0,0,99,'profile/1672990035903_9E71B7EF-D19C-4AFE-9D32-E38A8B6C411A.jpeg',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'664398',NULL,NULL,1,'2022-12-29 08:37:42','2023-03-13 06:16:18','2022-12-29 08:37:42',NULL,'11100','2023-02-27 07:35:30'),
(22,'01063873134','$2b$12$SX24wtDlynGHrAERx82e9O79wIzo933DzC9WKoy/ejG4ydwGgOw6i','얌이아빠',NULL,'',0,0,0,0,0,99,'profile/1672990300562_9AFB98F3-D4FD-4E9C-A3A7-127B6E69D73B.jpeg',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,'064333',NULL,NULL,1,'2022-12-29 10:34:59','2023-03-02 13:08:12','2022-12-29 10:34:59',NULL,'11100','2023-02-27 07:35:30'),
(23,'01098811234','$2b$12$FxBYmsaUvcljOg7IfTWqhOCYq6MQAT6kC9HV1cCMh/8Bw8.Podnku','차가운염소4146',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDk4ODEwNjY0IiwicGFzc3dvcmQiOiIkMmIkMTIkRnhCWW1zYVV2Y2xqT2c3SWZUV3FoT0NZcTZNUUFUNmtDOUhWMWNDTWgvOEJ3OC5Qb2Rua3UiLCJpYXQiOjE2NzI1NTk4MzgsImV4cCI6MTY3MjgxOTAzOH0.Elu0XtgZWZW_yMAAE1sWJ4k-6EExUd6BoYz1LLDM6ls',0,0,0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'890266',NULL,NULL,1,'2023-01-01 04:29:15','2023-02-27 07:26:26','2023-01-01 04:29:15',NULL,'11100','2023-02-27 07:35:30'),
(24,'01080288328','$2b$12$KymyQBacuEy46w1pMuEbVO5DWNSVI4GbgMTdWhhE3YDqTABcYJxye','괜찮은토끼78',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDgwMjg4MzI4IiwicGFzc3dvcmQiOiIkMmIkMTIkS3lteVFCYWN1RXk0NncxcE11RWJWTzVEV05TVkk0R2JnTVRkV2hoRTNZRHFUQUJjWUp4eWUiLCJpYXQiOjE2NzI5OTMyOTcsImV4cCI6MTY3MzI1MjQ5N30.bfgUQ-2LwBrVG-fON8gFe-aaufzF3b7xkgiG5euEoas',0,0,0,0,0,0,'profile/1672994106735_áá¡á·ááµáá³á·.png',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'206947',NULL,NULL,1,'2023-01-02 07:20:38','2023-02-27 07:26:26','2023-01-02 07:20:38',NULL,'11100','2023-02-27 07:35:30'),
(25,'01098810000','$2b$12$q3nHkdZRvESCZVst.5O0vOvz7aiLT76Ewv/yRgM1tbpRvnG3nXzom','반가운토끼8008',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDk4ODEwNjY0IiwicGFzc3dvcmQiOiIkMmIkMTIkcTNuSGtkWlJ2RVNDWlZzdC41TzB2T3Z6N2FpTFQ3NkV3di95UmdNMXRicFJ2bkczblh6b20iLCJpYXQiOjE2NzI4NjAyNzcsImV4cCI6MTY3MzExOTQ3N30.3OYl4tIF0LsOMogiqe9hm4vD_G8jajeDEWMHpDZqb_E',0,0,0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,'975134',NULL,NULL,1,'2023-01-03 13:09:07','2023-02-27 07:26:26','2023-01-03 13:09:07',NULL,'11100','2023-02-27 07:35:30'),
(26,'01098810664','$2b$12$lWxHm22kGWjQOnCFV7IAI.HG9n1O6Qk9Az9ekqnuak1h0SA64ef26','정해민',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDk4ODEwNjY0IiwicGFzc3dvcmQiOiIkMmIkMTIkbFd4SG0yMmtHV2pRT25DRlY3SUFJLkhHOW4xTzZRazlBejlla3FudWFrMWgwU0E2NGVmMjYiLCJpYXQiOjE2Nzg3MjIwOTIsImV4cCI6MTY3ODk4MTI5Mn0.Z63fkcb_v0BAz95OXiF1S34tLQqwPSX-FJprSz7HsHQ',0,0,0,0,0,0,'profile/1673239954601_img-ObBaphDQMth1gVfJIwiS0HUh.png',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'144312',NULL,NULL,1,'2023-01-05 02:24:32','2023-03-13 15:41:32','2023-01-05 02:24:32',NULL,'11100','2023-02-27 07:35:30'),
(27,'01072219372','$2b$12$zxJ6h6JopDbO1IUBHySIxesk.1Hb5jgdhQACxigAU6j1dnAm.svL6','차가운갈매기80',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDcyMjE5MzcyIiwicGFzc3dvcmQiOiIkMmIkMTIkenhKNmg2Sm9wRGJPMUlVQkh5U0l4ZXNrLjFIYjVqZ2RoUUFDeGlnQVU2ajFkbkFtLnN2TDYiLCJpYXQiOjE2NzI5OTQxODcsImV4cCI6MTY3MzI1MzM4N30.x_PsJw-Zg75CFVzl9UM-LhOEhAhNYSysAIGB_H921Wc',0,0,0,0,0,0,'profile/1672988221291_ááµá«áá¡á¯3.jpeg',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'017313',NULL,NULL,1,'2023-01-06 01:58:10','2023-02-28 01:44:59','2023-01-06 01:58:10',NULL,'11100','2023-02-27 07:35:30'),
(28,'01040222715','$2b$12$huwn2v.C9fui7G3IQPOMeuBnPdfUiVoDGPNhKd1d/0ugwCZTmf7Y6','하얀기린',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDQwMjIyNzE1IiwicGFzc3dvcmQiOiIkMmIkMTIkaHV3bjJ2LkM5ZnVpN0czSVFQT01ldUJuUGRmVWlWb0RHUE5oS2QxZC8wdWd3Q1pUbWY3WTYiLCJpYXQiOjE2Nzg2MTY3ODAsImV4cCI6MTY3ODg3NTk4MH0.GWIwDYmngDKESgNhrNSRAXS_GlU6yuM2weCjGMho514',0,2500,5000,70000,2500000,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'085959',NULL,NULL,1,'2023-01-06 10:12:09','2023-03-12 10:26:20','2023-01-06 10:12:09',NULL,'11100','2023-02-27 07:35:30'),
(29,'01066189880','$2b$12$1m/zsrGSNgi/mDSp7mvPKOTtWBk2VoVS9dXCYZu0vdKaqXhQVWa1y','반가운갈매기7914',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDY2MTg5ODgwIiwicGFzc3dvcmQiOiIkMmIkMTIkMW0venNyR1NOZ2kvbURTcDdtdlBLT1R0V0JrMlZvVlM5ZFhDWVp1MHZkS2FxWGhRVldhMXkiLCJpYXQiOjE2NzMwMTQ2MzAsImV4cCI6MTY3MzI3MzgzMH0.3N5szFLucph36Z47Ga0kVHkdQOr-op80VtNAHr_k3mc',0,0,0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'079003',NULL,NULL,1,'2023-01-06 14:17:10','2023-02-27 07:26:26','2023-01-06 14:17:10',NULL,'11100','2023-02-27 07:35:30'),
(30,'01080009906','$2b$12$E8Kzd28YQHvhkbiwgSjYWeQATCAn8fNjsfVvIb1H1k9HhQL3MV392','허리먹',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDgwMDA5OTA2IiwicGFzc3dvcmQiOiIkMmIkMTIkRThLemQyOFlRSHZoa2Jpd2dTallXZVFBVENBbjhmTmpzZlZ2SWIxSDFrOUhoUUwzTVYzOTIiLCJpYXQiOjE2Nzg0MzY3NTYsImV4cCI6MTY3ODY5NTk1Nn0.EF9ZfAog60cq69ubVnSVzGxYQfHOCTrmCvNCd3AB0b0',0,0,0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'293254',NULL,NULL,1,'2023-01-10 00:54:09','2023-03-10 08:25:56','2023-01-10 00:54:09',NULL,'11100','2023-02-27 07:35:30'),
(31,'01036918426','$2b$12$92HdvzZzX90BUt1DVs9wFOY5IjVhme7CoOL2fTny6Ee3eVC7rjfje','rockstar',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDM2OTE4NDI2IiwicGFzc3dvcmQiOiIkMmIkMTIkOTJIZHZ6WnpYOTBCVXQxRFZzOXdGT1k1SWpWaG1lN0NvT0wyZlRueTZFZTNlVkM3cmpmamUiLCJpYXQiOjE2Nzg2ODI0MDcsImV4cCI6MTY3ODk0MTYwN30.ybVvUTDtFJnjFJdLAPoCQKd-w7VxZhrCFwBvrb2MEzs',2500,0,5000,70000,2500000,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'521380',NULL,NULL,1,'2023-01-10 08:53:19','2023-03-13 04:40:07','2023-01-10 08:53:19',NULL,'11100','2023-02-27 07:35:30'),
(32,'01087277972','$2b$12$cdrjdeesqSWHaK/6UBEFk.H8VL9TFeZ7GTdVU1tRaHipP31/NP1vS','괜찮은사막여우5889',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDg3Mjc3OTcyIiwicGFzc3dvcmQiOiIkMmIkMTIkY2RyamRlZXNxU1dIYUsvNlVCRUZrLkg4Vkw5VEZlWjdHVGRWVTF0UmFIaXBQMzEvTlAxdlMiLCJpYXQiOjE2NzU2OTk0MDQsImV4cCI6MTY3NTk1ODYwNH0.NONu_P93qVoemIkCXZypmIHap7X76BkpuB6Gz83EACE',0,0,0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'322929',NULL,NULL,1,'2023-01-21 09:42:55','2023-02-27 07:26:26','2023-01-21 09:42:55',NULL,'11100','2023-02-27 07:35:30'),
(36,'01041936199','$2b$12$pHiYe7tGqvh9HGKAarhSCeI/.d9KEx9dolH4ScK8fRg0nx1EGEGzC','착한백조6271',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDQxOTM2MTk5IiwicGFzc3dvcmQiOiIkMmIkMTIkcEhpWWU3dEdxdmg5SEdLQWFyaFNDZUkvLmQ5S0V4OWRvbEg0U2NLOGZSZzBueDFFR0VHekMiLCJpYXQiOjE2NzQ2NDk4MDcsImV4cCI6MTY3NDkwOTAwN30.4fKIqo9A8U6DJq4pnrRgTKRi8eEGqUZcG5hiQce7bLY',0,0,0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'474210',NULL,NULL,1,'2023-01-25 12:30:07','2023-02-27 07:26:26','2023-01-25 12:30:07',NULL,'11100','2023-02-27 07:35:30'),
(39,'01022000125','$2b$12$atVoJQKxxMlc3Obi8ojKpO1feLu1tSP0YaHyFTVGOTwMVO2hb4Bp.','아름다운코끼리4199',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDIyMDAwMTI1IiwicGFzc3dvcmQiOiIkMmIkMTIkYXRWb0pRS3h4TWxjM09iaThvaktwTzFmZUx1MXRTUDBZYUh5RlRWR09Ud01WTzJoYjRCcC4iLCJpYXQiOjE2NzU4MjUzMzQsImV4cCI6MTY3NjA4NDUzNH0.94atCrfGnsi_hJ5-8LEH89ft8avVJxv0j8BlnJ9Xm-g',0,0,0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'979743',NULL,NULL,1,'2023-02-08 03:02:14','2023-02-27 07:26:26','2023-02-08 03:02:14',NULL,'11100','2023-02-27 07:35:30'),
(40,'01053873128','$2b$12$c7YnbPBe6Gfxq9XPxteStO8MuHCYi3ZdlOaReGbLsUc/GJYHhqcia','날쌘햄스터4562',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDUzODczMTI4IiwicGFzc3dvcmQiOiIkMmIkMTIkYzdZbmJQQmU2R2Z4cTlYUHh0ZVN0TzhNdUhDWWkzWmRsT2FSZUdiTHNVYy9HSllIaHFjaWEiLCJpYXQiOjE2NzY5NjU4MTIsImV4cCI6MTY3NzIyNTAxMn0.ozYZpaYqbrxlN4f2N5YJgPhfJDKTAjT-whYZSFvgahc',0,0,0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'495628',NULL,NULL,1,'2023-02-21 07:50:12','2023-02-27 07:26:26','2023-02-21 07:50:12',NULL,'11100','2023-02-27 07:35:30'),
(41,'01092231433','$2b$12$GSsozNBVPBKZqafXbrDLuuMiMPKoFpWHqmVq28DPj82PQHWT9cb/6','괜찮은악어5478',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDkyMjMxNDMzIiwicGFzc3dvcmQiOiIkMmIkMTIkR1Nzb3pOQlZQQktacWFmWGJyREx1dU1pTVBLb0ZwV0hxbVZxMjhEUGo4MlBRSFdUOWNiLzYiLCJpYXQiOjE2NzY5NzI5MTcsImV4cCI6MTY3NzIzMjExN30._EhpCDIzREgJgpXpNBF6QfARk57FO8yo7zwCnRgk0E8',0,0,0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'180434',NULL,NULL,1,'2023-02-21 09:48:37','2023-02-27 07:26:26','2023-02-21 09:48:37',NULL,'11100','2023-02-27 07:35:30'),
(42,'01024508638','$2b$12$pk3.2fTDp32dEs4diuxrq.OenRYILnm2/Ebzpx38VsPw6M8orOpUC','반가운돌고래7147',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDI0NTA4NjM4IiwicGFzc3dvcmQiOiIkMmIkMTIkcGszLjJmVERwMzJkRXM0ZGl1eHJxLk9lblJZSUxubTIvRWJ6cHgzOFZzUHc2TThvck9wVUMiLCJpYXQiOjE2Nzg3MTU3OTcsImV4cCI6MTY3ODk3NDk5N30.LicOebN5dJPHIKccCW2PXv_CDCLzEJH02s8l6rcWWT4',0,0,0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'418277',NULL,NULL,1,'2023-03-02 12:56:03','2023-03-13 13:56:37','2023-03-02 12:56:03',NULL,'11100','2023-03-02 12:56:03'),
(43,'01030377903','$2b$12$Q8jD3ZregZvd9tIIZBf4iem7pXd/0BCbBIVaaEe08CjA5wsh6SdRC','너그러운표범9937',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDMwMzc3OTAzIiwicGFzc3dvcmQiOiIkMmIkMTIkUThqRDNacmVnWnZkOXRJSVpCZjRpZW03cFhkLzBCQ2JCSVZhYUVlMDhDakE1d3NoNlNkUkMiLCJpYXQiOjE2Nzg0NTgwNjAsImV4cCI6MTY3ODcxNzI2MH0.6ZvgVmbs33BENQziPY50SX2iIb8DuoRgWORSBSyBJ-c',0,0,0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'281332',NULL,NULL,1,'2023-03-04 13:10:35','2023-03-10 14:21:00','2023-03-04 13:10:35',NULL,'0','2023-03-04 13:10:35'),
(51,'01096997478','$2b$12$9tE3yViiQubD3Gbw30DKnunFrW4rd5Pt7wKGtdXYujYdzPZWHwdkO','디자인forever',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDk2OTk3NDc4IiwicGFzc3dvcmQiOiIkMmIkMTIkOXRFM3lWaWlRdWJEM0didzMwREtudW5Gclc0cmQ1UHQ3d0tHdGRYWXVqWWR6UFpXSHdka08iLCJpYXQiOjE2NzgxNjU3OTksImV4cCI6MTY3ODQyNDk5OX0.YdVpByLBDS_lP733SxxPxXlfCy8NcuwV5l-U4dmb3Jg',0,0,0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'393271',NULL,NULL,1,'2023-03-06 05:46:45','2023-03-07 05:09:59','2023-03-06 05:46:45',NULL,'0','2023-03-06 05:46:45'),
(52,'01040974129','$2b$12$tk/rGqtG5CHFBmxOZcOOEuPpwk7wLalB2VoBMnViZihAEqJEPS57a','뉴문디자인',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDQwOTc0MTI5IiwicGFzc3dvcmQiOiIkMmIkMTIkdGsvckdxdEc1Q0hGQm14T1pjT09FdVBwd2s3d0xhbEIyVm9CTW5WaVppaEFFcUpFUFM1N2EiLCJpYXQiOjE2NzgzNTEzMzMsImV4cCI6MTY3ODYxMDUzM30.TngmEe4kweymCu1OblJIjTYAHOJ7O5oHgjKrfiQRR2g',0,0,0,0,0,0,'profile/1678097369628_IMG_20191025_161929_787.jpg',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'827965',NULL,NULL,1,'2023-03-06 10:05:48','2023-03-09 08:42:13','2023-03-06 10:05:48',NULL,'0','2023-03-06 10:05:48'),
(72,'01057149182','$2b$12$UYlelWeyDEyDjVdb6rEHOuv09m3RZjAOqYsdGqllA6woufGibADdO','힘찬다람쥐4118',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDU3MTQ5MTgyIiwicGFzc3dvcmQiOiIkMmIkMTIkVVlsZWxXZXlERXlEalZkYjZyRUhPdXYwOW0zUlpqQU9xWXNkR3FsbEE2d291ZkdpYkFEZE8iLCJpYXQiOjE2NzgyMDg4MTYsImV4cCI6MTY3ODQ2ODAxNn0.2ZuzX1pmVG4NJw1eZcxK_0TJkf3_A-yyxrAdDFxccTc',0,0,0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'060062',NULL,NULL,1,'2023-03-06 10:17:30','2023-03-07 17:06:56','2023-03-06 10:17:30',NULL,'0','2023-03-06 10:17:30'),
(77,'01037635551','$2b$12$PMl2MBKv6noqC2RXABxvC.SJ6pL2mjsBc3P5TtoYQXl3NzxxdDjn.','흔들',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDM3NjM1NTUxIiwicGFzc3dvcmQiOiIkMmIkMTIkUE1sMk1CS3Y2bm9xQzJSWEFCeHZDLlNKNnBMMm1qc0JjM1A1VHRvWVFYbDNOenh4ZERqbi4iLCJpYXQiOjE2NzgxNDQzMDIsImV4cCI6MTY3ODQwMzUwMn0.ZLgKKCRvH863q6ftHdm2aGyp-Atl1SV44LK5UUrR3DQ',0,0,0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'705621',NULL,NULL,1,'2023-03-06 23:10:51','2023-03-06 23:12:28','2023-03-06 23:10:51',NULL,'0','2023-03-06 23:10:51'),
(84,'01090470088','$2b$12$WSk7vov0YI1rjPscJ7PUA.9u1YdkQphGjsMVlLXZPiVhON.RWd6DO','즐거운강아지2570',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDkwNDcwMDg4IiwicGFzc3dvcmQiOiIkMmIkMTIkV1NrN3ZvdjBZSTFyalBzY0o3UFVBLjl1MVlka1FwaEdqc01WbExYWlBpVmhPTi5SV2Q2RE8iLCJpYXQiOjE2NzgxNjgxNzEsImV4cCI6MTY3ODQyNzM3MX0.8OosLWXVZbdEK0vgsoqHO9Ar115TgaZPzP7QxFyjXb8',0,0,0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'899354',NULL,NULL,1,'2023-03-07 05:47:26','2023-03-07 05:49:31','2023-03-07 05:47:26',NULL,'0','2023-03-07 05:47:26'),
(89,'01033406155','$2b$12$TzwU0lZASCs0QsUJ6I1QkuR9oG3vOeVrkKPdGBbfOSlZyYHGLGGKu','희망찬팬더4719',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxMDMzNDA2MTU1IiwicGFzc3dvcmQiOiIkMmIkMTIkVHp3VTBsWkFTQ3MwUXNVSjZJMVFrdVI5b0czdk9lVnJrS1BkR0JiZk9TbFp5WUhHTEdHS3UiLCJpYXQiOjE2Nzg3MTgyODksImV4cCI6MTY3ODk3NzQ4OX0.BQbd9Zk6d7QLQQCeggWkJXbXVHYexke3Up9Ek86tDHA',0,0,0,0,0,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'760726',NULL,NULL,1,'2023-03-13 12:49:53','2023-03-13 14:38:09','2023-03-13 12:49:53',NULL,'11100','2023-03-13 12:49:53');
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
/*!50032 DROP TRIGGER IF EXISTS tt_user */;
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
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50032 DROP TRIGGER IF EXISTS JOIN_AGREE_UPD_TRIGGER */;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tttruck`@`%`*/ /*!50003 TRIGGER JOIN_AGREE_UPD_TRIGGER AFTER UPDATE ON tt_user FOR EACH ROW
BEGIN
    IF NEW.JOIN_AGREE <> OLD.JOIN_AGREE THEN
        UPDATE tt_user SET AGREE_UPD_TIME = CURRENT_TIMESTAMP WHERE USER_ID = NEW.USER_ID;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tt_user_badge`
--

DROP TABLE IF EXISTS `tt_user_badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_user_badge` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '뱃지ID',
  `USER_ID` bigint(20) unsigned NOT NULL COMMENT 'USER FK',
  `BADGE_ID` bigint(20) unsigned NOT NULL COMMENT 'BADGE FK',
  `REG_DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '출시일',
  `OP1` tinyint(1) DEFAULT NULL COMMENT '조건1 충족여부',
  `OP2` tinyint(1) DEFAULT NULL COMMENT '조건2 충족여부',
  `IS_ACTIVATED` tinyint(1) DEFAULT NULL COMMENT '활성화 여부',
  PRIMARY KEY (`ID`),
  KEY `FK_tt_user_badge_USER_ID_tt_user_USER_ID` (`USER_ID`),
  KEY `FK_tt_user_badge_BADGE_ID_tt_badge_BADGE_ID` (`BADGE_ID`),
  CONSTRAINT `FK_tt_user_badge_BADGE_ID_tt_badge_BADGE_ID` FOREIGN KEY (`BADGE_ID`) REFERENCES `tt_badge` (`BADGE_ID`),
  CONSTRAINT `FK_tt_user_badge_USER_ID_tt_user_USER_ID` FOREIGN KEY (`USER_ID`) REFERENCES `tt_user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='회원_뱃지';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_user_badge`
--

LOCK TABLES `tt_user_badge` WRITE;
/*!40000 ALTER TABLE `tt_user_badge` DISABLE KEYS */;
INSERT INTO `tt_user_badge` VALUES
(2,43,15,'2023-03-05 00:00:00',0,0,0),
(3,43,15,'2023-03-13 05:50:38',0,0,0);
/*!40000 ALTER TABLE `tt_user_badge` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_user_signout`
--

LOCK TABLES `tt_user_signout` WRITE;
/*!40000 ALTER TABLE `tt_user_signout` DISABLE KEYS */;
INSERT INTO `tt_user_signout` VALUES
(1,22,'재가입 할겁니닫','2023-01-06 04:40:06'),
(2,22,'재가입할겁니다','2023-01-06 04:40:42'),
(3,26,'ofefwf','2023-01-06 04:42:01'),
(4,22,'ofefwf','2023-01-06 04:43:05'),
(5,22,'123','2023-01-06 04:43:22'),
(6,22,'재가입 할거에요./테스트','2023-01-06 05:31:24'),
(7,22,'재가입 할거에요./테스트','2023-01-06 05:41:02'),
(8,22,'재가입 할거에요./테스트','2023-01-06 06:37:53'),
(9,22,'볼거리가 없어요./wefweafwef','2023-03-02 13:08:12');
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
INSERT INTO `tt_user_talkplus` VALUES
(21,'tttruck21','$2b$12$U0EtPkiQtgIFKlIycaKETOPJ8bMAoBSEExlnkU3hDcrt6AcyIBQlm','너그러운북극곰곰','https://cdn.tttruck.co.kr/profile/1672990035903_9E71B7EF-D19C-4AFE-9D32-E38A8B6C411A.jpeg','$2a$06$2yxUzlCGbEzxE/RWgPU5OOz6CQmJGpBfBLGTWan4CRvBN2wTPq6zO',0),
(22,'tttruck22','$2b$12$SX24wtDlynGHrAERx82e9O79wIzo933DzC9WKoy/ejG4ydwGgOw6i','얌이아빠','https://cdn.tttruck.co.kr/profile/1672990300562_9AFB98F3-D4FD-4E9C-A3A7-127B6E69D73B.jpeg','$2a$06$1ix10zyXBdZo/wQBLIpKg.K9kt3LvS9c7W2H9WrhzeQ9LF6fGgply',1),
(23,'tttruck23','$2b$12$FxBYmsaUvcljOg7IfTWqhOCYq6MQAT6kC9HV1cCMh/8Bw8.Podnku','차가운염소4146','','$2a$06$iivr57teUk8V6k9i0Q13E.2nPwkcWa91HmYHgz98DW4UegtdA.WKG',0),
(24,'tttruck24','$2b$12$KymyQBacuEy46w1pMuEbVO5DWNSVI4GbgMTdWhhE3YDqTABcYJxye','괜찮은토끼78','https://cdn.tttruck.co.kr/profile/1672994106735_áá¡á·ááµáá³á·.png','$2a$06$Nz/QqlQ0wDqpK3d6fMR26uWAJYK07JAjl0TEeUUleqk.J4i11aG6a',0),
(25,'tttruck25','$2b$12$q3nHkdZRvESCZVst.5O0vOvz7aiLT76Ewv/yRgM1tbpRvnG3nXzom','반가운토끼8008','','$2a$06$HVRnAR5g8rBY.0PP3PmWoOIxLut864v3lhBfa6F9pQYPXBDKqNoYS',1),
(26,'tttruck26','$2b$12$7h0IYZe8H5JtXgiQLN2NV.yYTbRY8cF9C1qlQ9dLOq8P3Z1cD4QH2','정해민','https://cdn.tttruck.co.kr/profile/1673239954601_img-ObBaphDQMth1gVfJIwiS0HUh.png','$2a$06$B4Wz9H0DfsVzLJ.yl6Uqr.V57Aj8C.cD.Op3hYoX0frnLYd/w.lse',0),
(27,'tttruck27','$2b$12$zxJ6h6JopDbO1IUBHySIxesk.1Hb5jgdhQACxigAU6j1dnAm.svL6','차가운갈매기80','https://cdn.tttruck.co.kr/profile/1672988221291_ááµá«áá¡á¯3.jpeg','$2a$06$f4WCoWT0QsoS9DqxRr0RZ.5XhNKjiKGGKo5d0nWPx4e/o9AH0TMCK',0),
(28,'tttruck28','$2b$12$huwn2v.C9fui7G3IQPOMeuBnPdfUiVoDGPNhKd1d/0ugwCZTmf7Y6','하얀기린','','$2a$06$LWakhS0EUz8Cx0GhSeq4Mu/1bMPgIiucVZ8x.I1auDF5vSs/7xEc6',0),
(29,'tttruck29','$2b$12$1m/zsrGSNgi/mDSp7mvPKOTtWBk2VoVS9dXCYZu0vdKaqXhQVWa1y','반가운갈매기7914','','$2a$06$ac3WIuvX47QZAi3qL2UoJ.XRp/PgBiP82kCfM2oydwlBt0lRH5rZW',0),
(30,'tttruck30','$2b$12$E8Kzd28YQHvhkbiwgSjYWeQATCAn8fNjsfVvIb1H1k9HhQL3MV392','허리먹','','$2a$06$KsuLgd.wtuIwEXP7FToI2eIAMKcdhTZfBbRKHhFmD5pyUWhXMUBA2',0),
(31,'tttruck31','$2b$12$92HdvzZzX90BUt1DVs9wFOY5IjVhme7CoOL2fTny6Ee3eVC7rjfje','rockstar','','$2a$06$pSYtdlLOy5.0S/NEyLreEuIcu6KGc7F.ymQRHky7FtX.x6ZXUWgi.',0),
(39,'tttruck39','$2b$12$atVoJQKxxMlc3Obi8ojKpO1feLu1tSP0YaHyFTVGOTwMVO2hb4Bp.','아름다운코끼리4199','','$2a$06$t2BnI8TxqYpHaXJ8Dwj2suZ0/YAnt1OlKFvbAkmxwHVubGY558Py2',0),
(40,'tttruck40','$2b$12$c7YnbPBe6Gfxq9XPxteStO8MuHCYi3ZdlOaReGbLsUc/GJYHhqcia','날쌘햄스터4562','','$2a$06$VEd90x6IZmVtQuQSeIIWw.z1pSMyTqXk1i7qE/yt8dkUcrB.gmDtq',0),
(41,'tttruck41','$2b$12$GSsozNBVPBKZqafXbrDLuuMiMPKoFpWHqmVq28DPj82PQHWT9cb/6','괜찮은악어5478','','$2a$06$dPhu78nTkEPVSVbFZkilpub95PUfLzPPsTxw5F7tgDb1twZ/gnGHi',0),
(42,'tttruck42','$2b$12$pk3.2fTDp32dEs4diuxrq.OenRYILnm2/Ebzpx38VsPw6M8orOpUC','반가운돌고래7147','','$2a$06$G9PpYQceu.Zm4ZmPqk7WyerR9RYkTVzdE6SeB3DeL/ZUNj58AeNqe',0),
(43,'tttruck43','$2b$12$Q8jD3ZregZvd9tIIZBf4iem7pXd/0BCbBIVaaEe08CjA5wsh6SdRC','너그러운표범9937','','$2a$06$OT2nvxdpvpKwG5bZJKRbvubkD5AXQ9cwYNzTTEbt9htFBWI.VxrNa',0),
(51,'tttruck51','$2b$12$9tE3yViiQubD3Gbw30DKnunFrW4rd5Pt7wKGtdXYujYdzPZWHwdkO','디자인forever','','$2a$06$GkN6fLE04QfgQ1nu7Pan/eyStT6tVSz.Y9xZIguJ/PPmaQQYdltMu',0),
(52,'tttruck52','$2b$12$tk/rGqtG5CHFBmxOZcOOEuPpwk7wLalB2VoBMnViZihAEqJEPS57a','뉴문디자인','https://cdn.tttruck.co.kr/profile/1678097369628_IMG_20191025_161929_787.jpg','$2a$06$XQzBdZL4j1Ku/9ir73.lBO.9ZmNEE4S6DF2tWvX1IRdcon7Iu26ky',0),
(72,'tttruck72','$2b$12$UYlelWeyDEyDjVdb6rEHOuv09m3RZjAOqYsdGqllA6woufGibADdO','힘찬다람쥐4118','','$2a$06$24CrAeKkSqUdk0tati1T.OGC6tUQlj3MXXjpni3XIFw6CnjdtINzC',0),
(77,'tttruck77','$2b$12$PMl2MBKv6noqC2RXABxvC.SJ6pL2mjsBc3P5TtoYQXl3NzxxdDjn.','흔들','','$2a$06$cdxuXqq6ieg9iKHSq/hd4eq.xyTHWG7Rkv3yx0oepuGT1bpVYtfWO',0),
(84,'tttruck84','$2b$12$WSk7vov0YI1rjPscJ7PUA.9u1YdkQphGjsMVlLXZPiVhON.RWd6DO','즐거운강아지2570','','$2a$06$EwM15gpwdzErCpuYe1dIPuDv/Lk7DAu0clcjnMLZ.PHGiD2OK8Vky',0),
(89,'tttruck89','$2b$12$TzwU0lZASCs0QsUJ6I1QkuR9oG3vOeVrkKPdGBbfOSlZyYHGLGGKu','희망찬팬더4719','','$2a$06$dmygSmhT0pqaM9uF2pgS2eEA5C5zBYDzK9NQfISQGwGpLlF2fqgOG',0);
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

--
-- Dumping routines for database 'tttruck_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-14  1:27:46
