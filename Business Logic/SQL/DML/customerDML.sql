
-- 1.   DISPLAY OF PRODUCTS FOR GUEST
SELECT product.product_name, product.product_price, vendor.vendor_name FROM `product` INNER JOIN `vendor` ON product.product_vendor_id = vendor.vendor_id;

-- 2.   ADDING ALL DETAILS OF CUSTOMER REGISTRATION IN CUSTOMER TABLE
INSERT INTO customer (customer_name, customer_email, customer_password, customer_contact, customer_state, customer_city) VALUES ("Kunal", "kunal@gmail.com", "123456", "9988776655", "Rajasthan", "City");

-- 3.   CHECKING DUPLICATE DATA IN CUSTOMER TABLE
SELECT * FROM customer WHERE customer_email = "kunal@gmail.com";

-- 4.   DELETING DUPLICATE REGISTRATION
DELETE FROM customer WHERE customer_id = data[1].customer_id;

-- 5.   CHECKING DATA FROM CUSTOMER TABLE AND LOGGING IN
SELECT * FROM customer WHERE customer_email = "kunal@gmail.com" AND customer_password = "123456";

-- 6.   DISPLAYING CUSTOMER PROFILE
SELECT * FROM customer WHERE customer_id = 1;

-- 7.   UPDATING CUSTOMER PROFILE
UPDATE customer SET customer_name = 'Kunal Purbia', customer_email= 'kunal@gmail.com', customer_password = '123000', customer_contact = '1122334455', customer_state = 'Rajasthan', customer_city = 'Udaipur' WHERE customer_id = 1;

-- 8.   DELETING CUSTOMER ACCOUNT
DELETE FROM customer WHERE customer_id = data[1].customer_id;

-- 9.   DISPLAYING ALL PRODUCTS QUANTITY GREATER THAN ZERO
SELECT product.product_id, product.product_name, product.product_price, vendor.vendor_name FROM `product` INNER JOIN `vendor` ON product.product_vendor_id = vendor.vendor_id WHERE product_quantity != 0;

-- 10.  TO SEE SINGLE PRODUCT IN DETAIL
SELECT * FROM product WHERE product_id = 1;

-- 11.  ADDING SELECTED PRODUCT TO CART
INSERT INTO cart (cart_product_id, cart_customer_id, cart_product_quantity) VALUES (1, 1, 10)

-- 12.  CHECKING REPEATED PRODUCT IN CART
SELECT * FROM cart WHERE cart_customer_id = 1 AND cart_product_id = 1;

-- 13.  REMOVING DUPLICATE PRODUCT FROM CART
DELETE FROM cart WHERE cart_id = data[1].cart_id;

-- 14.  DISPLAYING ALL PRODUCTS IN CART BY CUSTOMER
SELECT * FROM cart WHERE cart_customer_id = 1;

-- 15.  DISPLAY SINGLE ITEM INSIDE CART
SELECT * FROM cart WHERE cart_id = 1;

-- 16.  REMOVE ITEM FROM CART
DELETE FROM cart WHERE cart_id = 1;

-- 17.  PLACING ORDER
INSERT INTO `order` (order_cart_id, 
                    order_customer_id, 
                    order_delivery_name, 
                    order_delivery_contact, 
                    order_delivery_address, 
                    order_delivery_city, 
                    order_delivery_state, 
                    order_place_date) 
    VALUES (1, 1, "Kunal Purbia", "1122334455", "H.No - 00, Inside Shrinagar", "Udaipur", "Rajasthan", "30 Sept, 2022");

-- 18.  GENERATING BILL
SELECT order_id, order_delivery_name, order_payment FROM `order` WHERE order_id = 1;

-- 19.  DISPLAY OF ALL ORDERS
SELECT * FROM `order` WHERE order_customer_id = 1;

-- 20.  DISPLAY OF ORDER IN DETAIL
SELECT * FROM `order` WHERE order_id = 1;

-- 21.  DELETING ORDER
UPDATE `order` SET order_status = 'cancelled' WHERE order_id = 1;

-- 22. UPDATING TRACKING STATUS
UPDATE tracking SET tracking_order_status = 'cancelled' WHERE tracking_order_id = 1;

-- 23. DISPLAYING TRACKING OF ORDER
SELECT * FROM tracking WHERE tracking_order_id = 1 



























