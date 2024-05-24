CREATE TABLE knowledgelevels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    knowledge_id INT,
    level_id VARCHAR (255),
    weight INT,
    FOREIGN KEY (knowledge_id) REFERENCES knowledge(id) ON DELETE CASCADE,
    FOREIGN KEY (levels_id) REFERENCES levels(id) ON DELETE CASCADE

);