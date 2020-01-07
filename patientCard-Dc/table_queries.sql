CREATE TABLE patient(
    p_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
    gender VARCHAR(30) NOT NULL,
    contact VARCHAR(30) NOT NULL,
    address VARCHAR(30) NOT NULL
);

CREATE TABLE doctor(
    d_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
    specialist VARCHAR(30) NOT NULL,
    contact VARCHAR(30) NOT NULL,
    address VARCHAR(30) NOT NULL
);

CREATE TABLE appointment(
    a_id INT AUTO_INCREMENT,
    p_id INT,
    p_name VARCHAR(30) NOT NULL,
    d_id INT,
    PRIMARY KEY(a_id),
    FOREIGN KEY(p_id) REFERENCES patient(p_id),
    FOREIGN KEY(d_id) REFERENCES doctor(d_id)
);

CREATE TABLE vendor(
    v_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    contact VARCHAR(30) NOT NULL
);

CREATE TABLE medicine(
    m_id INT AUTO_INCREMENT PRIMARY KEY,
    v_id INT,
    m_name VARCHAR(30) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY(v_id) REFERENCES vendor(v_id)
);

//// extra


ALTER TABLE appointment
DROP FOREIGN KEY appointment_ibfk_1;

ALTER TABLE appointment
DROP FOREIGN KEY appointment_ibfk_2;

ALTER TABLE appointment
DROP COLUMN p_id;

ALTER TABLE appointment
DROP COLUMN d_id;

ALTER TABLE patient
ADD COLUMN p_username VARCHAR(15) NOT NULL after lastname;

ALTER TABLE doctor
ADD COLUMN d_username VARCHAR(15) NOT NULL after lastname;

ALTER TABLE patient ADD UNIQUE(p_username)

ALTER TABLE doctor ADD UNIQUE(d_username)

ALTER TABLE appointment
ADD CONSTRAINT appointment_fk_1 FOREIGN KEY (p_username) 
REFERENCES patient(p_username);

ALTER TABLE appointment
ADD CONSTRAINT appointment_fk_2 FOREIGN KEY (d_username) 
REFERENCES doctor(d_username);

ALTER TABLE patient
ADD COLUMN p_username VARCHAR(15) NOT NULL UNIQUE after lastname;

ALTER TABLE patient
ADD COLUMN branch VARCHAR(15) NOT NULL;
ALTER TABLE doctor
ADD COLUMN branch VARCHAR(15) NOT NULL;

ALTER TABLE patient ADD UNIQUE (p_username);

ALTER IGNORE TABLE patient ADD UNIQUE (p_username);

ALTER TABLE appointment
DROP FOREIGN KEY appointment_ibfk_1;

ALTER IGNORE TABLE patient ADD UNIQUE (p_username);

ALTER IGNORE TABLE doctor ADD UNIQUE (d_username);

ALTER TABLE appointment
ADD CONSTRAINT appointment_fk_1 FOREIGN KEY (p_username) 
REFERENCES patient(p_username);

ALTER TABLE appointment
ADD CONSTRAINT appointment_fk_2 FOREIGN KEY (d_username) 
REFERENCES doctor(d_username);