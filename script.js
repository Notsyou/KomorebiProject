/**
 * KOMOREBI MAPS — script.js (Merged)
 * Horizontal slide engine + Auth + Bookmark sync + Saves drawer + Grid
 */

(() => {
  'use strict';

  /* ═══════════════════════════════════════════
     LOCATIONS DATABASE
  ═══════════════════════════════════════════ */
  const LOCATIONS_DB = {
    /* ── TOKYO ── */
    tokyo: [
      {
        id: 'l-tok-01', icon: '⛩️', name: 'Senso-ji Temple', cat: 'ritual',
        city: 'tokyo', cityLabel: 'Tokyo',
        desc: "Tokyo's oldest temple in Asakusa, glowing gold at dusk.",
        lat: 35.7148, lng: 139.7967,
        address: '2-3-1 Asakusa, Taito, Tokyo'
      },
      {
        id: 'l-tok-02', icon: '🗼', name: 'Tokyo Tower', cat: 'culture',
        city: 'tokyo', cityLabel: 'Tokyo',
        desc: 'The iron icon that defines the city silhouette since 1958.',
        lat: 35.6586, lng: 139.7454,
        address: '4-2-8 Shibakoen, Minato, Tokyo'
      },
      {
        id: 'l-tok-03', icon: '🌸', name: 'Shinjuku Gyoen', cat: 'nature',
        city: 'tokyo', cityLabel: 'Tokyo',
        desc: 'Urban oasis with 1,500 cherry trees — perfection in April.',
        lat: 35.6852, lng: 139.7100,
        address: '11 Naitomachi, Shinjuku, Tokyo'
      },
      {
        id: 'l-tok-04', icon: '🎮', name: 'Akihabara', cat: 'culture',
        city: 'tokyo', cityLabel: 'Tokyo',
        desc: "Electric Town: the world's capital of gaming and anime culture.",
        lat: 35.6986, lng: 139.7731,
        address: 'Akihabara, Chiyoda, Tokyo'
      },
      {
        id: 'l-tok-05', icon: '🏯', name: 'Imperial Palace', cat: 'culture',
        city: 'tokyo', cityLabel: 'Tokyo',
        desc: "Heart of Japan's history surrounded by moat gardens.",
        lat: 35.6852, lng: 139.7528,
        address: '1-1 Chiyoda, Chiyoda, Tokyo'
      },
      {
        id: 'l-tok-06', icon: '⛩️', name: 'Meiji Jingu', cat: 'ritual',
        city: 'tokyo', cityLabel: 'Tokyo',
        desc: 'A serene Shinto shrine dedicated to Emperor Meiji, hidden within a massive 170-acre evergreen forest.',
        lat: 35.6764, lng: 139.6993,
        address: '1-1 Yoyogikamizonocho, Shibuya, Tokyo'
      },
      {
        id: 'l-tok-07', icon: '🚥', name: 'Shibuya Crossing', cat: 'culture',
        city: 'tokyo', cityLabel: 'Tokyo',
        desc: 'The famed scramble intersection. A mesmerizing pulse of Tokyo’s relentless energy.',
        lat: 35.6595, lng: 139.7005,
        address: 'Dogenzaka, Shibuya, Tokyo'
      },
      {
        id: 'l-tok-08', icon: '🍣', name: 'Sukiyabashi Jiro', cat: 'cuisine',
        city: 'tokyo', cityLabel: 'Tokyo',
        desc: 'The legendary Michelin-starred sushi counter in a Ginza subway station.',
        lat: 35.6722, lng: 139.7629,
        address: 'Tsukamoto Sogyo Building B1, 2-15 Ginza, Chuo, Tokyo'
      },
      {
        id: 'l-tok-09', icon: '🐟', name: 'Toyosu Market', cat: 'cuisine',
        city: 'tokyo', cityLabel: 'Tokyo',
        desc: "The world's largest wholesale fish market. Freshest breakfast sushi from 5 AM.",
        lat: 35.6451, lng: 139.7855,
        address: '6-6-1 Toyosu, Koto, Tokyo'
      },
      {
        id: 'l-tok-10', icon: '🍡', name: 'Yanaka Ginza', cat: 'culture',
        city: 'tokyo', cityLabel: 'Tokyo',
        desc: 'Wander the retro street food alleys and experience old Tokyo vibes.',
        lat: 35.7275, lng: 139.7667,
        address: '3-13-1 Yanaka, Taito, Tokyo'
      },
      {
        id: 'l-tok-11', icon: '🏛️', name: 'Ueno Park', cat: 'culture',
        city: 'tokyo', cityLabel: 'Tokyo',
        desc: 'Explore the national museum mile and surrounding cherry blossom gardens.',
        lat: 35.7141, lng: 139.7736,
        address: 'Uenokoen, Taito, Tokyo'
      },
      {
        id: 'l-tok-12', icon: '🍜', name: 'Tokyo Ramen Street', cat: 'cuisine',
        city: 'tokyo', cityLabel: 'Tokyo',
        desc: 'Finish the day with dinner at a legendary hidden noodle shop in Tokyo Station.',
        lat: 35.6812, lng: 139.7671,
        address: '1-9-1 Marunouchi, Chiyoda, Tokyo (First Avenue)'
      },
      {
        id: 'l-tok-13', icon: '🍣', name: 'Tsukiji Outer Market', cat: 'cuisine',
        city: 'tokyo', cityLabel: 'Tokyo',
        desc: 'Graze on fresh tamagoyaki, wagyu skewers, and fresh breakfast sushi.',
        lat: 35.6655, lng: 139.7707,
        address: '4-16-2 Tsukiji, Chuo, Tokyo'
      },
      {
        id: 'l-tok-14', icon: '🍻', name: 'Shinjuku Golden Gai', cat: 'culture',
        city: 'tokyo', cityLabel: 'Tokyo',
        desc: 'Late-night drinks in a sprawling network of tiny, nostalgic bars.',
        lat: 35.6940, lng: 139.7046,
        address: '1-1-6 Kabukicho, Shinjuku, Tokyo'
      },
      {
        id: 'l-tok-15', icon: '🍸', name: 'Bar High Five', cat: 'culture',
        city: 'tokyo', cityLabel: 'Tokyo',
        desc: 'A legendary Ginza cocktail institution known for bespoke, menu-less creations.',
        lat: 35.6713, lng: 139.7629,
        address: 'Efflore Ginza 5 Bldg. BF, 5-4-15 Ginza, Tokyo'
      },
      {
        id: 'l-tok-16', icon: '🏮', name: 'Kabukicho', cat: 'culture',
        city: 'tokyo', cityLabel: 'Tokyo',
        desc: 'The neon-lit heart of Shinjuku’s entertainment district.',
        lat: 35.6944, lng: 139.7027,
        address: 'Kabukicho, Shinjuku, Tokyo'
      },
  

    ],

    /* ── OSAKA ── */
    osaka: [
      {
        id: 'l-osa-01', icon: '🏯', name: 'Osaka Castle', cat: 'culture',
        city: 'osaka', cityLabel: 'Osaka',
        desc: 'A 16th-century fortress surrounded by pristine gardens and moat.',
        lat: 34.6873, lng: 135.5262,
        address: '1-1 Osakajo, Chuo Ward, Osaka'
      },
      {
        id: 'l-osa-02', icon: '🦀', name: 'Kuromon Ichiba Market', cat: 'cuisine',
        city: 'osaka', cityLabel: 'Osaka',
        desc: '190-year-old public market: raw, vibrant, delicious.',
        lat: 34.6686, lng: 135.5073,
        address: '2-4-1 Nipponbashi, Chuo Ward, Osaka'
      },
      {
        id: 'l-osa-03', icon: '🎡', name: 'Umeda Sky Building', cat: 'culture',
        city: 'osaka', cityLabel: 'Osaka',
        desc: 'Floating garden observatory linked by a dramatic aerial corridor.',
        lat: 34.7056, lng: 135.4904,
        address: '1-1-88 Oyodonaka, Kita Ward, Osaka'
      },
      {
        id: 'l-osa-04', icon: '🏮', name: 'Hozenji Yokocho', cat: 'cuisine',
        city: 'osaka', cityLabel: 'Osaka',
        desc: 'A narrow, stone-paved alleyway offering a glimpse into Edo-period Osaka and incredible traditional dining.',
        lat: 34.6678, lng: 135.5019,
        address: '1 Namba, Chuo Ward, Osaka'
      },
      {
        id: 'l-osa-05', icon: '🏙️', name: 'Abeno Harukas', cat: 'culture',
        city: 'osaka', cityLabel: 'Osaka',
        desc: 'Japan’s tallest skyscraper, offering breathtaking 360-degree views of the Kansai region.',
        lat: 34.6458, lng: 135.5140,
        address: '1-1-43 Abenosuji, Abeno Ward, Osaka'
      },
      {
        id: 'l-osa-06', icon: '🛒', name: 'Don Quijote Dotonbori', cat: 'culture',
        city: 'osaka', cityLabel: 'Osaka',
        desc: 'Massive multi-story shop with a dedicated wall of regional KitKats.',
        lat: 34.6687, lng: 135.5014,
        address: '7-13 Soemoncho, Chuo Ward, Osaka'
      },
      {
        id: 'l-osa-07', icon: '✈️', name: 'Kansai Airport Duty Free', cat: 'culture',
        city: 'osaka', cityLabel: 'Osaka',
        desc: 'Last stop for Kansai-exclusive KitKat flavours before flying home.',
        lat: 34.4347, lng: 135.2441,
        address: 'Senshu-kuko Kita, Izumisano, Osaka'
      },
      {
        id: 'l-osa-08', icon: '🏭', name: 'Suntory Yamazaki Distillery', cat: 'culture',
        city: 'osaka', cityLabel: 'Osaka',
        desc: 'The birthplace of Japanese whisky. Guided tours spanning over a century.',
        lat: 34.8831, lng: 135.6647,
        address: '5-2-1 Yamazaki, Shimamoto, Mishima District, Osaka'
      },
      {
        id: 'l-osa-09', icon: '🐙', name: 'Takoyaki Dotonbori', cat: 'cuisine',
        city: 'osaka', cityLabel: 'Osaka',
        desc: 'Sample the famous piping-hot octopus balls along the neon canal.',
        lat: 34.6687, lng: 135.5013,
        address: 'Dotonbori, Chuo Ward, Osaka'
      },
      {
        id: 'l-osa-10', icon: '🗼', name: 'Shinsekai District', cat: 'culture',
        city: 'osaka', cityLabel: 'Osaka',
        desc: 'Step back into retro Osaka beneath the glowing Tsutenkaku Tower.',
        lat: 34.6525, lng: 135.5063,
        address: 'Ebisuhigashi, Naniwa Ward, Osaka'
      },
      {
        id: 'l-osa-11', icon: '🍳', name: 'Okonomiyaki District', cat: 'cuisine',
        city: 'osaka', cityLabel: 'Osaka',
        desc: 'Savor savory cabbage pancakes cooked right in front of you on a hot iron griddle.',
        lat: 34.6678, lng: 135.5019,
        address: 'Namba, Chuo Ward, Osaka'
      },
      {
        id: 'l-osa-12', icon: '🥃', name: 'Yamazaki Tasting Library', cat: 'cuisine',
        city: 'osaka', cityLabel: 'Osaka',
        desc: 'A wall of thousands of whisky bottles available for exclusive dram tastings.',
        lat: 34.8831, lng: 135.6647,
        address: '5-2-1 Yamazaki, Shimamoto, Osaka'
      },
    ],

    /* ── NAGOYA ── */
    nagoya: [
      {
        id: 'l-nag-01', icon: '🏯', name: 'Nagoya Castle', cat: 'culture',
        city: 'nagoya', cityLabel: 'Nagoya',
        desc: 'Gold shachihoko dolphin ornaments gleam atop this historic fortress.',
        lat: 35.1856, lng: 136.8996,
        address: '1-1 Honmaru, Naka Ward, Nagoya'
      },
      {
        id: 'l-nag-02', icon: '🚗', name: 'Toyota Commemorative Museum', cat: 'culture',
        city: 'nagoya', cityLabel: 'Nagoya',
        desc: "The birthplace of Japan's industrial revolution, interactive and vast.",
        lat: 35.1760, lng: 136.8820,
        address: '4-1-35 Noritakeshinmachi, Nishi Ward, Nagoya'
      },
      {
        id: 'l-nag-03', icon: '🎍', name: 'Atsuta Shrine', cat: 'ritual',
        city: 'nagoya', cityLabel: 'Nagoya',
        desc: "One of Japan's most sacred Shinto shrines, over 1,900 years old.",
        lat: 35.1269, lng: 136.9079,
        address: '1-1-1 Jingu, Atsuta Ward, Nagoya'
      },
      {
        id: 'l-nag-04', icon: '🍗', name: 'Nagoya Meshi District', cat: 'cuisine',
        city: 'nagoya', cityLabel: 'Nagoya',
        desc: 'Unique local cuisine: miso katsu, hitsumabushi, and tebasaki wings.',
        lat: 35.1710, lng: 136.8815,
        address: 'Sakae, Naka Ward, Nagoya'
      },
      {
        id: 'l-nag-05', icon: '🎨', name: 'Tokugawa Art Museum', cat: 'culture',
        city: 'nagoya', cityLabel: 'Nagoya',
        desc: 'Priceless samurai artifacts and Edo-period scrolls.',
        lat: 35.1855, lng: 136.9308,
        address: '1017 Tokugawacho, Higashi Ward, Nagoya'
      },
      {
        id: 'l-nag-06', icon: '📿', name: 'Osu Kannon', cat: 'ritual',
        city: 'nagoya', cityLabel: 'Nagoya',
        desc: 'A vibrant Buddhist temple alongside a bustling shopping arcade blending the sacred and the retro.',
        lat: 35.1596, lng: 136.8998,
        address: '2-21-47 Osu, Naka Ward, Nagoya'
      },
      {
        id: 'l-nag-07', icon: '🛸', name: 'Oasis 21', cat: 'culture',
        city: 'nagoya', cityLabel: 'Nagoya',
        desc: 'A futuristic eco-complex featuring a spectacular "Spaceship Aqua" glass roof that glows beautifully at night.',
        lat: 35.1709, lng: 136.9093,
        address: '1-11-1 Higashisakura, Higashi Ward, Nagoya'
      },
      {
        id: 'l-nag-08', icon: '🛍️', name: 'Osu Shopping District', cat: 'culture',
        city: 'nagoya', cityLabel: 'Nagoya',
        desc: 'A bustling arcade blending vintage thrifting, electronics, and global street food.',
        lat: 35.1594, lng: 136.9015,
        address: 'Osu, Naka Ward, Nagoya'
      },
      {
        id: 'l-nag-09', icon: '🍽️', name: 'Noritake Garden', cat: 'culture',
        city: 'nagoya', cityLabel: 'Nagoya',
        desc: 'A beautiful red-brick complex celebrating Japan’s famous ceramics manufacturer.',
        lat: 35.1783, lng: 136.8817,
        address: '3-1-36 Noritakeshinmachi, Nishi Ward, Nagoya'
      },
      {
        id: 'l-nag-10', icon: '🍲', name: 'Hitsumabushi Dining', cat: 'cuisine',
        city: 'nagoya', cityLabel: 'Nagoya',
        desc: 'Experience Nagoya’s signature grilled eel over rice, served three different ways.',
        lat: 35.1709, lng: 136.9080,
        address: 'Sakae, Naka Ward, Nagoya'
      },
      {
        id: 'l-nag-11', icon: '🏮', name: 'Sakae Izakaya', cat: 'cuisine',
        city: 'nagoya', cityLabel: 'Nagoya',
        desc: 'Late-night drinks and regional pub food in Nagoya’s entertainment hub.',
        lat: 35.1691, lng: 136.9069,
        address: 'Sakae, Naka Ward, Nagoya'
      },
  
      /* --- NEW OKINAWA LOCATIONS --- */
      {
        id: 'l-oki-08', icon: '🚢', name: 'Tomari Port', cat: 'culture',
        city: 'okinawa', cityLabel: 'Okinawa',
        desc: 'The gateway terminal for high-speed ferries departing to the Kerama Islands.',
        lat: 26.2259, lng: 127.6836,
        address: '3-25-1 Maejima, Naha, Okinawa'
      },
      {
        id: 'l-oki-09', icon: '🏖️', name: 'Zamami Beach', cat: 'nature',
        city: 'okinawa', cityLabel: 'Okinawa',
        desc: 'Pristine white sands and crystal clear waters perfect for a beachside lunch.',
        lat: 26.2238, lng: 127.3009,
        address: 'Zamami, Shimajiri District, Okinawa'
      }
    ],

    /* ── OKINAWA ── */
    okinawa: [
      {
        id: 'l-oki-01', icon: '🌊', name: 'Kerama Islands', cat: 'nature',
        city: 'okinawa', cityLabel: 'Okinawa',
        desc: 'World-class snorkeling ranked among the finest waters on Earth.',
        lat: 26.2031, lng: 127.3528,
        address: 'Zamami, Shimajiri District, Okinawa'
      },
      {
        id: 'l-oki-02', icon: '🏯', name: 'Shuri Castle', cat: 'culture',
        city: 'okinawa', cityLabel: 'Okinawa',
        desc: "Ryukyuan Kingdom's crimson fortress — UNESCO World Heritage site.",
        lat: 26.2172, lng: 127.7190,
        address: '1-2 Kinjocho, Naha, Okinawa'
      },
      {
        id: 'l-oki-03', icon: '🐢', name: 'Cape Maeda Blue Cave', cat: 'nature',
        city: 'okinawa', cityLabel: 'Okinawa',
        desc: 'Blue Cave diving with sea turtles and tropical fish.',
        lat: 26.4419, lng: 127.7181,
        address: 'Maeda, Okinawa City, Okinawa'
      },
      {
        id: 'l-oki-04', icon: '🐠', name: 'Churaumi Aquarium', cat: 'nature',
        city: 'okinawa', cityLabel: 'Okinawa',
        desc: "One of the world's largest, home to whale sharks and mantas.",
        lat: 26.6938, lng: 127.8783,
        address: '424 Ishikawa, Motobu, Kunigami, Okinawa'
      },
      {
        id: 'l-oki-05', icon: '🎵', name: 'Kokusai Street', cat: 'culture',
        city: 'okinawa', cityLabel: 'Okinawa',
        desc: 'Pulsing heart of Naha with craft shops and sanshin music.',
        lat: 26.2169, lng: 127.6872,
        address: 'Makishi, Naha, Okinawa'
      },
      {
        id: 'l-oki-06', icon: '🌅', name: 'Cape Manzamo', cat: 'nature',
        city: 'okinawa', cityLabel: 'Okinawa',
        desc: 'A stunning elephant-trunk-shaped rock formation offering dramatic sunset views over the East China Sea.',
        lat: 26.5048, lng: 127.8502,
        address: 'Onna, Kunigami District, Okinawa'
      },
      {
        id: 'l-oki-07', icon: '🎡', name: 'American Village', cat: 'culture',
        city: 'okinawa', cityLabel: 'Okinawa',
        desc: 'A vibrant, seaside entertainment complex blending Okinawan island vibes with retro Americana.',
        lat: 26.3163, lng: 127.7577,
        address: 'Mihama, Chatan, Nakagami District, Okinawa'
      },
      {
        id: 'l-oki-08', icon: '🚢', name: 'Tomari Port', cat: 'culture',
        city: 'okinawa', cityLabel: 'Okinawa',
        desc: 'The gateway terminal for high-speed ferries departing to the Kerama Islands.',
        lat: 26.2259, lng: 127.6836,
        address: '3-25-1 Maejima, Naha, Okinawa'
      },
      {
        id: 'l-oki-09', icon: '🏖️', name: 'Zamami Beach', cat: 'nature',
        city: 'okinawa', cityLabel: 'Okinawa',
        desc: 'Pristine white sands and crystal clear waters perfect for a beachside lunch.',
        lat: 26.2238, lng: 127.3009,
        address: 'Zamami, Shimajiri District, Okinawa'
      },
      {
        id: 'l-oki-10', icon: '⛩️', name: 'Shuri Castle Gates', cat: 'culture',
        city: 'okinawa', cityLabel: 'Okinawa',
        desc: 'The iconic crimson gates leading into the ancient Ryukyuan palace grounds.',
        lat: 26.2170, lng: 127.7195,
        address: '1-2 Kinjocho, Naha, Okinawa'
      },
      {
        id: 'l-oki-11', icon: '🪦', name: 'Tamaudun Mausoleum', cat: 'ritual',
        city: 'okinawa', cityLabel: 'Okinawa',
        desc: 'The stone royal mausoleum of the Ryukyu Kingdom, a UNESCO World Heritage site.',
        lat: 26.2167, lng: 127.7144,
        address: '1-3 Kinjocho, Naha, Okinawa'
      },
      {
        id: 'l-oki-12', icon: '🪕', name: 'Folk Music Tavern', cat: 'culture',
        city: 'okinawa', cityLabel: 'Okinawa',
        desc: 'A lively izakaya featuring traditional Okinawan dishes and live sanshin music.',
        lat: 26.2150, lng: 127.6845,
        address: 'Makishi, Naha, Okinawa'
      },
    ],

    /* ── SAPPORO / HOKKAIDO ── */
    sapporo: [
      {
        id: 'l-sap-01', icon: '⛷️', name: 'Niseko Ski Resort', cat: 'nature',
        city: 'sapporo', cityLabel: 'Hokkaido',
        desc: 'Powder capital of the world — 15m annual snowfall, world-class runs.',
        lat: 42.8041, lng: 140.6875,
        address: 'Niseko, Abuta District, Hokkaido'
      },
      {
        id: 'l-sap-02', icon: '🏔️', name: 'Odori Ice Festival', cat: 'culture',
        city: 'sapporo', cityLabel: 'Hokkaido',
        desc: 'Monumental ice sculptures transforming the city every February.',
        lat: 43.0618, lng: 141.3545,
        address: 'Odori Park, Chuo Ward, Sapporo'
      },
      {
        id: 'l-sap-03', icon: '🍺', name: 'Sapporo Beer Museum', cat: 'culture',
        city: 'sapporo', cityLabel: 'Hokkaido',
        desc: "Historic red brick brewery and Japan's first and finest lager.",
        lat: 43.0782, lng: 141.3564,
        address: '9-2-10 Kita, Higashi Ward, Sapporo'
      },
      {
        id: 'l-sap-04', icon: '🦌', name: 'Shiretoko Peninsula', cat: 'nature',
        city: 'sapporo', cityLabel: 'Hokkaido',
        desc: 'UNESCO wilderness where brown bears fish for salmon in autumn.',
        lat: 44.0767, lng: 145.0118,
        address: 'Shari, Shari District, Hokkaido'
      },
      {
        id: 'l-sap-05', icon: '🍜', name: 'Ramen Yokocho', cat: 'cuisine',
        city: 'sapporo', cityLabel: 'Hokkaido',
        desc: 'Noodle alley where miso ramen was invented and perfected.',
        lat: 43.0604, lng: 141.3504,
        address: 'Susukino, Chuo Ward, Sapporo'
      },
      {
        id: 'l-sap-06', icon: '🚠', name: 'Mount Moiwa', cat: 'nature',
        city: 'sapporo', cityLabel: 'Hokkaido',
        desc: 'Take the ropeway to the summit for one of Japan’s top three most spectacular night city views.',
        lat: 43.0215, lng: 141.3283,
        address: 'Fushimi 5-chome, Chuo Ward, Sapporo'
      },
      {
        id: 'l-sap-07', icon: '📐', name: 'Moerenuma Park', cat: 'nature',
        city: 'sapporo', cityLabel: 'Hokkaido',
        desc: 'A massive, striking park designed by sculptor Isamu Noguchi, merging geometric land art with Hokkaido nature.',
        lat: 43.1189, lng: 141.4239,
        address: '1-1 Moerenumakoen, Higashi Ward, Sapporo'
      },
      {
        id: 'l-sap-08', icon: '🏔️', name: 'Nikka Yoichi Distillery', cat: 'culture',
        city: 'sapporo', cityLabel: 'Hokkaido',
        desc: 'Historic stone buildings with traditional coal-fired pot stills in coastal Hokkaido.',
        lat: 43.2022, lng: 140.7876,
        address: '7-6 Kurokawa-cho, Yoichi, Hokkaido'
      },
      {
        id: 'l-sap-09', icon: '🚌', name: 'Niseko Transfer', cat: 'nature',
        city: 'sapporo', cityLabel: 'Sapporo',
        desc: 'The scenic winter ride from Sapporo out to the powder capital of the world.',
        lat: 42.8040, lng: 140.6870,
        address: 'Sapporo Station to Niseko'
      },
      {
        id: 'l-sap-10', icon: '🏂', name: 'First Tracks', cat: 'nature',
        city: 'sapporo', cityLabel: 'Hokkaido',
        desc: 'Carving through untouched, knee-deep Hokkaido powder snow first thing in the morning.',
        lat: 42.8633, lng: 140.6980,
        address: 'Grand Hirafu, Niseko, Hokkaido'
      },
      {
        id: 'l-sap-11', icon: '🍜', name: 'Mountain Lodge Ramen', cat: 'cuisine',
        city: 'sapporo', cityLabel: 'Hokkaido',
        desc: 'Warm up mid-mountain with a steaming bowl of rich, buttery miso ramen.',
        lat: 42.8600, lng: 140.7000,
        address: 'Niseko Mountain Lodge, Hokkaido'
      },
      {
        id: 'l-sap-12', icon: '♨️', name: 'Après-Ski Onsen', cat: 'ritual',
        city: 'sapporo', cityLabel: 'Hokkaido',
        desc: 'Soak tired muscles in a natural volcanic hot spring surrounded by snowbanks.',
        lat: 42.8465, lng: 140.6310,
        address: 'Niseko Onsen Village, Hokkaido'
      },
      {
        id: 'l-sap-13', icon: '🏭', name: 'Historic Brewery', cat: 'culture',
        city: 'sapporo', cityLabel: 'Sapporo',
        desc: 'Explore the beautifully preserved red-brick buildings of Japan’s oldest beer brand.',
        lat: 43.0782, lng: 141.3565,
        address: '9-2-10 Kita, Higashi Ward, Sapporo'
      },
      {
        id: 'l-sap-14', icon: '🍺', name: 'Tasting Flight', cat: 'cuisine',
        city: 'sapporo', cityLabel: 'Sapporo',
        desc: 'Sample a flight of exclusive Hokkaido brews straight from the source.',
        lat: 43.0783, lng: 141.3566,
        address: 'Sapporo Beer Museum Star Hall'
      },
      {
        id: 'l-sap-15', icon: '🥩', name: 'Jingisukan Dinner', cat: 'cuisine',
        city: 'sapporo', cityLabel: 'Sapporo',
        desc: 'Hokkaido’s famous Genghis Khan BBQ—succulent lamb grilled over a dome skillet.',
        lat: 43.0554, lng: 141.3533,
        address: 'Susukino, Chuo Ward, Sapporo'
      },
      {
        id: 'l-sap-16', icon: '🧊', name: 'Ice Bar', cat: 'culture',
        city: 'sapporo', cityLabel: 'Sapporo',
        desc: 'Grab a cocktail served in a glass made entirely of solid ice.',
        lat: 43.0550, lng: 141.3530,
        address: 'Susukino Ice Pavilion, Sapporo'
      }
    ]
  };
  // Sample gallery images per location
  const LOCATION_GALLERY = {
  // TOKYO
  'l-tok-01': [ // Senso-ji Temple
    { src: 'https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2020/05/sensoji-temple-iStock-1083328636-1024x684.jpg', cap: 'Senso-ji main gate at day' },
    { src: 'https://traveldudes.com/wp-content/uploads/2020/01/Gate-at-Sensoji-temple-in-Asakusa-Tokyo-Japan.jpg', cap: 'Senso-ji main gate at day' },
    { src: 'https://images.unsplash.com/photo-1624601573012-efb68931cc8f?w=800&q=80', cap: 'Nakamise shopping street' },
    { src: 'https://images.unsplash.com/photo-1551818255-e6e10579494b?w=800&q=80', cap: 'Incense smoke at the shrine' },
  ],
  'l-tok-02': [ // Tokyo Tower
    { src: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', cap: 'Tokyo Tower at twilight' },
    { src: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80', cap: 'Looking up from the base' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', cap: 'City view from observation deck' },
  ],
  'l-tok-03': [ // Shinjuku Gyoen
    { src: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80', cap: 'Cherry blossoms in full bloom' },
    { src: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80', cap: 'French formal garden section' },
    { src: 'https://images.unsplash.com/photo-1536183922588-166604504d5e?w=800&q=80', cap: 'Autumn foliage in Gyoen' },
  ],
  'l-tok-04': [ // Akihabara
    { src: 'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?w=800&q=80', cap: 'Akihabara neon signs' },
    { src: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80', cap: 'Electronics district by night' },
    { src: 'https://images.unsplash.com/photo-1560462007-0328e9bdf3e4?w=800&q=80', cap: 'Anime merchandise stalls' },
  ],
  'l-tok-05': [ // Imperial Palace
    { src: 'https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?w=800&q=80', cap: 'Imperial Palace East Gardens' },
    { src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80', cap: 'Palace moat in spring' },
  ],
  'l-tok-06': [ // Meiji Jingu
    { src: 'https://images.unsplash.com/photo-1596485802119-94071ea178ed?w=800&q=80', cap: 'Sake barrels at Meiji Jingu' },
    { src: 'https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?w=800&q=80', cap: 'Torii gate in the forest' },
  ],
  'l-tok-07': [ // Shibuya Crossing
    { src: 'https://images.unsplash.com/photo-1542051812871-7587d8d01f8d?w=800&q=80', cap: 'The scramble at dusk' },
    { src: 'https://images.unsplash.com/photo-1512963161048-b391782627e7?w=800&q=80', cap: 'Neon rain in Shibuya' },
  ],
  'l-tok-08': [ // Sukiyabashi Jiro (Formerly l-q01-a)
    { src: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80', cap: 'Omakase sushi plating' },
    { src: 'https://images.unsplash.com/photo-1617196034875-3f8e59de5bc4?w=800&q=80', cap: 'Ginza counter dining' },
  ],
  'l-tok-09': [ // Toyosu Market (Formerly l-q01-b)
    { src: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80', cap: 'Morning tuna auction' },
    { src: 'https://images.unsplash.com/photo-1617197342105-4e10cc22a35a?w=800&q=80', cap: 'Fresh catch on display' },
    { src: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=800&q=80', cap: 'Sushi breakfast at market stalls' },
  ],
  'l-tok-10': [// Yanaka Ginza
    { src: 'https://images.unsplash.com/photo-1542055990-25e59b66bb9a?w=800&q=80', cap: 'Retro street food alleys' }

  ],
  'l-tok-11': [// Ueno Park
    { src: 'https://images.unsplash.com/photo-1522851694291-039c36660fc0?w=800&q=80', cap: 'Cherry blossoms in Ueno' }

  ],
  'l-tok-12': [// Tokyo Ramen Street
    { src: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80', cap: 'Legendary Tokyo ramen' }

  ],
  'l-tok-13': [// Tsukiji Outer Market
    { src: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80', cap: 'Tsukiji Market grazing' }

  ],
  'l-tok-14': [// Shinjuku Golden Gai
    { src: 'https://images.unsplash.com/photo-1609951651556-4965f9a3ae6f?w=800&q=80', cap: 'Golden Gai alleyways' }

  ],
  'l-tok-15': [// Bar High Five
    { src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80', cap: 'Bespoke cocktail crafting' }
    
  ],
  'l-tok-16': [// Kabukicho
    { src: 'https://images.unsplash.com/photo-1551818255-e6e10579494b?w=800&q=80', cap: 'Kabukicho neon gates' }

  ],

  // OSAKA
  'l-osa-01': [ // Osaka Castle
    { src: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=80', cap: 'Osaka Castle and moat' },
    { src: 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=800&q=80', cap: 'Castle tower in autumn' },
    { src: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?w=800&q=80', cap: 'Castle gardens at dawn' },
  ],
  'l-osa-02': [ // Kuromon Market
    { src: 'https://images.unsplash.com/photo-1536183922588-166604504d5e?w=800&q=80', cap: 'Fresh seafood stalls' },
    { src: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80', cap: 'Market vendors at midday' },
  ],
  'l-osa-03': [ // Umeda Sky Building
    { src: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80', cap: 'Umeda Sky Building aerial view' },
    { src: 'https://images.unsplash.com/photo-1572979530665-a7e4b3d0e0dc?w=800&q=80', cap: 'Floating garden observatory' },
  ],
  'l-osa-04': [ // Hozenji Yokocho
    { src: 'https://images.unsplash.com/photo-1609951651556-4965f9a3ae6f?w=800&q=80', cap: 'Lantern-lit Hozenji alley' },
    { src: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80', cap: 'Moss-covered Mizukake Fudo statue' },
  ],
  'l-osa-05': [ // Abeno Harukas
    { src: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=80', cap: 'Abeno Harukas skyline view' },
  ],
  'l-osa-06': [ // Don Quijote (Formerly l-c01-a)
    { src: 'https://images.unsplash.com/photo-1609951651556-4965f9a3ae6f?w=800&q=80', cap: 'Dotonbori neon at night' },
    { src: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80', cap: 'Don Quijote storefront' },
  ],
  'l-osa-07': [ // Kansai Airport (Formerly l-c01-c)
    { src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', cap: 'Kansai airport terminal' },
  ],
  'l-osa-08': [ // Suntory Yamazaki (Formerly l-c03-a)
    { src: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800&q=80', cap: 'Whisky barrels in the warehouse' },
    { src: 'https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=800&q=80', cap: 'Yamazaki distillery grounds' },
  ],
  'l-osa-09': [// Takoyaki Dotonbori
    { src: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80', cap: 'Takoyaki tasting' }

  ],
  'l-osa-10': [// Shinsekai District
    { src: 'https://images.unsplash.com/photo-1572979530665-a7e4b3d0e0dc?w=800&q=80', cap: 'Shinsekai retro vibes' }

  ],
  'l-osa-11': [// Okonomiyaki District
    { src: 'https://images.unsplash.com/photo-1536183922588-166604504d5e?w=800&q=80', cap: 'Hot iron okonomiyaki' }

  ],
  'l-osa-12': [// Yamazaki Tasting Library
    { src: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800&q=80', cap: 'Whisky tasting library' }

  ],

  // NAGOYA
  'l-nag-01': [ // Nagoya Castle
    { src: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&q=80', cap: 'Nagoya Castle golden shachihoko' },
    { src: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80', cap: 'Castle keep in summer' },
  ],
  'l-nag-02': [ // Toyota Museum
    { src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80', cap: 'Classic Toyota on display' },
    { src: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80', cap: 'Loom technology exhibit' },
  ],
  'l-nag-03': [ // Atsuta Shrine
    { src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80', cap: 'Ancient forest at Atsuta Shrine' },
    { src: 'https://images.unsplash.com/photo-1624601573012-efb68931cc8f?w=800&q=80', cap: 'Shrine lanterns at dusk' },
  ],
  'l-nag-04': [ // Nagoya Meshi
    { src: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80', cap: 'Miso katsu, Nagoya style' },
    { src: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80', cap: 'Tebasaki chicken wings' },
  ],
  'l-nag-05': [ // Tokugawa Museum
    { src: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80', cap: 'Samurai armour collection' },
    { src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80', cap: 'Edo-period scroll painting' },
  ],
  'l-nag-06': [ // Osu Kannon
    { src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80', cap: 'Osu Kannon temple grounds' },
  ],
  'l-nag-07': [ // Oasis 21
    { src: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80', cap: 'Spaceship Aqua illuminated' },
  ],
  'l-nag-08': [// Osu Shopping District
    { src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80', cap: 'Osu shopping arcade' }
  ],
  'l-nag-09': [// Noritake Garden
    { src: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80', cap: 'Noritake garden grounds' }
  ],
  'l-nag-10': [// Hitsumabushi Dining
    { src: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80', cap: 'Hitsumabushi eel dinner' }
  ],
  'l-nag-11': [// Sakae Izakaya
    { src: 'https://images.unsplash.com/photo-1609951651556-4965f9a3ae6f?w=800&q=80', cap: 'Sakae izakaya drinks' }
  ],

  // OKINAWA
  'l-oki-01': [ // Kerama Islands
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', cap: 'Kerama Islands turquoise water' },
    { src: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80', cap: 'Coral reef snorkeling' },
    { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80', cap: 'Sea turtle at Kerama' },
  ],
  'l-oki-02': [ // Shuri Castle
    { src: 'https://images.unsplash.com/photo-1531566366255-b4da4f65b4f7?w=800&q=80', cap: 'Shuri Castle crimson gate' },
    { src: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80', cap: 'Ryukyuan palace interior' },
  ],
  'l-oki-03': [ // Blue Cave
    { src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80', cap: 'Blue Cave, Cape Maeda' },
    { src: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80', cap: 'Tropical fish in the cave' },
  ],
  'l-oki-04': [ // Churaumi Aquarium
    { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80', cap: 'Whale shark at Churaumi' },
    { src: 'https://images.unsplash.com/photo-1453831362806-3d5577f014a4?w=800&q=80', cap: 'Giant manta ray exhibit' },
  ],
  'l-oki-05': [ // Kokusai Street
    { src: 'https://images.unsplash.com/photo-1609951651556-4965f9a3ae6f?w=800&q=80', cap: 'Kokusai Street nightlife' },
    { src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80', cap: 'Traditional craft shops' },
  ],
  'l-oki-06': [ // Cape Manzamo
    { src: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80', cap: 'Sunset over Cape Manzamo' },
  ],
  'l-oki-07': [ // American Village
    { src: 'https://images.unsplash.com/photo-1609951651556-4965f9a3ae6f?w=800&q=80', cap: 'Mihama American Village Ferris Wheel' },
  ],
  'l-oki-08': [// Tomari Port
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', cap: 'Tomari Port departure' }
  ],
  'l-oki-09': [// Zamami Beach
    { src: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80', cap: 'Zamami Beach sands' }

  ],
  'l-oki-10': [
    { src: 'https://images.unsplash.com/photo-1531566366255-b4da4f65b4f7?w=800&q=80', cap: 'Crimson gates of Shuri' }
  ],
  'l-oki-11': [
    { src: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80', cap: 'Tamaudun stone walls' }
  ],
  'l-oki-12': [
    { src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80', cap: 'Live sanshin music tavern' }
  ],

  // SAPPORO
  'l-sap-01': [ // Niseko
    { src: 'https://images.unsplash.com/photo-1605209971026-d3c6a54ab58b?w=800&q=80', cap: 'Niseko powder runs' },
    { src: 'https://images.unsplash.com/photo-1548521386-740a6e3b9bda?w=800&q=80', cap: 'Hokkaido winter landscape' },
    { src: 'https://images.unsplash.com/photo-1467511961084-1676a85f8f93?w=800&q=80', cap: 'Deep powder skiing' },
  ],
  'l-sap-02': [ // Odori Ice Festival
    { src: 'https://images.unsplash.com/photo-1467511961084-1676a85f8f93?w=800&q=80', cap: 'Ice sculpture festival, Odori' },
    { src: 'https://images.unsplash.com/photo-1548521386-740a6e3b9bda?w=800&q=80', cap: 'Snow lanterns at night' },
  ],
  'l-sap-03': [ // Sapporo Beer Museum
    { src: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800&q=80', cap: 'Historic red brick brewery' },
    { src: 'https://images.unsplash.com/photo-1532634993-15f421e42ec0?w=800&q=80', cap: 'Sapporo lager tasting' },
  ],
  'l-sap-04': [ // Shiretoko Peninsula
    { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', cap: 'Shiretoko wilderness' },
    { src: 'https://images.unsplash.com/photo-1548521386-740a6e3b9bda?w=800&q=80', cap: 'Brown bear spotting' },
  ],
  'l-sap-05': [ // Ramen Yokocho
    { src: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80', cap: 'Sapporo miso ramen' },
    { src: 'https://images.unsplash.com/photo-1609951651556-4965f9a3ae6f?w=800&q=80', cap: 'Ramen Yokocho alley at night' },
  ],
  'l-sap-06': [ // Mount Moiwa
    { src: 'https://images.unsplash.com/photo-1548521386-740a6e3b9bda?w=800&q=80', cap: 'Night view from Mount Moiwa' },
  ],
  'l-sap-07': [ // Moerenuma Park
    { src: 'https://images.unsplash.com/photo-1532634993-15f421e42ec0?w=800&q=80', cap: 'Glass pyramid at Moerenuma' },
  ],
  'l-sap-08': [ // Nikka Yoichi (Formerly l-c03-c)
    { src: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800&q=80', cap: 'Nikka Yoichi stone distillery' },
    { src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80', cap: 'Coal-fired pot stills' },
  ],
  'l-sap-09': [// Niseko Transfer
    { src: 'https://images.unsplash.com/photo-1548521386-740a6e3b9bda?w=800&q=80', cap: 'Winter road to Niseko' }
  ],
  'l-sap-10': [// First Tracks
    { src: 'https://images.unsplash.com/photo-1605209971026-d3c6a54ab58b?w=800&q=80', cap: 'Fresh morning tracks' }
  ],
  'l-sap-11': [// Mountain Lodge Ramen
    { src: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80', cap: 'Steaming mountain ramen' }
  ],
  'l-sap-12': [// Apres-Ski Onsen
    { src: 'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?w=800&q=80', cap: 'Outdoor snow onsen' }
  ],
  'l-sap-13': [// Historic Brewery
    { src: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800&q=80', cap: 'Historic red brick brewery' }
  ],
  'l-sap-14': [// Tasting Flight
    { src: 'https://images.unsplash.com/photo-1532634993-15f421e42ec0?w=800&q=80', cap: 'Sapporo tasting flight' }
  ],
  'l-sap-15': [// Jingisukan Dinner
    { src: 'https://images.unsplash.com/photo-1544378730-8b51042aa37c?w=800&q=80', cap: 'Jingisukan lamb BBQ' }
  ],
  'l-sap-16': [// IceBar
    { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', cap: 'Ice bar cocktails' }
  ],
  };

 /* ═══════════════════════════════════════════
     CITY MODAL DATA (Fully fleshed out itineraries)
  ═══════════════════════════════════════════ */
    const CITY_DATA = {
    // Tokyo
    tokyo: { 
      tag: 'Tokyo — Kantō', title: 'VISIT TOKYO',
      subtitle: 'A metropolis of 37 million souls where ancient temples share skylines with neon skyscrapers.',
      tours: [
        { 
          name: 'Old Town & Temples Walk', 
          duration: 'Full Day · 8hrs', 
          price: '¥18,000',
          activities: [
            // Added locId for Senso-ji (it will be clickable!)
            { time: '08:00 AM', title: 'Senso-ji Temple', desc: 'Beat the crowds at Tokyo’s oldest temple in Asakusa.', locId: 'l-tok-01' },
            { time: '11:30 AM', title: 'Yanaka Ginza', desc: 'Wander the retro street food alleys and grab a quick bite.', locId: 'l-tok-10' },
            { time: '02:00 PM', title: 'Ueno Park & Museums', desc: 'Explore the national museum mile and surrounding gardens.', locId:'l-tok-11' },
            { time: '06:00 PM', title: 'Ramen Street', desc: 'Finish the day with dinner at a legendary hidden ramen spot.', locId:'l-tok-12' }
          ]
        },
        { 
          name: 'Culinary Deep Dive', 
          duration: 'Half Day · 5hrs', 
          price: '¥22,000',
          activities: [
            // Added locId for Toyosu (it will be clickable!)
            { time: '05:00 AM', title: 'Toyosu Wholesale', desc: 'Witness the energy of the early morning seafood logistics.', locId: 'l-tok-09' },
            { time: '07:30 AM', title: 'Breakfast Sushi', desc: 'Eat the freshest catch right outside the market.', locId:'l-tok-09' },
            { time: '10:00 AM', title: 'Tsukiji Outer Market', desc: 'Sample tamagoyaki, wagyu skewers, and matcha.', locId:'l-tok-13' }
          ]
        },
        { 
          name: 'Night Lights & Nightlife', 
          duration: 'Evening · 4hrs', 
          price: '¥12,000',
          activities: [
            { time: '07:00 PM', title: 'Shinjuku Golden Gai', desc: 'Navigate the narrow, lantern-lit alleys of tiny bars.', locId:'l-tok-14' },
            { time: '09:00 PM', title: 'Kabukicho', desc: 'Walk through the vibrant neon chaos of the entertainment district.', locId:'l-tok-16' },
            { time: '10:30 PM', title: 'Bar High Five', desc: 'End the night with a bespoke cocktail in Ginza.', locId:'l-tok-15' }
          ]
        }
      ],
      plan: { bestTime: 'Mar–May', budget: '¥15k/day', language: 'Japanese', flight: '~14h from EU', visa: 'Visa-free (90d)', currency: 'JPY ¥' }
    },
// Osaka
osaka: { 
  tag: 'Osaka — Kansai', title: 'TASTE OSAKA',
  subtitle: "Japan's kitchen and comedy capital — takoyaki at midnight and the castle lit vermillion against a winter sky.",
  tours: [
    { 
      name: 'Street Food Safari', 
      duration: 'Evening · 3hrs', 
      price: '¥8,500',
      activities: [
        { time: '06:00 PM', title: 'Dotonbori Neon Walk', desc: 'Meet under the Glico Man sign to start the culinary journey.', locId: 'l-osa-06' },
        { time: '06:30 PM', title: 'Takoyaki Tasting', desc: 'Try piping hot octopus balls from a legendary street vendor.', locId: 'l-osa-09' },
        { time: '07:45 PM', title: 'Kuromon Market', desc: 'Sample grilled scallops and Kobe beef skewers.', locId: 'l-osa-02' },
        { time: '08:30 PM', title: 'Shinsekai Deep Dive', desc: 'Finish with kushikatsu (fried skewers) in the retro district.', locId: 'l-osa-10' }
      ]
    },
    { 
      name: 'Suntory Whisky Heritage', 
      duration: 'Half Day · 4hrs', 
      price: '¥15,000',
      activities: [
        { time: '01:00 PM', title: 'Train to Yamazaki', desc: 'Leave the city center for the misty mountains of Shimamoto.', locId: 'l-osa-08' },
        { time: '02:00 PM', title: 'Distillery Tour', desc: 'Walk the wood-paneled halls and see the copper pot stills.', locId: 'l-osa-08' },
        { time: '03:30 PM', title: 'Tasting Library', desc: 'Sample rare, aged single malts directly from the source.', locId: 'l-osa-12' }
      ]
    },
    { 
      name: 'Castle & History Walk', 
      duration: 'Half Day · 4hrs', 
      price: '¥9,000',
      activities: [
        { time: '09:00 AM', title: 'Osaka Castle Park', desc: 'Walk the sprawling grounds and photograph the moats.', locId: 'l-osa-01' },
        { time: '10:30 AM', title: 'Castle Keep', desc: 'Climb the 16th-century fortress for panoramic city views.', locId: 'l-osa-01' },
        { time: '12:00 PM', title: 'Okonomiyaki Lunch', desc: 'Enjoy savory cabbage pancakes cooked right at your table.', locId: 'l-osa-11' }
      ]
    }
  ],
  plan: { bestTime: 'Oct–Dec', budget: '¥12k/day', language: 'Japanese', flight: '~13h from EU', visa: 'Visa-free (90d)', currency: 'JPY ¥' }
},
// Nagoya
nagoya: {
  tag: 'Nagoya — Chūbu', title: 'RISE NAGOYA',
  subtitle: 'The unsung giant of central Japan — fierce castle pride, tebasaki chicken wings, and a design legacy that shapes the world.',
  tours: [
    { 
      name: 'Castle & Shrine Circuit', 
      duration: 'Full Day · 8hrs', 
      price: '¥14,000',
      activities: [
        { time: '09:00 AM', title: 'Nagoya Castle Grounds', desc: 'Admire the golden shachihoko dolphins atop the fortress roof.', locId: 'l-nag-01' },
        { time: '11:30 AM', title: 'Tokugawa Art Museum', desc: 'View priceless samurai artifacts and Edo-period scrolls.', locId: 'l-nag-05' },
        { time: '02:00 PM', title: 'Atsuta Shrine', desc: 'Walk the ancient forest paths of Japan’s most sacred Shinto shrine.', locId: 'l-nag-03' },
        { time: '04:00 PM', title: 'Osu Shopping District', desc: 'Browse vintage stores and electronics alongside ancient temples.', locId: 'l-nag-08' }
      ]
    },
    { 
      name: 'Industrial Heritage Tour', 
      duration: 'Half Day · 4hrs', 
      price: '¥8,000',
      activities: [
        { time: '10:00 AM', title: 'Toyota Museum', desc: 'Discover the birth of Japan’s industrial revolution from looms to cars.', locId: 'l-nag-02' },
        { time: '12:30 PM', title: 'Noritake Garden', desc: 'Explore the historic red brick buildings of the famous ceramics maker.', locId: 'l-nag-09' }
      ]
    },
    { 
      name: 'Nagoya Meshi Food Crawl', 
      duration: 'Evening · 3hrs', 
      price: '¥11,000',
      activities: [
        { time: '06:00 PM', title: 'Hitsumabushi Dinner', desc: 'Enjoy grilled eel on rice eaten three different ways.', locId: 'l-nag-10' },
        { time: '08:00 PM', title: 'Sakae Izakaya', desc: 'Taste authentic Tebasaki (peppery chicken wings).', locId: 'l-nag-11' }
      ]
    }
  ],
  plan: { bestTime: 'Apr–Jun', budget: '¥10k/day', language: 'Japanese', flight: '~13h from EU', visa: 'Visa-free (90d)', currency: 'JPY ¥' }
},
// Okinawa
okinawa: {
  tag: 'Okinawa — Ryukyu', title: 'DREAM OKINAWA',
  subtitle: "Japan's tropical paradise: coral reefs, sea turtles in turquoise water, and Ryukyuan culture unlike anywhere else.",
  tours: [
    {
      name: 'Kerama Islands Snorkel Day',
      duration: 'Full Day · 9hrs',
      price: '¥28,000',
      activities: [
        { time: '08:00 AM', title: 'Depart Naha Port',     desc: 'Take the high-speed ferry across the Philippine Sea.',          locId: 'l-oki-08' },
        { time: '09:30 AM', title: 'Turtle Snorkeling',    desc: 'Swim alongside wild sea turtles in crystal clear water.',        locId: 'l-oki-01' },
        { time: '12:30 PM', title: 'Beachside Lunch',      desc: 'Enjoy fresh island seafood on pristine white sand.',             locId: 'l-oki-09' },
        { time: '02:00 PM', title: 'Coral Reef Free Dive', desc: 'Explore the vibrant tropical fish ecosystems.',                  locId: 'l-oki-01' }
      ]
    },
    {
      name: 'Ryukyu Kingdom History Walk',
      duration: 'Half Day · 4hrs',
      price: '¥9,500',
      activities: [
        { time: '09:00 AM', title: 'Shuri Castle Gates',   desc: 'Walk the ancient stone paths of the Ryukyuan kings.',            locId: 'l-oki-10' },
        { time: '11:00 AM', title: 'Tamaudun Mausoleum',   desc: 'Visit the UNESCO World Heritage royal tombs.',                   locId: 'l-oki-11' }
      ]
    },
    {
      name: 'Night City & Sanshin Music',
      duration: 'Evening · 4hrs',
      price: '¥12,000',
      activities: [
        { time: '06:00 PM', title: 'Kokusai Street',       desc: 'Browse the vibrant, palm-lined shopping avenue.',                locId: 'l-oki-05' },
        { time: '08:00 PM', title: 'Folk Music Tavern',    desc: 'Eat Awamori pork and listen to live traditional Sanshin music.', locId: 'l-oki-12' }
      ]
    }
  ],
  plan: { bestTime: 'May–Oct', budget: '¥14k/day', language: 'Japanese', flight: '~3.5h from Tokyo', visa: 'Visa-free (90d)', currency: 'JPY ¥' }
},
// Sapporo
sapporo: {
  tag: 'Sapporo — Hokkaido', title: 'SNOW SAPPORO',
  subtitle: "Japan's northernmost major city: world-class powder snow, ice sculpture festivals, and legendary miso ramen.",
  tours: [
    {
      name: 'Powder Snow Ski Day',
      duration: 'Full Day · 9hrs',
      price: '¥35,000',
      activities: [
        { time: '07:00 AM', title: 'Niseko Transfer',       desc: 'Early morning drive to the snow capital of the world.',         locId: 'l-sap-09' },
        { time: '09:00 AM', title: 'First Tracks',          desc: 'Hit the legendary deep powder of Grand Hirafu.',                locId: 'l-sap-10' },
        { time: '01:00 PM', title: 'Mountain Lodge Ramen',  desc: 'Warm up with a steaming bowl of spicy miso ramen.',             locId: 'l-sap-11' },
        { time: '03:30 PM', title: 'Après-Ski Onsen',       desc: 'Soak in a natural outdoor hot spring surrounded by snow.',      locId: 'l-sap-12' }
      ]
    },
    {
      name: 'Sapporo Brewery Tasting',
      duration: 'Half Day · 3hrs',
      price: '¥7,000',
      activities: [
        { time: '02:00 PM', title: 'Historic Brewery',      desc: 'Tour the red brick buildings of Japan\'s first beer brand.',    locId: 'l-sap-13' },
        { time: '04:00 PM', title: 'Tasting Flight',        desc: 'Sample exclusive local drafts only available in Hokkaido.',     locId: 'l-sap-14' }
      ]
    },
    {
      name: 'Susukino Midnight Crawl',
      duration: 'Evening · 4hrs', 
      price: '¥13,000',
      activities: [
        { time: '07:00 PM', title: 'Jingisukan Dinner',     desc: 'Grill Hokkaido lamb on a traditional domed skillet.',           locId: 'l-sap-15' },
        { time: '09:00 PM', title: 'Ice Bar',               desc: 'Have a drink in a bar carved entirely out of ice.',             locId: 'l-sap-16' },
        { time: '10:30 PM', title: 'Ramen Yokocho',         desc: 'End the night in the alleyway where miso ramen was invented.',  locId: 'l-sap-05' }
      ]
    }
  ],
  plan: { bestTime: 'Dec–Mar', budget: '¥13k/day', language: 'Japanese', flight: '~1.5h from Tokyo', visa: 'Visa-free (90d)', currency: 'JPY ¥' }
}
  };

  /* Flat list for the grid section */
  const ALL_LOCATIONS = Object.values(LOCATIONS_DB).flat();

  window._debug = { CITY_DATA, ALL_LOCATIONS, LOCATION_GALLERY };

  /* ═══════════════════════════════════════════
     STATE
  ═══════════════════════════════════════════ */
  const bookmarks   = new Map(); // locationId → location object
  let   bkFilter    = 'all';
  let   savesFilter = 'all';
  let   toastTimer  = null;
  let   leafletMap  = null;
  let   leafletMarker = null;
  let   currentModalLoc = null; // location open in grid modal
  let   currentCity    = null;  // city key open in city modal

  /* ═══════════════════════════════════════════
     API
  ═══════════════════════════════════════════ */
  const _host = window.location.hostname;
  const API_BASE = (_host === 'localhost' || _host === '127.0.0.1' || _host === '')
    ? 'http://localhost:3000/api'
    : 'https://komorebproject-backend.onrender.com/api';

  const authState = {
    getToken:    () => localStorage.getItem('komorebi_jwt'),
    setToken: (t) => localStorage.setItem('komorebi_jwt', t),
    clearToken:  () => localStorage.removeItem('komorebi_jwt'),
    getUsername: () => localStorage.getItem('komorebi_user'),
    setUsername:(u) => localStorage.setItem('komorebi_user', u),
    clearUsername:   () => localStorage.removeItem('komorebi_user'),
    isLoggedIn:  () => !!localStorage.getItem('komorebi_jwt'),
    logout() {
      openLogoutConfirm();
    }
  };

  async function apiLogin(identifier, password) {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Send as both 'identifier' (new) and 'username' (fallback for old backend)
      body: JSON.stringify({ identifier, username: identifier, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    authState.setToken(data.token);
    authState.setUsername(data.username);
  }

  async function apiSignup(username, email, password) {
    const res = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Signup failed');
    authState.setToken(data.token);
    authState.setUsername(data.username);
  }

  async function apiToggleBookmark(locationId) {
    const res = await fetch(`${API_BASE}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authState.getToken()}`
      },
      body: JSON.stringify({ locationId })
    });
    return res.json();
  }

  async function syncBookmarksToServer() {
    if (bookmarks.size === 0) return;
    const ids = Array.from(bookmarks.keys());
    const res = await fetch(`${API_BASE}/bookmarks/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authState.getToken()}`
      },
      body: JSON.stringify({ locationIds: ids })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Bookmark sync failed');
    }
  }

  async function syncBookmarksFromDB() {
    if (!authState.isLoggedIn()) return;
    try {
      const res = await fetch(`${API_BASE}/bookmarks`, {
        headers: { 'Authorization': `Bearer ${authState.getToken()}` }
      });
      const rows = await res.json();
      bookmarks.clear();
      rows.forEach(row => {
        const locId = row.location_id || row.locationId || row.id;
        const loc = ALL_LOCATIONS.find(l => l.id === locId);
        if (loc) bookmarks.set(loc.id, loc);
      });
      updateSavesBadge();
      renderSavesDrawer();
      renderLocationGrid();
      persistBookmarksToStorage();
    } catch (err) {
      console.error('Bookmark sync error:', err);
    }
  }

  /* ═══════════════════════════════════════════
     SLIDE ENGINE (untouched from prototype)
  ═══════════════════════════════════════════ */
  const loader        = document.getElementById('loader');
  const strip         = document.getElementById('scrollContainer');
  const pillItems     = document.querySelectorAll('.pill-nav__item');
  const progressFill  = document.getElementById('progressFill');
  const scrollHint    = document.getElementById('scrollHint');
  const sections      = document.querySelectorAll('.city-section');
  const modalTabs     = document.querySelectorAll('.modal__tab');
  const TOTAL         = sections.length;

  let current   = 0;
  let animating = false;

  function goTo(idx, instant) {
    idx = Math.max(0, Math.min(idx, TOTAL - 1));
    if (animating && !instant) return;
    animating = true;
    current = idx;
  
    strip.style.transition = instant ? 'none' : 'transform 0.85s cubic-bezier(0.77,0,0.18,1)';
    strip.style.transform  = `translateX(${-idx * 100}vw)`;
  
    pillItems.forEach((p, i) => p.classList.toggle('active', i === idx));
    progressFill.style.width = `${TOTAL > 1 ? (idx / (TOTAL-1)) * 100 : 0}%`;
    sections.forEach((s, i) => { s.classList.toggle('in-view', i === idx); });
    if (idx > 0 && scrollHint) scrollHint.classList.add('hidden');
  
    parallaxTarget = idx * window.innerWidth;
    setTimeout(() => { animating = false; }, instant ? 0 : 900);
  }

  /* Preload every city background image immediately so overlays are ready
     before the user swipes. Creates off-screen Image objects — the browser
     caches them and the bg elements paint instantly on slide change.       */
  (function preloadCityBgs() {
    sections.forEach(sec => {
      const bg = sec.querySelector('.city-section__bg');
      if (!bg) return;
      const style = bg.getAttribute('style') || '';
      const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
      if (match && match[1]) {
        const img = new Image();
        img.src = match[1];
      }
    });
  })();

  /* Parallax rAF loop */
  let parallaxCurrent = 0;
  let parallaxTarget  = 0;

  (function rafLoop() {
    parallaxCurrent += (parallaxTarget - parallaxCurrent) * 0.08;
    sections.forEach((sec, i) => {
      const offset = (parallaxCurrent / window.innerWidth) - i;
      if (Math.abs(offset) > 1.6) return;
      const bg  = sec.querySelector('.city-section__bg');
      const txt = sec.querySelector('.city-section__content');
      const op  = Math.max(0, 1 - Math.abs(offset) * 1.5);
      if (bg)  bg.style.transform  = `translateX(${-(offset * window.innerWidth * 0.25)}px)`;
      if (txt) { txt.style.transform = `translateX(${offset * window.innerWidth * 0.10}px)`; txt.style.opacity = op; }
    });
    requestAnimationFrame(rafLoop);
  })();

  /* ═══════════════════════════════════════════
     HERO ↔ GRID TRANSITION
  ═══════════════════════════════════════════ */
  const heroViewport = document.getElementById('heroViewport');
  const pillNav      = document.getElementById('pillNav');
  const heroScrollCta = document.getElementById('heroScrollCta');
  const gridSection  = document.getElementById('gridSection');
  const gridBackBtn  = document.getElementById('gridBackBtn');
  const enterGridBtn = document.getElementById('enterGridBtn');

  let inGridView = false;

  function showGridView() {
    inGridView = true;
    heroViewport.classList.add('hero--hidden');
    pillNav.classList.add('hero--hidden');
    heroScrollCta.classList.add('hero--hidden');
    scrollHint && scrollHint.classList.add('hidden');
    gridSection.classList.add('grid--visible');
    document.getElementById('globalNav').classList.add('scrolled');
    renderLocationGrid();
  }

  function showHeroView() {
    inGridView = false;
    heroViewport.classList.remove('hero--hidden');
    pillNav.classList.remove('hero--hidden');
    heroScrollCta.classList.remove('hero--hidden');
    gridSection.classList.remove('grid--visible');
  }

  enterGridBtn.addEventListener('click', showGridView);
  gridBackBtn.addEventListener('click', showHeroView);

  /* Nav "Discover" link */
  document.querySelectorAll('[data-scroll-to="grid"]').forEach(el =>
    el.addEventListener('click', (e) => { e.preventDefault(); showGridView(); })
  );
  document.querySelectorAll('[data-scroll-to="hero"]').forEach(el =>
    el.addEventListener('click', (e) => { e.preventDefault(); showHeroView(); })
  );

  /* ═══════════════════════════════════════════
     LOCATION GRID (vertical section)
  ═══════════════════════════════════════════ */
  function renderLocationGrid() {
    const grid = document.getElementById('locationGrid');
    grid.innerHTML = '';
    const filtered = ALL_LOCATIONS.filter(loc =>
      bkFilter === 'all' || loc.cat === bkFilter
    );
    if (filtered.length === 0) {
      grid.innerHTML = `<p class="grid-empty">No locations match this filter.</p>`;
      return;
    }
    filtered.forEach(loc => {
      const saved = bookmarks.has(loc.id);
      const card = document.createElement('article');
      card.className = 'loc-card';
      card.dataset.cat = loc.cat;
      card.innerHTML = `
        <button class="loc-card__heart ${saved ? 'is-saved' : ''}" data-id="${loc.id}" aria-label="Save ${loc.name}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <div class="loc-card__icon">${loc.icon}</div>
        <div class="loc-card__city">${loc.cityLabel}</div>
        <h3 class="loc-card__name">${loc.name}</h3>
        <p class="loc-card__desc">${loc.desc}</p>
        <span class="loc-card__cat">${loc.cat}</span>
      `;
      card.querySelector('.loc-card__heart').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBookmarkOptimistic(loc, e.currentTarget);
      });
      card.addEventListener('click', () => openLocationModal(loc));
      grid.appendChild(card);
    });
  }

  /* Grid filter buttons */
  document.querySelectorAll('.grid-filter__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.grid-filter__btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      bkFilter = btn.dataset.filter;
      renderLocationGrid();
    });
  });

  /* ═══════════════════════════════════════════
     BOOKMARK TOGGLE — Optimistic UI
  ═══════════════════════════════════════════ */
  function persistBookmarksToStorage() {
    localStorage.setItem('komorebi_saved_locations', JSON.stringify([...bookmarks.values()]));
  }

  function toggleBookmarkOptimistic(loc, btn) {
    const alreadySaved = bookmarks.has(loc.id);

    if (alreadySaved) {
      bookmarks.delete(loc.id);
      btn.classList.remove('is-saved');
      btn.querySelector('svg').setAttribute('fill', 'none');
      showToast(`Removed "${loc.name}"`);
    } else {
      bookmarks.set(loc.id, loc);
      btn.classList.add('is-saved');
      btn.querySelector('svg').setAttribute('fill', 'currentColor');
      showToast(`Saved "${loc.name}" ♥`);
    }

    persistBookmarksToStorage();
    updateSavesBadge();
    renderSavesDrawer();

    // Sync modal header save button state if same location is open
    if (currentModalLoc && currentModalLoc.id === loc.id) {
      syncModalSaveBtn();
    }

    // Sync location detail modal heart if the same location is open there
    if (currentLocModalLoc && currentLocModalLoc.id === loc.id) {
      const locHeart = document.getElementById('locModalHeart');
      if (locHeart) {
        const saved = bookmarks.has(loc.id);
        locHeart.classList.toggle('is-saved', saved);
        locHeart.querySelector('svg').setAttribute('fill', saved ? 'currentColor' : 'none');
      }
    }

    if (authState.isLoggedIn()) {
      apiToggleBookmark(loc.id).catch(() => {
        // Rollback
        if (alreadySaved) {
          bookmarks.set(loc.id, loc);
          btn.classList.add('is-saved');
          btn.querySelector('svg').setAttribute('fill', 'currentColor');
        } else {
          bookmarks.delete(loc.id);
          btn.classList.remove('is-saved');
          btn.querySelector('svg').setAttribute('fill', 'none');
        }
        persistBookmarksToStorage();
        updateSavesBadge();
        renderSavesDrawer();
        showToast('Sync failed — please retry');
      });
    }
  }

  /* ═══════════════════════════════════════════
     LOCATION DETAIL MODAL (Gallery / Map / Reviews)
     Uses #location-modal with new tab system
  ═══════════════════════════════════════════ */
  const locModal      = document.getElementById('location-modal');
  const locModalClose = document.getElementById('locModalClose');

  

  // Reviews start empty — users post their own
  const CITY_REVIEWS = {
    tokyo: [],
    osaka: [],
    nagoya: [],
    okinawa: [],
    sapporo: [],
  };

  let locLeafletMap = null;
  let locLeafletMarker = null;
  let currentLocModalLoc = null;
  let lbImages = [];
  let lbIndex = 0;
  let starRating = 0;

  function openLocationModal(loc) {
    currentLocModalLoc = loc;

    document.getElementById('modal-loc-sub').textContent = `${loc.cat} · ${loc.cityLabel}`;
    document.getElementById('modal-loc-title').textContent = loc.name;
    document.getElementById('modal-loc-desc').textContent = loc.desc || '';

    // Sync modal heart button to current bookmark state
    const locHeart = document.getElementById('locModalHeart');
    if (locHeart) {
      const isSaved = bookmarks.has(loc.id);
      locHeart.dataset.id = loc.id;
      locHeart.classList.toggle('is-saved', isSaved);
      locHeart.querySelector('svg').setAttribute('fill', isSaved ? 'currentColor' : 'none');
    }

    // --- Gallery Tab (per-location) ---
    const imgs = LOCATION_GALLERY[loc.id] || [
      { src: `https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80`, cap: loc.name }
    ];
    lbImages = imgs;
    lbIndex = 0;
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = imgs.map((img, i) =>
      `<div class="gallery-item" data-index="${i}" style="background-image:url('${img.src}')">
        <div class="gallery-item__cap">${img.cap}</div>
       </div>`
    ).join('');
    galleryGrid.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => openLightbox(parseInt(item.dataset.index)));
    });
    document.getElementById('gallery-lightbox').style.display = 'none';

    // --- Map Tab ---
    document.getElementById('map-info-label').textContent = `${loc.address} · ${loc.lat.toFixed(4)}°N, ${loc.lng.toFixed(4)}°E`;
    document.getElementById('map-gmaps-link').href = `https://www.google.com/maps?q=${loc.lat},${loc.lng}`;

    // --- Reviews Tab ---
    const reviews = CITY_REVIEWS[loc.city] || [];
    const reviewsList = document.getElementById('reviews-list');
    if (reviews.length === 0) {
      reviewsList.innerHTML = `<p class="reviews-empty-msg">No reviews yet. Be the first to share your experience!</p>`;
    } else {
      reviewsList.innerHTML = reviews.map(r =>
        `<div class="review-item">
          <div class="review-item__header">
            <div class="review-item__avatar">${r.user}</div>
            <div class="review-item__meta">
              <div class="review-item__name">${r.name}</div>
              <div class="review-item__date">${r.date}</div>
            </div>
            <div class="review-item__stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
          </div>
          <p class="review-item__text">${r.text}</p>
         </div>`
      ).join('');
    }

    // Show/hide review compose based on login status
    const reviewCompose = document.getElementById('review-compose');
    const reviewLoginWall = document.getElementById('review-login-wall');
    if (authState.isLoggedIn()) {
      reviewCompose.style.display = 'flex';
      if (reviewLoginWall) reviewLoginWall.style.display = 'none';
      // Avatar initial
      const username = authState.getUsername();
      document.getElementById('review-avatar').textContent = username ? username[0].toUpperCase() : '?';
    } else {
      reviewCompose.style.display = 'none';
      if (reviewLoginWall) reviewLoginWall.style.display = 'flex';
    }

    // Reset star picker
    starRating = 0;
    document.querySelectorAll('#star-picker .star').forEach(s => s.classList.remove('active'));
    document.getElementById('review-input').value = '';

    // Activate gallery tab by default
    activateLocModalTab('mtab-gallery');

    locModal.classList.add('open');
    document.body.classList.add('modal-lock');
  }

  function closeLocModal() {
    locModal.classList.remove('open');
    document.body.classList.remove('modal-lock');
    closeLightbox();
  }

  locModalClose.addEventListener('click', closeLocModal);
  locModal.addEventListener('click', e => { if (e.target === locModal) closeLocModal(); });

  // Modal heart button — toggles bookmark for the currently-open location
  document.getElementById('locModalHeart').addEventListener('click', () => {
    if (!currentLocModalLoc) return;
    const btn = document.getElementById('locModalHeart');
    toggleBookmarkOptimistic(currentLocModalLoc, btn);
    // Also sync the matching grid card heart if it's rendered
    const gridCard = document.querySelector(`.loc-card__heart[data-id="${currentLocModalLoc.id}"]`);
    if (gridCard) {
      const saved = bookmarks.has(currentLocModalLoc.id);
      gridCard.classList.toggle('is-saved', saved);
      gridCard.querySelector('svg').setAttribute('fill', saved ? 'currentColor' : 'none');
    }
  });

  function activateLocModalTab(targetId) {
    document.querySelectorAll('#location-modal .modal-tab').forEach(t =>
      t.classList.toggle('is-active', t.dataset.modalTarget === targetId)
    );
    document.querySelectorAll('#location-modal .modal-panel').forEach(p =>
      p.classList.toggle('is-active', p.id === targetId)
    );

    if (targetId === 'mtab-map') {
      setTimeout(() => {
        if (!locLeafletMap && currentLocModalLoc) {
          locLeafletMap = L.map('leaflet-map-loc', { zoomControl: true, scrollWheelZoom: false });
          L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            subdomains: 'abcd', maxZoom: 19
          }).addTo(locLeafletMap);
        }
        if (locLeafletMap && currentLocModalLoc) {
          const icon = L.divIcon({
            className: '',
            html: `<div style="width:16px;height:16px;background:#FF4F00;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid #fff;box-shadow:0 2px 8px rgba(255,79,0,.5);"></div>`,
            iconSize: [16, 16], iconAnchor: [8, 16]
          });
          if (locLeafletMarker) locLeafletMarker.remove();
          locLeafletMarker = L.marker([currentLocModalLoc.lat, currentLocModalLoc.lng], { icon })
            .addTo(locLeafletMap)
            .bindPopup(`<strong>${currentLocModalLoc.name}</strong><br><small>${currentLocModalLoc.cityLabel}</small>`);
          locLeafletMap.setView([currentLocModalLoc.lat, currentLocModalLoc.lng], 14);
          locLeafletMarker.openPopup();
          locLeafletMap.invalidateSize();
        }
      }, 120);
    }
  }

  document.querySelectorAll('#location-modal .modal-tab').forEach(tab => {
    tab.addEventListener('click', () => activateLocModalTab(tab.dataset.modalTarget));
  });

  // Lightbox
  function openLightbox(idx) {
    lbIndex = idx;
    const lb = document.getElementById('gallery-lightbox');
    lb.style.display = 'flex';
    document.getElementById('lightbox-img').src = lbImages[idx].src;
    document.getElementById('lightbox-caption').textContent = lbImages[idx].cap;
  }

  function closeLightbox() {
    document.getElementById('gallery-lightbox').style.display = 'none';
  }

  document.getElementById('lightboxCloseBtn').addEventListener('click', closeLightbox);
  document.getElementById('lb-prev').addEventListener('click', () => {
    lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
    document.getElementById('lightbox-img').src = lbImages[lbIndex].src;
    document.getElementById('lightbox-caption').textContent = lbImages[lbIndex].cap;
  });
  document.getElementById('lb-next').addEventListener('click', () => {
    lbIndex = (lbIndex + 1) % lbImages.length;
    document.getElementById('lightbox-img').src = lbImages[lbIndex].src;
    document.getElementById('lightbox-caption').textContent = lbImages[lbIndex].cap;
  });

  // Star picker
  document.querySelectorAll('#star-picker .star').forEach(star => {
    star.addEventListener('click', () => {
      starRating = parseInt(star.dataset.val);
      document.querySelectorAll('#star-picker .star').forEach((s, i) =>
        s.classList.toggle('active', i < starRating)
      );
    });
  });

  // Submit review
  document.getElementById('review-submit-btn').addEventListener('click', () => {
    if (!authState.isLoggedIn()) {
      showToast('Please log in to post a review.');
      openAuthModal('login');
      return;
    }
    const text = document.getElementById('review-input').value.trim();
    if (!text || !starRating) { showToast('Please add a rating and review text.'); return; }
    const username = authState.getUsername() || 'Guest';
    const newReview = {
      user: username[0].toUpperCase(),
      name: username,
      stars: starRating,
      date: 'Just now',
      text
    };
    const reviewsList = document.getElementById('reviews-list');
    // Remove empty state message if present
    const emptyMsg = reviewsList.querySelector('.reviews-empty-msg');
    if (emptyMsg) emptyMsg.remove();
    const el = document.createElement('div');
    el.className = 'review-item';
    el.innerHTML = `
      <div class="review-item__header">
        <div class="review-item__avatar">${newReview.user}</div>
        <div class="review-item__meta">
          <div class="review-item__name">${newReview.name}</div>
          <div class="review-item__date">${newReview.date}</div>
        </div>
        <div class="review-item__stars">${'★'.repeat(newReview.stars)}${'☆'.repeat(5 - newReview.stars)}</div>
      </div>
      <p class="review-item__text">${newReview.text}</p>`;
    reviewsList.prepend(el);
    document.getElementById('review-input').value = '';
    starRating = 0;
    document.querySelectorAll('#star-picker .star').forEach(s => s.classList.remove('active'));
    showToast('Review posted!');
  });

  // Review login wall button
  document.getElementById('reviewLoginBtn').addEventListener('click', () => {
    closeLocModal();
    setTimeout(() => openAuthModal('login'), 80);
  });
  /* ═══════════════════════════════════════════
     CITY HERO MODAL (Explore City button — city overview)
     Uses #modalBackdrop — Highlights / Tours / Map
  ═══════════════════════════════════════════ */
  document.querySelectorAll('.btn-explore').forEach(b =>
    b.addEventListener('click', () => openCityModal(b.dataset.city))
  );

  function openCityModal(key) {
    currentCity = key;
    const d = CITY_DATA[key]; if (!d) return;
    const locs = LOCATIONS_DB[key] || [];

    document.getElementById('modalCityTag').textContent  = d.tag;
    document.getElementById('modalTitle').textContent    = d.title;
    document.getElementById('modalSubtitle').textContent = d.subtitle;

    // City modal has no single-location save button in header
    currentModalLoc = null;
    modalSaveBtn.style.display = 'none';

    // Highlights — each card has a heart button, clicking card body opens location modal
    document.getElementById('attractionsGrid').innerHTML = locs.map(a => {
      const saved = bookmarks.has(a.id);
      return `<div class="attraction-card" data-id="${a.id}" style="cursor:pointer">
        <button class="attraction-card__heart ${saved ? 'is-saved' : ''}" data-id="${a.id}" aria-label="Save ${a.name}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="${saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <span class="attraction-card__icon">${a.icon}</span>
        <div class="attraction-card__name">${a.name}</div>
        <div class="attraction-card__desc">${a.desc}</div>
      </div>`;
    }).join('');

    document.querySelectorAll('#attractionsGrid .attraction-card').forEach(card => {
      // Heart button toggle
      card.querySelector('.attraction-card__heart').addEventListener('click', (e) => {
        e.stopPropagation();
        const loc = ALL_LOCATIONS.find(l => l.id === card.dataset.id);
        if (loc) toggleBookmarkOptimistic(loc, e.currentTarget);
      });
      // Card body opens location modal
      card.addEventListener('click', () => {
        const loc = ALL_LOCATIONS.find(l => l.id === card.dataset.id);
        if (loc) {
          closeCityModal();
          setTimeout(() => openLocationModal(loc), 80);
        }
      });
    });

    // Tours list
// Tours list - Updated to be clickable
const toursListEl = document.getElementById('toursList');
toursListEl.innerHTML = d.tours.map((t, i) =>
  `<div class="tour-item" data-index="${i}" style="cursor:pointer; transition: background 0.2s; border-radius: 6px;">
    <div class="tour-item__num">0${i+1}</div>
    <div class="tour-item__info">
      <div class="tour-item__name">${t.name}</div>
      <div class="tour-item__meta">${t.duration}</div>
    </div>
    <div class="tour-item__price">${t.price}</div>
   </div>`
).join('');

// Attach click events to open the detail modal
toursListEl.querySelectorAll('.tour-item').forEach(item => {
  item.addEventListener('click', () => {
    const tour = d.tours[item.dataset.index];
    openTourDetail(tour);
  });
});

    // Gallery tab — per-location sub-tabs for this city
    buildCityModalGallery(key);

    // Show map tab with city centroid
    const cityCoords = {
      tokyo:   [35.6762, 139.6503],
      osaka:   [34.6937, 135.5023],
      nagoya:  [35.1815, 136.9066],
      okinawa: [26.2124, 127.6809],
      sapporo: [43.0618, 141.3545],
    };
    const coords = cityCoords[key];
    if (coords) {
      document.getElementById('modalMapLabel').textContent = `${d.tag}`;
      setTimeout(() => {
        if (!leafletMap) {
          leafletMap = L.map('leaflet-map', { zoomControl: true, scrollWheelZoom: false });
          L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            subdomains: 'abcd', maxZoom: 19
          }).addTo(leafletMap);
        }
        leafletMap.setView(coords, 11);
        if (leafletMarker) { leafletMarker.remove(); leafletMarker = null; }
        leafletMap.invalidateSize();
      }, 100);
    }
    document.querySelector('.modal__tab[data-tab="map"]').style.display = '';
    activateModalTab('highlights');
    modalBackdrop.classList.add('open');
  }

  function closeCityModal() { modalBackdrop.classList.remove('open'); }

  /* ── City Modal Gallery (per-city, per-location sub-tabs) ── */
  let cityModalLbImages = [];
  let cityModalLbIndex  = 0;

  function buildCityModalGallery(cityKey) {
    const cityLocs  = LOCATIONS_DB[cityKey] || [];
    const tabsEl    = document.getElementById('cityModalGalleryTabs');
    const lightbox  = document.getElementById('cityModalLightbox');
    if (lightbox) lightbox.style.display = 'none';

    tabsEl.innerHTML = cityLocs.map((loc, i) =>
      `<button class="city-gallery-tab${i === 0 ? ' active' : ''}" data-loc-id="${loc.id}">${loc.icon} ${loc.name}</button>`
    ).join('');

    if (cityLocs.length > 0) loadCityModalGalleryForLoc(cityLocs[0].id);

    tabsEl.querySelectorAll('.city-gallery-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabsEl.querySelectorAll('.city-gallery-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        loadCityModalGalleryForLoc(tab.dataset.locId);
      });
    });
  }

  function loadCityModalGalleryForLoc(locId) {
    const imgs  = LOCATION_GALLERY[locId] || [
      { src: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', cap: 'No photos yet' }
    ];
    cityModalLbImages = imgs;
    cityModalLbIndex  = 0;
    const gridEl = document.getElementById('cityModalGalleryGrid');
    if (!gridEl) return;
    gridEl.innerHTML = imgs.map((img, i) =>
      `<div class="gallery-item" data-cm-index="${i}" style="background-image:url('${img.src}')">
        <div class="gallery-item__cap">${img.cap}</div>
       </div>`
    ).join('');
    gridEl.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => openCityModalLightbox(parseInt(item.dataset.cmIndex)));
    });
  }

  function openCityModalLightbox(idx) {
    cityModalLbIndex = idx;
    const lb = document.getElementById('cityModalLightbox');
    if (!lb) return;
    lb.style.display = 'flex';
    document.getElementById('cityModalLightboxImg').src = cityModalLbImages[idx].src;
    document.getElementById('cityModalLightboxCaption').textContent = cityModalLbImages[idx].cap;
  }

  function closeCityModalLightbox() {
    const lb = document.getElementById('cityModalLightbox');
    if (lb) lb.style.display = 'none';
  }

  document.getElementById('cityModalLightboxClose').addEventListener('click', closeCityModalLightbox);
  document.getElementById('cityModalLbPrev').addEventListener('click', () => {
    cityModalLbIndex = (cityModalLbIndex - 1 + cityModalLbImages.length) % cityModalLbImages.length;
    document.getElementById('cityModalLightboxImg').src = cityModalLbImages[cityModalLbIndex].src;
    document.getElementById('cityModalLightboxCaption').textContent = cityModalLbImages[cityModalLbIndex].cap;
  });
  document.getElementById('cityModalLbNext').addEventListener('click', () => {
    cityModalLbIndex = (cityModalLbIndex + 1) % cityModalLbImages.length;
    document.getElementById('cityModalLightboxImg').src = cityModalLbImages[cityModalLbIndex].src;
    document.getElementById('cityModalLightboxCaption').textContent = cityModalLbImages[cityModalLbIndex].cap;
  });

  /* City modal tabs and close */
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose    = document.getElementById('modalClose');
  const modalSaveBtn  = document.getElementById('modalSaveBtn');
  const modalSaveLbl  = document.getElementById('modalSaveLabel');
  const modalTabs_city     = document.querySelectorAll('.modal__tab');

  function syncModalSaveBtn() {
    if (!currentModalLoc) return;
    const saved = bookmarks.has(currentModalLoc.id);
    modalSaveBtn.classList.toggle('is-saved', saved);
    modalSaveLbl.textContent = saved ? 'Saved ♥' : 'Save';
    modalSaveBtn.querySelector('svg').setAttribute('fill', saved ? 'currentColor' : 'none');
  }

  function activateModalTab(id) {
    modalTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === id));
    document.querySelectorAll('.modal__tab-content').forEach(c =>
      c.classList.toggle('active', c.id === `tab-${id}`)
    );
    if (id === 'map' && leafletMap) {
      requestAnimationFrame(() => leafletMap.invalidateSize());
    }
    if (id === 'gallery' && currentCity) {
      // Refresh gallery grid in case bookmarks changed
      loadCityModalGalleryForLoc(
        document.querySelector('#cityModalGalleryTabs .city-gallery-tab.active')?.dataset?.locId
        || (LOCATIONS_DB[currentCity]?.[0]?.id)
      );
    }
  }

  modalTabs.forEach(t => t.addEventListener('click', () => activateModalTab(t.dataset.tab)));

  modalClose.addEventListener('click', () => modalBackdrop.classList.remove('open'));
  modalBackdrop.addEventListener('click', e => { if (e.target === modalBackdrop) modalBackdrop.classList.remove('open'); });

  /* ═══════════════════════════════════════════
     TOURS & ABOUT PAGE OVERLAYS
  ═══════════════════════════════════════════ */
  const toursPage = document.getElementById('toursPage');
  const aboutPage = document.getElementById('aboutPage');

  document.getElementById('navToursLink').addEventListener('click', e => {
    e.preventDefault();
    toursPage.classList.add('open');
    document.body.classList.add('modal-lock');
  });
  document.getElementById('navAboutLink').addEventListener('click', e => {
    e.preventDefault();
    aboutPage.classList.add('open');
    document.body.classList.add('modal-lock');
  });
  document.getElementById('toursPageClose').addEventListener('click', () => {
    toursPage.classList.remove('open');
    document.body.classList.remove('modal-lock');
  });
  document.getElementById('aboutPageClose').addEventListener('click', () => {
    aboutPage.classList.remove('open');
    document.body.classList.remove('modal-lock');
  });
  toursPage.addEventListener('click', e => { if (e.target === toursPage) { toursPage.classList.remove('open'); document.body.classList.remove('modal-lock'); } });
  aboutPage.addEventListener('click', e => { if (e.target === aboutPage) { aboutPage.classList.remove('open'); document.body.classList.remove('modal-lock'); } });
  pillItems.forEach((item, i) => item.addEventListener('click', () => goTo(i)));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (locModal && locModal.classList.contains('open')) { closeLocModal(); return; }
      if (modalBackdrop.classList.contains('open')) { modalBackdrop.classList.remove('open'); return; }
      if (toursPage.classList.contains('open')) { toursPage.classList.remove('open'); document.body.classList.remove('modal-lock'); return; }
      if (aboutPage.classList.contains('open')) { aboutPage.classList.remove('open'); document.body.classList.remove('modal-lock'); return; }
    }
    if (modalBackdrop.classList.contains('open') || (locModal && locModal.classList.contains('open')) || inGridView) return;
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft')  goTo(current - 1);
  });

  let wAcc = 0, wTimer = null, wLock = false;
  window.addEventListener('wheel', (e) => {
    if (modalBackdrop.classList.contains('open') || wLock || inGridView) return;
    wAcc += Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    clearTimeout(wTimer);
    wTimer = setTimeout(() => {
      if (Math.abs(wAcc) >= 40) {
        const dir = wAcc > 0 ? 1 : -1;
        if (current + dir >= 0 && current + dir < TOTAL) {
          wLock = true;
          goTo(current + dir);
          setTimeout(() => { wLock = false; }, 1000);
        }
      }
      wAcc = 0;
    }, 50);
  }, { passive: true });

  let tx = 0, ty = 0;
  document.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  document.addEventListener('touchend', (e) => {
    if (modalBackdrop.classList.contains('open') || inGridView) return;
    const dx = tx - e.changedTouches[0].clientX;
    const dy = ty - e.changedTouches[0].clientY;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    goTo(current + (dx > 0 ? 1 : -1));
  }, { passive: true });

  window.addEventListener('resize', () => { goTo(current, true); parallaxTarget = current * window.innerWidth; });

  /* ═══════════════════════════════════════════
     AUTH MODAL — Glassmorphism Vermillion
  ═══════════════════════════════════════════ */
  const authBackdrop = document.getElementById('authBackdrop');
  let authMode = 'login';

  function openAuthModal(mode = 'login') {
    setAuthMode(mode);
    document.getElementById('authUsername').value = '';
    document.getElementById('authPassword').value = '';
    document.getElementById('authEmail').value    = '';
    document.getElementById('authError').style.display = 'none';
    authBackdrop.classList.add('open');
    document.body.classList.add('modal-lock');
    setTimeout(() => document.getElementById('authUsername').focus(), 120);
  }

  function closeAuthModal() {
    authBackdrop.classList.remove('open');
    document.body.classList.remove('modal-lock');
  }

  function setAuthMode(mode) {
    authMode = mode;
    const isLogin = mode === 'login';
    document.getElementById('authTabLogin').classList.toggle('active', isLogin);
    document.getElementById('authTabSignup').classList.toggle('active', !isLogin);
    document.getElementById('authTitle').textContent       = isLogin ? 'Welcome Back' : 'Create Account';
    document.getElementById('authSub').textContent         = isLogin
      ? 'Sign in to sync your saved locations across devices.'
      : 'Join to save and share your discoveries.';
    document.getElementById('authSubmitLabel').textContent = isLogin ? 'Sign In' : 'Create Account';
    document.getElementById('authEmailGroup').style.display = isLogin ? 'none' : 'block';
    document.getElementById('authPassword').setAttribute('autocomplete', isLogin ? 'current-password' : 'new-password');

    // Login accepts username OR email; signup accepts username only
    const usernameLabel = document.getElementById('authUsernameLabel');
    const usernameInput = document.getElementById('authUsername');
    if (usernameLabel) usernameLabel.textContent = isLogin ? 'Username or Email' : 'Username';
    if (usernameInput) {
      usernameInput.placeholder    = isLogin ? 'Username or email address' : 'Choose a username';
      usernameInput.autocomplete   = isLogin ? 'username email' : 'username';
    }

    document.getElementById('authError').style.display = 'none';
  }

  document.getElementById('authTabLogin').addEventListener('click', () => setAuthMode('login'));
  document.getElementById('authTabSignup').addEventListener('click', () => setAuthMode('signup'));

  document.getElementById('authClose').addEventListener('click', closeAuthModal);
  authBackdrop.addEventListener('click', e => { if (e.target === authBackdrop) closeAuthModal(); });

  document.getElementById('pwToggle').addEventListener('click', () => {
    const pw = document.getElementById('authPassword');
    pw.type = pw.type === 'password' ? 'text' : 'password';
  });

  async function handleAuthSubmit() {
    const btn       = document.getElementById('authSubmit');
    const label     = document.getElementById('authSubmitLabel');
    const spinner   = document.getElementById('authSpinner');
    const errEl     = document.getElementById('authError');
    // In login mode this field holds username OR email; in signup it's username only
    const identifier = document.getElementById('authUsername').value.trim();
    const password   = document.getElementById('authPassword').value;

    if (!identifier || !password) { showAuthError('Please fill in all fields.'); return; }

    btn.disabled = true;
    label.style.display   = 'none';
    spinner.style.display = 'inline';
    errEl.style.display   = 'none';

    try {
      if (authMode === 'login') {
        // Pass as 'identifier' so the backend can match on username OR email
        await apiLogin(identifier, password);
      } else {
        const email = document.getElementById('authEmail').value.trim();
        if (!email) { showAuthError('Email is required.'); return; }
        // In signup, identifier IS the username
        await apiSignup(identifier, email, password);
      }

      // Additive sync: push guest bookmarks first, then pull DB truth
      if (bookmarks.size > 0) await syncBookmarksToServer();
      await syncBookmarksFromDB();

      closeAuthModal();
      updateNavAuth();
      showToast(`Welcome, ${authState.getUsername() || identifier} ✓`);

    } catch (err) {
      showAuthError(err.message || 'Something went wrong. Please retry.');
    } finally {
      btn.disabled = false;
      label.style.display   = 'inline';
      spinner.style.display = 'none';
    }
  }

  function showAuthError(msg) {
    const el = document.getElementById('authError');
    el.textContent    = msg;
    el.style.display  = 'block';
  }

  document.getElementById('authSubmit').addEventListener('click', handleAuthSubmit);

  // Enter key submits
  ['authUsername','authEmail','authPassword'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => {
      if (e.key === 'Enter') handleAuthSubmit();
    });
  });

  /* ═══════════════════════════════════════════
     NAV AUTH BUTTON
  ═══════════════════════════════════════════ */
  const navAuthBtn   = document.getElementById('navAuthBtn');
  const navAuthLabel = document.getElementById('navAuthLabel');
  const navSavesBtn  = document.getElementById('navSavesBtn');
  const savesBadge   = document.getElementById('savesBadge');

  function updateNavAuth() {
    if (authState.isLoggedIn()) {
      const u = authState.getUsername() || 'Profile';
      navAuthLabel.textContent = u[0].toUpperCase() + u.slice(1);
      navAuthBtn.classList.add('is-logged-in');
      navAuthBtn.dataset.loggedIn = 'true';
      navAuthBtn.onclick = null; // handled by separate listener
    } else {
      navAuthLabel.textContent = 'Join / Login';
      navAuthBtn.classList.remove('is-logged-in');
      delete navAuthBtn.dataset.loggedIn;
      navAuthBtn.onclick = () => openAuthModal('login');
    }
    
    // Ensure the saves button is ALWAYS visible now
    navSavesBtn.style.display = 'flex';
    updateSavesBadge();
  }

  // Nav auth button hover → show "Logout?" when logged in
  navAuthBtn.addEventListener('mouseenter', () => {
    if (navAuthBtn.dataset.loggedIn === 'true') {
      navAuthLabel.textContent = 'Logout?';
      navAuthBtn.classList.add('is-logout-hover');
    }
  });
  navAuthBtn.addEventListener('mouseleave', () => {
    if (navAuthBtn.dataset.loggedIn === 'true') {
      const u = authState.getUsername() || 'Profile';
      navAuthLabel.textContent = u[0].toUpperCase() + u.slice(1);
      navAuthBtn.classList.remove('is-logout-hover');
    }
  });
  navAuthBtn.addEventListener('click', () => {
    if (navAuthBtn.dataset.loggedIn === 'true') {
      openLogoutConfirm();
    }
  });

  // Custom logout confirm window
  const logoutBackdrop = document.getElementById('logoutBackdrop');
  function openLogoutConfirm() {
    logoutBackdrop.classList.add('open');
    document.body.classList.add('modal-lock');
  }
  function closeLogoutConfirm() {
    logoutBackdrop.classList.remove('open');
    document.body.classList.remove('modal-lock');
  }
  document.getElementById('logoutCancel').addEventListener('click', closeLogoutConfirm);
  document.getElementById('logoutConfirm').addEventListener('click', () => {
    closeLogoutConfirm();
    authState.clearToken();
    authState.clearUsername();
    bookmarks.clear();
    updateNavAuth();
    updateSavesBadge();
    renderSavesDrawer();
    renderLocationGrid();
    showToast('Signed out');
  });
  logoutBackdrop.addEventListener('click', e => { if (e.target === logoutBackdrop) closeLogoutConfirm(); });

  function updateSavesBadge() {
    // 1. Grab the badge element using the correct ID from your HTML
    const badgeEl = document.getElementById('savesBadge');
    if (!badgeEl) return;

    // 2. Count the tours in LocalStorage
    const savedTours = JSON.parse(localStorage.getItem('komorebi_saved_tours') || '[]');
    
    // 3. Add them to the database bookmarks count
    const totalSaves = bookmarks.size + savedTours.length;
    
    // 4. Update the text
    badgeEl.textContent = totalSaves;
  }
  /* ═══════════════════════════════════════════
     SAVES DRAWER
  ═══════════════════════════════════════════ */
  const savesOverlay    = document.getElementById('savesOverlay');
  const savesDrawer     = document.getElementById('savesDrawer');
  const savesDrawerClose = document.getElementById('savesDrawerClose');
  const savesGrid       = document.getElementById('savesGrid');
  const savesEmpty      = document.getElementById('savesEmpty');

  function openSavesDrawer() {
    savesDrawer.classList.add('open');
    savesOverlay.classList.add('open');
    document.body.classList.add('modal-lock');
    
    renderSavesDrawer(); // Renders database locations
    
    // Add this to render the LocalStorage tours whenever the drawer opens!
    if (typeof renderSavedToursDrawer === 'function') {
      renderSavedToursDrawer();
    }
  }

  function closeSavesDrawer() {
    savesDrawer.classList.remove('open');
    savesOverlay.classList.remove('open');
    document.body.classList.remove('modal-lock');
  }

  navSavesBtn.addEventListener('click', openSavesDrawer);
  // Also open on username click when logged in


  savesDrawerClose.addEventListener('click', closeSavesDrawer);
  savesOverlay.addEventListener('click', closeSavesDrawer);

  document.querySelectorAll('.saves-filter__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.saves-filter__btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      savesFilter = btn.dataset.filter;
      renderSavesDrawer();
    });
  });

  function renderSavesDrawer() {
    // Seed the in-memory Map from localStorage for guest sessions (mirrors tour pattern)
    if (bookmarks.size === 0) {
      const stored = JSON.parse(localStorage.getItem('komorebi_saved_locations') || '[]');
      stored.forEach(loc => bookmarks.set(loc.id, loc));
    }

    const sub = document.getElementById('savesDrawerSub');
    sub.textContent = `${bookmarks.size} saved location${bookmarks.size !== 1 ? 's' : ''}`;

    // Remove all cards but keep empty state
    savesGrid.querySelectorAll('.saves-card').forEach(c => c.remove());

    const filtered = [...bookmarks.values()].filter(loc =>
      savesFilter === 'all' || loc.cat === savesFilter
    );

    if (filtered.length === 0) {
      savesEmpty.style.display = 'block';
      return;
    }
    savesEmpty.style.display = 'none';

    filtered.forEach(loc => {
      const card = document.createElement('div');
      card.className = 'saves-card';
      card.innerHTML = `
        <div class="saves-card__icon">${loc.icon}</div>
        <div class="saves-card__body">
          <div class="saves-card__city">${loc.cityLabel}</div>
          <div class="saves-card__name">${loc.name}</div>
          <div class="saves-card__desc">${loc.desc}</div>
        </div>
        <button class="saves-card__remove" aria-label="Remove save" data-id="${loc.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      `;
      card.addEventListener('click', (e) => {
        if (e.target.closest('.saves-card__remove')) return;
        closeSavesDrawer();
        setTimeout(() => openLocationModal(loc), 200);
      });
      card.querySelector('.saves-card__remove').addEventListener('click', () => {
        bookmarks.delete(loc.id);
        persistBookmarksToStorage();
        updateSavesBadge();
        renderSavesDrawer();
        renderLocationGrid();
        if (authState.isLoggedIn()) apiToggleBookmark(loc.id).catch(() => {});
        showToast(`Removed "${loc.name}"`);
      });
      savesGrid.appendChild(card);
    });
  }

  /* ═══════════════════════════════════════════
     TOAST
  ═══════════════════════════════════════════ */
  function showToast(msg) {
    if (toastTimer) clearTimeout(toastTimer);
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('visible');
    toastTimer = setTimeout(() => t.classList.remove('visible'), 2800);
  }

  /* ═══════════════════════════════════════════
     LOADER
  ═══════════════════════════════════════════ */
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      goTo(0, true);
    }, 2200);
  });

  /* ═══════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', async () => {
    updateNavAuth();
    updateSavesBadge();
    goTo(0, true);

    if (authState.isLoggedIn()) {
      await syncBookmarksFromDB();
    }
  });

  /* ═══════════════════════════════════════════
     LIVE JST CLOCK
  ═══════════════════════════════════════════ */
  (function initJSTClock() {
    const timeEl = document.getElementById('jstTime');
    if (!timeEl) return;

    let lastSec = -1;

    function tick() {
      const now = new Date();
      const jst = now.toLocaleString('en-GB', {
        timeZone: 'Asia/Tokyo',
        hour:     '2-digit',
        minute:   '2-digit',
        second:   '2-digit',
        hour12:   false
      });

      const sec = now.toLocaleString('en-GB', { timeZone: 'Asia/Tokyo', second: '2-digit' });
      if (sec !== lastSec) {
        lastSec = sec;
        timeEl.textContent = jst;
      }
    }

    tick();
    setInterval(tick, 500);
  })();
  
/* ═══════════════════════════════════════════
     TOUR DETAIL TIMELINE MODAL (RICH VISUAL)
  ═══════════════════════════════════════════ */
  let currentModalTour = null;

  function openTourDetail(tour) {
    currentModalTour = tour;

    document.getElementById('td-title').textContent = tour.name;
    document.getElementById('td-meta').textContent = tour.duration;
    document.getElementById('td-price').textContent = tour.price || '';

    const timeline = document.getElementById('td-timeline');
    
    if (tour.activities && tour.activities.length > 0) {
      timeline.innerHTML = tour.activities.map(act => {
        // Clean up formatting and catch missing strings safely
        const cleanLocId = (act.locId && act.locId !== 'undefined') ? act.locId.trim() : null;
        
        // Check if the location genuinely exists in your master array
        const dbLocationExists = cleanLocId ? ALL_LOCATIONS.find(l => l.id === cleanLocId) : null;

        // 1. Image Resolver
        let imgSrc = 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80'; // Default Fallback
        
        if (cleanLocId && typeof LOCATION_GALLERY !== 'undefined' && LOCATION_GALLERY[cleanLocId] && LOCATION_GALLERY[cleanLocId][0]) {
          imgSrc = LOCATION_GALLERY[cleanLocId][0].src;
        } else {
          const titleLower = act.title.toLowerCase();
          if (titleLower.includes('ramen') || titleLower.includes('dinner') || titleLower.includes('lunch') || titleLower.includes('tasting') || titleLower.includes('food') || titleLower.includes('izakaya')) {
            imgSrc = 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80';
          } else if (titleLower.includes('ski') || titleLower.includes('snow') || titleLower.includes('mountain') || titleLower.includes('tracks') || titleLower.includes('onsen')) {
            imgSrc = 'https://images.unsplash.com/photo-1605209971026-d3c6a54ab58b?w=800&q=80';
          } else if (titleLower.includes('beach') || titleLower.includes('snorkel') || titleLower.includes('reef') || titleLower.includes('dive') || titleLower.includes('turtle') || titleLower.includes('port') || titleLower.includes('naha')) {
            imgSrc = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
          } else if (titleLower.includes('castle') || titleLower.includes('temple') || titleLower.includes('shrine') || titleLower.includes('gate') || titleLower.includes('mausoleum') || titleLower.includes('palace')) {
            imgSrc = 'https://images.unsplash.com/photo-1542051812871-7587d8d01f8d?w=800&q=80';
          }
        }

        const imgHtml = `
          <div style="margin: 0.75rem 0; height: 130px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
            <img src="${imgSrc}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85; transition: 0.3s;" class="tour-stop-img" alt="${act.title}">
          </div>
        `;

        const isInteractive = !!dbLocationExists;

        return `
          <div class="timeline-stop" data-loc-id="${cleanLocId || ''}" style="border-left: 2px solid #FF4F00; padding-left: 1.2rem; margin-bottom: 2rem; position: relative; ${isInteractive ? 'cursor: pointer;' : ''}">
            <div style="position: absolute; left: -5px; top: 0; width: 8px; height: 8px; background: #FF4F00; border-radius: 50%; box-shadow: 0 0 8px var(--accent-glow);"></div>
            <div style="font-size: 0.75rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px;">${act.time}</div>
            
            ${imgHtml}
            
            <h4 class="stop-title" style="margin: 0.25rem 0; font-size: 1.1rem; color: #fff; transition: 0.2s;">${act.title}</h4>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.9rem; opacity: 0.8; line-height: 1.4;">${act.desc || act.description || ''}</p>
            
            ${isInteractive ? `
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                <span style="font-size: 0.8rem; color: var(--accent, #FF4F00); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">View Map & Reviews ↗</span>
              </div>
            ` : ''}
          </div>
        `;
      }).join('');

      // 3. Bind Hover and Click Listeners stably
      timeline.querySelectorAll('.timeline-stop').forEach(stop => {
        const locId = stop.dataset.locId;
        if (!locId || locId === '' || locId === 'undefined') return;

        const img = stop.querySelector('.tour-stop-img');
        const title = stop.querySelector('.stop-title');

        stop.addEventListener('mouseenter', () => {
          if (title) title.style.color = 'var(--accent, #FF4F00)';
          if (img) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1.03)';
          }
        });
        stop.addEventListener('mouseleave', () => {
          if (title) title.style.color = '#fff';
          if (img) {
            img.style.opacity = '0.85';
            img.style.transform = 'scale(1)';
          }
        });
        
        stop.addEventListener('click', () => {
          const loc = ALL_LOCATIONS.find(l => l.id === locId);
          if (loc) {
            document.getElementById('tourDetailBackdrop').classList.remove('open');
            const itinsDashboard = document.getElementById('itinerariesDashboard');
            if (itinsDashboard) {
              itinsDashboard.classList.remove('open');
            }
            setTimeout(() => openLocationModal(loc), 200);
          }
        });
      });

    } else {
      timeline.innerHTML = '<p style="opacity: 0.6; margin-bottom: 0;">Detailed itinerary coming soon.</p>';
    }

    refreshTourSaveButton();
    document.getElementById('tourDetailBackdrop').classList.add('open');
  }

  /* ═══════════════════════════════════════════
     GLOBAL TOURS PAGE: CARD CLICK LOGIC
  ═══════════════════════════════════════════ */
  document.querySelectorAll('.tours-page-card').forEach(card => {
    card.addEventListener('click', () => {
      const cityKey = card.dataset.city;           
      const tourIndex = card.dataset.tourIndex;    
      if (cityKey && tourIndex && CITY_DATA[cityKey] && CITY_DATA[cityKey].tours[tourIndex]) {
        const selectedTour = CITY_DATA[cityKey].tours[tourIndex];
        openTourDetail(selectedTour);
      }
    });
  });

  document.getElementById('tourDetailClose').addEventListener('click', () => {
    document.getElementById('tourDetailBackdrop').classList.remove('open');
  });

  document.getElementById('tourDetailBackdrop').addEventListener('click', e => { 
    if (e.target === document.getElementById('tourDetailBackdrop')) {
      document.getElementById('tourDetailBackdrop').classList.remove('open'); 
    }
  });

  /* ═══════════════════════════════════════════
     SAVED TOURS (HYBRID STORAGE SYNC)
  ═══════════════════════════════════════════ */
  document.getElementById('saveTourBtn').addEventListener('click', async () => {
    if (!currentModalTour) return;

    let savedTours = JSON.parse(localStorage.getItem('komorebi_saved_tours') || '[]');
    const exists = savedTours.some(t => t.name === currentModalTour.name);

    if (exists) {
      // Remove Locally
      savedTours = savedTours.filter(t => t.name !== currentModalTour.name);
      localStorage.setItem('komorebi_saved_tours', JSON.stringify(savedTours));
      showToast('Itinerary removed from Saves');
      
      // Remove Cloud Database records if logged in
      if (authState.isLoggedIn()) {
        try {
          await fetch(`${API_BASE}/tours`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authState.getToken()}`
            },
            body: JSON.stringify({ name: currentModalTour.name })
          });
        } catch (err) {
          console.error('Cloud itinerary delete sync error:', err);
        }
      }
    } else {
      // Save Locally
      savedTours.push(currentModalTour);
      localStorage.setItem('komorebi_saved_tours', JSON.stringify(savedTours));
      showToast('Itinerary saved!');

      // Push to Cloud Database records if logged in
      if (authState.isLoggedIn()) {
        try {
          await fetch(`${API_BASE}/tours`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authState.getToken()}`
            },
            body: JSON.stringify(currentModalTour)
          });
        } catch (err) {
          console.error('Cloud itinerary post sync error:', err);
        }
      }
    }

    refreshTourSaveButton();
    renderSavedToursDrawer();
    updateSavesBadge();
    
    // Refresh full dashboard list instantly if open behind modal
    const itinsDashboard = document.getElementById('itinerariesDashboard');
    if (itinsDashboard && itinsDashboard.classList.contains('open')) {
      renderFullItinerariesPage();
    }
  });

  function refreshTourSaveButton() {
    const btn = document.getElementById('saveTourBtn');
    if (!btn || !currentModalTour) return;

    const savedTours = JSON.parse(localStorage.getItem('komorebi_saved_tours') || '[]');
    const isSaved = savedTours.some(t => t.name === currentModalTour.name);

    if (isSaved) {
      btn.innerHTML = 'Saved to Itineraries';
      btn.style.background = 'var(--accent, #FF4F00)';
      btn.style.color = '#fff';
      btn.style.border = 'none';
    } else {
      btn.innerHTML = 'Save Itinerary';
      btn.style.background = 'rgba(255, 255, 255, 0.1)';
      btn.style.color = '#fff';
    }
  }

  function renderSavedToursDrawer() {
    const container = document.getElementById('savedToursContainer');
    if (!container) return;

    const savedTours = JSON.parse(localStorage.getItem('komorebi_saved_tours') || '[]');
    
    if (savedTours.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <div>
        <h3 style="font-size: 0.85rem; color: var(--accent, #FF4F00); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 1rem; padding: 15px 10px 0px 10px;">Curated Itineraries</h3>
        ${savedTours.map((t, index) => `
          <div class="saved-tour-item" data-index="${index}" style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; margin-bottom: 0.75rem; border-left: 3px solid var(--accent, #FF4F00); cursor: pointer; transition: background 0.2s;">
            <h4 style="margin: 0 0 0.25rem 0; font-size: 1.05rem; color: #fff;">${t.name}</h4>
            <p style="margin: 0; font-size: 0.85rem; opacity: 0.7;">${t.duration} • ${t.activities ? t.activities.length : 0} Stops</p>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.saved-tour-item').forEach(item => {
      item.addEventListener('mouseenter', () => item.style.background = 'rgba(255,255,255,0.1)');
      item.addEventListener('mouseleave', () => item.style.background = 'rgba(255,255,255,0.05)');

      item.addEventListener('click', () => {
        const tourIndex = item.dataset.index;
        const tourToOpen = savedTours[tourIndex];
        
        document.getElementById('savesDrawer').classList.remove('open');
        const realOverlay = document.getElementById('savesOverlay');
        if (realOverlay) realOverlay.classList.remove('open');
        
        openTourDetail(tourToOpen);
      });
    });
  }

  /* ═══════════════════════════════════════════
     CLOUD TOURS BACKEND ENGINE SYNC
  ═══════════════════════════════════════════ */
  async function syncToursToServer() {
    const localTours = JSON.parse(localStorage.getItem('komorebi_saved_tours') || '[]');
    if (localTours.length === 0) return;

    // Additive migration: loop and persist all cached guest profiles onto DB infrastructure
    for (const tour of localTours) {
      try {
        await fetch(`${API_BASE}/tours`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authState.getToken()}`
          },
          body: JSON.stringify(tour)
        });
      } catch (err) {
        console.error('Failed to sync guest tour up to cloud layer:', err);
      }
    }
  }

  async function syncToursFromDB() {
    if (!authState.isLoggedIn()) return;
    try {
      const res = await fetch(`${API_BASE}/tours`, {
        headers: { 'Authorization': `Bearer ${authState.getToken()}` }
      });
      if (!res.ok) return;
      
      const dbTours = await res.json();
      
      // Override local data state with fresh cloud single source of truth
      localStorage.setItem('komorebi_saved_tours', JSON.stringify(dbTours));
      
      updateSavesBadge();
      renderSavedToursDrawer();
    } catch (err) {
      console.error('Itineraries sync from DB execution crash:', err);
    }
  }

/* ═══════════════════════════════════════════
     UNIFIED CLOUD AUTHENTICATION SYNC LIFECYCLE
  ═══════════════════════════════════════════ */
  const originalHandleAuthSubmit = handleAuthSubmit;
  handleAuthSubmit = async function() {
    // 1. Execute the core authentication logic, credential processing, and token caching
    await originalHandleAuthSubmit();
    
    // 2. If login is successful, run both sync streams sequentially to prevent thread collisions
    if (authState.isLoggedIn()) {
      try {
        // Explicitly run single-location bookmark sync streams first
        if (bookmarks.size > 0) await syncBookmarksToServer();
        await syncBookmarksFromDB();
        
        // Next, process your dynamic dashboard itineraries 
        await syncToursToServer();
        await syncToursFromDB();
        
        // Force layout view trees to refresh simultaneously
        updateSavesBadge();
        renderSavesDrawer();
        if (typeof renderFullItinerariesPage === 'function') renderFullItinerariesPage();
        
      } catch (syncError) {
        console.error("Full cloud dataset sync sequence encountered an execution collision:", syncError);
      }
    }
  };

  const originalLogoutListener = document.getElementById('logoutConfirm').onclause || Object;
  document.getElementById('logoutConfirm').addEventListener('click', () => {
    localStorage.removeItem('komorebi_saved_tours'); // Clean offline states on absolute exit
    localStorage.removeItem('komorebi_saved_locations');
  });

  // Supplement standard bootstrap sync loop directly inside document ready bounds
  document.addEventListener('DOMContentLoaded', async () => {
    if (authState.isLoggedIn()) {
      await syncToursFromDB();
    }
  });

 /* ═══════════════════════════════════════════
     MY ITINERARIES DASHBOARD VIEW
  ═══════════════════════════════════════════ */
  const itinsDashboard = document.getElementById('itinerariesDashboard');
  const navItinerariesBtn = document.getElementById('navItinerariesBtn');
  const closeItinerariesBtn = document.getElementById('closeItinerariesBtn');

  if (navItinerariesBtn) {
    navItinerariesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!itinsDashboard) {
        console.error("Dashboard HTML element reference was missing.");
        return;
      }
      renderFullItinerariesPage();
      itinsDashboard.classList.add('open');
      document.body.classList.add('modal-lock');
    });
  }

  if (closeItinerariesBtn) {
    closeItinerariesBtn.addEventListener('click', () => {
      if (itinsDashboard) {
        itinsDashboard.classList.remove('open');
        document.body.classList.remove('modal-lock');
      }
    });
  }

  function renderFullItinerariesPage() {
    const grid = document.getElementById('itinerariesGrid');
    if (!grid) return;

    const savedTours = JSON.parse(localStorage.getItem('komorebi_saved_tours') || '[]');

    if (savedTours.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 6rem 0; opacity: 0.5;">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="margin-bottom: 1rem;"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          <h3 style="font-size: 1.8rem; font-weight: 300; margin-bottom: 0.5rem;">No itineraries saved yet</h3>
          <p style="font-size: 1.1rem;">Explore the tours page and start curating your journey.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = savedTours.map((tour, index) => {
      let coverImg = 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80';
      if (tour.activities) {
        const firstLoc = tour.activities.find(act => act.locId && LOCATION_GALLERY[act.locId]);
        if (firstLoc) coverImg = LOCATION_GALLERY[firstLoc.locId][0].src;
      }

      return `
        <div class="itin-card" data-index="${index}">
          
          <div class="itin-card__delete" data-tour-name="${tour.name}" title="Delete Itinerary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </div>

          <div class="itin-card__cover-wrapper">
            <img src="${coverImg}" alt="${tour.name}" class="itin-card__cover">
          </div>
          
          <div class="itin-card__info">
            <h4 class="itin-card__title">${tour.name}</h4>
            <div class="itin-card__meta">
              <span>${tour.duration}</span>
              <span style="color: var(--accent);">${tour.activities ? tour.activities.length : 0} Stops</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.itin-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.itin-card__delete')) return;
        
        const index = card.dataset.index;
        const tourToOpen = savedTours[index];
        openTourDetail(tourToOpen); 
      });

      const deleteBtn = card.querySelector('.itin-card__delete');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const tourName = deleteBtn.dataset.tourName;
          
          // Filter out locally
          const updatedTours = savedTours.filter(t => t.name !== tourName);
          localStorage.setItem('komorebi_saved_tours', JSON.stringify(updatedTours));
          
          // Clear backend persistence tables matching user indices
          if (authState.isLoggedIn()) {
            try {
              await fetch(`${API_BASE}/tours`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authState.getToken()}`
                },
                body: JSON.stringify({ name: tourName })
              });
            } catch (err) {
              console.error('Cloud tour deletion synchronization sync crash:', err);
            }
          }

          if (typeof showToast === 'function') showToast('Itinerary deleted.');
          if (typeof updateSavesBadge === 'function') updateSavesBadge();
          renderFullItinerariesPage();
        });
      }
    });
  }
  
})();