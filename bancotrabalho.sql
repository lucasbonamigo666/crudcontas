create database contas;
CREATE TABLE  conta (
    id INT PRIMARY KEY AUTO_INCREMENT,
	renda NUMERIC(10,2),
    gastofixo NUMERIC(10,2),
    descricaofixo VARCHAR(50)
    );
