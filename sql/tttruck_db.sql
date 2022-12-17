-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.
DROP DATABASE IF EXISTS tttruck_db;
CREATE DATABASE tttruck_db;
use tttruck_db;
-- tt_user Table Create SQL
-- 테이블 생성 SQL - tt_user
-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- tt_user Table Create SQL
-- 테이블 생성 SQL - tt_user
CREATE TABLE tt_user
(
    `USER_ID`                  bigint(20) unsigned    NOT NULL    AUTO_INCREMENT COMMENT '유저 ID',
    `USERNAME`                 varchar(128)           NOT NULL    COMMENT '아이디(이메일)',
    `PASSWORD`                 varchar(500)           NOT NULL    COMMENT '패스워드',
    `ACCESSTOKEN`              varchar(500)           NOT NULL    COMMENT '접근 토큰',
    `WASTE_SAVINGS`            bigint(30)             NOT NULL    DEFAULT 0 COMMENT '폐기절감량',
    `GROUP`                    varchar(5)             NOT NULL    COMMENT '사용자 그룹 (01: 일반, 99:관리자)',
    `NAME`                     varchar(300)           NOT NULL    COMMENT '이름',
    `PROFILE_IMAGE`            varchar(300)           NULL        DEFAULT NULL COMMENT '프로필 이미지',
    `INTERIOR_COMPANY_TF`      varchar(1)             NOT NULL    DEFAULT 'F' COMMENT '인테리어 회사 소속 여부',
    `INTERIOR_COMPANY_NAME`    varchar(100)           NULL        COMMENT '인테리어 회사 이름 (NULL :무소속)',
    `NICKNAME`                 varchar(30)            NULL        DEFAULT NULL COMMENT '닉네임',
    `PHONE_NUMBER`             varchar(20)            NOT NULL    COMMENT '전화번호',
    `BIRTHDAY`                 varchar(10)            NULL        DEFAULT NULL COMMENT '생일 (YYYYMMDD)',
    `GENDER`                   INT(2)                 NULL        DEFAULT NULL COMMENT '성별 (남 : 0 ; 여 : 1, etc : 9)',
    `ZIP_CODE`                 varchar(100)           NULL        DEFAULT NULL COMMENT '우편번호',
    `ADDRESS`                  varchar(200)           NULL        DEFAULT NULL COMMENT '주소',
    `DETAIL_ADDRESS`           varchar(200)           NULL        DEFAULT NULL COMMENT '상세 주소',
    `JOIN_STATE`               varchar(5)             NULL        DEFAULT NULL COMMENT '가입 상태 (01:승인대기, 02:승인거부, 03:관리자승인대기, 04:완료)',
    `RESTING_TF`               varchar(1)             NOT NULL    DEFAULT 'F' COMMENT '휴면 여부',
    `LEAVE_TF`                 varchar(1)             NOT NULL    DEFAULT 'F' COMMENT '탈퇴 여부',
    `PHONE_AUTH_CODE`          varchar(6)             NULL        DEFAULT NULL COMMENT '휴대폰 인증코드',
    `PHONE_AUTH_DATE`          datetime               NULL        DEFAULT NULL COMMENT '휴대폰 인증유효 시간',
    `PHONE_AUTH_SUCCEED_DATE`  datetime               NULL        DEFAULT NULL COMMENT '휴대폰 인증 완료 시간',
    `PHONE_AUTH_TF`            varchar(1)             NOT NULL    DEFAULT 'F' COMMENT '휴대폰 인증 여부',
    `REG_DATE`                 datetime               NULL        DEFAULT current_timestamp() COMMENT '가입일',
    `UPD_DATE`                 datetime               NULL        DEFAULT current_timestamp() COMMENT '수정일',
    `JOIN_DATE`                datetime               NULL        DEFAULT NULL COMMENT '가입 승인 날짜',
    `JOIN_PERMIT_USER_ID`      bigint(20) unsigned    NULL        DEFAULT NULL COMMENT '가입 승인해준 USER_ID',
    `JOIN_AGREE`               varchar(10)            NULL        DEFAULT NULL COMMENT '가입 약관 동의 여부(0: 개인정보 수집 및 이용동의 1: 개인정보 수집 목적 내 제3자 제공 동의 2: 14세 미만 법정 대리인 동의)',
    PRIMARY KEY (USER_ID)
);

-- 테이블 Comment 설정 SQL - tt_user
ALTER TABLE tt_user COMMENT '회원정보';

