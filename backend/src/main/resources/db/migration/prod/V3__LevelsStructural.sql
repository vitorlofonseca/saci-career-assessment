CREATE TABLE LEVELS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT,
    name VARCHAR (255),
    minCoeficient INT,
    maxCoenficient INT,
    link VARCHAR (255),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);