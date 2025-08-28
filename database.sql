CREATE DATABASE veterinaria;

USE veterinaria;

CREATE TABLE mascotas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    tipo VARCHAR(20),
    raza VARCHAR(50),
    color VARCHAR(30),
    peso DECIMAL(5,2),
    genero ENUM('Macho', 'Hembra')
) ENGINE=InnoDB;

INSERT INTO mascotas (nombre, tipo, raza, color, peso, genero) VALUES
('Luna', 'Perro', 'Labrador', 'Negro', 25.5, 'Hembra'),
('Max', 'Perro', 'Bulldog', 'Blanco', 20.0, 'Macho'),
('Mia', 'Gato', 'Siames', 'Gris', 4.2, 'Hembra'),
('Pipo', 'Perro', 'Pastor Alemán', 'Marrón', 30.0, 'Macho'),
('Nala', 'Gato', 'Persa', 'Blanco', 3.8, 'Hembra');

SELECT * FROM mascotas;