-- Foreign Key 설정 SQL - tt_user(JOIN_PERMIT_USER_ID) -> tt_user(USER_ID)
ALTER TABLE tt_user
    ADD CONSTRAINT FK_tt_user_JOIN_PERMIT_USER_ID_tt_user_USER_ID FOREIGN KEY (JOIN_PERMIT_USER_ID)
        REFERENCES tt_user (USER_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_user(JOIN_PERMIT_USER_ID)
-- ALTER TABLE tt_user
-- DROP FOREIGN KEY FK_tt_user_JOIN_PERMIT_USER_ID_tt_user_USER_ID;


-- tt_product Table Create SQL
-- 테이블 생성 SQL - tt_product
CREATE TABLE tt_product
(
    `PRODUCT_ID`             bigint(20) unsigned    NOT NULL    AUTO_INCREMENT COMMENT '상품 ID',
    `SUBJECT`                VARCHAR(100)           NOT NULL    COMMENT '제목',
    `PRIORITY`  INT(10)                NOT NULL    DEFAULT 999 COMMENT '정렬 우선순위',
    `PRODUCT_CATEGORY_ID`    bigint(20) unsigned    NOT NULL    COMMENT '상품 카테고리',
    `PRODUCT_PRICE`          bigint(30) unsigned    NOT NULL    COMMENT '가격',
    `PRODUCT_SIZE`           VARCHAR(100)           NOT NULL    COMMENT '규격 ( 분위별 규격 )',
    `PRODUCT_WEIGHT`         INT(10) unsigned       NOT NULL    COMMENT '상품 무게',
    `CONTENTS`               TEXT                   NOT NULL    COMMENT '내용',
    `PRODUCT_STATUS`         INT(5)                 NOT NULL    COMMENT '판매 상태 구분 ( 0: 판매중, 99: 거래완료)',
    `SELLER_USER_ID`         bigint(20) unsigned    NULL        COMMENT '판매 사용자 ID',
    `SELLER_USER_IPv4`       INT UNSIGNED           NULL        COMMENT '판매자 IPv4',
    `SELLER_USER_IPv6`       BINARY(16)             NULL        COMMENT '판매자 IPv6',
    `UPLOAD_DATE`            DATETIME               NULL        COMMENT '판매 업로드일',
    `SHARED_TF`              VARCHAR(1)             NULL        COMMENT '공유 여부',
    `TAG`                    varchar(300)           NULL        DEFAULT NULL COMMENT '태그',
    `ADDRESS`                varchar(200)           NULL        COMMENT '장소',
    `UPDATE_USER_ID`         bigint(20) unsigned    NULL        COMMENT '수정 사용자 ID',
    `UPDATE_USER_IPv4`       INT UNSIGNED           NULL        COMMENT '수정 사용자 IPv4',
    `UPDATE_USER_IPv6`       BINARY(16)             NULL        COMMENT '수정 사용자 IPv6',
    `UPDATE_DATE`            DATETIME               NULL        COMMENT '수정일',
    PRIMARY KEY (PRODUCT_ID)
);

-- 테이블 Comment 설정 SQL - tt_product
ALTER TABLE tt_product COMMENT '인테리어 소모품 상품';

-- Foreign Key 설정 SQL - tt_product(SELLER_USER_ID) -> tt_user(USER_ID)
ALTER TABLE tt_product
    ADD CONSTRAINT FK_tt_product_SELLER_USER_ID_tt_user_USER_ID FOREIGN KEY (SELLER_USER_ID)
        REFERENCES tt_user (USER_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_product(SELLER_USER_ID)
-- ALTER TABLE tt_product
-- DROP FOREIGN KEY FK_tt_product_SELLER_USER_ID_tt_user_USER_ID;


-- tt_content Table Create SQL
-- 테이블 생성 SQL - tt_content
CREATE TABLE tt_content
(
    `CONTENT_ID`    bigint(20) unsigned    NOT NULL    AUTO_INCREMENT COMMENT '컨텐츠 ID',
    `CONTENT_TYPE`  varchar(20)            NULL        COMMENT '컨텐츠 타입',
    PRIMARY KEY (CONTENT_ID)
);

-- 테이블 Comment 설정 SQL - tt_content
ALTER TABLE tt_content COMMENT 'base contents';


-- tt_authority Table Create SQL
-- 테이블 생성 SQL - tt_authority
CREATE TABLE tt_authority
(
    `AUTHORITY_ID`     bigint(20) unsigned    NOT NULL    COMMENT '권한 ID',
    `AUTHORITY_NAME`   varchar(100)           NOT NULL    COMMENT '권한명',
    `DEFAULT_TF`       varchar(1)             NOT NULL    DEFAULT 'F' COMMENT '기본 권한 여부',
    `DESCRIPTION`      varchar(300)           NULL        DEFAULT NULL COMMENT '설명',
    `USE_TF`           varchar(1)             NOT NULL    DEFAULT 'T' COMMENT '사용 여부',
    `REG_USER_ID`      bigint(20) unsigned    NULL        DEFAULT NULL COMMENT '생성자 아이디',
    `REG_DATE`         datetime               NULL        DEFAULT NULL COMMENT '생성일',
    `REG_IP`           varchar(30)            NULL        DEFAULT NULL COMMENT '생성자 아이피',
    `UPD_USER_ID`      bigint(20) unsigned    NULL        DEFAULT NULL COMMENT '수정자 아이디',
    `UPD_DATE`         datetime               NULL        DEFAULT NULL COMMENT '수정일',
    `UPD_IP`           varchar(30)            NULL        DEFAULT NULL COMMENT '수정자 아이피',
    `AUTHORITY_LEVEL`  INT(10)                NULL        DEFAULT 1 COMMENT '권한 레벨 ( 일반 : 1, 마스터 : 99)',
    PRIMARY KEY (AUTHORITY_ID)
);

-- 테이블 Comment 설정 SQL - tt_authority
ALTER TABLE tt_authority COMMENT '권한';

-- Foreign Key 설정 SQL - tt_authority(REG_USER_ID) -> tt_user(USER_ID)
ALTER TABLE tt_authority
    ADD CONSTRAINT FK_tt_authority_REG_USER_ID_tt_user_USER_ID FOREIGN KEY (REG_USER_ID)
        REFERENCES tt_user (USER_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_authority(REG_USER_ID)
-- ALTER TABLE tt_authority
-- DROP FOREIGN KEY FK_tt_authority_REG_USER_ID_tt_user_USER_ID;

-- Foreign Key 설정 SQL - tt_authority(UPD_USER_ID) -> tt_user(USER_ID)
ALTER TABLE tt_authority
    ADD CONSTRAINT FK_tt_authority_UPD_USER_ID_tt_user_USER_ID FOREIGN KEY (UPD_USER_ID)
        REFERENCES tt_user (USER_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_authority(UPD_USER_ID)
-- ALTER TABLE tt_authority
-- DROP FOREIGN KEY FK_tt_authority_UPD_USER_ID_tt_user_USER_ID;


-- tt_api_list Table Create SQL
-- 테이블 생성 SQL - tt_api_list
CREATE TABLE tt_api_list
(
    `API_ID`            bigint(20) unsigned    NOT NULL    AUTO_INCREMENT COMMENT 'API ID',
    `API_ROUTES`        varchar(100)           NULL        COMMENT 'API Routes',
    `API_AUTHORITY_ID`  bigint(20) unsigned    NULL        COMMENT 'API 권한 ID',
    `API_NAME`          varchar(100)           NULL        COMMENT 'API 이름',
    `API_COMMENT`       varchar(300)           NULL        COMMENT 'API 코멘트',
    `API_PARAMS`        text                   NULL        COMMENT 'API 피라미터',
    `API_METHOD`        varchar(100)           NULL        COMMENT 'API 메소드',
    `API_VERSION`       varchar(100)           NULL        COMMENT 'API 버전',
    PRIMARY KEY (API_ID)
);

-- 테이블 Comment 설정 SQL - tt_api_list
ALTER TABLE tt_api_list COMMENT 'REST API 정보';

-- Foreign Key 설정 SQL - tt_api_list(API_AUTHORITY_ID) -> tt_authority(AUTHORITY_ID)
ALTER TABLE tt_api_list
    ADD CONSTRAINT FK_tt_api_list_API_AUTHORITY_ID_tt_authority_AUTHORITY_ID FOREIGN KEY (API_AUTHORITY_ID)
        REFERENCES tt_authority (AUTHORITY_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_api_list(API_AUTHORITY_ID)
-- ALTER TABLE tt_api_list
-- DROP FOREIGN KEY FK_tt_api_list_API_AUTHORITY_ID_tt_authority_AUTHORITY_ID;


-- tt_file Table Create SQL
-- 테이블 생성 SQL - tt_file
CREATE TABLE tt_file
(
    `FILE_ID`              bigint(20) unsigned    NOT NULL    COMMENT '파일 ID',
    `CONTENT_ID`           bigint(20) unsigned    NOT NULL    COMMENT '컨텐츠 ID',
    `CONTENT_TYPE`         varchar(20)            NULL        COMMENT '컨텐츠 타입',
    `FILE_NAME`            varchar(800)           NULL        DEFAULT NULL COMMENT '첨부파일명',
    `FILE_PATH`            varchar(800)           NULL        DEFAULT NULL COMMENT '첨부파일 경로',
    `FILE_SIZE`            int(20)                NULL        DEFAULT NULL COMMENT '첨부파일 크기',
    `ORG_FILE_SEQ`         int(10)                NULL        DEFAULT NULL COMMENT '기존 파일 시퀀스',
    `FILE_DOWNLOAD_COUNT`  int(10)                NOT NULL    DEFAULT 0 COMMENT '다운로드 횟수',
    `FILE_URL`             varchar(500)           NULL        DEFAULT NULL COMMENT '다운로드 URL',
    `THUMB_PATH`           varchar(800)           NULL        DEFAULT NULL COMMENT '썸네일 경로',
    `FILE_TYPE`            varchar(20)            NULL        COMMENT '파일 타입',
    PRIMARY KEY (FILE_ID)
);

-- 테이블 Comment 설정 SQL - tt_file
ALTER TABLE tt_file COMMENT '전체 컨텐츠 첨부 파일';

-- Foreign Key 설정 SQL - tt_file(CONTENT_ID) -> tt_content(CONTENT_ID)
ALTER TABLE tt_file
    ADD CONSTRAINT FK_tt_file_CONTENT_ID_tt_content_CONTENT_ID FOREIGN KEY (CONTENT_ID)
        REFERENCES tt_content (CONTENT_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_file(CONTENT_ID)
-- ALTER TABLE tt_file
-- DROP FOREIGN KEY FK_tt_file_CONTENT_ID_tt_content_CONTENT_ID;


-- tt_notice_master Table Create SQL
-- 테이블 생성 SQL - tt_notice_master
CREATE TABLE tt_notice_master
(
    `NOTICE_MASTER_ID`         bigint(20) unsigned    NOT NULL    COMMENT '소식 카테고리 ID',
    `TITLE`                    varchar(200)           NULL        DEFAULT NULL COMMENT '소식 카테고리 이름',
    `COMMENT_TF`               VARCHAR(1)             NULL        DEFAULT 'T' COMMENT '댓글 사용 여부',
    `SECRET_TF`                VARCHAR(1)             NULL        DEFAULT 'F' COMMENT '비밀글 사용 여부',
    `ATTACH_TF`                VARCHAR(1)             NULL        DEFAULT 'T' COMMENT '첨부파일 사용 여부',
    `DISPLAY_TF`               VARCHAR(1)             NULL        DEFAULT 'F' COMMENT '노출 사용 여부',
    `DIV_CODE`                 varchar(30)            NULL        DEFAULT NULL COMMENT '분류 코드',
    `CREATE_USER_ID`           bigint(20) unsigned    NULL        DEFAULT NULL COMMENT '생성 사용자 ID',
    `CREATE_DATE`              DATETIME               NULL        DEFAULT NULL COMMENT '생성일',
    `REG_IPv4`                 INT UNSIGNED           NULL        DEFAULT NULL COMMENT '생성자 IPv4',
    `REG_IPv6`                 BINARY(16)             NULL        DEFAULT NULL COMMENT '생성자 IPv6',
    `UPDATE_USER_ID`           bigint(20) unsigned    NULL        DEFAULT NULL COMMENT '수정 사용자 ID',
    `UPDATE_DATE`              datetime               NULL        DEFAULT NULL COMMENT '수정일',
    `UPDATE_IPv4`              INT UNSIGNED           NULL        DEFAULT NULL COMMENT '수정자 IPv4',
    `UPDATE_IPv6`              BINARY(16)             NULL        DEFAULT NULL COMMENT '수정자 IPv6',
    `EXTRA_FIELD_FIRST_LABEL`  varchar(30)            NULL        DEFAULT NULL COMMENT '공통 레이블',
    `EXTRA_FIELD_FIRST_CODE`   varchar(30)            NULL        DEFAULT NULL COMMENT '레이블 값',
    `DELETE_TF`                varchar(1)             NULL        DEFAULT 'F' COMMENT '삭제 여부',
    PRIMARY KEY (NOTICE_MASTER_ID)
);

-- 테이블 Comment 설정 SQL - tt_notice_master
ALTER TABLE tt_notice_master COMMENT '소식 카테고리 관리';

-- Foreign Key 설정 SQL - tt_notice_master(CREATE_USER_ID) -> tt_user(USER_ID)
ALTER TABLE tt_notice_master
    ADD CONSTRAINT FK_tt_notice_master_CREATE_USER_ID_tt_user_USER_ID FOREIGN KEY (CREATE_USER_ID)
        REFERENCES tt_user (USER_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_notice_master(CREATE_USER_ID)
-- ALTER TABLE tt_notice_master
-- DROP FOREIGN KEY FK_tt_notice_master_CREATE_USER_ID_tt_user_USER_ID;

-- Foreign Key 설정 SQL - tt_notice_master(UPDATE_USER_ID) -> tt_user(USER_ID)
ALTER TABLE tt_notice_master
    ADD CONSTRAINT FK_tt_notice_master_UPDATE_USER_ID_tt_user_USER_ID FOREIGN KEY (UPDATE_USER_ID)
        REFERENCES tt_user (USER_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_notice_master(UPDATE_USER_ID)
-- ALTER TABLE tt_notice_master
-- DROP FOREIGN KEY FK_tt_notice_master_UPDATE_USER_ID_tt_user_USER_ID;


-- tt_product_update_log Table Create SQL
-- 테이블 생성 SQL - tt_product_update_log
CREATE TABLE tt_product_update_log
(
    `PRODUCT_ID`             bigint(20) unsigned     NULL        COMMENT '상품 ID',
    `PRODUCT_UPDATE_LOG_ID`  bigint(20) unsigned     NOT NULL    AUTO_INCREMENT COMMENT '상품  로그 ID',
    `SUBJECT`                VARCHAR(100)            NOT NULL    COMMENT '제목',
    `PRODUCT_CATEGORY_ID`    bigint(20) unsigned     NOT NULL    COMMENT '상품 카테고리',
    `PRODUCT_PRICE`          bigint(100) unsigned    NOT NULL    COMMENT '가격',
    `SIZE_DIV`               INT(10) unsigned        NOT NULL    COMMENT '규격 ( 분위별 규격 )',
    `CONTENTS`               TEXT                    NOT NULL    COMMENT '내용',
    `PRODUCT_STATUS`         INT(5)                  NOT NULL    COMMENT '판매 상태 구분 ( 0: 판매중, 99: 거래완료)',
    `SELLER_USER_ID`         bigint(20) unsigned     NULL        COMMENT '판매 사용자 ID',
    `SELLER_USER_IPv4`       INT UNSIGNED            NULL        COMMENT '판매자 IPv4',
    `SELLER_USER_IPv6`       BINARY(16)              NULL        COMMENT '판매자 IPv6',
    `UPLOAD_DATE`            DATETIME                NULL        COMMENT '판매 업로드일',
    `SHARED_TF`              VARCHAR(1)              NULL        COMMENT '공유 여부',
    `TAG`                    varchar(300)            NULL        DEFAULT NULL COMMENT '태그',
    `ADDRESS`                varchar(200)            NULL        COMMENT '장소',
    `UPDATE_USER_ID`         bigint(20) unsigned     NULL        COMMENT '수정 사용자 ID',
    `UPDATE_USER_IPv4`       INT UNSIGNED            NULL        COMMENT '수정 사용자 IPv4',
    `UPDATE_USER_IPv6`       BINARY(16)              NULL        COMMENT '수정 사용자 IPv6',
    `UPDATE_DATE`            DATETIME                NULL        COMMENT '수정일',
    PRIMARY KEY (PRODUCT_UPDATE_LOG_ID)
);

-- 테이블 Comment 설정 SQL - tt_product_update_log
ALTER TABLE tt_product_update_log COMMENT '인테리어 소모품 상품 업데이트 로그';

-- Foreign Key 설정 SQL - tt_product_update_log(PRODUCT_ID) -> tt_product(PRODUCT_ID)
ALTER TABLE tt_product_update_log
    ADD CONSTRAINT FK_tt_product_update_log_PRODUCT_ID_tt_product_PRODUCT_ID FOREIGN KEY (PRODUCT_ID)
        REFERENCES tt_product (PRODUCT_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_product_update_log(PRODUCT_ID)
-- ALTER TABLE tt_product_update_log
-- DROP FOREIGN KEY FK_tt_product_update_log_PRODUCT_ID_tt_product_PRODUCT_ID;


-- tt_sns_auth Table Create SQL
-- 테이블 생성 SQL - tt_sns_auth
CREATE TABLE tt_sns_auth
(
    `SNS_AUTH_ID`    bigint(20) unsigned    NOT NULL    AUTO_INCREMENT COMMENT 'SNS AUTH ID',
    `USER_ID`        bigint(20) unsigned    NULL        DEFAULT NULL COMMENT '사용자 ID',
    `SNS_TYPE`       varchar(20)            NOT NULL    COMMENT 'SNS 타입',
    `APP_ID`         varchar(128)           NOT NULL    COMMENT '앱 사용자 고유ID (일련번호)',
    `PASSWORD`       varchar(500)           NULL        DEFAULT NULL COMMENT 'SNS 패스워드',
    `APP_USER_NAME`  varchar(100)           NOT NULL    COMMENT '앱 사용자 Username (ex. 앱 아이디, 앱 별명)',
    `SNS_TOKEN_KEY`  varchar(500)           NULL        DEFAULT NULL COMMENT 'SNS 인증 토큰 키',
    `NICKNAME`       varchar(500)           NULL        DEFAULT NULL COMMENT '닉네임',
    `RETURN_DATA`    mediumtext             NULL        DEFAULT NULL COMMENT '롤백 URL 반환값',
    `REGISTER_DATE`  DATETIME               NULL        DEFAULT current_timestamp() COMMENT '가입일',
    `UPDATE_DATE`    DATETIME               NULL        DEFAULT current_timestamp() COMMENT '수정일',
    PRIMARY KEY (SNS_AUTH_ID)
);

-- Foreign Key 설정 SQL - tt_sns_auth(USER_ID) -> tt_user(USER_ID)
ALTER TABLE tt_sns_auth
    ADD CONSTRAINT FK_tt_sns_auth_USER_ID_tt_user_USER_ID FOREIGN KEY (USER_ID)
        REFERENCES tt_user (USER_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_sns_auth(USER_ID)
-- ALTER TABLE tt_sns_auth
-- DROP FOREIGN KEY FK_tt_sns_auth_USER_ID_tt_user_USER_ID;


-- tt_nickname_log Table Create SQL
-- 테이블 생성 SQL - tt_nickname_log
CREATE TABLE tt_nickname_log
(
    `NICKNAME_LOG_ID`  bigint(20) unsigned    NOT NULL    COMMENT '닉네임 변경 로그 ID',
    `ORIGIN_NICKNAME`  varchar(30)            NOT NULL    COMMENT '기존 닉네임',
    `CHANGE_NICKNAME`  varchar(30)            NOT NULL    COMMENT '변경 닉네임',
    `USER_ID`          bigint(20) unsigned    NULL        DEFAULT NULL COMMENT '사용자 ID',
    `IPv4`             INT UNSIGNED           NULL        DEFAULT NULL COMMENT 'IPv4',
    `IPv6`             BINARY(16)             NULL        DEFAULT NULL COMMENT 'IPv6',
    `DATE`             DATETIME               NOT NULL    DEFAULT current_timestamp() COMMENT '변경날짜',
    PRIMARY KEY (NICKNAME_LOG_ID)
);

-- 테이블 Comment 설정 SQL - tt_nickname_log
ALTER TABLE tt_nickname_log COMMENT '닉네임 변경 로그';

-- Foreign Key 설정 SQL - tt_nickname_log(USER_ID) -> tt_user(USER_ID)
ALTER TABLE tt_nickname_log
    ADD CONSTRAINT FK_tt_nickname_log_USER_ID_tt_user_USER_ID FOREIGN KEY (USER_ID)
        REFERENCES tt_user (USER_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_nickname_log(USER_ID)
-- ALTER TABLE tt_nickname_log
-- DROP FOREIGN KEY FK_tt_nickname_log_USER_ID_tt_user_USER_ID;


-- tt_file_download_log Table Create SQL
-- 테이블 생성 SQL - tt_file_download_log
CREATE TABLE tt_file_download_log
(
    `FILE_DOWN_LOG_ID`    bigint(20) unsigned    NOT NULL    COMMENT '파일 다운로드 로그 ID',
    `FILE_ID`             bigint(20) unsigned    NOT NULL    COMMENT '파일 ID',
    `USER_ID`             bigint(20) unsigned    NOT NULL    COMMENT '사용자 ID',
    `FILE_DOWNLOAD_DATE`  DATETIME               NOT NULL    DEFAULT current_time COMMENT '파일 다운로드 날짜',
    `FILE_TYPE`           varchar(20)            NULL        COMMENT '파일 타입',
    `IPv4`                INT UNSIGNED           NULL        DEFAULT NULL COMMENT 'IPv4',
    `IPv6`                BINARY(16)             NULL        DEFAULT NULL COMMENT 'IPv6',
    PRIMARY KEY (FILE_DOWN_LOG_ID)
);

-- 테이블 Comment 설정 SQL - tt_file_download_log
ALTER TABLE tt_file_download_log COMMENT '파일 다운로드 로그';

-- Foreign Key 설정 SQL - tt_file_download_log(USER_ID) -> tt_user(USER_ID)
ALTER TABLE tt_file_download_log
    ADD CONSTRAINT FK_tt_file_download_log_USER_ID_tt_user_USER_ID FOREIGN KEY (USER_ID)
        REFERENCES tt_user (USER_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_file_download_log(USER_ID)
-- ALTER TABLE tt_file_download_log
-- DROP FOREIGN KEY FK_tt_file_download_log_USER_ID_tt_user_USER_ID;

-- Foreign Key 설정 SQL - tt_file_download_log(FILE_ID) -> tt_file(FILE_ID)
ALTER TABLE tt_file_download_log
    ADD CONSTRAINT FK_tt_file_download_log_FILE_ID_tt_file_FILE_ID FOREIGN KEY (FILE_ID)
        REFERENCES tt_file (FILE_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_file_download_log(FILE_ID)
-- ALTER TABLE tt_file_download_log
-- DROP FOREIGN KEY FK_tt_file_download_log_FILE_ID_tt_file_FILE_ID;


-- tt_login_log Table Create SQL
-- 테이블 생성 SQL - tt_login_log
CREATE TABLE tt_login_log
(
    `LOGIN_LOG_ID`  bigint(20) unsigned    NOT NULL    COMMENT '로그인 로그 ID',
    `USER_ID`       bigint(20) unsigned    NOT NULL    COMMENT '유저 ID',
    `SNS_TYPE`      varchar(20)            NOT NULL    DEFAULT 'email' COMMENT 'SNS 타입',
    `IPv4`          INT UNSIGNED           NULL        DEFAULT NULL COMMENT 'IPv4',
    `IPv6`          BINARY(16)             NULL        DEFAULT NULL COMMENT 'IPv6',
    `DATE`          DATETIME               NOT NULL    DEFAULT current_time COMMENT '로그인날짜',
    PRIMARY KEY (LOGIN_LOG_ID)
);

-- 테이블 Comment 설정 SQL - tt_login_log
ALTER TABLE tt_login_log COMMENT '로그인 로그';

-- Foreign Key 설정 SQL - tt_login_log(USER_ID) -> tt_user(USER_ID)
ALTER TABLE tt_login_log
    ADD CONSTRAINT FK_tt_login_log_USER_ID_tt_user_USER_ID FOREIGN KEY (USER_ID)
        REFERENCES tt_user (USER_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_login_log(USER_ID)
-- ALTER TABLE tt_login_log
-- DROP FOREIGN KEY FK_tt_login_log_USER_ID_tt_user_USER_ID;


-- tt_access_log Table Create SQL
-- 테이블 생성 SQL - tt_access_log
CREATE TABLE tt_access_log
(
    `API_LOG_ID`   bigint(20) unsigned    NOT NULL    COMMENT '접근 로그 ID',
    `USER_ID`      bigint(20) unsigned    NULL        COMMENT '사용자 ID',
    `ACCESS_IP`    varchar(20)            NOT NULL    COMMENT '접근 IP',
    `ACCESS_DATE`  datetime               NOT NULL    COMMENT '접근 날짜',
    `API_ID`       bigint(20) unsigned    NOT NULL    COMMENT '접근 API ID',
    `IPv4`         INT UNSIGNED           NULL        DEFAULT NULL COMMENT 'IPv4',
    `IPv6`         BINARY(16)             NULL        DEFAULT NULL COMMENT 'IPv6',
    PRIMARY KEY (API_LOG_ID)
);

-- 테이블 Comment 설정 SQL - tt_access_log
ALTER TABLE tt_access_log COMMENT '메인 접근 API 로그';

-- Foreign Key 설정 SQL - tt_access_log(USER_ID) -> tt_user(USER_ID)
ALTER TABLE tt_access_log
    ADD CONSTRAINT FK_tt_access_log_USER_ID_tt_user_USER_ID FOREIGN KEY (USER_ID)
        REFERENCES tt_user (USER_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_access_log(USER_ID)
-- ALTER TABLE tt_access_log
-- DROP FOREIGN KEY FK_tt_access_log_USER_ID_tt_user_USER_ID;

-- Foreign Key 설정 SQL - tt_access_log(API_ID) -> tt_api_list(API_ID)
ALTER TABLE tt_access_log
    ADD CONSTRAINT FK_tt_access_log_API_ID_tt_api_list_API_ID FOREIGN KEY (API_ID)
        REFERENCES tt_api_list (API_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_access_log(API_ID)
-- ALTER TABLE tt_access_log
-- DROP FOREIGN KEY FK_tt_access_log_API_ID_tt_api_list_API_ID;


-- tt_notice Table Create SQL
-- 테이블 생성 SQL - tt_notice
CREATE TABLE tt_notice
(
    `NOTICE_MASTER_ID`    bigint(20) unsigned    NOT NULL    COMMENT '소식 카테고리 ID',
    `MAIN_NOTICE_ID`      bigint(20) unsigned    NOT NULL    COMMENT '메인공지 ID',
    `SUBJECT`             varchar(100)           NULL        DEFAULT NULL COMMENT '제목',
    `HTML_TF`             VARCHAR(1)             NULL        DEFAULT 'F' COMMENT 'HTML 여부',
    `CONTENTS`            text                   NULL        DEFAULT NULL COMMENT '내용',
    `DISPLAY_TF`          char(1)                NULL        DEFAULT 'T' COMMENT '노출 여부',
    `DISPLAY_START_TIME`  datetime               NULL        DEFAULT NULL COMMENT '게시 시작일',
    `DISPLAY_END_TIME`    datetime               NULL        DEFAULT NULL COMMENT '게시 종료일',
    `POST_USER_ID`        bigint(20) unsigned    NULL        DEFAULT NULL COMMENT '생성자 아이디',
    `POST_DATE`           datetime               NULL        DEFAULT NULL COMMENT '작성일',
    `POST_IPv4`           INT UNSIGNED           NULL        DEFAULT NULL COMMENT '작성자 IPv4',
    `POST_IPv6`           BINARY(16)             NULL        DEFAULT NULL COMMENT '작성자 IPv6',
    `UPDATE_USER_ID`      bigint(20) unsigned    NULL        DEFAULT NULL COMMENT '수정자 아이디',
    `UPDATE_DATE`         datetime               NULL        DEFAULT NULL COMMENT '수정일',
    `UPDATE_IPv4`         INT UNSIGNED           NULL        DEFAULT NULL COMMENT '수정자 IPv4',
    `UPDATE_IPv6`         BINARY(16)             NULL        DEFAULT NULL COMMENT '수정자 IPv6',
    `CONTENT_ID`          bigint(20) unsigned    NULL        DEFAULT NULL COMMENT '컨텐츠 ID',
    `TOP_FIX_TF`          VARCHAR(1)             NOT NULL    DEFAULT 'F' COMMENT '상단 고정 여부',
    PRIMARY KEY (MAIN_NOTICE_ID)
);

-- 테이블 Comment 설정 SQL - tt_notice
ALTER TABLE tt_notice COMMENT '메인 소식';

-- Foreign Key 설정 SQL - tt_notice(CONTENT_ID) -> tt_content(CONTENT_ID)
ALTER TABLE tt_notice
    ADD CONSTRAINT FK_tt_notice_CONTENT_ID_tt_content_CONTENT_ID FOREIGN KEY (CONTENT_ID)
        REFERENCES tt_content (CONTENT_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_notice(CONTENT_ID)
-- ALTER TABLE tt_notice
-- DROP FOREIGN KEY FK_tt_notice_CONTENT_ID_tt_content_CONTENT_ID;

-- Foreign Key 설정 SQL - tt_notice(NOTICE_MASTER_ID) -> tt_notice_master(NOTICE_MASTER_ID)
ALTER TABLE tt_notice
    ADD CONSTRAINT FK_tt_notice_NOTICE_MASTER_ID_tt_notice_master_NOTICE_MASTER_ID FOREIGN KEY (NOTICE_MASTER_ID)
        REFERENCES tt_notice_master (NOTICE_MASTER_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_notice(NOTICE_MASTER_ID)
-- ALTER TABLE tt_notice
-- DROP FOREIGN KEY FK_tt_notice_NOTICE_MASTER_ID_tt_notice_master_NOTICE_MASTER_ID;

-- Foreign Key 설정 SQL - tt_notice(POST_USER_ID) -> tt_user(USER_ID)
ALTER TABLE tt_notice
    ADD CONSTRAINT FK_tt_notice_POST_USER_ID_tt_user_USER_ID FOREIGN KEY (POST_USER_ID)
        REFERENCES tt_user (USER_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_notice(POST_USER_ID)
-- ALTER TABLE tt_notice
-- DROP FOREIGN KEY FK_tt_notice_POST_USER_ID_tt_user_USER_ID;

-- Foreign Key 설정 SQL - tt_notice(UPDATE_USER_ID) -> tt_user(USER_ID)
ALTER TABLE tt_notice
    ADD CONSTRAINT FK_tt_notice_UPDATE_USER_ID_tt_user_USER_ID FOREIGN KEY (UPDATE_USER_ID)
        REFERENCES tt_user (USER_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_notice(UPDATE_USER_ID)
-- ALTER TABLE tt_notice
-- DROP FOREIGN KEY FK_tt_notice_UPDATE_USER_ID_tt_user_USER_ID;


-- tt_view_log Table Create SQL
-- 테이블 생성 SQL - tt_view_log
CREATE TABLE tt_view_log
(
    `VIEW_LOG_ID`   bigint(20) unsigned    NOT NULL    COMMENT '뷰 로그 ID',
    `CONTENT_TYPE`  varchar(20)            NOT NULL    COMMENT '컨텐츠 타입',
    `CONTENT_ID`    bigint(20) unsigned    NOT NULL    COMMENT '컨텐츠 ID',
    `USER_ID`       bigint(20) unsigned    NULL        DEFAULT NULL COMMENT '로그인 아이디',
    `DATE`          datetime               NULL        DEFAULT NULL COMMENT '날짜',
    `IPv4`          INT UNSIGNED           NULL        DEFAULT NULL COMMENT 'IPv4',
    `IPv6`          BINARY(16)             NULL        DEFAULT NULL COMMENT 'IPv6',
    PRIMARY KEY (VIEW_LOG_ID)
);

-- 테이블 Comment 설정 SQL - tt_view_log
ALTER TABLE tt_view_log COMMENT '뷰 로그';

-- Foreign Key 설정 SQL - tt_view_log(USER_ID) -> tt_user(USER_ID)
ALTER TABLE tt_view_log
    ADD CONSTRAINT FK_tt_view_log_USER_ID_tt_user_USER_ID FOREIGN KEY (USER_ID)
        REFERENCES tt_user (USER_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_view_log(USER_ID)
-- ALTER TABLE tt_view_log
-- DROP FOREIGN KEY FK_tt_view_log_USER_ID_tt_user_USER_ID;

-- Foreign Key 설정 SQL - tt_view_log(CONTENT_ID) -> tt_content(CONTENT_ID)
ALTER TABLE tt_view_log
    ADD CONSTRAINT FK_tt_view_log_CONTENT_ID_tt_content_CONTENT_ID FOREIGN KEY (CONTENT_ID)
        REFERENCES tt_content (CONTENT_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_view_log(CONTENT_ID)
-- ALTER TABLE tt_view_log
-- DROP FOREIGN KEY FK_tt_view_log_CONTENT_ID_tt_content_CONTENT_ID;


-- tt_product_image Table Create SQL
-- 테이블 생성 SQL - tt_product_image
CREATE TABLE tt_product_image
(
    `PRODUCT_IMAGE_ID`  bigint(20) unsigned    NOT NULL    COMMENT '상품 이미지 ID',
    `PRODUCT_ID`        bigint(20) unsigned    NOT NULL    COMMENT '상품 ID',
    `FILE_NAME`         varchar(800)           NULL        DEFAULT NULL COMMENT '첨부파일명',
    `FILE_PATH`         varchar(800)           NULL        DEFAULT NULL COMMENT '첨부파일 경로',
    `FILE_SIZE`         int(20)                NULL        DEFAULT NULL COMMENT '첨부파일 크기',
    `ORG_FILE_SEQ`      int(10)                NULL        DEFAULT NULL COMMENT '기존 파일 시퀀스',
    `FILE_URL`          varchar(500)           NULL        DEFAULT NULL COMMENT '다운로드 URL',
    `THUMB_PATH`        varchar(800)           NULL        DEFAULT NULL COMMENT '썸네일 경로',
    `FILE_ID`           bigint(20) unsigned    NULL        COMMENT '파일 ID',
    `CONTENT_ID`        bigint(20) unsigned    NULL        COMMENT '컨텐츠 ID',
    PRIMARY KEY (PRODUCT_IMAGE_ID)
);

-- 테이블 Comment 설정 SQL - tt_product_image
ALTER TABLE tt_product_image COMMENT '상품 이미지';

-- Foreign Key 설정 SQL - tt_product_image(PRODUCT_ID) -> tt_product_update_log(PRODUCT_ID)
ALTER TABLE tt_product_image
    ADD CONSTRAINT FK_tt_product_image_PRODUCT_ID_tt_product_update_log_PRODUCT_ID FOREIGN KEY (PRODUCT_ID)
        REFERENCES tt_product_update_log (PRODUCT_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_product_image(PRODUCT_ID)
-- ALTER TABLE tt_product_image
-- DROP FOREIGN KEY FK_tt_product_image_PRODUCT_ID_tt_product_update_log_PRODUCT_ID;

-- Foreign Key 설정 SQL - tt_product_image(FILE_ID) -> tt_file(FILE_ID)
ALTER TABLE tt_product_image
    ADD CONSTRAINT FK_tt_product_image_FILE_ID_tt_file_FILE_ID FOREIGN KEY (FILE_ID)
        REFERENCES tt_file (FILE_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_product_image(FILE_ID)
-- ALTER TABLE tt_product_image
-- DROP FOREIGN KEY FK_tt_product_image_FILE_ID_tt_file_FILE_ID;

-- Foreign Key 설정 SQL - tt_product_image(CONTENT_ID) -> tt_content(CONTENT_ID)
ALTER TABLE tt_product_image
    ADD CONSTRAINT FK_tt_product_image_CONTENT_ID_tt_content_CONTENT_ID FOREIGN KEY (CONTENT_ID)
        REFERENCES tt_content (CONTENT_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_product_image(CONTENT_ID)
-- ALTER TABLE tt_product_image
-- DROP FOREIGN KEY FK_tt_product_image_CONTENT_ID_tt_content_CONTENT_ID;


-- tt_product_trade_log Table Create SQL
-- 테이블 생성 SQL - tt_product_trade_log
CREATE TABLE tt_product_trade_log
(
    `PRODUCT_TRADE_LOG`  bigint(20) unsigned    NOT NULL    AUTO_INCREMENT COMMENT '거래 로그 ID',
    `PRODUCT_ID`         bigint(20) unsigned    NULL        COMMENT '거래 상품 ID',
    `PRODUCT_PRICE`      bigint(30) unsigned    NULL        COMMENT '거래 금액',
    `PRODUCT_SIZE`       INT(10) unsigned       NULL        COMMENT '상품 규격',
    `PRODUCT_WEIGHT`     INT(10) unsigned       NULL        COMMENT '상품 무게',
    `TRADE_SUCCESS_TF`   VARCHAR(1)             NULL        DEFAULT 'T' COMMENT '거래상태 ( 0: 거래 실패, 1 : 거래 성공, 2 : 거래 취소)',
    `TRADE_FAILURE_MSG`  TEXT                   NULL        DEFAULT NULL COMMENT '거래 실패 사유',
    `TRADE_DATE`         DATETIME               NULL        COMMENT '거래일',
    `SELLER_USER_ID`     bigint(20) unsigned    NULL        COMMENT '판매자 ID',
    `SELLER_USER_IPv4`   VARCHAR(45)            NULL        COMMENT '판매자 IPv4',
    `SELLER_USER_IPv6`   BINARY(16)             NULL        COMMENT '판매자 IPv6',
    `BUYER_USER_ID`      bigint(20) unsigned    NULL        COMMENT '구매자 ID',
    `BUYER_USER_IPv4`    INT UNSIGNED           NULL        COMMENT '구매자 IPv4',
    `BUYER_USER_IPv6`    BINARY(16)             NULL        COMMENT '구매자 IPv6',
    `DELETE_TF`          VARCHAR(1)             NULL        DEFAULT 'F' COMMENT '삭제 여부',
    PRIMARY KEY (PRODUCT_TRADE_LOG)
);

-- Foreign Key 설정 SQL - tt_product_trade_log(PRODUCT_ID) -> tt_product(PRODUCT_ID)
ALTER TABLE tt_product_trade_log
    ADD CONSTRAINT FK_tt_product_trade_log_PRODUCT_ID_tt_product_PRODUCT_ID FOREIGN KEY (PRODUCT_ID)
        REFERENCES tt_product (PRODUCT_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_product_trade_log(PRODUCT_ID)
-- ALTER TABLE tt_product_trade_log
-- DROP FOREIGN KEY FK_tt_product_trade_log_PRODUCT_ID_tt_product_PRODUCT_ID;

-- Foreign Key 설정 SQL - tt_product_trade_log(SELLER_USER_ID) -> tt_user(USER_ID)
ALTER TABLE tt_product_trade_log
    ADD CONSTRAINT FK_tt_product_trade_log_SELLER_USER_ID_tt_user_USER_ID FOREIGN KEY (SELLER_USER_ID)
        REFERENCES tt_user (USER_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_product_trade_log(SELLER_USER_ID)
-- ALTER TABLE tt_product_trade_log
-- DROP FOREIGN KEY FK_tt_product_trade_log_SELLER_USER_ID_tt_user_USER_ID;

-- Foreign Key 설정 SQL - tt_product_trade_log(BUYER_USER_ID) -> tt_user(USER_ID)
ALTER TABLE tt_product_trade_log
    ADD CONSTRAINT FK_tt_product_trade_log_BUYER_USER_ID_tt_user_USER_ID FOREIGN KEY (BUYER_USER_ID)
        REFERENCES tt_user (USER_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_product_trade_log(BUYER_USER_ID)
-- ALTER TABLE tt_product_trade_log
-- DROP FOREIGN KEY FK_tt_product_trade_log_BUYER_USER_ID_tt_user_USER_ID;


-- tt_notice_image Table Create SQL
-- 테이블 생성 SQL - tt_notice_image
CREATE TABLE tt_notice_image
(
    `NOTICE_IMAGE_ID`  bigint(20) unsigned    NOT NULL    COMMENT '상품 이미지 ID',
    `PRODUCT_ID`       bigint(20) unsigned    NOT NULL    COMMENT '상품 ID',
    `FILE_NAME`        varchar(800)           NULL        DEFAULT NULL COMMENT '첨부파일명',
    `FILE_PATH`        varchar(800)           NULL        DEFAULT NULL COMMENT '첨부파일 경로',
    `FILE_SIZE`        int(20)                NULL        DEFAULT NULL COMMENT '첨부파일 크기',
    `ORG_FILE_SEQ`     int(10)                NULL        DEFAULT NULL COMMENT '기존 파일 시퀀스',
    `FILE_URL`         varchar(500)           NULL        DEFAULT NULL COMMENT '다운로드 URL',
    `THUMB_PATH`       varchar(800)           NULL        DEFAULT NULL COMMENT '썸네일 경로',
    `FILE_ID`          bigint(20) unsigned    NULL        COMMENT '파일 ID',
    `CONTENT_ID`       bigint(20) unsigned    NULL        COMMENT '컨텐츠 ID',
    PRIMARY KEY (NOTICE_IMAGE_ID)
);

-- 테이블 Comment 설정 SQL - tt_notice_image
ALTER TABLE tt_notice_image COMMENT '소식 이미지';

-- Foreign Key 설정 SQL - tt_notice_image(FILE_ID) -> tt_file(FILE_ID)
ALTER TABLE tt_notice_image
    ADD CONSTRAINT FK_tt_notice_image_FILE_ID_tt_file_FILE_ID FOREIGN KEY (FILE_ID)
        REFERENCES tt_file (FILE_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_notice_image(FILE_ID)
-- ALTER TABLE tt_notice_image
-- DROP FOREIGN KEY FK_tt_notice_image_FILE_ID_tt_file_FILE_ID;

-- Foreign Key 설정 SQL - tt_notice_image(CONTENT_ID) -> tt_content(CONTENT_ID)
ALTER TABLE tt_notice_image
    ADD CONSTRAINT FK_tt_notice_image_CONTENT_ID_tt_content_CONTENT_ID FOREIGN KEY (CONTENT_ID)
        REFERENCES tt_content (CONTENT_ID) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - tt_notice_image(CONTENT_ID)
-- ALTER TABLE tt_notice_image
-- DROP FOREIGN KEY FK_tt_notice_image_CONTENT_ID_tt_content_CONTENT_ID;

