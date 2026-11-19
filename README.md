# Echoesofmind Blog Website

A comprehensive blog website featuring articles, product reviews, platform comparisons, and more.

Static articles live in `js/data.js`. New posts from **zjads** go through `POST /api/posts` into a private Vercel Blob file (`published-posts.json`). They show up in the list and detail pages without redeploying or editing `data.js`.

## Features

- **Landing Page**: Eye-catching hero section with background image
- **Blog Section**:
  - Multiple categories (Technology, Lifestyle, Product Reviews, Platform Reviews, Health & Wellness)
  - Search functionality
  - Category filtering
  - Pagination
  - Articles sorted by date (newest first)
  - Static articles plus API-published posts merged at runtime
- **Article Detail Pages**: Full article content with related posts (`?slug=` or `?id=`)
- **Products Page**: Curated product recommendations
- **About / Contact**: Company info and contact form
- **Responsive Design**: Mobile-friendly layout

## Platform publishing (zjads)

### Environment variables

In the Vercel project Environment Variables:

- `PUBLISH_TOKEN` — required on `POST` / `DELETE`. Header: `Authorization: Bearer <PUBLISH_TOKEN>`

Also connect a **Private** Blob store to the project (Vercel injects `BLOB_READ_WRITE_TOKEN` / `BLOB_STORE_ID`). Use a Private store so overwrites are readable immediately.

### zjads endpoint

```
POST https://www.echoesofmind.com/api/posts
Content-Type: application/json
Authorization: Bearer <PUBLISH_TOKEN>
```

Request fields: `title`, `excerpt`, `category`, `image`, `images`, `bodyHtml`, `merchantName`, `merchantUrl`, `mid`, `trackUrl`, `author`.  
`title` and `bodyHtml` are required.

**Multiple images (3–5):** send them in `images` (or `gallery`) as an array of `https://` URLs, and/or embed `<img>` tags inside `bodyHtml`.  
- Cover / card uses `image`, else the first entry in `images`, else the first `<img>` in the body.  
- Detail page keeps every `<img>` already in `bodyHtml` in place.  
- Extra URLs in `images` that are not in the body are **woven between paragraphs** (spaced through the article), not stacked in one gallery at the end. The header cover is not repeated in the body.

Success `200`:

```json
{
  "slug": "generated-kebab-slug",
  "url": "https://www.echoesofmind.com/article?slug=generated-kebab-slug"
}
```

Public reads (no token):

- `GET /api/posts` — list of API-published posts
- `GET /api/posts/<slug>` — `{ "bodyHtml": "...", "image": "...", "images": ["...", "..."] }`
- `DELETE /api/posts/<slug>` — remove one API post (requires token)

If your live domain is not `www.echoesofmind.com`, update `SITE_ORIGIN` in `lib/post-record.js` so returned `url` values match production.

### Category values

Prefer Echoesofmind filter keys: `technology`, `lifestyle`, `product-reviews`, `platform-reviews`, `health`. Common aliases (e.g. `Product Review`) are normalized automatically.

## File Structure

```
echoesofmind/
├── index.html
├── blog.html
├── article.html
├── products.html
├── about.html
├── contact.html
├── api/posts/          # Vercel publish API
├── lib/                # Auth, validation, Blob store
├── css/style.css
├── js/
│   ├── data.js         # Static articles/products + merge helpers
│   ├── main.js
│   ├── blog.js
│   ├── article.js
│   ├── products.js
│   └── contact.js
├── images/
├── package.json
├── vercel.json
└── README.md
```

## Setup

1. `npm install`
2. Deploy to Vercel, set `PUBLISH_TOKEN`, connect a **Private** Blob store
3. Point zjads at `POST https://<your-domain>/api/posts`

Local static browsing still works by opening `index.html`; the publish API needs Vercel.

### Adding static articles by hand

Edit `js/data.js` and add objects to the `articles` array (include a unique `slug`):

```javascript
{
    id: 11,
    slug: "your-article-slug",
    title: "Your Article Title",
    category: "technology",
    date: "2026-04-10",
    image: "https://example.com/image.jpg",
    excerpt: "Brief description...",
    content: `<h2>Full HTML content...</h2>`
}
```

## Technologies Used

- HTML5 / CSS3 / Vanilla JavaScript
- Vercel Serverless Functions + Vercel Blob
- Font Awesome / Unsplash placeholders

## License

This project is open source and available for personal and commercial use.

---

**Echoesofmind** - Discover, Explore, Connect
