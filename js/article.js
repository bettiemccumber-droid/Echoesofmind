// Get article ID from URL
const urlParams = new URLSearchParams(window.location.search);
const articleId = parseInt(urlParams.get('id'));

// Display article
document.addEventListener('DOMContentLoaded', () => {
    displayArticle();
    displayRelatedPosts();
});

function displayArticle() {
    const article = articles.find(a => a.id === articleId);
    
    if (!article) {
        document.getElementById('article-header').innerHTML = '<h1>Article not found</h1>';
        return;
    }

    const headerHTML = `
        <span class="post-category">${formatCategory(article.category)}</span>
        <h1>${article.title}</h1>
        <div class="post-meta">
            <span><i class="far fa-calendar"></i> ${formatDate(article.date)}</span>
        </div>
        <img src="${article.image}" alt="${article.title}">
    `;

    document.getElementById('article-header').innerHTML = headerHTML;
    document.getElementById('article-content').innerHTML = article.content;
    document.title = `${article.title} - Echoesofmind`;
}

function displayRelatedPosts() {
    const article = articles.find(a => a.id === articleId);
    if (!article) return;

    // Get related posts from same category
    const relatedPosts = articles
        .filter(a => a.id !== articleId && a.category === article.category)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    // If not enough posts in same category, add from other categories
    if (relatedPosts.length < 3) {
        const additionalPosts = articles
            .filter(a => a.id !== articleId && a.category !== article.category)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3 - relatedPosts.length);
        relatedPosts.push(...additionalPosts);
    }

    const relatedPostsHTML = relatedPosts.map(post => createPostCard(post)).join('');
    document.getElementById('related-posts').innerHTML = relatedPostsHTML;
}

function createPostCard(article) {
    return `
        <div class="post-card" onclick="window.location.href='article.html?id=${article.id}'">
            <img src="${article.image}" alt="${article.title}">
            <div class="post-card-content">
                <span class="post-category">${formatCategory(article.category)}</span>
                <h3>${article.title}</h3>
                <div class="post-meta">
                    <span><i class="far fa-calendar"></i> ${formatDate(article.date)}</span>
                </div>
                <p class="post-excerpt">${article.excerpt}</p>
            </div>
        </div>
    `;
}

function formatCategory(category) {
    return category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Back to Top
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
