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
        lat: 35.6713, lng: 139.7641,
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
        lat: 26.6338, lng: 127.8609,
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
    { src: 'https://traveldudes.com/wp-content/uploads/2020/01/Gate-at-Sensoji-temple-in-Asakusa-Tokyo-Japan.jpg', cap: 'Senso-ji main gate at noon' },
    { src: 'https://static1.squarespace.com/static/5d3ee66abacfa00001df6854/t/5f069ed2fa5c672f37a92656/1594345760363/tokyo-private-tour-nakamise-shopping-street.jpeg?format=1500w', cap: 'Nakamise shopping street' },
    { src: 'https://c8.alamy.com/comp/AWW6JB/incense-burner-sensoji-temple-asakusa-tokyo-japan-AWW6JB.jpg', cap: 'Incense smoke at the shrine' },
  ],
  'l-tok-02': [ // Tokyo Tower
    { src: 'https://asset.japan.travel/image/upload/v1646014276/tokyo/H_00658_001.jpg', cap: 'Tokyo Tower at twilight' },
    { src: 'https://i0.wp.com/aglobewelltravelled.com/wp-content/uploads/2025/05/Tokyo-Skytree-vs-Tokyo-Tower.jpg?fit=2200%2C1467&ssl=1', cap: 'Looking up from the base' },
    { src: 'https://girleatworld.net/wp-content/uploads/2024/01/tokyo-best-view-9-yebisu-sky-lounge.jpg', cap: 'City view from observation deck' },
  ],
  'l-tok-03': [ // Shinjuku Gyoen
    { src: 'https://i0.wp.com/anaroundtheworld.net/wp-content/uploads/2019/03/shinjukugyoen-16-of-33.jpg?fit=2833%2C1882&ssl=1', cap: 'Cherry blossoms in full bloom' },
    { src: 'https://c8.alamy.com/comp/KC5FYT/french-garden-at-shinjuku-gyoen-national-garden-tokyo-japan-KC5FYT.jpg', cap: 'French formal garden section' },
    { src: 'https://media.timeout.com/images/106067140/750/422/image.jpg', cap: 'Autumn foliage in Gyoen' },
  ],
  'l-tok-04': [ // Akihabara
    { src: 'https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2020/05/akihabara-iStock-484915982-1024x683.jpg', cap: 'Akihabara neon signs' },
    { src: 'https://c8.alamy.com/comp/DAXBW5/electronics-district-of-akihabara-tokyo-japan-DAXBW5.jpg', cap: 'Electronics district by night' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEbpkwDx2ruDRAwNyok4wa7mUeCEofWO3mSw&s', cap: 'Anime merchandise stalls' },
  ],
  'l-tok-05': [ // Imperial Palace
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKq3PnkY_Gu8Hs3aaNIwkA6cDUmES2-foNA&s', cap: 'Imperial Palace East Gardens' },
    { src: 'https://meguri-japan.com/mgr/wp-content/uploads/2021/12/chidorigafuchi6.jpg', cap: 'Palace moat in spring' },
  ],
  'l-tok-06': [ // Meiji Jingu
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ifiKqqgtgx0D49zGXF5NPumtSdmQvL97Wg&s', cap: 'Sake barrels at Meiji Jingu' },
    { src: 'https://cdn.britannica.com/59/60059-050-32487791/Torii-entrance-shrine-Shinto-Mount-Hakone-Honshu.jpg', cap: 'Torii gate in the forest' },
  ],
  'l-tok-07': [ // Shibuya Crossing
    { src: 'https://media.istockphoto.com/id/1093658324/photo/aerial-view-shibuya-crossing-tokyo-japan.jpg?s=612x612&w=0&k=20&c=OJu2nhyJhHAYgmT34DwxsrP1YHWOW56ejPi9npZGDZk=', cap: 'The scramble at dusk' },
    { src: 'https://i.ytimg.com/vi/HGjNSCqjf14/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDGiQ-w1dbMf7p7Tbnaasx5ojP3Bw', cap: 'Neon rain in Shibuya' },
  ],
  'l-tok-08': [ // Sukiyabashi Jiro (Formerly l-q01-a)
    { src: 'https://i.redd.it/aumi02ggqfv91.jpg', cap: 'Omakase sushi plating' },
    { src: 'https://images.summitmedia-digital.com/spotph/images/2024/12/11/main-1733906206.jpg', cap: 'Ginza counter dining' },
  ],
  'l-tok-09': [ // Toyosu Market (Formerly l-q01-b)
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQksKVHFxrrhXsyvDFvAQ1JdCKk9ykgkghN2Q&s', cap: 'Morning tuna auction' },
    { src: 'https://i.ytimg.com/vi/wWe6KicP2UQ/maxresdefault.jpg', cap: 'Fresh catch on display' },
    { src: 'https://travel-stained.com/wp-content/uploads/2018/10/37669_10150215839045034_2482551_n.jpg', cap: 'Sushi breakfast at market stalls' },
  ],
  'l-tok-10': [// Yanaka Ginza
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_nocVkrqCV70uZWtgtX3stAJD8uU3U3C4TQ&s', cap: 'Retro street food alleys' }

  ],
  'l-tok-11': [// Ueno Park
    { src: 'https://photos.smugmug.com/Tokyo/n-S6Q5Pp/Where-is-the-Best-Place-to-See-Cherry-Blossoms-in-Tokyo/i-tb3Tbkk/0/Kpz4Hb7ZRF7zHBGzTL5K6jFSBR5V8nWvrHKV7zJvx/L/shutterstock_405603244-L.jpg', cap: 'Cherry blossoms in Ueno' }

  ],
  'l-tok-12': [// Tokyo Ramen Street
    { src: 'https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2017/01/Tokyo-Ramen-Street-2-770x513.jpg', cap: 'Legendary Tokyo ramen' }

  ],
  'l-tok-13': [// Tsukiji Outer Market
    { src: 'https://www.japan-guide.com/g18/3021_11.jpg', cap: 'Tsukiji Market grazing' }

  ],
  'l-tok-14': [// Shinjuku Golden Gai
    { src: 'https://dashboard.japantravel.com/photo/poi-264-219880/1440x960!/tokyo-shinjuku-golden-gai-219880.webp', cap: 'Golden Gai alleyways' }

  ],
  'l-tok-15': [// Bar High Five
    { src: 'https://otokonokakurega.com/wp-content/uploads/2019/09/07_1_IMG_9817-5_main-1.jpg', cap: 'Bespoke cocktail crafting' }
    
  ],
  'l-tok-16': [// Kabukicho
    { src: 'https://travel.rakuten.com/contents/sites/contents/files/styles/max_1300x1300/public/2024-05/things-to-do-kabukicho_8.jpg?itok=ZaD-iB5G', cap: 'Kabukicho neon gates' }

  ],

  // OSAKA
  'l-osa-01': [ // Osaka Castle
    { src: 'https://thumbs.dreamstime.com/b/osaka-castle-tourist-boat-moat-one-japan-s-most-famous-landmarks-played-major-role-unification-132153062.jpg', cap: 'Osaka Castle and moat' },
    { src: 'https://media.istockphoto.com/id/469808499/photo/osaka-castle-in-autumn.jpg?s=612x612&w=0&k=20&c=3g_xwBAdrIr6EVzSxd6hj41bkWG7v_sVcjdbXiJXSa4=', cap: 'Castle tower in autumn' },
    { src: 'https://osakacastle.org/wp-content/uploads/2024/11/Osaka-Castle-Dusk-1024x681.jpg', cap: 'Castle gardens at dawn' },
  ],
  'l-osa-02': [ // Kuromon Market
    { src: 'https://www.planmyjapan.com/wp-content/uploads/2024/07/Kuromon-Market-14-635x800.jpg', cap: 'Fresh seafood stalls' },
    { src: 'https://www.planmyjapan.com/wp-content/uploads/2024/07/Kuromon-Market-29.jpg', cap: 'Market vendors at midday' },
  ],
  'l-osa-03': [ // Umeda Sky Building
    { src: 'https://www.nippon.com/en/ncommon/contents/views/45856/45856.jpg', cap: 'Umeda Sky Building aerial view' },
    { src: 'https://www.agoda.com/wp-content/uploads/2018/10/City-guides_things-to-do-in-Osaka_Japan_Umeda-Sky-Building_floating-garden.jpg%20', cap: 'Floating garden observatory' },
  ],
  'l-osa-04': [ // Hozenji Yokocho
    { src: '', cap: 'Lantern-lit Hozenji alley' },
    { src: '', cap: 'Moss-covered Mizukake Fudo statue' },
  ],
  'l-osa-05': [ // Abeno Harukas
    { src: '', cap: 'Abeno Harukas skyline view' },
  ],
  'l-osa-06': [ // Don Quijote (Formerly l-c01-a)
    { src: '', cap: 'Dotonbori neon at night' },
    { src: '', cap: 'Don Quijote storefront' },
  ],
  'l-osa-07': [ // Kansai Airport (Formerly l-c01-c)
    { src: '', cap: 'Kansai airport terminal' },
  ],
  'l-osa-08': [ // Suntory Yamazaki (Formerly l-c03-a)
    { src: '', cap: 'Whisky barrels in the warehouse' },
    { src: '', cap: 'Yamazaki distillery grounds' },
  ],
  'l-osa-09': [// Takoyaki Dotonbori
    { src: '', cap: 'Takoyaki tasting' }

  ],
  'l-osa-10': [// Shinsekai District
    { src: '', cap: 'Shinsekai retro vibes' }

  ],
  'l-osa-11': [// Okonomiyaki District
    { src: '', cap: 'Hot iron okonomiyaki' }

  ],
  'l-osa-12': [// Yamazaki Tasting Library
    { src: '', cap: 'Whisky tasting library' }

  ],

  // NAGOYA
  'l-nag-01': [ // Nagoya Castle
    { src: '', cap: 'Nagoya Castle golden shachihoko' },
    { src: '', cap: 'Castle keep in summer' },
  ],
 'l-nag-02': [ // Toyota Museum
    { src: '', cap: 'Classic Toyota on display' },
    { src: '', cap: 'Loom technology exhibit' },
  ],
  'l-nag-03': [ // Atsuta Shrine
    { src: '', cap: 'Ancient forest at Atsuta Shrine' },
    { src: '', cap: 'Shrine lanterns at dusk' },
  ],
  'l-nag-04': [ // Nagoya Meshi
    { src: '', cap: 'Miso katsu, Nagoya style' },
    { src: '', cap: 'Tebasaki chicken wings' },
  ],
  'l-nag-05': [ // Tokugawa Museum
    { src: '', cap: 'Samurai armour collection' },
    { src: '', cap: 'Edo-period scroll painting' },
  ],
  'l-nag-06': [ // Osu Kannon
    { src: '', cap: 'Osu Kannon temple grounds' },
  ],
  'l-nag-07': [ // Oasis 21
    { src: '', cap: 'Spaceship Aqua illuminated' },
  ],
  'l-nag-08': [// Osu Shopping District
    { src: '', cap: 'Osu shopping arcade' }
  ],
  'l-nag-09': [// Noritake Garden
    { src: '', cap: 'Noritake garden grounds' }
  ],
  'l-nag-10': [// Hitsumabushi Dining
    { src: '', cap: 'Hitsumabushi eel dinner' }
  ],
  'l-nag-11': [// Sakae Izakaya
    { src: '', cap: 'Sakae izakaya drinks' }
  ],

  // OKINAWA
  'l-oki-01': [ // Kerama Islands
    { src: '', cap: 'Kerama Islands turquoise water' },
    { src: '', cap: 'Coral reef snorkeling' },
    { src: '', cap: 'Sea turtle at Kerama' },
  ],
  'l-oki-02': [ // Shuri Castle
    { src: '', cap: 'Shuri Castle crimson gate' },
    { src: '', cap: 'Ryukyuan palace interior' },
  ],
  'l-oki-03': [ // Blue Cave
    { src: '', cap: 'Blue Cave, Cape Maeda' },
    { src: '', cap: 'Tropical fish in the cave' },
  ],
  'l-oki-04': [ // Churaumi Aquarium
    { src: '', cap: 'Whale shark at Churaumi' },
    { src: '', cap: 'Giant manta ray exhibit' },
  ],
  'l-oki-05': [ // Kokusai Street
    { src: '', cap: 'Kokusai Street nightlife' },
    { src: '', cap: 'Traditional craft shops' },
  ],
  'l-oki-06': [ // Cape Manzamo
    { src: '', cap: 'Sunset over Cape Manzamo' },
  ],
  'l-oki-07': [ // American Village
    { src: '', cap: 'Mihama American Village Ferris Wheel' },
  ],
  'l-oki-08': [// Tomari Port
    { src: '', cap: 'Tomari Port departure' }
  ],
  'l-oki-09': [// Zamami Beach
    { src: '', cap: 'Zamami Beach sands' }
  ],
  'l-oki-10': [
    { src: '', cap: 'Crimson gates of Shuri' }
  ],
  'l-oki-11': [
    { src: '', cap: 'Tamaudun stone walls' }
  ],
  'l-oki-12': [
    { src: '', cap: 'Live sanshin music tavern' }
  ],

  // SAPPORO
  'l-sap-01': [ // Niseko
    { src: '', cap: 'Niseko powder runs' },
    { src: '', cap: 'Hokkaido winter landscape' },
    { src: '', cap: 'Deep powder skiing' },
  ],
  'l-sap-02': [ // Odori Ice Festival
    { src: '', cap: 'Ice sculpture festival, Odori' },
    { src: '', cap: 'Snow lanterns at night' },
  ],
  'l-sap-03': [ // Sapporo Beer Museum
    { src: '', cap: 'Historic red brick brewery' },
    { src: '', cap: 'Sapporo lager tasting' },
  ],
  'l-sap-04': [ // Shiretoko Peninsula
    { src: '', cap: 'Shiretoko wilderness' },
    { src: '', cap: 'Brown bear spotting' },
  ],
  'l-sap-05': [ // Ramen Yokocho
    { src: '', cap: 'Sapporo miso ramen' },
    { src: '', cap: 'Ramen Yokocho alley at night' },
  ],
  'l-sap-06': [ // Mount Moiwa
    { src: '', cap: 'Night view from Mount Moiwa' },
  ],
  'l-sap-07': [ // Moerenuma Park
    { src: '', cap: 'Glass pyramid at Moerenuma' },
  ],
  'l-sap-08': [ // Nikka Yoichi
    { src: '', cap: 'Nikka Yoichi stone distillery' },
    { src: '', cap: 'Coal-fired pot stills' },
  ],
  'l-sap-09': [// Niseko Transfer
    { src: '', cap: 'Winter road to Niseko' }
  ],
  'l-sap-10': [// First Tracks
    { src: '', cap: 'Fresh morning tracks' }
  ],
  'l-sap-11': [// Mountain Lodge Ramen
    { src: '', cap: 'Steaming mountain ramen' }
  ],
  'l-sap-12': [// Apres-Ski Onsen
    { src: '', cap: 'Outdoor snow onsen' }
  ],
  'l-sap-13': [// Historic Brewery
    { src: '', cap: 'Historic red brick brewery' }
  ],
  'l-sap-14': [// Tasting Flight
    { src: '', cap: 'Sapporo tasting flight' }
  ],
  'l-sap-15': [// Jingisukan Dinner
    { src: '', cap: 'Jingisukan lamb BBQ' }
  ],
  'l-sap-16': [// IceBar
    { src: '', cap: 'Ice bar cocktails' }
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
            // Link activity to location database entity
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
            // Link activity to location database entity
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

  /* window._debug intentionally omitted in production */

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
    : 'https://komorebiproject-backend.onrender.com/api';

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

      // 1. Intercept bad statuses (like 403 Forbidden)
      if (!res.ok) {
        throw new Error(`Server rejected request with status: ${res.status}`);
      }

      const rows = await res.json();
      
      // 2. Failsafe: Ensure the backend actually gave us an array
      if (!Array.isArray(rows)) {
        throw new Error('Expected an array of bookmarks, but got an object.');
      }

      bookmarks.clear();
      rows.forEach(row => {
        const locId = row.location_id;
        const loc = ALL_LOCATIONS.find(l => l.id === locId);
        if (loc) bookmarks.set(loc.id, loc);
      });
      
      updateSavesBadge();
      renderSavesDrawer();
      // renderLocationGrid lives inside DOMContentLoaded — guard in case
      // this sync runs before the DOM callback has finished registering it
      if (typeof renderLocationGrid === 'function') renderLocationGrid();
      if (typeof persistBookmarksToStorage === 'function') persistBookmarksToStorage();
      
    } catch (err) {
      console.error('Bookmark sync error:', err);
      // Auto-logout on 403 — token has expired or is invalid
      if (err.message && err.message.includes('403')) {
        authState.clearToken();
        authState.clearUsername();
        bookmarks.clear();
        // updateSavesBadge/renderSavesDrawer may not be defined yet if called early,
        // so guard with typeof
        if (typeof updateSavesBadge === 'function') updateSavesBadge();
        if (typeof renderSavesDrawer === 'function') renderSavesDrawer();
        if (typeof updateNavAuth === 'function') updateNavAuth();
      }
    }
  }

  /* ═══════════════════════════════════════════
     UI HELPERS — defined before DOMContentLoaded
     so syncBookmarksFromDB can call them safely
     on page load before the DOM callback fires.
  ═══════════════════════════════════════════ */
  function updateSavesBadge() {
    const badgeEl = document.getElementById('savesBadge');
    if (!badgeEl) return;
    const savedTours = JSON.parse(localStorage.getItem('komorebi_saved_tours') || '[]');
    const totalSaves = bookmarks.size + savedTours.length;
    badgeEl.textContent = totalSaves;
  }

  function renderSavesDrawer() {
    // Seed the in-memory Map from localStorage for guest sessions (mirrors tour pattern)
    if (bookmarks.size === 0) {
      const stored = JSON.parse(localStorage.getItem('komorebi_saved_locations') || '[]');
      stored.forEach(loc => bookmarks.set(loc.id, loc));
    }

    // Use getElementById directly so this function is safe to call before DOMContentLoaded
    const sub       = document.getElementById('savesDrawerSub');
    const savesGrid = document.getElementById('savesGrid');
    const savesEmpty = document.getElementById('savesEmpty');
    if (!sub || !savesGrid || !savesEmpty) return; // DOM not ready yet

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
        if (typeof window.closeSavesDrawer === 'function') window.closeSavesDrawer();
        setTimeout(() => { if (typeof window.openLocationModal === 'function') window.openLocationModal(loc); }, 200);
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
     DOM-DEPENDENT INIT
     Everything below touches the DOM and must
     wait for DOMContentLoaded.
  ═══════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', function onDOMReady() {

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
  // ─── Reviews helpers ──────────────────────────────────────────────────────

  function buildReviewHTML(r) {
    // GET /api/reviews returns: { author, text, rating, date }
    const avatar = r.author ? r.author[0].toUpperCase() : '?';
    const name   = r.author || 'Anonymous';
    const stars  = parseInt(r.rating) || 0;
    const date   = r.date
      ? new Date(r.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : 'Just now';
    return `<div class="review-item">
      <div class="review-item__header">
        <div class="review-item__avatar">${avatar}</div>
        <div class="review-item__meta">
          <div class="review-item__name">${name}</div>
          <div class="review-item__date">${date}</div>
        </div>
        <div class="review-item__stars">${'\u2605'.repeat(stars)}${'\u2606'.repeat(5 - stars)}</div>
      </div>
      <p class="review-item__text">${r.text || ''}</p>
    </div>`;
  }

  async function loadReviews(locationId) {
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = `<p class="reviews-empty-msg" style="opacity:.5;">Loading reviews…</p>`;
    try {
      const res = await fetch(`${API_BASE}/reviews/${locationId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const reviews = await res.json();
      
      if (!reviews.length) {
        reviewsList.innerHTML = `<p class="reviews-empty-msg">No reviews yet. Be the first to share your experience!</p>`;
      } else {
        reviewsList.innerHTML = reviews.map(buildReviewHTML).join('');
      }

      // Pre-populate form if user has an existing review
      if (authState.isLoggedIn()) {
        const myReview = reviews.find(r => r.author === authState.getUsername());
        const submitBtn = document.getElementById('review-submit-btn');
        
        if (myReview) {
          // Pre-fill the form with their existing review
          document.getElementById('review-input').value = myReview.text;
          starRating = parseInt(myReview.rating);
          document.querySelectorAll('#star-picker .star').forEach((s, i) => 
            s.classList.toggle('active', i < starRating)
          );
          submitBtn.textContent = 'Update Review';
        } else {
          // Reset to default empty state
          document.getElementById('review-input').value = '';
          starRating = 0;
          document.querySelectorAll('#star-picker .star').forEach(s => s.classList.remove('active'));
          submitBtn.textContent = 'Post Review';
        }
      }
    } catch (err) {
      console.error('Failed to load reviews:', err);
      reviewsList.innerHTML = `<p class="reviews-empty-msg">Couldn't load reviews. Please try again.</p>`;
    }
  }

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
    const rawImgs = LOCATION_GALLERY[loc.id] || [];
    // Filter out placeholder entries with no URL — fall back to Unsplash default
    const FALLBACK_IMG = { src: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', cap: loc.name };
    const imgs = rawImgs.filter(img => img.src && img.src.trim());
    if (imgs.length === 0) imgs.push(FALLBACK_IMG);
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

    // --- Reviews Tab --- (fetched live from API)
    loadReviews(loc.id);

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
    // Strip is-active so panels don't block clicks when the modal is closed
    document.querySelectorAll('#location-modal .modal-panel').forEach(p => p.classList.remove('is-active'));
    document.querySelectorAll('#location-modal .modal-tab').forEach(t => t.classList.remove('is-active'));
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

/* ── Share Location Link Generator ── */
const locModalShareBtn = document.getElementById('locModalShare');
if (locModalShareBtn) {
  locModalShareBtn.addEventListener('click', async () => {
    if (!currentLocModalLoc) return;
    
    // Build the URL (e.g., http://localhost:5500/?loc=l-tok-01)
    const shareUrl = `${window.location.origin}/?loc=${currentLocModalLoc.id}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('Location link copied to clipboard!');
    } catch (err) {
      showToast('Failed to copy link.');
    }
  });
}



function activateLocModalTab(targetId) {
  document.querySelectorAll('#location-modal .modal-tab').forEach(t =>
    t.classList.toggle('is-active', t.dataset.modalTarget === targetId)
  );
  document.querySelectorAll('#location-modal .modal-panel').forEach(p =>
    p.classList.toggle('is-active', p.id === targetId)
  );

    if (targetId === 'mtab-map') {
      setTimeout(() => {
        if (currentLocModalLoc) {
          // Destroy and recreate the map when the location has changed to avoid
          // stale tile layers and event listener accumulation.
          if (locLeafletMap) {
            locLeafletMap.remove();
            locLeafletMap = null;
            locLeafletMarker = null;
          }
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

  // Submit review — real POST to /api/reviews
  document.getElementById('review-submit-btn').addEventListener('click', async () => {
    if (!authState.isLoggedIn()) {
      showToast('Please log in to post a review.');
      openAuthModal('login');
      return;
    }
    if (!currentLocModalLoc) return;
    const text = document.getElementById('review-input').value.trim();
    if (!text || !starRating) { showToast('Please add a rating and review text.'); return; }

    const submitBtn = document.getElementById('review-submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Posting…';

    try {
      const res = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.getToken()}`
        },
        body: JSON.stringify({
          locationId: currentLocModalLoc.id,
          rating: starRating,
          text
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || 'Failed to post review.');
        return;
      }

      // Reset compose UI
      document.getElementById('review-input').value = '';
      starRating = 0;
      document.querySelectorAll('#star-picker .star').forEach(s => s.classList.remove('active'));
      showToast('Review posted!');

      // Reload the reviews list from the server so the new entry appears with real data
      await loadReviews(currentLocModalLoc.id);

    } catch (err) {
      console.error('Review submit error:', err);
      showToast('Network error — please try again.');
    } finally {
      submitBtn.disabled = false;
      // Don't reset the label here — loadReviews() already sets it correctly
      // to either 'Post Review' or 'Update Review' after the server reload above.
      // Only restore the label on error paths where loadReviews was never called.
      if (submitBtn.textContent === 'Posting…') submitBtn.textContent = 'Post Review';
    }
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
    <div class="tour-item__num">${String(i+1).padStart(2,'0')}</div>
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
            attribution: '© OpenStreetMap contributors © CARTO',
            subdomains: 'abcd', maxZoom: 19
          }).addTo(leafletMap);
        }
        leafletMap.setView(coords, 11);
        
        // Clear previous markers
        if (window.cityCluster) {
          leafletMap.removeLayer(window.cityCluster);
        }
        window.cityCluster = L.layerGroup();

        // Loop through the city's locations and add markers
        locs.forEach(loc => {
          const icon = L.divIcon({
            className: '',
            html: `<div style="width:16px;height:16px;background:#FF4F00;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid #fff;box-shadow:0 2px 8px rgba(255,79,0,.5);"></div>`,
            iconSize: [16, 16], iconAnchor: [8, 16]
          });
          const marker = L.marker([loc.lat, loc.lng], { icon })
            .bindPopup(`<strong>${loc.name}</strong><br><small>${loc.cat}</small>`);
          
          window.cityCluster.addLayer(marker);
        });

        // Add markers to the map
        leafletMap.addLayer(window.cityCluster);
        leafletMap.invalidateSize();
      }, 100);
    }

    // Show the modal and reset to the highlights tab
    modalBackdrop.classList.add('open');
    activateModalTab('highlights');
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
    const rawImgs = LOCATION_GALLERY[locId] || [];
    // Filter out placeholder entries with no URL — fall back to Unsplash default
    const FALLBACK_IMG = { src: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', cap: 'No photos yet' };
    const imgs = rawImgs.filter(img => img.src && img.src.trim());
    if (imgs.length === 0) imgs.push(FALLBACK_IMG);
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
    if (modalBackdrop.classList.contains('open') || document.body.classList.contains('modal-lock') || wLock || inGridView) return;
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
    if (modalBackdrop.classList.contains('open') || document.body.classList.contains('modal-lock') || inGridView) return;
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

      // Sync tours from server after login
      await syncToursToServer();
      await syncToursFromDB();
      if (typeof renderFullItinerariesPage === 'function') renderFullItinerariesPage();

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
// Nav auth button hover & click logic
navAuthBtn.addEventListener('mouseenter', () => {
  if (navAuthBtn.dataset.loggedIn === 'true') {
    navAuthLabel.textContent = 'Profile';
  }
});
navAuthBtn.addEventListener('mouseleave', () => {
  if (navAuthBtn.dataset.loggedIn === 'true') {
    const u = authState.getUsername() || 'Profile';
    navAuthLabel.textContent = u[0].toUpperCase() + u.slice(1);
  }
});
navAuthBtn.addEventListener('click', () => {
  if (navAuthBtn.dataset.loggedIn === 'true') {
    openProfilePage();
  } else {
    openAuthModal();
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
    // Clear localStorage FIRST so renderSavesDrawer's re-hydration guard finds nothing
    localStorage.removeItem('komorebi_saved_tours');
    localStorage.removeItem('komorebi_saved_locations');
    bookmarks.clear();
    savesFilter = 'all';
    updateNavAuth();
    updateSavesBadge();
    renderSavesDrawer();
    renderLocationGrid();
    showToast('Signed out');
  });
  logoutBackdrop.addEventListener('click', e => { if (e.target === logoutBackdrop) closeLogoutConfirm(); });

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
    
    // Initialize local itinerary rendering
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
  // (INIT is now handled by the onDOMReady wrapper above)

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
        
        const galleryEntry = cleanLocId && LOCATION_GALLERY[cleanLocId]?.[0];
        if (galleryEntry && galleryEntry.src && galleryEntry.src.trim()) {
          imgSrc = galleryEntry.src;
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

/* ── Tours sync is triggered from handleAuthSubmit directly (see above) ── */

  /* ═══════════════════════════════════════════
     GLOBAL BRIDGE — expose private IIFE functions
     so inline onclick attributes (mobile pills etc.)
     can reach them from the global scope.
  ═══════════════════════════════════════════ */
  window.openSavesDrawer   = openSavesDrawer;
  window.closeSavesDrawer  = closeSavesDrawer;
  window.openLocationModal = openLocationModal;
  window.openTourDetail    = openTourDetail;

  window.openToursPage = function() {
    toursPage.classList.add('open');
    document.body.classList.add('modal-lock');
  };

  window.openAboutPage = function() {
    aboutPage.classList.add('open');
    document.body.classList.add('modal-lock');
  };

  // localStorage cleanup is handled in the logoutConfirm listener above

 /* ═══════════════════════════════════════════
   MY SAVES DASHBOARD (Itineraries + Locations)
═══════════════════════════════════════════ */

const itinsDashboard   = document.getElementById('itinerariesDashboard');
const dashTabs         = document.getElementById('dashTabs');
const tabItineraries   = document.getElementById('tabItineraries');
const tabLocations     = document.getElementById('tabLocations');
const tabIndicator     = document.getElementById('tabIndicator');
const tabItinCount     = document.getElementById('tabItinCount');
const tabLocCount      = document.getElementById('tabLocCount');
const panelItineraries = document.getElementById('panelItineraries');
const panelLocations   = document.getElementById('panelLocations');

let activeDashTab = 'itineraries';

/* ── Open / Close ── */
window.openItinerariesDashboard = function () {
  if (!itinsDashboard) return;
  activeDashTab = 'itineraries';
  _syncTabUI();
  renderFullItinerariesPage();
  renderSavedLocationsPanel();
  itinsDashboard.classList.add('open');
  document.body.classList.add('modal-lock');
};

const navItinerariesBtn  = document.getElementById('navItinerariesBtn');
const closeItinerariesBtn = document.getElementById('closeItinerariesBtn');

if (navItinerariesBtn) {
  navItinerariesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.openItinerariesDashboard();
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

/* Escape key closes dashboard */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && itinsDashboard && itinsDashboard.classList.contains('open')) {
    itinsDashboard.classList.remove('open');
    document.body.classList.remove('modal-lock');
  }
});

/* ── Tab switching ── */
function _syncTabUI() {
  // Indicator slide
  if (dashTabs) dashTabs.dataset.active = activeDashTab;

  // Active class on buttons
  [tabItineraries, tabLocations].forEach(btn => {
    if (!btn) return;
    const isActive = btn.dataset.tab === activeDashTab;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });

  // Panel visibility with re-entrance animation
  [panelItineraries, panelLocations].forEach(panel => {
    if (!panel) return;
    const isVisible = panel.id === `panel${activeDashTab.charAt(0).toUpperCase() + activeDashTab.slice(1)}`;
    if (isVisible) {
      panel.classList.remove('dash-panel--hidden');
      // Trigger re-animation by toggling class
      panel.style.animation = 'none';
      requestAnimationFrame(() => {
        panel.style.animation = '';
        panel.classList.add('dash-panel');
      });
    } else {
      panel.classList.add('dash-panel--hidden');
    }
  });
}

function _switchTab(tab) {
  if (activeDashTab === tab) return;
  activeDashTab = tab;
  _syncTabUI();
  if (tab === 'itineraries') renderFullItinerariesPage();
  else                        renderSavedLocationsPanel();
}

if (tabItineraries) tabItineraries.addEventListener('click', () => _switchTab('itineraries'));
if (tabLocations)   tabLocations.addEventListener('click',   () => _switchTab('locations'));


/* ─────────────────────────────────────────
   HELPER: Build a premium card wrapper
───────────────────────────────────────── */
function _makeCardWrapper(index) {
  const el = document.createElement('div');
  el.className = 'premium-entry';
  el.style.setProperty('--i', index);
  return el;
}

/* ─────────────────────────────────────────
   ITINERARIES PANEL
───────────────────────────────────────── */
function renderFullItinerariesPage() {
  const grid = document.getElementById('itinerariesGrid');
  if (!grid) return;

  const savedTours = JSON.parse(localStorage.getItem('komorebi_saved_tours') || '[]');

  // Update count badge
  if (tabItinCount) tabItinCount.textContent = savedTours.length;

  if (savedTours.length === 0) {
    grid.innerHTML = _emptyState(
      '旅',
      'No itineraries yet',
      'Explore the Tours page and save curated trips to see them here.'
    );
    return;
  }

  grid.innerHTML = '';
  savedTours.forEach((tour, index) => {
    // Cover image: first gallery image matching any activity locId
    let coverImg = 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80';
    if (tour.activities) {
      const firstLoc = tour.activities.find(act => act.locId && LOCATION_GALLERY[act.locId]);
      if (firstLoc) {
        const gallery = (LOCATION_GALLERY[firstLoc.locId] || []).find(img => img.src && img.src.trim());
        if (gallery) coverImg = gallery.src;
      }
    }

    const stops = tour.activities ? tour.activities.length : 0;
    const wrapper = _makeCardWrapper(index);

    wrapper.innerHTML = `
      <div class="itin-card">

        <div class="card-visual">
          <img src="${coverImg}" alt="${_esc(tour.name)}" loading="lazy">
          <div class="card-badge">${_esc(tour.duration)}</div>
          <button class="card-delete-btn" data-tour-name="${_esc(tour.name)}" title="Delete itinerary" aria-label="Delete ${_esc(tour.name)}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>

        <div class="card-content">
          <span class="card-tag">Itinerary</span>
          <h3>${_esc(tour.name)}</h3>
          <div class="card-footer">
            <span>${_esc(tour.duration)}</span>
            <strong>${stops} Stop${stops !== 1 ? 's' : ''}</strong>
          </div>
        </div>

      </div>
    `;

    // Click opens detail
    wrapper.addEventListener('click', (e) => {
      if (e.target.closest('.card-delete-btn')) return;
      if (typeof window.openTourDetail === 'function') window.openTourDetail(tour);
    });

    // Delete
    wrapper.querySelector('.card-delete-btn').addEventListener('click', async (e) => {
      e.stopPropagation();
      const tourName = e.currentTarget.dataset.tourName;
      const updated  = savedTours.filter(t => t.name !== tourName);
      localStorage.setItem('komorebi_saved_tours', JSON.stringify(updated));

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
          console.error('Cloud tour deletion error:', err);
        }
      }

      showToast('Itinerary deleted.');
      updateSavesBadge();
      renderFullItinerariesPage();
    });

    grid.appendChild(wrapper);
  });
}


