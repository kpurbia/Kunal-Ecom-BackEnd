-------------------------------------------------------------------CREATE DATABASE
CREATE DATABASE ecommerce;

-------------------------------------------------------------------TO SEE ALL DATABASE
SHOW DATABASES;

-------------------------------------------------------------------TO USE DATABASE
USE ecommerce;

-------------------------------------------------------------------CREATING VENDOR TABLE
CREATE TABLE `ecommerce`.`vendors` (
  `vendor_id` INT NOT NULL AUTO_INCREMENT,
  `vendor_name` VARCHAR(100) NULL,
  `vendor_govt_id` VARCHAR(100) NULL,
  `vendor_contact` INT NULL,
  `vendor_email` VARCHAR(100) NULL,
  `vendor_password` VARCHAR(100) NULL,
  `vendor_category` VARCHAR(100) NULL,
  `vendor_state` VARCHAR(100) NULL,
  `vendor_city` VARCHAR(100) NULL,
  `vendor_product_count` INT NULL,
  PRIMARY KEY (`vendor_id`));

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

-------------------------------------------------------------------CREATING PRODUCT TABLE
CREATE TABLE `ecommerce`.`products` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_vendor_id` INT NULL,
  `product_name` VARCHAR(100) NULL,
  `product_category` VARCHAR(100) NULL,
  `product_price` FLOAT NULL,
  `product_quantity` INT NULL,
  PRIMARY KEY (`product_id`),
  INDEX `vendor_id_idx` (`product_vendor_id` ASC) VISIBLE,
  CONSTRAINT `vendor_id`
    FOREIGN KEY (`product_vendor_id`)
    REFERENCES `ecommerce`.`vendor` (`vendor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-------------------------------------------------------------------PRODUCT DATA FORMAT
{
    "id":0,
    "name":"Cadbury Silk",
    "category":"Chocolate",
    "price":"100.50",
    "quantity":"500"
}

-------------------------------------------------------------------CREATING USER TABLE
CREATE TABLE `ecommerce`.`customers` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `customer_name` VARCHAR(100) NULL,
  `customer_email` VARCHAR(100) NULL,
  `customer_password` VARCHAR(100) NULL,
  `customer_contact` INT NULL,
  `customer_state` VARCHAR(100) NULL,
  `customer_city` VARCHAR(100) NULL,
  `customer_orders_count` INT NULL,
  `customer_total_expense` FLOAT NULL,
  PRIMARY KEY (`customer_id`));

-------------------------------------------------------------------USER DATA FORMAT
{
    "id": 0,
    "name":"Raj Champawat",
    "email":"raj@gmail.com",
    "password":"raj123",
    "conpassword":"raj123",
    "contact":"0789456123",
    "state":"Maharashtra",
    "city":"Mumbai"
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
  `order_delivery_contact` INT NULL,
  `order_delivery_address` VARCHAR(100) NULL,
  `order_delivery_city` VARCHAR(100) NULL,
  `order_delivery_state` VARCHAR(100) NULL,
  `order_place_date` VARCHAR(100) NULL,
  `order_status` VARCHAR(100) NULL,
  `order_payment` FLOAT,
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

-------------------------------------------------------------------CREATING DELIVERY AGENT TABLE
CREATE TABLE `ecommerce`.`agents` (
  `agent_id` INT NOT NULL AUTO_INCREMENT,
  `agent_name` VARCHAR(100) NULL,
  `agent_email` VARCHAR(100) NULL,
  `agent_password` VARCHAR(100) NULL,
  `agent_govt_id` VARCHAR(100) NULL,
  `agent_contact` INT NULL,
  `agent_state` VARCHAR(100) NULL,
  `agent_city` VARCHAR(100) NULL,
  PRIMARY KEY (`agent_id`));

-------------------------------------------------------------------AGENT DATA FORMAT
{
    "name":"XpressBees",
    "email":"head@xpressbees.com",
    "password":"XpressBees123",
    "conpassword":"XpressBees123",
    "govtid":"india123",
    "contact":1478520369,
    "state":"Rajasthan",
    "city":"Udaipur"
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

-------------------------------------------------------------------CREATING ADMIN TABLE
CREATE TABLE `ecommerce`.`admins` (
  `admin_id` INT NOT NULL AUTO_INCREMENT,
  `admin_name` VARCHAR(100) NULL,
  `admin_company_id` VARCHAR(100) NULL,
  `admin_email` VARCHAR(100) NULL,
  `admin_password` VARCHAR(100) NULL,
  PRIMARY KEY (`admin_id`));

