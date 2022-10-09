-------------------------------------------------------------------CREATE DATABASE
CREATE DATABASE ecommerce;

-------------------------------------------------------------------TO SEE ALL DATABASE
SHOW DATABASES;

-------------------------------------------------------------------TO USE DATABASE
USE ecommerce;

-------------------------------------------------------------------CREATE USERS TABLE
CREATE TABLE `ecommerce`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(100) NULL,
  `user_email` VARCHAR(100) NULL,
  `user_password` VARCHAR(100) NULL,
  `user_contact` VARCHAR(100) NULL,
  `user_state` VARCHAR(100) NULL,
  `user_city` VARCHAR(100) NULL,
  `user_role` VARCHAR(100) NULL,
  PRIMARY KEY (`user_id`));

-------------------------------------------------------------------CREATE ACCOUNTS TABLE
CREATE TABLE `ecommerce`.`accounts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `account_user_id` INT NULL,
  `account_number` VARCHAR(100) NULL,
  `account_bank` VARCHAR(100) NULL,
  `account_wallet` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

-------------------------------------------------------------------CREATE CUSTOMERS TABLE
CREATE TABLE `ecommerce`.`customers` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `customer_user_id` INT NULL,
  `customer_order_counts` INT NULL,
  `customer_total_expenses` FLOAT NULL,
  PRIMARY KEY (`customer_id`));

-------------------------------------------------------------------CREATE VENDORS TABLE
CREATE TABLE `ecommerce`.`vendors` (
  `vendor_id` INT NOT NULL AUTO_INCREMENT,
  `vendor_user_id` INT NULL,
  `vendor_govt_id` VARCHAR(100) NULL,
  `vendor_category` VARCHAR(100) NULL,
  `vendor_product_counts` INT NULL,
  `vendor_product_sell_counts` INT NULL,
  PRIMARY KEY (`vendor_id`));

-------------------------------------------------------------------CREATE DELIVERY AGENTS TABLE 
CREATE TABLE `ecommerce`.`agents` (
  `agent_id` INT NOT NULL AUTO_INCREMENT,
  `agent_user_id` INT NULL,
  `agent_govt_id` VARCHAR(100) NULL,
  `agent_success_delivery_count` INT NULL,
  `agent_fail_delivery_count` INT NULL,
  PRIMARY KEY (`agent_id`));

-------------------------------------------------------------------CREATE ADMINS TABLE
CREATE TABLE `ecommerce`.`admins` (
  `admin_id` INT NOT NULL AUTO_INCREMENT,
  `admin_user_id` VARCHAR(100) NULL,
  `admin_company_id` VARCHAR(100) NULL,
  PRIMARY KEY (`admin_id`));

-------------------------------------------------------------------CREATE PRODUCTS TABLE
CREATE TABLE `ecommerce`.`products` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_vendor_id` INT NULL,
  `product_name` VARCHAR(100) NULL,
  `product_category` VARCHAR(100) NULL,
  `product_price` FLOAT NULL,
  `product_description` MEDIUMTEXT NULL,
  `product_quantity` INT NULL,
  `product_sell_count` INT NULL,
  PRIMARY KEY (`product_id`),
  INDEX `user_id_idx` (`product_vendor_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`product_vendor_id`)
    REFERENCES `ecommerce`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


















CREATE TABLE `ecommerce`.`feedback` (
  `feedback_id` INT NOT NULL AUTO_INCREMENT,
  `feedback_user_id` INT NULL,
  `feedback_product_id` INT NULL,
  `feedback_rating` VARCHAR(100) NULL,
  `feedback_comment` VARCHAR(100) NULL,
  PRIMARY KEY (`feedback_id`),
  INDEX `user_id_idx` (`feedback_user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`feedback_user_id`)
    REFERENCES `ecommerce`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);



