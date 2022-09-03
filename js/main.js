const loadCategory = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayCategory(data))
        .catch(error => console.log(error))
}
const displayCategory = (categories) => {
    const newsCategories = categories.data.news_category;
    const categorySection = document.getElementById("category-list");
    newsCategories.forEach((category) => {
        const navitem = document.createElement('li')
        navitem.classList.add('nav-item')
        navitem.innerHTML = `
            <a class="nav-link nav-list" href="#">${category.category_name}</a>
        `;
        categorySection.appendChild(navitem);
    })
}
loadCategory()

const loadNews = () => {
    fetch("https://openapi.programming-hero.com/api/news/category/01")
    .then((res) => res.json())
    .then((data) => displayNews(data.data))
    .catch((error) => console.log(error))
}
const displayNews = (allNews) => {
    const newsDiv = document.getElementById("news-section");
    allNews.forEach((news) => {
        const newsCard = document.createElement('div')
        newsCard.classList.add('card','mb-3','w-100')
        
        newsCard.innerHTML = `
                    <div class="row g-0 p-lg-3">
                        <div class="col-lg-3">
                            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-lg-8">
                            <div class="card-body">
                                <h5 class="card-title">${news.title}</h5>
                                <p class="card-text">${news.details}</p>
                            </div>
                        </div>
                    </div>      
        `;
        newsDiv.appendChild(newsCard);
    })
}
loadNews()
