function displayHomePosts() {
    const postsContainer = document.getElementById('home-posts');
    if (!postsContainer) return;

    const sortedArticles = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestPosts = sortedArticles.slice(0, 6);
    postsContainer.innerHTML = latestPosts.map((article) => createPostCard(article)).join('');
}

function createPostCard(article) {
    const image = article.image
        ? `<div class="post-card-media"><img src="${article.image}" alt="${article.title}" loading="lazy"></div>`
        : '';
    return `
        <article class="post-card" onclick="window.location.href='${articleHref(article)}'">
            ${image}
            <div class="post-card-content">
                <span class="post-category">${formatCategory(article.category)}</span>
                <h3>${article.title}</h3>
                <div class="post-meta">
                    <span><i class="far fa-calendar"></i> ${formatDate(article.date)}</span>
                </div>
                <p class="post-excerpt">${article.excerpt}</p>
            </div>
        </article>
    `;
}

function formatCategory(category) {
    return String(category || '').split('-').map((word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

document.addEventListener('DOMContentLoaded', async () => {
    if (document.getElementById('home-posts')) {
        await loadPublishedPosts();
        displayHomePosts();
    }
});
