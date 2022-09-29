
-- 1.   INSERTING AGENT DATA IN AGENT TABLE DATABASE
INSERT INTO agent (agent_name, 
     agent_email, 
     agent_password, 
     agent_govt_id, 
     agent_contact, 
     agent_state, 
     agent_city) 
    VALUES (XpressBees,
     head@xpressbees.com, 
     123456, 
     india123, 
     2589631470, 
     Rajasthan, 
     Udaipur);

-- 2.   CHECKING DUPLICATE REGISTRATION
SELECT * FROM agent WHERE agent_govt_id = india123;

-- 3.   DELETING NEW DUPLICATE REGISTRATION
DELETE FROM agent WHERE agent_id = india123;

-- 4.   CHECKING DATA FROM DATABASE AND LOGGING IN
SELECT * FROM agent WHERE agent_email = head@xpressbees.com AND agent_password = 123456 AND agent_govt_id = india123;

-- 5.   TO VIEW PROFILE OF AGENT
SELECT * FROM agent WHERE agent_id = 1;

-- 6.   TO UPDATE PROFILE OF AGENT
UPDATE agent SET agent_name = "XpressBees Delivery", agent_email= "+head@xpressbees.com", agent_password = "000123", agent_govt_id = "india123", agent_contact = "2589630147", agent_state = "Rajasthan", agent_city = "Udaipur" WHERE agent_id = 1;

-- 7.   TO DELETE ACCOUNT OF AGENT
DELETE FROM agent WHERE agent_id = 1;

-- 8.   TO SEE ALL PENDING ORDERS
SELECT order_id, order_tracking_id, order_delivery_state, order_delivery_city, order_place_date FROM `order` WHERE order_status IS NULL ORDER BY order_delivery_state, order_delivery_city ASC;

-- 9.   TO SEE ANY SINGLE ORDER IN DETAIL
SELECT order_id, order_tracking_id, order_delivery_name, order_delivery_contact, order_place_date, order_delivery_address, order_delivery_city, order_delivery_state FROM `order` WHERE order_status IS NULL AND order_id = 1;

-- 10.  TO PICK THAT ORDER FOR DELIVERY AND ADDING DELIVERY REGARDING DETAILS
INSERT INTO tracking (tracking_order_id, tracking_agent_id, tracking_employee_name, tracking_employee_contact, tracking_expect_date, tracking_delivery_status) VALUES (1, 1, "Piyush Sharma", "1231231230", "30 Sept, 2022", "placed")

-- 11.  TO CHECK ALL TRACKS WITH SAME TRACK ID
SELECT * FROM tracking WHERE tracking_order_id = 1;

-- 12.  REMOVE DUPLICATE PICKED ORDER IN TRACK TABLE
DELETE FROM tracking WHERE tracking_id != 1;

-- 13.  UPDATING ORDER STATUS IN ORDER TABLE
UPDATE `order` SET order_status = 'placed' WHERE order_id = 1;

-- 14.  DISPLAYING FULL TRACKLIST UNDER AGENT   
SELECT tracking_id, tracking_employee_name, tracking_expect_date, tracking_delivery_status FROM tracking WHERE tracking_agent_id = 1;

-- 15.  DISPLAYING SINGLE TRACK FULL DETAIL
SELECT * FROM tracking WHERE tracking_agent_id = 1 AND tracking_id = 1;

-- 16.  UPDATE DETAILS OF SELECTED TRACK
UPDATE tracking SET tracking_employee_name = "Ramesh Singh", tracking_employee_contact = "5552228880", tracking_expect_date = "2 Oct, 2022", tracking_delivery_status = "dispatched", tracking_delivery_date = "..." WHERE tracking_id = 1 AND tracking_agent_id = 1;



