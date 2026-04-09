# Echoesofmind Blog Website

A comprehensive blog website featuring articles, product reviews, platform comparisons, and more.

## Features

- **Landing Page**: Eye-catching hero section with background image
- **Blog Section**: 
  - Multiple categories (Technology, Lifestyle, Product Reviews, Platform Reviews, Health & Wellness)
  - Search functionality
  - Category filtering
  - Pagination
  - Articles sorted by date (newest first)
  - 10 articles with realistic content (dated from February 2025 to April 2026)
  
- **Article Detail Pages**: Full article content with related posts
- **Products Page**: Curated product recommendations with images and descriptions
- **About Page**: Company information and values
- **Contact Page**: Contact form with social media links
- **Responsive Design**: Mobile-friendly layout
- **Smooth Animations**: Fade-in effects and transitions
- **Back to Top Button**: Easy navigation
- **Social Media Integration**: Clickable social media icons in footer

## File Structure

```
echoesofmind/
├── index.html          # Landing page
├── blog.html           # Blog listing page
├── article.html        # Article detail page
├── products.html       # Products page
├── about.html          # About page
├── contact.html        # Contact page
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   ├── data.js         # Articles and products data
│   ├── main.js         # Homepage functionality
│   ├── blog.js         # Blog page functionality
│   ├── article.js      # Article detail functionality
│   ├── products.js     # Products page functionality
│   └── contact.js      # Contact form functionality
├── images/
│   ├── logo.png        # Site logo (placeholder - replace with actual logo)
│   └── about.jpg       # About page image (placeholder)
└── README.md           # This file
```

## Setup Instructions

1. **Replace Logo**: 
   - Create or obtain a logo for "Echoesofmind"
   - Replace `images/logo.png` with your logo (recommended size: 200x200px PNG)

2. **Replace About Image**:
   - Add an appropriate image to `images/about.jpg`

3. **Open the Website**:
   - Simply open `index.html` in a web browser
   - No server setup required for basic functionality

## Customization

### Adding New Articles

Edit `js/data.js` and add new article objects to the `articles` array:

```javascript
{
    id: 11,
    title: "Your Article Title",
    category: "technology", // or lifestyle, product-reviews, platform-reviews, health
    date: "2026-04-10",
    image: "https://example.com/image.jpg",
    excerpt: "Brief description...",
    content: `<h2>Full HTML content...</h2>`
}
```

### Adding New Products

Edit `js/data.js` and add new product objects to the `products` array:

```javascript
{
    id: 7,
    name: "Product Name",
    category: "Category",
    price: "$99",
    rating: 4.5,
    image: "https://example.com/product.jpg",
    description: "Product description..."
}
```

### Changing Colors

Edit `css/style.css` and modify the CSS variables in the `:root` selector:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    /* ... */
}
```

### Updating Social Media Links

Edit the footer section in each HTML file and update the `href` attributes:

```html
<a href="https://facebook.com/yourpage" target="_blank">
    <i class="fab fa-facebook"></i>
</a>
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript**: Vanilla JS for interactivity
- **Font Awesome**: Icons
- **Unsplash**: Placeholder images (replace with your own)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Notes

- All article images are currently using Unsplash URLs
- The contact form is a demo (no backend integration)
- Social media links point to homepage of each platform (update with your actual profiles)
- Logo is a placeholder - replace with your actual logo

## Future Enhancements

- Backend integration for contact form
- Comment system for articles
- Newsletter subscription
- Dark mode toggle
- More advanced search with filters
- User accounts and favorites

## License

This project is open source and available for personal and commercial use.

---

**Echoesofmind** - Discover, Explore, Connect
