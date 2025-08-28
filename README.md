# 🐾 API de Mascotas

Este proyecto es una **API RESTful** desarrollada con **Node.js**, **Express** y **MySQL** (XAMPP) para la gestión de mascotas.  
Permite realizar operaciones CRUD: **crear, leer, actualizar y eliminar registros** de mascotas en la base de datos.

---

## 📌 Requisitos

- [Node.js](https://nodejs.org/) (v16 o superior recomendado)
- [XAMPP](https://www.apachefriends.org/es/index.html) con MySQL activo
- [Postman](https://www.postman.com/) o cualquier cliente para probar las peticiones
- Base de datos MySQL con la tabla `mascotas`

---

## 📂 Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tuusuario/api-mascotas.git
   cd api-mascotas

2. Instalar dependencias:
    ```
    npm install
    ```

3. Crear el archivo .env en la raíz del proyecto:
    ```
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=
    DB_PORT=3306
    ```

4.Configurar la base de datos en MySQL (ejemplo):

    ```
    CREATE DATABASE tu_base;

    USE tu_base;

    CREATE TABLE mascotas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        tipo VARCHAR(50) NOT NULL,
        raza VARCHAR(50) NOT NULL,
        color VARCHAR(50) NOT NULL,
        peso DECIMAL(5,2) NOT NULL,
        genero ENUM('Macho','Hembra') NOT NULL
    );

5. Ejecutar el servidor:
    ```
    npm start
    ```
    ```
    Servidor disponible en 👉 http://localhost:3000
    ```