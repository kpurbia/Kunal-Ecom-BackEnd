
-- 1.   FOR GUEST USER--    TO DISPLAY ALL CATEGORIES OF PRODUCTS AVAILABLE
SELECT DISTINCT vendor_category FROM vendors;

-- 2.   FOR GUEST USER--    DISPLAY OF PRODUCTS FOR GUEST
SELECT products.product_name, products.product_price, vendors.vendor_name FROM `products` INNER JOIN `vendors` ON products.product_vendor_id = vendors.vendor_id;

-- 3.   FOR GUEST USER--    DISPLAYING ALL PRODUCTS IN SINGLE CATEGORY
SELECT products.products_id, products.products_name, products.products_price, vendor.vendor_name FROM `products` INNER JOIN `vendors` ON vendors.vendor_category = "ELECTRONICS" OR products.product_category = "LAPTOP";

-- 2.   ADDING ALL DETAILS OF CUSTOMER REGISTRATION IN CUSTOMER TABLE
INSERT INTO customers (customer_name, customer_email, customer_password, customer_contact, customer_state, customer_city) VALUES ("Kunal", "kunal@gmail.com", "123456", "9988776655", "Rajasthan", "City");

-- 3.   CHECKING DUPLICATE DATA IN CUSTOMER TABLE
SELECT * FROM customers WHERE customer_email = "kunal@gmail.com";

-- 4.   DELETING DUPLICATE REGISTRATION
DELETE FROM customers WHERE customer_id = data[1].customer_id;

-- 5.   CHECKING DATA FROM CUSTOMER TABLE AND LOGGING IN
SELECT * FROM customers WHERE customer_email = "kunal@gmail.com" AND customer_password = "123456";

-- 6.   DISPLAYING CUSTOMER PROFILE
SELECT * FROM customers WHERE customer_id = 1;

-- 7.   UPDATING CUSTOMER PROFILE
UPDATE customers SET customer_name = 'Kunal Purbia', customer_email= 'kunal@gmail.com', customer_password = '123000', customer_contact = '1122334455', customer_state = 'Rajasthan', customer_city = 'Udaipur' WHERE customer_id = 1;

-- 8.   DELETING CUSTOMER ACCOUNT
DELETE FROM customers WHERE customer_id = data[1].customer_id;

-- 9.   TO DISPLAY ALL CATEGORIES OF products AVAILABLE
SELECT DISTINCT vendor_category FROM vendors;

-- 10.   DISPLAYING ALL products QUANTITY GREATER THAN ZERO
SELECT products.product_id, products.product_name, products.product_price, vendors.vendor_name FROM `products` INNER JOIN `vendors` ON products.product_vendor_id = vendors.vendor_id WHERE product_quantity != 0;

-- 11.  DISPLAYING ALL products IN SINGLE CATEGORY
SELECT products.products_id, products.products_name, products.products_price, vendor.vendor_name FROM `products` INNER JOIN `vendors` ON vendors.vendor_category = "ELECTRONICS" OR products.

-- 12.  TO SEE SINGLE products IN DETAIL
SELECT * FROM products WHERE products_id = 1;

-- 13.  ADDING SELECTED products TO CART
INSERT INTO cart (cart_products_id, cart_customer_id, cart_products_quantity) VALUES (1, 1, 10)

-- 14.  CHECKING REPEATED products IN CART
SELECT * FROM cart WHERE cart_customer_id = 1 AND cart_products_id = 1;

-- 15.  REMOVING DUPLICATE products FROM CART
DELETE FROM cart WHERE cart_id = data[1].cart_id;

-- 16.  DISPLAYING ALL products IN CART BY CUSTOMER
SELECT * FROM cart WHERE cart_customer_id = 1;

-- 17.  DISPLAY SINGLE ITEM INSIDE CART
SELECT * FROM cart WHERE cart_id = 1;

-- 18.  REMOVE ITEM FROM CART
DELETE FROM cart WHERE cart_id = 1;

-- 19.  PLACING ORDER
INSERT INTO `order` (order_cart_id, 
                    order_customer_id, 
                    order_delivery_name, 
                    order_delivery_contact, 
                    order_delivery_address, 
                    order_delivery_city, 
                    order_delivery_state, 
                    order_place_date) 
    VALUES (1, 1, "Kunal Purbia", "1122334455", "H.No - 00, Inside Shrinagar", "Udaipur", "Rajasthan", "30 Sept, 2022");

-- 20.  GENERATING BILL
SELECT order_id, order_delivery_name, order_payment FROM `orders` WHERE order_id = 1;

-- 21.  DISPLAY OF ALL ORDERS
SELECT * FROM `order` WHERE order_customer_id = 1;

-- 22.  DISPLAY OF ORDER IN DETAIL
SELECT * FROM `order` WHERE order_id = 1;

-- 23.  DELETING ORDER
UPDATE `order` SET order_status = 'cancelled' WHERE order_id = 1;

-- 24. UPDATING TRACKING STATUS
UPDATE tracking SET tracking_order_status = 'cancelled' WHERE tracking_order_id = 1;

-- 25. DISPLAYING TRACKING OF ORDER
SELECT * FROM tracking WHERE tracking_order_id = 1 



























