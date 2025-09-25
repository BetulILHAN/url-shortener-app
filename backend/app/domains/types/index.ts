interface URLShortenerRow {
  id: string;
  original_url: string;
  url_slug: string;
  created_at: Date;
  click_count: number;
}

interface URLShortener {
  id: string;
  originalURL: string;
  urlSlug: string;
  createdAt: Date;
  clickCount: number;
}

export type { URLShortenerRow, URLShortener };
