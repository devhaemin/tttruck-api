DROP DATABASE IF EXISTS `tttruck_db`;
CREATE DATABASE IF NOT EXISTS `tttruck_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `tttruck_db`;
DROP TABLE IF EXISTS `bs_user`;
CREATE TABLE IF NOT EXISTS `bs_user` (
    `USER_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `EMAIL` varchar(128) NOT NULL COMMENT '아이디(이메일)',
    `PASSWORD` varchar(500) NOT NULL COMMENT '패스워드',
    `GROUP` varchar(5) NOT NULL COMMENT '사용자 그룹 (01:학생, 02:일반, 03:교사, 04:상담사, 99:관리자)',
    `NAME` varchar(300) NOT NULL COMMENT '이름',
    `PROFILE_IMAGE` varchar(300) DEFAULT NULL COMMENT '프로필 이미지',
    `NICKNAME` varchar(30) DEFAULT NULL COMMENT '닉네임',
    `PHONE_NUMBER` varchar(20) NOT NULL COMMENT '전화번호',
    `BIRTHDAY` varchar(10) DEFAULT NULL COMMENT '생일 (YYYYMMDD)',
    `GENDER` varchar(1) DEFAULT NULL COMMENT '성별 (M / F)',
    `ZIP_CODE` varchar(100) DEFAULT NULL COMMENT '우편번호',
    `ADDRESS` varchar(200) DEFAULT NULL COMMENT '주소',
    `DETAIL_ADDRESS` varchar(200) DEFAULT NULL COMMENT '상세 주소',
    `SCHOOL_ID` varchar(20) DEFAULT NULL COMMENT '학교ID',
    `GRADE` varchar(100) DEFAULT NULL COMMENT '학년',
    `BAN` varchar(100) DEFAULT NULL COMMENT '반',
    `JOIN_STATE` varchar(5) DEFAULT NULL COMMENT '가입 상태 (01:승인대기, 02:승인거부, 03:관리자승인대기, 04:완료)',
    `SNS_INSTAGRAM` varchar(300) DEFAULT NULL COMMENT 'SNS 인스타그램',
    `SNS_YOUTUBE` varchar(300) DEFAULT NULL COMMENT 'SNS 유튜브',
    `SNS_FACEBOOK` varchar(300) DEFAULT NULL COMMENT 'SNS 페이스북',
    `SNS_BLOG` varchar(300) DEFAULT NULL COMMENT 'SNS 블로그',
    `SNS_KAKAO` varchar(300) DEFAULT NULL COMMENT 'SNS 카카오',
    `SHARED_AI_JINRO_REPORT_YN` varchar(1) DEFAULT NULL COMMENT 'AI진로종합검사결과보고서 공유 여부',
    `SHARED_EXPLORE_EXPERIENCE_YN` varchar(1) DEFAULT NULL COMMENT '경험 탐색 공유 여부',
    `TEACHER_DIV` varchar(2) DEFAULT NULL COMMENT '교사 구분 (01:일반, 02:마중물, 03:반딧불)',
    `OPERATION_DIV` varchar(2) DEFAULT NULL COMMENT '운영직원 구분(01:센터운영 02:상담사)',
    `CLASS_ID` varchar(20) DEFAULT NULL COMMENT '진로진학코드 (미사용)',
    `CLASS_DATE` datetime DEFAULT NULL COMMENT '진로진학 참가일 (미사용)',
    `RESTING_YN` varchar(1) NOT NULL DEFAULT 'N' COMMENT '휴면 여부',
    `LEAVE_YN` varchar(1) NOT NULL DEFAULT 'N' COMMENT '탈퇴 여부',
    `EMAIL_AUTH_CODE` varchar(6) DEFAULT NULL COMMENT '이메일 인증코드',
    `EMAIL_AUTH_DATE` datetime DEFAULT NULL COMMENT '이메일 인증유효 시간',
    `AFTER_DATE` varchar(8) DEFAULT NULL COMMENT '인증서 유효기간 (YYYYMMDD)',
    `SUBJECT_CN` varchar(100) DEFAULT NULL COMMENT '인증서 subjectCN 값',
    `PHONE_CI` varchar(300) DEFAULT NULL COMMENT '휴대폰 CI 값',
    `REG_DATE` datetime DEFAULT current_timestamp() COMMENT '가입일',
    `UPD_DATE` datetime DEFAULT current_timestamp() COMMENT '수정일',
    `JOIN_DATE` datetime DEFAULT NULL COMMENT '가입 승인 날짜',
    `JOIN_PERMIT_USER_ID` bigint(20) unsigned DEFAULT NULL COMMENT '가입 승인해준 USER_ID',
    `JOIN_AGREE` varchar(10) DEFAULT NULL COMMENT '가입 약관 동의 여부(0: 개인정보 수집 및 이용동의 1: 개인정보 수집 목적 내 제3자 제공 동의 2: 14세 미만 법정 대리인 동의)',
    `SCHO_ID` int(11) DEFAULT NULL,
    PRIMARY KEY (`USER_ID`)
    ) ENGINE=InnoDB AUTO_INCREMENT=291 DEFAULT CHARSET=utf8 COMMENT='회원정보';

