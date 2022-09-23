--CREATE DATABASE
CREATE database ecommerce;
use ecommerce;

--VENDOR TABLE
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

-- USER TABLE
CREATE TABLE `ecommerce`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(100) NULL,
  `user_email` VARCHAR(100) NULL,
  `user_password` VARCHAR(100) NULL,
  `user_contact` VARCHAR(10) NULL,
  `user_state` VARCHAR(100) NULL,
  `user_city` VARCHAR(100) NULL,
  PRIMARY KEY (`user_id`));

--DELIVERY AGENT TABLE
CREATE TABLE `ecommerce`.`agent` (
  `agent_id` INT NOT NULL AUTO_INCREMENT,
  `agent_name` VARCHAR(100) NULL,
  `agent_email` VARCHAR(100) NULL,
  `agent_password` VARCHAR(100) NULL,
  `agent_contact` VARCHAR(100) NULL,
  `agent_state` VARCHAR(100) NULL,
  `agent_city` VARCHAR(100) NULL,
  PRIMARY KEY (`agent_id`));  

--PRODUCT TABLE
CREATE TABLE `ecommerce`.`product` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(100) NULL,
  `product_category` VARCHAR(100) NULL,
  `product_price` FLOAT NOT NULL,
  `product_vendor_id` INT NOT NULL,  
  `product_vendor` VARCHAR(100) NULL,
  PRIMARY KEY (`product_id`));

--ADDING FOREIGN KEY (VENDOR ID) TO PRODUCT TABLE
ALTER TABLE `ecommerce`.`product` 
ADD CONSTRAINT `FK_VendorId`
FOREIGN KEY (`product_vendor_id`) REFERENCES `vendor`(`vendor_id`);

--ADDING vendor info in product table DISPLAY OF PRODUCT TABLE
SELECT `product.product_id`, 
        `product.product_name`, 
        `product.product_price`, 
        `vendor.vendor_name` 
    FROM `vendor` 
    INNER JOIN `product` 
    ON `product.product_vendor_id` = `vendor.vendor_id` 
    ORDER BY `product_id`;
