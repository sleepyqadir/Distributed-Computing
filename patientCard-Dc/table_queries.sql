
-- create db and user query final

CREATE DATABASE PatientCard;
GRANT ALL PRIVILEGES ON *.* TO 'patient_card'@'localhost' IDENTIFIED BY 'pc123456';

-- //////////////////////////////


-- CREATE patient table and patient_temp table final

CREATE TABLE patient(
    p_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
    gender VARCHAR(30) NOT NULL,
    contact VARCHAR(30) NOT NULL,
    address VARCHAR(30) NOT NULL,
    branch VARCHAR(15) NOT NULL
);
ALTER TABLE patient
ADD COLUMN p_username VARCHAR(15) NOT NULL UNIQUE after lastname;


CREATE TABLE patient_temp(
    p_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
    gender VARCHAR(30) NOT NULL,
    contact VARCHAR(30) NOT NULL,
    address VARCHAR(30) NOT NULL,
    branch VARCHAR(15) NOT NULL
);
ALTER TABLE patient_temp
ADD COLUMN p_username VARCHAR(15) NOT NULL UNIQUE after lastname;

-- //////////////////////////////////////////////////////////////////////////////////


-- create doctor table and doctor temp table final

CREATE TABLE doctor(
    d_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
    specialist VARCHAR(30) NOT NULL,
    contact VARCHAR(30) NOT NULL,
    address VARCHAR(30) NOT NULL,
    branch VARCHAR(15) NOT NULL
);

ALTER TABLE doctor
ADD COLUMN d_username VARCHAR(15) NOT NULL UNIQUE after lastname;


CREATE TABLE doctor_temp(
    d_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
    specialist VARCHAR(30) NOT NULL,
    contact VARCHAR(30) NOT NULL,
    address VARCHAR(30) NOT NULL,
    branch VARCHAR(15) NOT NULL
);

ALTER TABLE doctor_temp
ADD COLUMN d_username VARCHAR(15) NOT NULL UNIQUE after lastname;


-- //////////////////////////////////////////////////////////////////////

-- create table appointment and appointment temp 

CREATE TABLE appointment(
    a_id INT AUTO_INCREMENT,
    p_id INT,
    p_name VARCHAR(30) NOT NULL,
    d_id INT,
    PRIMARY KEY(a_id),
    FOREIGN KEY(p_id) REFERENCES patient(p_id),
    FOREIGN KEY(d_id) REFERENCES doctor(d_id)
);

CREATE TABLE appointment_temp(
    a_id INT AUTO_INCREMENT,
    p_id INT,
    p_name VARCHAR(30) NOT NULL,
    d_id INT,
    PRIMARY KEY(a_id),
    FOREIGN KEY(p_id) REFERENCES patient(p_id),
    FOREIGN KEY(d_id) REFERENCES doctor(d_id)
);


ALTER TABLE appointment
DROP FOREIGN KEY appointment_ibfk_1;

ALTER TABLE appointment
DROP FOREIGN KEY appointment_ibfk_2;


ALTER TABLE appointment_temp
DROP FOREIGN KEY appointment_temp_ibfk_1;

ALTER TABLE appointment_temp
DROP FOREIGN KEY appointment_temp_ibfk_2;


ALTER TABLE appointment
DROP COLUMN p_id;

ALTER TABLE appointment
DROP COLUMN d_id;


ALTER TABLE appointment_temp
DROP COLUMN p_id;

ALTER TABLE appointment_temp
DROP COLUMN d_id;

ALTER TABLE appointment
ADD COLUMN p_username VARCHAR(30) NOT NULL UNIQUE after p_name;


ALTER TABLE appointment_temp
ADD COLUMN p_username VARCHAR(30) NOT NULL UNIQUE after p_name;


ALTER TABLE appointment
ADD COLUMN doctor VARCHAR(30) NOT NULL UNIQUE after p_username;

ALTER TABLE appointment_temp
ADD COLUMN doctor VARCHAR(30) NOT NULL UNIQUE after p_username;


ALTER TABLE appointment
ADD COLUMN d_username VARCHAR(30) NOT NULL UNIQUE after doctor;

ALTER TABLE appointment_temp
ADD COLUMN d_username VARCHAR(30) NOT NULL UNIQUE after doctor;



ALTER TABLE appointment
ADD COLUMN date VARCHAR(15) NOT NULL;
ALTER TABLE appointment_temp
ADD COLUMN date VARCHAR(15) NOT NULL;


ALTER TABLE appointment
ADD CONSTRAINT appointment_fk_1 FOREIGN KEY (p_username) 
REFERENCES patient(p_username);

ALTER TABLE appointment
ADD CONSTRAINT appointment_fk_2 FOREIGN KEY (d_username) 
REFERENCES doctor(d_username);

ALTER TABLE appointment_temp
ADD CONSTRAINT appointment_temp_fk_1 FOREIGN KEY (p_username) 
REFERENCES patient(p_username);

ALTER TABLE appointment_temp
ADD CONSTRAINT appointment_temp_fk_2 FOREIGN KEY (d_username) 
REFERENCES doctor(d_username);


-- /////////////////////////////////////////////////////////////////////////////////

-- vender and vender temp table 

CREATE TABLE vendor(
    v_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    contact VARCHAR(30) NOT NULL
);


CREATE TABLE vendor_temp(
    v_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    contact VARCHAR(30) NOT NULL
);

ALTER TABLE vendor
ADD COLUMN v_username VARCHAR(30) NOT NULL UNIQUE;

ALTER TABLE vendor_temp
ADD COLUMN v_username VARCHAR(30) NOT NULL UNIQUE;


ALTER TABLE vendor
ADD COLUMN branch VARCHAR(15) NOT NULL;


ALTER TABLE vendor_temp
ADD COLUMN branch VARCHAR(15) NOT NULL;

-- //////////////////////////////////////////////////////////////////////////////////



-- /// medicine and medicine_temp table query  


CREATE TABLE medicine(
    m_id INT AUTO_INCREMENT PRIMARY KEY,
    v_id INT,
    m_name VARCHAR(30) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY(v_id) REFERENCES vendor(v_id)
);


CREATE TABLE medicine_temp(
    m_id INT AUTO_INCREMENT PRIMARY KEY,
    v_id INT,
    m_name VARCHAR(30) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY(v_id) REFERENCES vendor(v_id)
);

ALTER TABLE medicine 
DROP FOREIGN KEY medicine_ibfk_1;


ALTER TABLE medicine_temp
DROP FOREIGN KEY medicine_temp_ibfk_1;


ALTER TABLE medicine 
DROP COLUMN v_id;

ALTER TABLE medicine
ADD COLUMN v_username VARCHAR(30) NOT NULL AFTER m_id;

ALTER TABLE medicine 
ADD CONSTRAINT medicine_fk_1 FOREIGN KEY(v_username)
REFERENCES vendor(v_username);

ALTER TABLE medicine
ADD COLUMN branch VARCHAR(15) NOT NULL;


ALTER TABLE medicine_temp 
DROP COLUMN v_id;

ALTER TABLE medicine_temp
ADD COLUMN v_username VARCHAR(30) NOT NULL AFTER m_id;

ALTER TABLE medicine_temp
ADD CONSTRAINT medicine_temp_fk_1 FOREIGN KEY(v_username)
REFERENCES vendor(v_username);

ALTER TABLE medicine_temp
ADD COLUMN branch VARCHAR(15) NOT NULL;