DROP TABLE IF EXISTS `bs_sns_auth`;
CREATE TABLE IF NOT EXISTS `bs_sns_auth` (
    `SNS_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'SNS ID',
    `USER_ID` bigint(20) DEFAULT NULL COMMENT '사용자 ID',
    `SNS_ACCOUNT_TYPE` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'SNS 계정 연동 타입',
    `APP_ID` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '앱 사용자 고유ID (일련번호)',
    `PASSWORD` varchar(500) DEFAULT NULL COMMENT 'SNS 패스워드',
    `APP_USER_ID` varchar(100) NOT NULL COMMENT '앱 사용자 ID (ex. 앱 아이디, 앱 별명)',
    `SNS_TOKEN_KEY` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'SNS 인증 토큰 키',
    `NICKNAME` varchar(500) DEFAULT NULL COMMENT '닉네임',
    `RETURN_DATA` mediumtext DEFAULT NULL COMMENT '롤백 URL 반환값',
    `REG_DATE` datetime DEFAULT current_timestamp() COMMENT '가입일',
    `UPD_DATE` datetime DEFAULT current_timestamp() COMMENT '수정일',
    PRIMARY KEY (`SNS_ID`)
    ) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `bs_nickname_log`;
CREATE TABLE IF NOT EXISTS `bs_nickname_log` (
    `NICKNAME_LOG_ID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '닉네임 변경 로그 ID',
    `ORIGIN_NICKNAME` varchar(30) DEFAULT NULL COMMENT '기존 닉네임',
    `CHANGE_NICKNAME` varchar(30) DEFAULT NULL COMMENT '변경 닉네임',
    `USER_ID` bigint(11) DEFAULT NULL COMMENT '사용자 ID',
    `IP` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '사용자 IP',
    `UPD_DATE` datetime DEFAULT current_timestamp() COMMENT '변경날짜',
    PRIMARY KEY (`NICKNAME_LOG_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='닉네임 변경 로그';

DROP TABLE IF EXISTS `bs_group`;
CREATE TABLE IF NOT EXISTS `bs_group` (
    `GROUP_ID` varchar(20) NOT NULL COMMENT '그룹 ID',
    `GROUP_NAME` varchar(100) NOT NULL COMMENT '그룹명',
    `DESCRIPTION` varchar(300) DEFAULT NULL COMMENT '설명',
    `DEFAULT_YN` varchar(1) NOT NULL DEFAULT 'N' COMMENT '기본 그룹 여부',
    `USE_YN` varchar(1) NOT NULL DEFAULT 'Y' COMMENT '사용 여부',
    `REG_USER_ID` int(11) DEFAULT NULL COMMENT '생성자 아이디',
    `REG_DATE` datetime DEFAULT NULL COMMENT '생성일',
    `REG_IP` varchar(30) DEFAULT NULL COMMENT '생성자 아이피',
    `UPD_USER_ID` int(11) DEFAULT NULL COMMENT '수정자 아이디',
    `UPD_DATE` datetime DEFAULT NULL COMMENT '수정일',
    `UPD_IP` varchar(30) DEFAULT NULL COMMENT '수정자 아이피',
    PRIMARY KEY (`GROUP_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='그룹';

DROP TABLE IF EXISTS `bs_group_user_mapping`;
CREATE TABLE IF NOT EXISTS `bs_group_user_mapping` (
    `GROUP_USER_MAPPING_ID` varchar(20) NOT NULL COMMENT '그룹 사용자 매핑 ID',
    `GROUP_ID` varchar(20) NOT NULL COMMENT '그룹 ID',
    `USER_ID` varchar(20) NOT NULL COMMENT '사용자 ID',
    PRIMARY KEY (`GROUP_USER_MAPPING_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='그룹 사용자 매핑';


DROP TABLE IF EXISTS `api_auth_key_tbl`;
CREATE TABLE IF NOT EXISTS `api_auth_key_tbl` (
                                                  `API_AUTH_SEQ` decimal(10,0) NOT NULL COMMENT 'API_권한_순번',
    `USER_ID` varchar(20) NOT NULL COMMENT '사용자_아이디',
    `API_AUTH_KEY` varchar(200) NOT NULL COMMENT 'API_권한_키',
    `REQUEST_IP` varchar(50) NOT NULL COMMENT '요청_아이피',
    `EXPIRE_DT` datetime DEFAULT NULL COMMENT '만료_일시',
    `REG_DT` datetime NOT NULL COMMENT '등록_일시',
    PRIMARY KEY (`API_AUTH_SEQ`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='API_권한_키';

DROP TABLE IF EXISTS `tt_access_log`;
CREATE TABLE IF NOT EXISTS `bs_access_log` (
    `ACCESS_LOG_ID` varchar(20) NOT NULL COMMENT '접근 로그 ID',
    `TYPE` varchar(30) DEFAULT NULL COMMENT '타입',
    `CLASS` varchar(300) DEFAULT NULL COMMENT '클래스',
    `METHOD` varchar(100) DEFAULT NULL COMMENT '메소드',
    `PARAMS` mediumtext DEFAULT NULL COMMENT '파라미터',
    `USER_ID` int(11) DEFAULT NULL COMMENT '사용자 ID',
    `DATE` datetime DEFAULT NULL COMMENT '날짜',
    PRIMARY KEY (`ACCESS_LOG_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='접근 로그';

DROP TABLE IF EXISTS `bs_authority`;
CREATE TABLE IF NOT EXISTS `bs_authority` (
    `AUTHORITY_ID` varchar(20) NOT NULL COMMENT '권한 ID',
    `AUTHORITY_NAME` varchar(100) NOT NULL COMMENT '권한명',
    `DEFAULT_YN` varchar(1) NOT NULL DEFAULT 'N' COMMENT '기본 권한 여부',
    `DESCRIPTION` varchar(300) DEFAULT NULL COMMENT '설명',
    `USE_YN` varchar(1) NOT NULL DEFAULT 'Y' COMMENT '사용 여부',
    `REG_USER_ID` int(11) DEFAULT NULL COMMENT '생성자 아이디',
    `REG_DATE` datetime DEFAULT NULL COMMENT '생성일',
    `REG_IP` varchar(30) DEFAULT NULL COMMENT '생성자 아이피',
    `UPD_USER_ID` int(11) DEFAULT NULL COMMENT '수정자 아이디',
    `UPD_DATE` datetime DEFAULT NULL COMMENT '수정일',
    `UPD_IP` varchar(30) DEFAULT NULL COMMENT '수정자 아이피',
    PRIMARY KEY (`AUTHORITY_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='권한';

/* 게시판 */
DROP TABLE IF EXISTS `tt_board_comment`;
CREATE TABLE IF NOT EXISTS `tt_board_comment` (
    `BOARD_COMMENT_ID` varchar(20) NOT NULL COMMENT '게시물 댓글 ID',
    `PARENT_BOARD_COMMENT_ID` varchar(20) DEFAULT NULL COMMENT '상위 게시물 댓글 ID',
    `BOARD_MASTER_ID` varchar(20) NOT NULL COMMENT '게시판 ID',
    `BOARD_CONTENTS_ID` varchar(20) NOT NULL COMMENT '게시물 ID',
    `CONTENTS` varchar(1000) DEFAULT NULL COMMENT '내용',
    `REG_USER_ID` bigint(20) DEFAULT NULL COMMENT '작성자 아이디',
    `REG_DATE` datetime DEFAULT NULL COMMENT '작성일',
    `REG_IP` varchar(20) DEFAULT NULL COMMENT '작성자 아이피',
    `UPD_USER_ID` bigint(20) DEFAULT NULL COMMENT '수정자 아이디',
    `UPD_DATE` datetime DEFAULT NULL COMMENT '수정일',
    `UPD_IP` varchar(20) DEFAULT NULL COMMENT '수정자 아이피',
    `ORG_SEQ` int(20) DEFAULT NULL COMMENT '기존 댓글 시퀀스',
    PRIMARY KEY (`BOARD_COMMENT_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='게시물 댓글';

DROP TABLE IF EXISTS `tt_board_contents`;
CREATE TABLE IF NOT EXISTS `tt_board_contents` (
    `BOARD_MASTER_ID` varchar(20) NOT NULL COMMENT '게시판 ID',
    `BOARD_CONTENTS_ID` varchar(20) NOT NULL COMMENT '게시물 ID',
    `PARENT_BOARD_CONTENTS_ID` varchar(20) DEFAULT NULL COMMENT '상위 게시물 ID',
    `DEPTH` int(11) DEFAULT 0 COMMENT '게시물 뎁스',
    `SUBJECT` varchar(100) DEFAULT NULL COMMENT '제목',
    `CONTENTS` text DEFAULT NULL COMMENT '내용',
    `SEC_YN` char(1) DEFAULT 'N' COMMENT '비밀글 여부',
    `HOT_YN` char(1) DEFAULT 'N' COMMENT '상단고정여부',
    `DISPLAY_YN` char(1) DEFAULT 'Y' COMMENT '노출 여부',
    `SHARED_YN` varchar(1) DEFAULT 'N' COMMENT '공유 여부',
    `DIV` varchar(50) DEFAULT NULL COMMENT '분류',
    `TAG` varchar(300) DEFAULT NULL COMMENT '태그',
    `CONTENT_ID` varchar(30) DEFAULT NULL COMMENT '콘텐츠 아이디',
    `VIEW_COUNT` int(11) NOT NULL DEFAULT 0 COMMENT '조회수',
    `STATE` varchar(5) DEFAULT NULL COMMENT '상태',
    `REG_USER_ID` bigint(20) DEFAULT NULL COMMENT '생성자 아이디',
    `REG_DATE` datetime DEFAULT NULL COMMENT '작성일',
    `REG_IP` varchar(64) DEFAULT NULL COMMENT '작성자 아이피',
    `UPD_USER_ID` bigint(20) DEFAULT NULL COMMENT '수정자 아이디',
    `UPD_DATE` datetime DEFAULT NULL COMMENT '수정일',
    `UPD_IP` varchar(20) DEFAULT NULL COMMENT '수정자 아이피',
    `ORG_BOARD_ID` int(20) DEFAULT NULL COMMENT '기존 BOARD_ID',
    `ORG_BOARD_SEQ` int(20) DEFAULT NULL COMMENT '기존 시퀀스',
    `THUMB_IMAGE_FILE_PATH` varchar(100) DEFAULT NULL COMMENT '썸네일 파일 PATH',
    `EXTRA_FIELD_FIRST_VALUE` varchar(100) DEFAULT NULL COMMENT '추가 필드1 값',
    `THUMB_IMAGE_FILE_NAME` varchar(100) DEFAULT NULL COMMENT '썸네일 파일명',
    `YOUTUBE_CONTENTS` varchar(500) DEFAULT NULL COMMENT '유튜브 콘텐츠',
    PRIMARY KEY (`BOARD_CONTENTS_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='게시물';

DROP TABLE IF EXISTS `bs_board_file`;
CREATE TABLE IF NOT EXISTS `bs_board_file` (
    `BOARD_FILE_ID` varchar(20) NOT NULL COMMENT '파일 ID',
    `BOARD_MASTER_ID` varchar(20) NOT NULL COMMENT '게시물 ID',
    `BOARD_CONTENTS_ID` varchar(20) NOT NULL COMMENT '게시물 ID',
    `FILE_NAME` varchar(800) DEFAULT NULL COMMENT '첨부파일명',
    `FILE_PATH` varchar(800) DEFAULT NULL COMMENT '첨부파일 경로',
    `FILE_SIZE` int(20) DEFAULT NULL COMMENT '첨부파일 크기',
    `ORG_FILE_SEQ` int(10) DEFAULT NULL COMMENT '기존 파일 시퀀스',
    PRIMARY KEY (`BOARD_FILE_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='게시물 첨부파일';

DROP TABLE IF EXISTS `bs_board_image`;
CREATE TABLE IF NOT EXISTS `bs_board_image` (
    `BOARD_IMAGE_ID` varchar(20) NOT NULL COMMENT '이미지 ID',
    `FILE_PATH` varchar(800) DEFAULT NULL COMMENT '첨부파일 경로',
    `FILE_SIZE` int(20) DEFAULT NULL COMMENT '첨부파일 크기',
    PRIMARY KEY (`BOARD_IMAGE_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='게시물 이미지';

DROP TABLE IF EXISTS `bs_board_master`;
CREATE TABLE IF NOT EXISTS `bs_board_master` (
    `BOARD_MASTER_ID` varchar(20) NOT NULL COMMENT '게시판 ID',
    `BOARD_TYPE` varchar(50) DEFAULT NULL COMMENT '게시판 형태',
    `TITLE` varchar(200) DEFAULT NULL COMMENT '게시판 이름',
    `COMMENT_YN` char(1) DEFAULT 'Y' COMMENT '댓글 사용 여부',
    `SEC_YN` char(1) DEFAULT 'N' COMMENT '비밀글 사용여부',
    `ATTACH_YN` char(1) DEFAULT 'Y' COMMENT '첨부파일 사용여부',
    `HOT_YN` char(1) DEFAULT 'N' COMMENT '상단고정 사용여부',
    `LIKE_YN` char(1) DEFAULT 'N' COMMENT '좋아요 사용여부',
    `DISPLAY_YN` char(1) DEFAULT 'N' COMMENT '노출 사용 여부',
    `FIX_YN` char(1) DEFAULT 'N' COMMENT '구분 사용여부',
    `DIV_CODE` varchar(30) DEFAULT NULL COMMENT '분류 코드',
    `SHARED_BOARD_MASTER_ID` varchar(100) DEFAULT NULL COMMENT '공유 게시판 ID',
    `ETC` varchar(100) DEFAULT '' COMMENT '기타',
    `REG_USER_ID` bigint(20) DEFAULT NULL COMMENT '생성자 아이디',
    `REG_DATE` datetime DEFAULT NULL COMMENT '생성일',
    `REG_IP` varchar(20) DEFAULT NULL COMMENT '생성자 아이피',
    `UPD_USER_ID` bigint(20) DEFAULT NULL COMMENT '수정자 아이디',
    `UPD_DATE` datetime DEFAULT NULL COMMENT '수정일',
    `UPD_IP` varchar(20) DEFAULT NULL COMMENT '수정자 아이피',
    `ORG_BOARD_ID` int(20) DEFAULT NULL COMMENT '기존 게시물 아이디',
    `BOARD_DETAIL_TYPE` varchar(1) NOT NULL DEFAULT 'N' COMMENT '게시판 상세 타입 (N:일반, T:썸네일, C:카드형, Y:유튜브형)',
    `EXTRA_FIELD_FIRST_USE_YN` varchar(1) NOT NULL DEFAULT 'N' COMMENT '공통 레이블 사용 여부',
    `EXTRA_FIELD_FIRST_LABEL` varchar(30) DEFAULT NULL COMMENT '공통 레이블',
    `EXTRA_FIELD_FIRST_CODE` varchar(30) DEFAULT NULL COMMENT '레이블값',
    `DELETE_YN` varchar(1) DEFAULT 'N' COMMENT '삭제 여부',
    PRIMARY KEY (`BOARD_MASTER_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='게시판 관리';

/* 파일 */
DROP TABLE IF EXISTS `bs_file_download_log`;
CREATE TABLE IF NOT EXISTS `bs_file_download_log` (
    `LOG_ID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '파일 다운로드 로그 ID',
    `TYPE` varchar(1) NOT NULL COMMENT '타입 (B:게시물, F:마이퓨처컴퍼니, R:마이리얼커리어)',
    `CONTENTS_ID` varchar(20) DEFAULT NULL COMMENT '콘텐츠 ID',
    `USER_ID` int(11) DEFAULT NULL COMMENT '사용자 ID',
    `FILE_DOWNLOAD_DATE` datetime DEFAULT NULL COMMENT '파일 다운로드 날짜',
    `FILE_TYPE` varchar(15) NOT NULL COMMENT '파일 타입',
    PRIMARY KEY (`LOG_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='파일 다운로드 로그';

DROP TABLE IF EXISTS `bs_like`;
CREATE TABLE IF NOT EXISTS `bs_like` (
    `LIKE_ID` varchar(20) NOT NULL COMMENT '좋아요 ID',
    `TYPE` varchar(1) NOT NULL COMMENT '타입 (B:게시물, F:마이퓨처컴퍼니, R:마이리얼커리어)',
    `REF_ID` varchar(20) NOT NULL COMMENT '게시물 ID',
    `REG_USER_ID` bigint(20) DEFAULT NULL COMMENT '작성자 아이디',
    `REG_DATE` datetime DEFAULT NULL COMMENT '작성일',
    `REG_IP` varchar(64) DEFAULT NULL COMMENT '작성자 아이피',
    PRIMARY KEY (`LIKE_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='좋아요';

DROP TABLE IF EXISTS `bs_login_log`;
CREATE TABLE IF NOT EXISTS `bs_login_log` (
    `LOGIN_LOG_ID` varchar(20) NOT NULL COMMENT '로그인 로그 ID',
    `USER_ID` varchar(100) NOT NULL COMMENT '유저 ID',
    `TYPE` varchar(30) NOT NULL COMMENT '타입 (일반 로그인, 인스타그램, 페이스북 등)',
    `IP` varchar(30) NOT NULL COMMENT 'IP',
    `DATE` datetime NOT NULL COMMENT '날짜',
    PRIMARY KEY (`LOGIN_LOG_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='로그인 로그';

DROP TABLE IF EXISTS `bs_main_access_log`;
CREATE TABLE IF NOT EXISTS `bs_main_access_log` (
    `LOG_ID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '접근 로그 ID',
    `USER_ID` int(11) DEFAULT NULL COMMENT '사용자 ID',
    `ACCESS_IP` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '접근 IP',
    `ACCESS_DATE` datetime DEFAULT NULL COMMENT '접근 날짜',
    PRIMARY KEY (`LOG_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='메인 접근 로그';

DROP TABLE IF EXISTS `bs_main_notice`;
CREATE TABLE IF NOT EXISTS `bs_main_notice` (
    `MAIN_NOTICE_ID` varchar(20) NOT NULL COMMENT '메인공지 ID',
    `SUBJECT` varchar(100) DEFAULT NULL COMMENT '제목',
    `CONTENTS` text DEFAULT NULL COMMENT '내용',
    `DISPLAY_YN` char(1) DEFAULT 'Y' COMMENT '노출 여부',
    `DISPLAY_START` datetime DEFAULT NULL COMMENT '게시 시작일',
    `DISPLAY_END` datetime DEFAULT NULL COMMENT '게시 종료일',
    `STATE` varchar(5) DEFAULT NULL COMMENT '상태',
    `REG_USER_ID` bigint(20) DEFAULT NULL COMMENT '생성자 아이디',
    `REG_DATE` datetime DEFAULT NULL COMMENT '작성일',
    `REG_IP` varchar(64) DEFAULT NULL COMMENT '작성자 아이피',
    `UPD_USER_ID` bigint(20) DEFAULT NULL COMMENT '수정자 아이디',
    `UPD_DATE` datetime DEFAULT NULL COMMENT '수정일',
    `UPD_IP` varchar(20) DEFAULT NULL COMMENT '수정자 아이피',
    `CONTENT_ID` varchar(12) DEFAULT NULL COMMENT '콘텐츠 ID',
    `CONTENT_URL` varchar(500) DEFAULT NULL COMMENT '콘텐츠 URL',
    `FILE_PATH` varchar(200) DEFAULT NULL COMMENT '첨부파일경로',
    `FILE_NM` varchar(200) DEFAULT NULL COMMENT '첨부파일명',
    PRIMARY KEY (`MAIN_NOTICE_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='메인 공지';

DROP TABLE IF EXISTS `bs_main_notice_content_mapping`;
CREATE TABLE IF NOT EXISTS `bs_main_notice_content_mapping` (
    `MAIN_NOTICE_CONTENT_MAPPING_ID` varchar(20) NOT NULL COMMENT '메인 공지 콘텐츠 매핑 ID',
    `MAIN_NOTICE_ID` varchar(20) NOT NULL COMMENT '메인공지 ID',
    `CONTENT_ID` varchar(12) NOT NULL COMMENT 'CMS 콘텐츠 ID',
    PRIMARY KEY (`MAIN_NOTICE_CONTENT_MAPPING_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='메인공지 콘텐츠 매핑';

DROP TABLE IF EXISTS `bs_menu`;
CREATE TABLE IF NOT EXISTS `bs_menu` (
    `MENU_ID` varchar(20) NOT NULL COMMENT '메뉴 ID',
    `PARENT_MENU_ID` varchar(20) DEFAULT NULL COMMENT '상위 메뉴 ID',
    `MENU_NAME` varchar(30) DEFAULT NULL COMMENT '메뉴명',
    `MENU_DESCRIPTION` varchar(90) DEFAULT NULL COMMENT '메뉴 설명',
    `MENU_ORDER` int(11) DEFAULT NULL COMMENT '순서',
    `MENU_PATH` varchar(400) DEFAULT NULL COMMENT '메뉴 PATH',
    `DEPTH` int(11) DEFAULT 1 COMMENT '메뉴 뎁스',
    `MENU_DIV` varchar(15) DEFAULT NULL COMMENT '메뉴 구분 (MAIN:메인메뉴, MYPAGE:마이페이지)',
    `TYPE` varchar(10) DEFAULT NULL COMMENT '타입 (U : URL / B : 게시판)',
    `URL` varchar(400) DEFAULT NULL COMMENT 'URL',
    `BOARD_MASTER_ID` varchar(20) DEFAULT NULL COMMENT '게시판 ID',
    `USE_YN` char(1) DEFAULT NULL COMMENT '사용여부',
    `REG_USER_ID` bigint(20) DEFAULT NULL COMMENT '생성자 아이디',
    `REG_DATE` datetime DEFAULT NULL COMMENT '생성일',
    `REG_IP` varchar(30) DEFAULT NULL COMMENT '생성자 아이피',
    `UPD_USER_ID` bigint(20) DEFAULT NULL COMMENT '수정자 아이디',
    `UPD_DATE` datetime DEFAULT NULL COMMENT '수정일',
    `UPD_IP` varchar(20) DEFAULT NULL COMMENT '수정자 아이피',
    `ETC` varchar(100) DEFAULT NULL COMMENT '기타',
    PRIMARY KEY (`MENU_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='메뉴 관리';

DROP TABLE IF EXISTS `bs_menu_authority`;
CREATE TABLE IF NOT EXISTS `bs_menu_authority` (
    `MENU_AUTHORITY_ID` varchar(20) NOT NULL COMMENT '메뉴 권한 ID',
    `AUTHORITY_ID` varchar(20) NOT NULL COMMENT '권한 ID',
    `MENU_ID` varchar(20) NOT NULL COMMENT '메뉴 ID',
    `AUTHORITY` int(11) NOT NULL DEFAULT 0 COMMENT '권한 (0:없음 / 1:조회 / 2:등록 / 4:관리)',
    PRIMARY KEY (`MENU_AUTHORITY_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='메뉴 권한';

DROP TABLE IF EXISTS `bs_view_log`;
CREATE TABLE IF NOT EXISTS `bs_view_log` (
    `VIEW_LOG_ID` varchar(20) NOT NULL COMMENT '뷰 로그 ID',
    `TYPE` varchar(1) NOT NULL COMMENT '타입 (B:게시물, F:마이퓨처컴퍼니, R:마이리얼커리어)',
    `BOARD_MASTER_ID` varchar(20) DEFAULT NULL COMMENT '게시판 ID (게시물일 때만 존재)',
    `REF_ID` varchar(20) NOT NULL COMMENT '참조 ID',
    `USER_ID` bigint(20) unsigned DEFAULT NULL COMMENT '로그인 아이디',
    `IP` varchar(20) DEFAULT NULL COMMENT '아이피',
    `DATE` datetime DEFAULT NULL COMMENT '날짜',
    PRIMARY KEY (`VIEW_LOG_ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='뷰 로그';

DROP TABLE IF EXISTS `login_log_tbl`;
CREATE TABLE IF NOT EXISTS `login_log_tbl` (
    `LOG_SEQ` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '로그_순번',
    `USER_ID` varchar(20) NOT NULL COMMENT '사용자_아이디',
    `LOG_DIV` varchar(2) NOT NULL COMMENT '로그_구분',
    `IP` varchar(20) DEFAULT NULL COMMENT '아이피',
    `REG_DT` datetime NOT NULL DEFAULT current_timestamp() COMMENT '등록_일시',
    PRIMARY KEY (`LOG_SEQ`)
    ) ENGINE=InnoDB AUTO_INCREMENT=10920 DEFAULT CHARSET=utf8 COMMENT='로그인_로그';

DROP TABLE IF EXISTS `noti_log_tbl`;
CREATE TABLE IF NOT EXISTS `noti_log_tbl` (
                                              `NOTI_EVT_SEQ` decimal(10,0) NOT NULL COMMENT '알림_이벤트_순번',
    `SMS_SEQ` decimal(10,0) NOT NULL COMMENT 'SMS_순번'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='알림_로그';
DROP TABLE IF EXISTS `noti_target_user_tbl`;
CREATE TABLE IF NOT EXISTS `noti_target_user_tbl` (
                                                      `NOTI_EVT_SEQ` decimal(10,0) NOT NULL COMMENT '알림_이벤트_순번',
    `USER_ID` varchar(20) NOT NULL COMMENT '사용자_아이디'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='알림_대상_사용자';