/* ─────────────────────────────────────────
   LOCATIONS PANEL
───────────────────────────────────────── */
function renderSavedLocationsPanel() {
  const grid = document.getElementById('locationsGrid');
  if (!grid) return;

  // bookmarks is a Map of locationId → location object
  const savedIds  = bookmarks instanceof Map ? [...bookmarks.keys()] : [...(bookmarks || new Set())];
  const savedLocs = savedIds
    .map(id => ALL_LOCATIONS.find(l => l.id === id))
    .filter(Boolean);

  // Update count badge
  if (tabLocCount) tabLocCount.textContent = savedLocs.length;

  if (savedLocs.length === 0) {
    grid.innerHTML = _emptyState(
      '♡',
      'No saved locations',
      'Tap the heart on any location card to save it here.'
    );
    return;
  }

  grid.innerHTML = '';
  savedLocs.forEach((loc, index) => {
    const wrapper = _makeCardWrapper(index);

    wrapper.innerHTML = `
      <div class="loc-card">
        <button class="loc-card__heart is-saved dash-remove-btn" data-loc-id="${_esc(loc.id)}" title="Remove from saves" aria-label="Remove ${_esc(loc.name)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <div class="loc-card__icon">${loc.icon || '📍'}</div>
        <div class="loc-card__city">${_esc(loc.cityLabel)}</div>
        <h3 class="loc-card__name">${_esc(loc.name)}</h3>
        <p class="loc-card__desc">${_esc(loc.desc)}</p>
        <span class="loc-card__cat">${_esc(loc.cat)}</span>
      </div>
    `;

    // Click opens location modal (dashboard stays open behind)
    wrapper.addEventListener('click', (e) => {
      if (e.target.closest('.dash-remove-btn')) return;
      openLocationModal(loc);
    });

    // Unsave / remove bookmark
    wrapper.querySelector('.dash-remove-btn').addEventListener('click', async (e) => {
      e.stopPropagation();
      const locId = e.currentTarget.dataset.locId;
      const targetLoc = ALL_LOCATIONS.find(l => l.id === locId);
      if (!targetLoc) return;

      // Use the existing heart-toggle path so state stays in sync
      const heartBtn = document.querySelector(`.loc-card__heart[data-id="${locId}"]`);
      toggleBookmarkOptimistic(targetLoc, heartBtn || e.currentTarget);

      showToast('Location removed from saves.');
      updateSavesBadge();
      renderSavedLocationsPanel();
    });

    grid.appendChild(wrapper);
  });
}


