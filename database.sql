--CREATE DATABASE
CREATE database ecommerce;
use ecommerce;

--CREATING VENDOR TABLE
CREATE TABLE `ecommerce`.`vendor`(
    `vendor_id` INT NOT NULL AUTO_INCREMENT, 
    `vendor_name` VARCHAR(100) NOT NULL, 
    `vendor_govtid` VARCHAR(100) NULL, 
    `vendor_email` VARCHAR(100) NULL, 
    `vendor_password` VARCHAR(100) NULL, 
    `vendor_category` VARCHAR(100) NULL, 
    `vendor_state` VARCHAR(100) NULL, 
    `vendor_city` VARCHAR(100) NULL,
    PRIMARY KEY (`vendor_id`, `vendor_name`));

-- VENDOR DATA FORMAT
{
    "name":"Dhanshree Furniture",
    "govtid":"dhanshree123",
    "email":"head@dhanshree.com",
    "password":"123456789",
    "conpassword":"123456789",
    "category":"Wooden Furniture",
    "state":"Rajasthan",
    "city":"Udaipur"
}

--CREATING USER TABLE
CREATE TABLE `ecommerce`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(100) NULL,
  `user_email` VARCHAR(100) NULL,
  `user_password` VARCHAR(100) NULL,
  `user_contact` VARCHAR(10) NULL,
  `user_state` VARCHAR(100) NULL,
  `user_city` VARCHAR(100) NULL,
  PRIMARY KEY (`user_id`));

--CREATING DELIVERY AGENT TABLE
CREATE TABLE `ecommerce`.`agent` (
  `agent_id` INT NOT NULL AUTO_INCREMENT,
  `agent_name` VARCHAR(100) NULL,
  `agent_email` VARCHAR(100) NULL,
  `agent_password` VARCHAR(100) NULL,
  `agent_contact` VARCHAR(100) NULL,
  `agent_state` VARCHAR(100) NULL,
  `agent_city` VARCHAR(100) NULL,
  PRIMARY KEY (`agent_id`));  

--CREATING PRODUCT TABLE
CREATE TABLE `ecommerce`.`product` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(100) NULL,
  `product_category` VARCHAR(100) NULL,
  `product_price` FLOAT NOT NULL,
  `product_quantity` INT,
  `product_vendor_id` INT NOT NULL,  
  `product_vendor` VARCHAR(100) NULL,
  PRIMARY KEY (`product_id`));

--ADDING FOREIGN KEY (VENDOR ID) TO PRODUCT TABLE
ALTER TABLE `ecommerce`.`product` 
ADD CONSTRAINT `FK_VendorId`
FOREIGN KEY (`product_vendor_id`) REFERENCES `vendor`(`vendor_id`);
ALTER TABLE `ecommerce`.`product` 
ADD COLUMN `product_vendor_name` VARCHAR(100) NULL AFTER `product_vendor_id`;
ALTER TABLE `ecommerce`.`product` RENAME INDEX `FK_VendorId` TO `FK_VendorId_idx`;
ALTER TABLE `ecommerce`.`product` ALTER INDEX `FK_VendorId_idx` VISIBLE;

--ADDING vendor info in product table DISPLAY OF PRODUCT TABLE
SELECT `product.product_name`, `product.product_price`, `vendor.vendor_name` FROM `vendor` INNER JOIN `product` ON `product.product_vendor_id` = `vendor.vendor_id` ORDER BY `product_category`;

--CREATING CART TABLE
CREATE TABLE `ecommerce`.`cart` (
  `cart_id` INT NOT NULL DEFAULT 101,
  `user_id` INT NULL,
  `product_id` INT NULL,
  `product_quantity` INT NULL,
  `cart_price` FLOAT NULL,
  PRIMARY KEY (`cart_id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `product_id_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `ecommerce`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `ecommerce`.`product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

--ADDING USER AND PRODUCT TO CART TABLE
SELECT `cart.cart_id`, `user.user_name`, `product.product_name`, `cart.product_quantity`, `cart_price` FROM `cart` INNER JOIN `product` ON `cart.cart_id` = `product.product_id` INNER JOIN `user` ON `cart.user_id` = `user.user_id`;

--CREATE ORDER TABLE
CREATE TABLE `ecommerce`.`order` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `order_cart_id` INT NULL DEFAULT NULL,
  `order_cust_name` VARCHAR(100) NULL DEFAULT NULL,
  `order_ship_address` VARCHAR(100) NULL DEFAULT NULL,
  `order_ship_city` VARCHAR(100) NULL DEFAULT NULL,
  `order_ship_state` VARCHAR(100) NULL DEFAULT NULL,
  `order_ship_zip` VARCHAR(100) NULL DEFAULT NULL,
  `order_cust_contact` VARCHAR(100) NULL DEFAULT NULL,
  `order_cust_email` VARCHAR(100) NULL DEFAULT NULL,
  `order_agent_id` INT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `order_cart_id_idx` (`order_cart_id` ASC) VISIBLE,
  INDEX `order_agent_id_idx` (`order_agent_id` ASC) VISIBLE,
  CONSTRAINT `order_cart_id`
    FOREIGN KEY (`order_cart_id`)
    REFERENCES `ecommerce`.`cart` (`cart_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `order_agent_id`
    FOREIGN KEY (`order_agent_id`)
    REFERENCES `ecommerce`.`agent` (`agent_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `ecommerce`.`order` 
ADD COLUMN `order_tracking_id` INT NULL AFTER `order_agent_id`,
ADD COLUMN `order_status` INT NULL AFTER `order_tracking_id`;

















