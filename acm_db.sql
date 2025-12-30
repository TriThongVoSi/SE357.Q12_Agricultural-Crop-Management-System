-- Manual schema based on Entity mappings (MySQL).
-- Target database: quanlymuavu

CREATE DATABASE IF NOT EXISTS `quanlymuavu`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `quanlymuavu`;

-- Locations
CREATE TABLE IF NOT EXISTS `provinces` (
  `Id` INT NOT NULL,
  `Name` VARCHAR(128) NOT NULL,
  `Slug` VARCHAR(128) NOT NULL,
  `Type` VARCHAR(32) NOT NULL,
  `NameWithType` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `wards` (
  `Id` INT NOT NULL,
  `Name` VARCHAR(255) NOT NULL,
  `Slug` VARCHAR(255) NOT NULL,
  `Type` VARCHAR(64) NOT NULL,
  `NameWithType` VARCHAR(512) NOT NULL,
  `ProvinceId` INT NOT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `fk_wards_province`
    FOREIGN KEY (`ProvinceId`) REFERENCES `provinces` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Security
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` BIGINT NOT NULL AUTO_INCREMENT,
  `role_code` VARCHAR(255) NOT NULL,
  `role_name` VARCHAR(255),
  `description` VARCHAR(255),
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `uk_roles_role_code` (`role_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(255) COLLATE utf8mb4_unicode_ci,
  `email` VARCHAR(255),
  `phone` VARCHAR(30),
  `full_name` VARCHAR(255),
  `password_hash` VARCHAR(255),
  `status` VARCHAR(255) NOT NULL,
  `province_id` INT,
  `ward_id` INT,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uk_users_user_name` (`user_name`),
  UNIQUE KEY `uk_users_email` (`email`),
  CONSTRAINT `fk_users_province`
    FOREIGN KEY (`province_id`) REFERENCES `provinces` (`Id`),
  CONSTRAINT `fk_users_ward`
    FOREIGN KEY (`ward_id`) REFERENCES `wards` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` BIGINT NOT NULL,
  `role_id` BIGINT NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  CONSTRAINT `fk_user_roles_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fk_user_roles_role`
    FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Master data
CREATE TABLE IF NOT EXISTS `crops` (
  `crop_id` INT NOT NULL AUTO_INCREMENT,
  `crop_name` VARCHAR(255),
  `description` VARCHAR(255),
  PRIMARY KEY (`crop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `varieties` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `crop_id` INT NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `description` TEXT,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_varieties_crop`
    FOREIGN KEY (`crop_id`) REFERENCES `crops` (`crop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Farms and plots
CREATE TABLE IF NOT EXISTS `farms` (
  `farm_id` INT NOT NULL AUTO_INCREMENT,
  `owner_id` BIGINT NOT NULL,
  `farm_name` VARCHAR(255) NOT NULL,
  `province_id` INT NOT NULL,
  `ward_id` INT NOT NULL,
  `area` DECIMAL(19,2),
  `active` BOOLEAN NOT NULL,
  PRIMARY KEY (`farm_id`),
  CONSTRAINT `fk_farms_owner`
    FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fk_farms_province`
    FOREIGN KEY (`province_id`) REFERENCES `provinces` (`Id`),
  CONSTRAINT `fk_farms_ward`
    FOREIGN KEY (`ward_id`) REFERENCES `wards` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `plots` (
  `plot_id` INT NOT NULL AUTO_INCREMENT,
  `created_by` BIGINT,
  `farm_id` INT NOT NULL,
  `plot_name` VARCHAR(255),
  `area` DECIMAL(19,2),
  `soil_type` VARCHAR(50),
  `status` VARCHAR(30) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`plot_id`),
  CONSTRAINT `fk_plots_created_by`
    FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fk_plots_farm`
    FOREIGN KEY (`farm_id`) REFERENCES `farms` (`farm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `seasons` (
  `season_id` INT NOT NULL AUTO_INCREMENT,
  `season_name` VARCHAR(255),
  `plot_id` INT NOT NULL,
  `crop_id` INT NOT NULL,
  `variety_id` INT,
  `start_date` DATE NOT NULL,
  `planned_harvest_date` DATE,
  `end_date` DATE,
  `status` VARCHAR(255) NOT NULL,
  `initial_plant_count` INT NOT NULL,
  `current_plant_count` INT,
  `expected_yield_kg` DECIMAL(19,2),
  `actual_yield_kg` DECIMAL(19,2),
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`season_id`),
  CONSTRAINT `fk_seasons_plot`
    FOREIGN KEY (`plot_id`) REFERENCES `plots` (`plot_id`),
  CONSTRAINT `fk_seasons_crop`
    FOREIGN KEY (`crop_id`) REFERENCES `crops` (`crop_id`),
  CONSTRAINT `fk_seasons_variety`
    FOREIGN KEY (`variety_id`) REFERENCES `varieties` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tasks and tracking
CREATE TABLE IF NOT EXISTS `tasks` (
  `task_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `season_id` INT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `planned_date` DATE,
  `due_date` DATE,
  `status` VARCHAR(255),
  `actual_start_date` DATE,
  `actual_end_date` DATE,
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`task_id`),
  CONSTRAINT `fk_tasks_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fk_tasks_season`
    FOREIGN KEY (`season_id`) REFERENCES `seasons` (`season_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `expenses` (
  `expense_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `season_id` INT NOT NULL,
  `task_id` INT,
  `category` VARCHAR(255),
  `item_name` VARCHAR(255) NOT NULL,
  `unit_price` DECIMAL(19,2) NOT NULL,
  `quantity` INT NOT NULL,
  `total_cost` DECIMAL(19,2),
  `amount` DECIMAL(19,2),
  `note` TEXT,
  `expense_date` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`expense_id`),
  CONSTRAINT `fk_expenses_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fk_expenses_season`
    FOREIGN KEY (`season_id`) REFERENCES `seasons` (`season_id`),
  CONSTRAINT `fk_expenses_task`
    FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `field_logs` (
  `field_log_id` INT NOT NULL AUTO_INCREMENT,
  `season_id` INT NOT NULL,
  `log_date` DATE NOT NULL,
  `log_type` VARCHAR(255) NOT NULL,
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`field_log_id`),
  CONSTRAINT `fk_field_logs_season`
    FOREIGN KEY (`season_id`) REFERENCES `seasons` (`season_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `harvests` (
  `harvest_id` INT NOT NULL AUTO_INCREMENT,
  `season_id` INT,
  `harvest_date` DATE NOT NULL,
  `quantity` DECIMAL(19,2) NOT NULL,
  `unit` DECIMAL(19,2) NOT NULL,
  `note` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`harvest_id`),
  CONSTRAINT `fk_harvests_season`
    FOREIGN KEY (`season_id`) REFERENCES `seasons` (`season_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `incidents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `season_id` INT NOT NULL,
  `reported_by` BIGINT,
  `incident_type` VARCHAR(50),
  `severity` VARCHAR(20),
  `description` TEXT,
  `status` VARCHAR(30),
  `deadline` DATE,
  `resolved_at` DATETIME,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_incidents_season`
    FOREIGN KEY (`season_id`) REFERENCES `seasons` (`season_id`),
  CONSTRAINT `fk_incidents_reported_by`
    FOREIGN KEY (`reported_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Warehousing and inventory
CREATE TABLE IF NOT EXISTS `warehouses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `farm_id` INT NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `type` VARCHAR(20),
  `province_id` INT,
  `ward_id` INT,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_warehouses_farm`
    FOREIGN KEY (`farm_id`) REFERENCES `farms` (`farm_id`),
  CONSTRAINT `fk_warehouses_province`
    FOREIGN KEY (`province_id`) REFERENCES `provinces` (`Id`),
  CONSTRAINT `fk_warehouses_ward`
    FOREIGN KEY (`ward_id`) REFERENCES `wards` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `stock_locations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `warehouse_id` INT NOT NULL,
  `zone` VARCHAR(20),
  `aisle` VARCHAR(20),
  `shelf` VARCHAR(20),
  `bin` VARCHAR(20),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_stock_locations_warehouse`
    FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `suppliers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `license_no` VARCHAR(100),
  `contact_email` VARCHAR(255),
  `contact_phone` VARCHAR(30),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `supply_items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `active_ingredient` VARCHAR(150),
  `unit` VARCHAR(20),
  `restricted_flag` BOOLEAN,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `supply_lots` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `supply_item_id` INT NOT NULL,
  `supplier_id` INT,
  `batch_code` VARCHAR(100),
  `expiry_date` DATE,
  `status` VARCHAR(20),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_supply_lots_item`
    FOREIGN KEY (`supply_item_id`) REFERENCES `supply_items` (`id`),
  CONSTRAINT `fk_supply_lots_supplier`
    FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `stock_movements` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `supply_lot_id` INT NOT NULL,
  `warehouse_id` INT NOT NULL,
  `location_id` INT,
  `movement_type` VARCHAR(10) NOT NULL,
  `quantity` DECIMAL(14,3) NOT NULL,
  `movement_date` DATETIME NOT NULL,
  `season_id` INT,
  `task_id` INT,
  `note` TEXT,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_stock_movements_lot`
    FOREIGN KEY (`supply_lot_id`) REFERENCES `supply_lots` (`id`),
  CONSTRAINT `fk_stock_movements_warehouse`
    FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`),
  CONSTRAINT `fk_stock_movements_location`
    FOREIGN KEY (`location_id`) REFERENCES `stock_locations` (`id`),
  CONSTRAINT `fk_stock_movements_season`
    FOREIGN KEY (`season_id`) REFERENCES `seasons` (`season_id`),
  CONSTRAINT `fk_stock_movements_task`
    FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Documents
CREATE TABLE IF NOT EXISTS `documents` (
  `document_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `url` VARCHAR(1000) NOT NULL,
  `description` TEXT,
  `crop` VARCHAR(50),
  `stage` VARCHAR(50),
  `topic` VARCHAR(50),
  `is_active` BOOLEAN NOT NULL,
  `is_public` BOOLEAN NOT NULL,
  `created_by` BIGINT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`document_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `document_favorites` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `document_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_document_favorites_user_document` (`user_id`, `document_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `document_recent_opens` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `document_id` INT NOT NULL,
  `opened_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Audit logs
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `audit_log_id` BIGINT NOT NULL AUTO_INCREMENT,
  `entity_type` VARCHAR(50) NOT NULL,
  `entity_id` INT NOT NULL,
  `operation` VARCHAR(50) NOT NULL,
  `performed_by` VARCHAR(255) NOT NULL,
  `performed_at` DATETIME NOT NULL,
  `snapshot_data` TEXT,
  `reason` VARCHAR(500),
  `ip_address` VARCHAR(45),
  PRIMARY KEY (`audit_log_id`),
  INDEX `idx_entity_lookup` (`entity_type`, `entity_id`),
  INDEX `idx_performed_at` (`performed_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Auth tokens (table name derived from Spring physical naming strategy)
CREATE TABLE IF NOT EXISTS `invalidated_token` (
  `id` VARCHAR(255) NOT NULL,
  `expiry_time` DATETIME,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
