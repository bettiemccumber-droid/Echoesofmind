let currentPage = 1;
const postsPerPage = 6;
let filteredArticles = [];

// Initialize blog page
document.addEventListener('DOMContentLoaded', async () => {
    await loadPublishedPosts();
    filteredArticles = [...articles];
    displayPosts();
    setupEventListeners();
});

function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');

    searchInput.addEventListener('input', (e) => {
        filterPosts(e.target.value, categoryFilter.value);
    });

    categoryFilter.addEventListener('change', (e) => {
        filterPosts(searchInput.value, e.target.value);
    });
}

function filterPosts(searchTerm, category) {
    filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'all' || article.category === category;
        return matchesSearch && matchesCategory;
    });

    currentPage = 1;
    displayPosts();
}

function displayPosts() {
    const postsContainer = document.getElementById('blog-posts');
    
    // Sort by date (newest first)
    const sortedArticles = [...filteredArticles].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );

    // Calculate pagination
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = sortedArticles.slice(startIndex, endIndex);

    // Display posts
    if (paginatedPosts.length === 0) {
        postsContainer.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 2rem;">No articles found.</p>';
    } else {
        postsContainer.innerHTML = paginatedPosts.map(article => createPostCard(article)).join('');
    }

    // Update pagination
    displayPagination(sortedArticles.length);
}

function createPostCard(article) {
    return `
        <div class="post-card" onclick="window.location.href='${articleHref(article)}'">
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

function displayPagination(totalPosts) {
    const paginationContainer = document.getElementById('pagination');
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let paginationHTML = `
        <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button onclick="changePage(${i})" class="${i === currentPage ? 'active' : ''}">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += '<span>...</span>';
        }
    }

    paginationHTML += `
        <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredArticles.length / postsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayPosts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
