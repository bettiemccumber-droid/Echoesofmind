const urlParams = new URLSearchParams(window.location.search);
const articleSlug = (urlParams.get('slug') || '').trim();
const articleId = parseInt(urlParams.get('id'), 10);

document.addEventListener('DOMContentLoaded', async () => {
    await loadPublishedPosts();
    await displayArticle();
    displayRelatedPosts();
});

async function displayArticle() {
    let article = findArticle(articleSlug || null, Number.isNaN(articleId) ? null : articleId);

    if (!article && articleSlug) {
        article = {
            id: 0,
            slug: articleSlug,
            title: articleSlug,
            category: 'technology',
            date: '',
            image: '',
            excerpt: '',
            content: ''
        };
        articles.push(article);
    }

    if (!article) {
        document.getElementById('article-header').innerHTML = '<h1>Article not found</h1>';
        return;
    }

    if (!article.content && article.slug) {
        try {
            const remote = await loadPublishedArticle(article.slug);
            if (remote) {
                if (remote.bodyHtml) article.content = remote.bodyHtml;
                if (remote.image && !article.image) article.image = remote.image;
                if (remote.images.length) article.images = remote.images;
            }
        } catch (error) {
            console.error('Published article body unavailable.', error);
        }
    }

    if (article.images && article.images.length) {
        article.content = weaveImagesIntoContent(article.content || '', article.images, article.title, {
            coverUrl: article.image || ''
        });
    }

    if (!article.content) {
        document.getElementById('article-header').innerHTML = '<h1>Article not found</h1>';
        document.getElementById('article-content').innerHTML = '';
        return;
    }

    const headerHTML = `
        <span class="post-category">${formatCategory(article.category)}</span>
        <h1>${article.title}</h1>
        <div class="post-meta">
            <span><i class="far fa-calendar"></i> ${formatDate(article.date)}</span>
        </div>
        ${article.image ? `<img src="${article.image}" alt="${article.title}">` : ''}
    `;

    document.getElementById('article-header').innerHTML = headerHTML;
    document.getElementById('article-content').innerHTML = article.content;
    document.title = `${article.title} - Echoesofmind`;
}

function displayRelatedPosts() {
    const article = findArticle(articleSlug || null, Number.isNaN(articleId) ? null : articleId);
    if (!article) return;

    const currentKey = article.slug || article.id;
    const relatedPosts = articles
        .filter((a) => (a.slug || a.id) !== currentKey && a.category === article.category)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    if (relatedPosts.length < 3) {
        const additionalPosts = articles
            .filter((a) => (a.slug || a.id) !== currentKey && a.category !== article.category)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3 - relatedPosts.length);
        relatedPosts.push(...additionalPosts);
    }

    document.getElementById('related-posts').innerHTML = relatedPosts.map((post) => createPostCard(post)).join('');
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