CREATE TABLE `ecommerce`.`payments` (
  `payment_id` INT NOT NULL AUTO_INCREMENT,
  `payment_order_id` INT NULL,
  `payment_user_id` INT NULL,
  `payment_method` VARCHAR(100) NULL,
  `payment_transaction_id` VARCHAR(100) NULL,
  `payment_status` VARCHAR(100) NULL,
  PRIMARY KEY (`payment_id`),
  INDEX `user_id_idx` (`payment_user_id` ASC) VISIBLE,
  INDEX `order_id_idx` (`payment_order_id` ASC) VISIBLE,
  CONSTRAINT `customerr_id`
    FOREIGN KEY (`payment_user_id`)
    REFERENCES `ecommerce`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `customer_order_id`
    FOREIGN KEY (`payment_order_id`)
    REFERENCES `ecommerce`.`order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);









-------------------------------------------------------------------VENDOR DATA FORMAT
{
    "id": 0,
    "name":"Dhanshree Furniture",
    "govtid":"dhanshree12345",
    "email":"head@dhanshree.com",
    "password":"123456789",
    "conpassword":"123456789",
    "contact":"9999955555",
    "category":"Wooden Office Furniture",
    "state":"Rajasthan",
    "city":"Udaipur"
}


-------------------------------------------------------------------PRODUCT DATA FORMAT
{
    "id":0,
    "name":"Cadbury Silk",
    "category":"Chocolate",
    "price":"100.50",
    "quantity":"500"
}

-------------------------------------------------------------------CREATING CART TABLE
CREATE TABLE `ecommerce`.`cart` (
  `cart_id` INT NOT NULL AUTO_INCREMENT,
  `cart_customer_id` INT NULL,
  `cart_product_id` INT NULL,
  `cart_product_quantity` INT NULL,
  `cart_total_price` FLOAT NULL
  PRIMARY KEY (`cart_id`),
  INDEX `customer_id_idx` (`cart_customer_id` ASC) VISIBLE,
  INDEX `product_id_idx` (`cart_product_id` ASC) VISIBLE,
  CONSTRAINT `customer_id`
    FOREIGN KEY (`cart_customer_id`)
    REFERENCES `ecommerce`.`customer` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `product_id`
    FOREIGN KEY (`cart_product_id`)
    REFERENCES `ecommerce`.`product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-------------------------------------------------------------------USER CART FORMAT
{
    "quantity":"125"
}

-------------------------------------------------------------------CREATE ORDER TABLE
CREATE TABLE `ecommerce`.`orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `order_cart_id` INT NULL,
  `order_customer_id` INT NULL,
  `order_delivery_name` VARCHAR(100) NULL,
  `order_delivery_contact` VARCHAR(100) NULL,
  `order_delivery_address` VARCHAR(100) NULL,
  `order_delivery_city` VARCHAR(100) NULL,
  `order_delivery_state` VARCHAR(100) NULL,
  `order_place_date` VARCHAR(100) NULL,
  `order_status` VARCHAR(100) NULL,
  `order_payment_method` VARCHAR(100) NULL,
  `order_transaction_id` VARCHAR(100) NULL,
  `order_amount` FLOAT,
  `order_payment_status` VARCHAR(100) NULL,
  PRIMARY KEY (`order_id`),
  INDEX `customer_id_idx` (`order_customer_id` ASC) VISIBLE,
  INDEX `cart_id_idx` (`order_cart_id` ASC) VISIBLE,
  CONSTRAINT `customer_id_order`
    FOREIGN KEY (`order_customer_id`)
    REFERENCES `ecommerce`.`customer` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `cart_id`
    FOREIGN KEY (`order_cart_id`)
    REFERENCES `ecommerce`.`cart` (`cart_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-------------------------------------------------------------------USER DATA FORMAT FOR ORDER
{
    "name":"Raj Champawat",
    "contact":1234567890,
    "address":"Ashwini Bajar, Hatipole",
    "city":"Udaipur",
    "state":"Rajasthan"
}


-------------------------------------------------------------------CREATING TRACKING TABLE
CREATE TABLE `ecommerce`.`tracking` (
  `tracking_id` INT NOT NULL AUTO_INCREMENT,
  `tracking_order_id` INT NULL,
  `tracking_agent_id` INT NULL,
  `tracking_employee_name` VARCHAR(100) NULL,
  `tracking_employee_contact` VARCHAR(100) NULL,
  `tracking_expect_date` VARCHAR(100) NULL,
  `tracking_delivery_date` VARCHAR(100) NULL,
  `tracking_delivery_status` VARCHAR(100) NULL,
  PRIMARY KEY (`tracking_id`),
  INDEX `agent_id_idx` (`tracking_agent_id` ASC) VISIBLE,
  INDEX `order_id_idx` (`tracking_order_id` ASC) VISIBLE,
  CONSTRAINT `agent_id`
    FOREIGN KEY (`tracking_agent_id`)
    REFERENCES `ecommerce`.`agent` (`agent_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `order_id`
    FOREIGN KEY (`tracking_order_id`)
    REFERENCES `ecommerce`.`order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-------------------------------------------------------------------TRACKING TABLE DATA FORMAT
{
    "name":"Piyush",
    "contact":"2582582580",
    "date":"30 Sept, 2022",
    "status":"placed",
    "deliveryDate":NULL
}