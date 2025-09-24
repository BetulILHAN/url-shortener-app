CREATE TABLE "url_shortener" (
    id UUID NOT NULL CONSTRAINT pk__user PRIMARY KEY,
    original_url TEXT NOT NULL,
    url_slug VARCHAR(10) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    click_count INT DEFAULT 0
);
