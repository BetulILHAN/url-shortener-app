DROP TABLE IF EXISTS url_shortener;

CREATE TABLE url_shortener (
    id UUID NOT NULL PRIMARY KEY,
    original_url TEXT NOT NULL UNIQUE,
    url_slug VARCHAR(10) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    click_count INT DEFAULT 0
);
