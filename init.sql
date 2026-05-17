-- init.sql
CREATE DATABASE IF NOT EXISTS komorebi_maps;
USE komorebi_maps;

-- DDL: Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
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
    location_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_bookmark (user_id, location_id)
);

-- DDL: Reviews
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    location_id VARCHAR(50) NOT NULL,
    rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_review (user_id, location_id)
);

-- ─────────────────────────────────────────────────────────────
-- DDL: Saved Tours (parent — one row per named itinerary)
--
--  • name + user_id must be unique so the hard-overwrite POST
--    route can target a single row for deletion before re-insert.
--  • price is nullable: curated CITY_DATA tours carry a price
--    string; user-assembled tours may not.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE saved_tours (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT          NOT NULL,
    name        VARCHAR(150) NOT NULL,
    duration    VARCHAR(100) NOT NULL,         -- e.g. "Full Day · 8hrs"
    price       VARCHAR(50)  DEFAULT NULL,     -- e.g. "¥18,000"  (nullable)
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY  unique_saved_tour (user_id, name)
);

-- ─────────────────────────────────────────────────────────────
-- DDL: Saved Tour Activities (child — ordered stops per tour)
--
--  • step_index preserves the original array order on round-trip.
--    The GET route ORDER BY step_index ASC to reconstruct the
--    timeline exactly as the client stored it.
--  • loc_id is nullable — activities without a locId (non-
--    interactive stops like "Yanaka Ginza") are still persisted;
--    the client skips the gallery lookup for those stops.
--  • title + description mirror the shape of each activity object
--    in CITY_DATA.tours[].activities.
-- ─────────────────────────────────────────────────────────────
CREATE TABLE saved_tour_activities (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    tour_id     INT          NOT NULL,
    step_index  SMALLINT     NOT NULL,         -- 0-based position in timeline
    loc_id      VARCHAR(20)  DEFAULT NULL,     -- e.g. "l-tok-01" (nullable)
    time        VARCHAR(20)  NOT NULL,         -- e.g. "08:00 AM"
    title       VARCHAR(150) NOT NULL,
    description TEXT         DEFAULT NULL,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tour_id) REFERENCES saved_tours(id) ON DELETE CASCADE
);

-- DML: Seed Users
-- Password hash is for 'password123'
INSERT INTO users (username, email, password_hash) 
VALUES ('komorebi_explorer', 'explorer@komorebi.jp', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW');

-- DML: Seed Locations (Modern Urban Tone)
INSERT INTO locations (title, prefecture, description, category, image_url) VALUES
('Don Quijote Dotonbori', 'Osaka', 'A neon-drenched labyrinth of excess. Lose yourself in multi-story aisles where high-end cosmetics meet regional snack exclusives.', 'culture', '/images/loc/donki.jpg'),
('KitKat Chocolatory Ginza', 'Tokyo', 'Sleek, minimalist, and deeply focused. This is where a convenience store staple is elevated to haute confectionary artistry.', 'culture', '/images/loc/kitkat-ginza.jpg'),
('Sukiyabashi Jiro', 'Tokyo', 'An underground temple of umami. No pretense, just absolute dedication to the perfect intersection of rice, vinegar, and oceanic yield.', 'cuisine', '/images/loc/jiro.jpg'),
('Suntory Yamazaki Distillery', 'Osaka', 'Where Scottish framework meets Japanese meticulousness. Walk the wood-paneled halls breathing in the angel\'s share of decades past.', 'culture', '/images/loc/yamazaki.jpg'),
('Toyosu Wholesale', 'Tokyo', 'The brutalist successor to Tsukiji. An industrial epicenter of global seafood logistics where the freshest catch arrives before dawn.', 'cuisine', '/images/loc/toyosu.jpg'),
('Arashiyama Bamboo Grove', 'Kyoto', 'Vertical geometry in vibrant green. Step off the concrete grid and into a whistling acoustic chamber curated by nature.', 'nature', '/images/loc/arashiyama.jpg'),
('Nishijin Textile Center', 'Kyoto', 'The mechanical heartbeat of Kyoto\'s aesthetic heritage. Watch master weavers manipulate silk into kaleidoscopic tapestries.', 'craft', '/images/loc/nishijin.jpg'),
('Jigokudani Onsen', 'Nagano', 'Thermal respite at the edge of the snowline. Witness wild macaques leaning into the steam, mastering the art of winter survival.', 'nature', '/images/loc/jigokudani.jpg'),
('Fushimi Inari', 'Kyoto', 'A vermilion corridor splitting the mountain. Less a hiking trail, more an endless architectural rhythm dedicated to the rice gods.', 'ritual', '/images/loc/fushimi.jpg'),
('Bar High Five', 'Tokyo', 'No menus, just intuition. Sink into a leather booth while masters carve flawless ice diamonds for your bespoke pour.', 'culture', '/images/loc/highfive.jpg');