/* ─────────────────────────────────────────
   EMPTY STATE TEMPLATE
───────────────────────────────────────── */
function _emptyState(glyph, title, body) {
  return `
    <div class="dash-empty-state premium-entry" style="--i:0">
      <div class="empty-glyph">${glyph}</div>
      <div class="empty-rule"></div>
      <h3>${title}</h3>
      <p>${body}</p>
    </div>
  `;
}


/* ─────────────────────────────────────────
   UTILITY: HTML-escape
───────────────────────────────────────── */
function _esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}


/* ─────────────────────────────────────────
   RE-RENDER when dashboard is open and
   saves badge / bookmark state changes
───────────────────────────────────────── */
const _origUpdateSavesBadge = typeof updateSavesBadge === 'function' ? updateSavesBadge : null;
// Patch: after badge updates, also refresh open location panel
function _refreshDashIfOpen() {
  if (itinsDashboard && itinsDashboard.classList.contains('open')) {
    if (activeDashTab === 'locations') renderSavedLocationsPanel();
    else renderFullItinerariesPage();
  }
}
// Call _refreshDashIfOpen anywhere the badge is updated (add at end of updateSavesBadge calls if needed)

/* ═══════════════════════════════════════════
     PROFILE PAGE LOGIC
  ═══════════════════════════════════════════ */
  const profilePage = document.getElementById('profilePage');
  
  if (document.getElementById('profilePageClose')) {
    document.getElementById('profilePageClose').addEventListener('click', () => {
      profilePage.classList.remove('open');
      document.body.classList.remove('modal-lock');
    });
  }

  async function openProfilePage() {
    profilePage.classList.add('open');
    document.body.classList.add('modal-lock');
    document.getElementById('profileUsername').textContent = authState.getUsername();
    document.getElementById('profileEmail').textContent = 'Loading...';
    
    try {
      const res = await fetch(`${API_BASE}/user/profile`, {
        headers: { 'Authorization': `Bearer ${authState.getToken()}` }
      });
      if (res.ok) {
        const data = await res.json();
        document.getElementById('profileEmail').textContent = data.email;
      }
    } catch (e) {
      document.getElementById('profileEmail').textContent = 'Error loading email';
    }
  }

  // Update Password
  if (document.getElementById('profUpdatePwBtn')) {
    document.getElementById('profUpdatePwBtn').addEventListener('click', async () => {
      const current = document.getElementById('profCurrentPw').value;
      const newPw = document.getElementById('profNewPw').value;
      if (!current || newPw.length < 8) return showToast('Please provide a valid new password (min 8 chars).');
      
      const btn = document.getElementById('profUpdatePwBtn');
      btn.textContent = 'Updating...';
      
      try {
        const res = await fetch(`${API_BASE}/user/password`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authState.getToken()}`
          },
          body: JSON.stringify({ currentPassword: current, newPassword: newPw })
        });
        const data = await res.json();
        showToast(res.ok ? 'Password updated!' : data.error);
        if (res.ok) {
          document.getElementById('profCurrentPw').value = '';
          document.getElementById('profNewPw').value = '';
        }
      } catch(e) {
        showToast('Network error');
      }
      btn.textContent = 'Update Password';
    });
  }

  // Log Out from inside Profile
  if (document.getElementById('profLogoutBtn')) {
    document.getElementById('profLogoutBtn').addEventListener('click', () => {
      profilePage.classList.remove('open');
      openLogoutConfirm();
    });
  }

  // Delete Account
  if (document.getElementById('profDeleteBtn')) {
    document.getElementById('profDeleteBtn').addEventListener('click', async () => {
      if (!confirm('Are you absolutely sure? This cannot be undone and will permanently delete all your itineraries, reviews, and saves.')) return;
      
      try {
        const res = await fetch(`${API_BASE}/user/profile`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${authState.getToken()}` }
        });
        if (res.ok) {
          showToast('Account deleted.');
          profilePage.classList.remove('open');
          
          // Trigger logout cleanup
          authState.clearToken();
          authState.clearUsername();
          bookmarks.clear();
          
          // Clear all active hearts in the UI
          document.querySelectorAll('.is-saved').forEach(b => {
            b.classList.remove('is-saved');
            const svg = b.querySelector('svg');
            if (svg) svg.setAttribute('fill', 'none');
          });
          
          updateSavesBadge();
          updateNavAuth(); 
          renderFullItinerariesPage();
          
        } else {
          showToast('Failed to delete account.');
        }
      } catch(e) {
        showToast('Network error');
      }
    });
  }

  /* ═══════════════════════════════════════════
     SHAREABLE ITINERARIES LOGIC
  ═══════════════════════════════════════════ */
  
  // 1. Generate & Copy Link
  if (document.getElementById('shareTourBtn')) {
    document.getElementById('shareTourBtn').addEventListener('click', async () => {
      if (!currentModalTour) return;
      if (!authState.isLoggedIn()) {
        showToast('Please log in to share itineraries.');
        openAuthModal('login');
        return;
      }

      const btn = document.getElementById('shareTourBtn');
      btn.style.opacity = '0.5';

      try {
        const res = await fetch(`${API_BASE}/tours/share`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authState.getToken()}`
          },
          body: JSON.stringify({ name: currentModalTour.name })
        });

        const data = await res.json();
        
        if (res.ok) {
          await navigator.clipboard.writeText(data.link);
          showToast('Link copied to clipboard!');
        } else {
          showToast(data.error || 'Failed to generate link.');
        }
      } catch (err) {
        showToast('Network error while sharing.');
      } finally {
        btn.style.opacity = '1';
      }
    });
  }
  // ── Shared tour / location deep-link handler ──
  const urlParams = new URLSearchParams(window.location.search);
  const sharedTourToken = urlParams.get('tour');
  const sharedLocId     = urlParams.get('loc');

  if (sharedTourToken) {
    (async () => {
      try {
        window.history.replaceState({}, document.title, window.location.pathname);
        const res = await fetch(`${API_BASE}/tours/shared/${sharedTourToken}`);
        if (res.ok) {
          const sharedTour = await res.json();
          sharedTour.duration = `${sharedTour.duration} • Curated by ${sharedTour.author}`;
          // Use requestAnimationFrame after a short delay instead of a hardcoded 500ms guess,
          // ensuring the DOM setup within DOMContentLoaded has fully committed before opening.
          requestAnimationFrame(() => setTimeout(() => openTourDetail(sharedTour), 100));
        } else {
          showToast('Shared link is invalid or expired.');
        }
      } catch (e) {
        console.error('Failed to load shared tour:', e);
      }
    })();
  } else if (sharedLocId) {
    const loc = ALL_LOCATIONS.find(l => l.id === sharedLocId);
    if (loc) {
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => openLocationModal(loc), 600);
    } else {
      showToast('Location not found.');
    }
  }

  /* ── INIT calls ── */
  // Clear any is-active classes baked into the HTML for location modal panels/tabs
  document.querySelectorAll('#location-modal .modal-panel').forEach(p => p.classList.remove('is-active'));
  document.querySelectorAll('#location-modal .modal-tab').forEach(t => t.classList.remove('is-active'));
  updateNavAuth();
  updateSavesBadge();
  goTo(0, true);
  if (authState.isLoggedIn()) {
    syncBookmarksFromDB().then(() => syncToursFromDB());
  }

  }); // end DOMContentLoaded

  

})();