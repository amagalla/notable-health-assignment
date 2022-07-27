CREATE DATABASE IF NOT EXISTS takehometest;

USE takehometest;

CREATE TABLE IF NOT EXISTS physicians (
    physician_id                  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    physician_first_name          VARCHAR(255) NOT NULL,
    physician_last_name           VARCHAR(255) NOT NULL,
    PRIMARY KEY (physician_id)
);

CREATE TABLE IF NOT EXISTS appointments (
    appointment_id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    patient_first_name            VARCHAR(255) NOT NULL,
    patient_last_name             VARCHAR(255) NOT NULL,
    scheduled_date                DATE NOT NULL,
    scheduled_time                VARCHAR(255) NOT NULL,
    kind                          VARCHAR(255) NOT NULL,
    physician_id                  BIGINT UNSIGNED NOT NULL,
    PRIMARY key (appointment_id),
    FOREIGN KEY (physician_id)
    REFERENCES physicians(physician_id)
    ON UPDATE CASCADE
);