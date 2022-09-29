
-- 1.   INSERTING VENDOR DATA IN VENDOR TABLE IN DATABASE
INSERT INTO vendor (vendor_name, 
                    vendor_govt_id, 
                    vendor_email, 
                    vendor_password, 
                    vendor_category, 
                    vendor_state, 
                    vendor_city) 
    VALUES ("Star Flowers", 
            "flower12345", 
            "head@flower.in",
            "1254785412", 
            "Flowers and Plants", 
            "Rajasthan", 
            "Udaipur");

-- 2.   CHECKING DUPLICATE REGISTRATION OF SAME VENDOR
SELECT * FROM vendor WHERE vendor_govt_id = "flower12345";

-- 3.   DELETING DUPLICATE REGISTRATION OF SAME VENDOR
DELETE FROM vendor WHERE vendor_id = 1;

-- 4.   CHECKING VENDOR DETAILS AND VALIDATING AND LOGGING IN
SELECT * FROM vendor WHERE vendor_email = "head@flowers.in" AND vendor_password = "1254785412" AND vendor_govt_id = "flower12345"

-- 5.   TO VIEW FULL PROFILE OF VENDOR
SELECT * FROM vendor WHERE vendor_id = 1;

-- 6.   TO UPDATE PROFILE OF VENDOR
UPDATE vendor SET vendor_name = "Star Flowers and Decorations", vendor_email= "head@star.in", vendor_password = "1254785412", vendor_govt_id = "star12345", vendor_category = "Flowers & Decoration", vendor_state = "Rajasthan", vendor_city = "Udaipur" WHERE vendor_id = 1;

-- 7.   TO DELETE ACCOUNT OF VENDOR
DELETE FROM vendor WHERE vendor_id = 1;

-- 8.   TO SEE ALL THE PRODUCTS UPLOADED BY VENDOR
SELECT * FROM product WHERE product_vendor_id = 1;

-- 9.   TO ADD MORE PRODUCTS TO SELL
INSERT INTO product (product_vendor_id, product_name, product_category, product_price, product_quantity) VALUES (1, "Sunflowers", "Flowers", 50, 350);

-- 10.  TO SEE SINGLE PRODUCT FULL DETAIL
SELECT * FROM product WHERE product_id = 1;

-- 11.  TO UPDATE DETAIL OF PRODUCT 
UPDATE product SET product_name = "Golden Sunflower", product_category = "Flowers", product_price = 150, product_quantity= 400 WHERE product_vendor_id = 1 AND product_id = 1;

-- 12.  TO DELETE PRODUCT
DELETE FROM product WHERE product_id = 1;