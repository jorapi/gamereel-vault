-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema gamereel_vault
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gamereel_vault
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gamereel_vault` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `gamereel_vault` ;

-- -----------------------------------------------------
-- Table `gamereel_vault`.`franchises`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamereel_vault`.`franchises` (
  `franchise_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`franchise_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamereel_vault`.`games`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamereel_vault`.`games` (
  `game_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `franchise_id` INT NULL DEFAULT NULL,
  `release_date` DATE NULL DEFAULT NULL,
  `developer` VARCHAR(255) NULL DEFAULT NULL,
  `publisher` VARCHAR(255) NULL DEFAULT NULL,
  `genre` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`game_id`),
  INDEX `franchise_id` (`franchise_id` ASC) VISIBLE,
  CONSTRAINT `games_ibfk_1`
    FOREIGN KEY (`franchise_id`)
    REFERENCES `gamereel_vault`.`franchises` (`franchise_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamereel_vault`.`hard_drives`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamereel_vault`.`hard_drives` (
  `hard_drive_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `capacity` BIGINT NOT NULL,
  `used_space` BIGINT NOT NULL,
  `connection_type` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`hard_drive_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamereel_vault`.`video_files`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamereel_vault`.`video_files` (
  `file_id` INT NOT NULL AUTO_INCREMENT,
  `game_id` INT NULL DEFAULT NULL,
  `hard_drive_id` INT NULL DEFAULT NULL,
  `file_name` VARCHAR(255) NOT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `file_size` BIGINT NOT NULL,
  `duration` TIME NULL DEFAULT NULL,
  `resolution` VARCHAR(255) NULL DEFAULT NULL,
  `date_recorded` DATETIME NULL DEFAULT NULL,
  `file_format` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`file_id`),
  INDEX `game_id` (`game_id` ASC) VISIBLE,
  INDEX `hard_drive_id` (`hard_drive_id` ASC) VISIBLE,
  CONSTRAINT `video_files_ibfk_1`
    FOREIGN KEY (`game_id`)
    REFERENCES `gamereel_vault`.`games` (`game_id`),
  CONSTRAINT `video_files_ibfk_2`
    FOREIGN KEY (`hard_drive_id`)
    REFERENCES `gamereel_vault`.`hard_drives` (`hard_drive_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
