-- init.sql
CREATE DATABASE IF NOT EXISTS komorebi_maps;
USE komorebi_maps;

-- DDL: Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DDL: Locations
CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    prefecture VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('culture', 'cuisine', 'craft', 'nature', 'ritual') NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DDL: Bookmarks
CREATE TABLE bookmarks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    location_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE,
    UNIQUE KEY unique_bookmark (user_id, location_id)
);

-- DML: Seed Users
-- Password hash is for 'password123'
INSERT INTO users (username, password_hash) 
VALUES ('komorebi_explorer', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW');

-- DML: Seed Locations (Modern Urban Tone)
INSERT INTO locations (title, prefecture, description, category, image_url) VALUES
('Don Quijote Dotonbori', 'Osaka', 'A neon-drenched labyrinth of excess. Lose yourself in multi-story aisles where high-end cosmetics meet regional snack exclusives.', 'culture', '/images/loc/donki.jpg'),
('KitKat Chocolatory Ginza', 'Tokyo', 'Sleek, minimalist, and deeply focused. This is where a convenience store staple is elevated to haute confectionary artistry.', 'culture', '/images/loc/kitkat-ginza.jpg'),
('Sukiyabashi Jiro', 'Tokyo', 'An underground temple of umami. No pretense, just absolute dedication to the perfect intersection of rice, vinegar, and oceanic yield.', 'cuisine', '/images/loc/jiro.jpg'),
('Suntory Yamazaki Distillery', 'Osaka', 'Where Scottish framework meets Japanese meticulousness. Walk the wood-paneled halls breathing in the angel\'s share of decades past.', 'culture', '/images/loc/yamazaki.jpg'),
('Toyosu Wholesale', 'Tokyo', 'The brutalist successor to Tsukiji. An industrial epicenter of global seafood logistics where the freshest catch arrives before dawn.', 'cuisine', '/images/loc/toyosu.jpg'),
('Arashiyama Bamboo Grove', 'Kyoto', 'Vertical geometry in vibrant green. Step off the concrete grid and into a whistling acoustic chamber curated by nature.', 'nature', '/images/loc/arashiyama.jpg'),
('Nishijin Textile Center', 'Kyoto', 'The mechanical heartbeat of Kyoto’s aesthetic heritage. Watch master weavers manipulate silk into kaleidoscopic tapestries.', 'craft', '/images/loc/nishijin.jpg'),
('Jigokudani Onsen', 'Nagano', 'Thermal respite at the edge of the snowline. Witness wild macaques leaning into the steam, mastering the art of winter survival.', 'nature', '/images/loc/jigokudani.jpg'),
('Fushimi Inari', 'Kyoto', 'A vermilion corridor splitting the mountain. Less a hiking trail, more an endless architectural rhythm dedicated to the rice gods.', 'ritual', '/images/loc/fushimi.jpg'),
('Bar High Five', 'Tokyo', 'No menus, just intuition. Sink into a leather booth while masters carve flawless ice diamonds for your bespoke pour.', 'culture', '/images/loc/highfive.jpg');

-- SELECT: Fetch bookmarks for a user
-- (e.g., fetching for user ID 1)
SELECT 
    b.id AS bookmark_id,
    l.id AS location_id,
    l.title,
    l.prefecture,
    l.category,
    b.created_at AS saved_on
FROM bookmarks b
JOIN locations l ON b.location_id = l.id
WHERE b.user_id = 1
ORDER BY b.created_at DESC;