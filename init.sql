-- ─────────────────────────────────────────────────────────────
-- Render PostgreSQL init.sql
-- Note: Render automatically creates and connects to your database, 
-- so we don't need CREATE DATABASE or USE commands here.
-- ─────────────────────────────────────────────────────────────

-- DDL: Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DDL: Locations
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    prefecture VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    -- Converted ENUM to VARCHAR with a CHECK constraint for Postgres compatibility
    category VARCHAR(50) NOT NULL CHECK (category IN ('culture', 'cuisine', 'craft', 'nature', 'ritual')),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DDL: Bookmarks
CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    location_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    -- Postgres uses CONSTRAINT ... UNIQUE instead of UNIQUE KEY
    CONSTRAINT unique_bookmark UNIQUE (user_id, location_id)
);

-- DDL: Reviews
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    location_id VARCHAR(50) NOT NULL,
    -- Converted TINYINT (MySQL) to SMALLINT (Postgres)
    rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT unique_review UNIQUE (user_id, location_id)
);

-- DDL: Saved Tours 
CREATE TABLE saved_tours (
    id          SERIAL PRIMARY KEY,
    user_id     INT          NOT NULL,
    name        VARCHAR(150) NOT NULL,
    duration    VARCHAR(100) NOT NULL,
    price       VARCHAR(50)  DEFAULT NULL, 
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT unique_saved_tour UNIQUE (user_id, name)
);

-- DDL: Saved Tour Activities 
CREATE TABLE saved_tour_activities (
    id          SERIAL PRIMARY KEY,
    tour_id     INT          NOT NULL,
    step_index  SMALLINT     NOT NULL,
    loc_id      VARCHAR(20)  DEFAULT NULL, 
    time        VARCHAR(20)  NOT NULL, 
    title       VARCHAR(150) NOT NULL,
    description TEXT         DEFAULT NULL,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tour_id) REFERENCES saved_tours(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────────────────────
-- DML: Seed Data
-- ─────────────────────────────────────────────────────────────

INSERT INTO users (username, email, password_hash) 
VALUES ('komorebi_explorer', 'explorer@komorebi.jp', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW');

INSERT INTO locations (title, prefecture, description, category, image_url) VALUES
('Don Quijote Dotonbori', 'Osaka', 'A neon-drenched labyrinth of excess. Lose yourself in multi-story aisles where high-end cosmetics meet regional snack exclusives.', 'culture', '/images/loc/donki.jpg'),
('KitKat Chocolatory Ginza', 'Tokyo', 'Sleek, minimalist, and deeply focused. This is where a convenience store staple is elevated to haute confectionary artistry.', 'culture', '/images/loc/kitkat-ginza.jpg'),
('Sukiyabashi Jiro', 'Tokyo', 'An underground temple of umami. No pretense, just absolute dedication to the perfect intersection of rice, vinegar, and oceanic yield.', 'cuisine', '/images/loc/jiro.jpg'),
('Suntory Yamazaki Distillery', 'Osaka', 'Where Scottish framework meets Japanese meticulousness. Walk the wood-paneled halls breathing in the angel''s share of decades past.', 'culture', '/images/loc/yamazaki.jpg'),
('Toyosu Wholesale', 'Tokyo', 'The brutalist successor to Tsukiji. An industrial epicenter of global seafood logistics where the freshest catch arrives before dawn.', 'cuisine', '/images/loc/toyosu.jpg'),
('Arashiyama Bamboo Grove', 'Kyoto', 'Vertical geometry in vibrant green. Step off the concrete grid and into a whistling acoustic chamber curated by nature.', 'nature', '/images/loc/arashiyama.jpg'),
('Nishijin Textile Center', 'Kyoto', 'The mechanical heartbeat of Kyoto''s aesthetic heritage. Watch master weavers manipulate silk into kaleidoscopic tapestries.', 'craft', '/images/loc/nishijin.jpg'),
('Jigokudani Onsen', 'Nagano', 'Thermal respite at the edge of the snowline. Witness wild macaques leaning into the steam, mastering the art of winter survival.', 'nature', '/images/loc/jigokudani.jpg'),
('Fushimi Inari', 'Kyoto', 'A vermilion corridor splitting the mountain. Less a hiking trail, more an endless architectural rhythm dedicated to the rice gods.', 'ritual', '/images/loc/fushimi.jpg'),
('Bar High Five', 'Tokyo', 'No menus, just intuition. Sink into a leather booth while masters carve flawless ice diamonds for your bespoke pour.', 'culture', '/images/loc/highfive.jpg');