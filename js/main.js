const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

const loadCategory = () => {
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then((res) => res.json())
    .then((data) => displayCategory(data))
    .catch((error) => console.log(error));
};
const displayCategory = (categories) => {
  const newsCategories = categories.data.news_category;
  const categorySection = document.getElementById("category-list");
  newsCategories.forEach((category) => {
    const navitem = document.createElement("li");
    navitem.classList.add("nav-item", "category-item");
    navitem.id = category.category_id;
    navitem.setAttribute("data-category", category.category_name);
    navitem.innerHTML = `
            <a class="nav-link nav-list fw-bold" href="#">${category.category_name}</a>
        `;
    categorySection.appendChild(navitem);
    });
    filterCategory();
};
loadCategory();

const filterCategory = () => {
    const allCategories = document.querySelectorAll(".category-item");
    allCategories.forEach((category) => {
    category.addEventListener("click", () => {
        loadNews(category.id, category.dataset.category);
        });
    });
  // toggleSpinner(true)
};

const loadNews = (category_Id, categoryName, isHome) => {
    toggleSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_Id}`)
        .then((res) => res.json())
        .then((data) => displayNews(data.data, categoryName, isHome))
        .catch((error) => console.log(error));
};
const displayNews = (allNews, categoryName, isHome) => {
    const counterDiv = document.getElementById("news-counter");
    const count = allNews.length;
    counterDiv.innerHTML = `${count} items found for category ${categoryName}`;
    const newsDiv = document.getElementById("news-section");
    newsDiv.innerHTML = "";
    if (isHome === true) {
    allNews.sort(function (a, b) {
        return b.total_view - a.total_view;
    });
  }
  allNews.forEach((news) => {
    const newsCard = document.createElement("div");
    newsCard.classList.add("card", "mb-3", "w-100", "news-card");
    newsCard.setAttribute("data-bs-toggle", "modal");
    newsCard.setAttribute("data-bs-target", "#newsModal");
    newsCard.id = news._id;
    newsCard.innerHTML = `
                    <div class="row g-0 p-lg-3">
                        <div class="col-lg-3">
                            <img src="${
                              news.thumbnail_url
                            }" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-lg-8">
                            <div class="card-body">
                                <h5 class="card-title">${news.title}</h5>
                                <p class="card-text">${
                                  news.details.replace(
                                    /^(.{337}[^\s]*).*/,
                                    "$1"
                                  ) + "..."
                                }</p>
                                <div class = "d-flex justify-content-lg-between gap-lg-5">
                                    <div class = "d-flex gap-2">
                                        <img src="${
                                          news.author.img
                                        }" style = "width: 40px;height: 40px;border-radius: 155px;margin-top:5px;">
                                        <div>
                                        <h6 class="mb-lg-0">${
                                          news.author.name
                                            ? news.author.name
                                            : "--"
                                        }</h6>
                                        <p class="mb-lg-0">${
                                          news.author.published_date
                                            ? news.author.published_date
                                            : "--"
                                        }</p>
                                        </div>
                                    </div>   
                                    <div class = "d-flex gap-lg-2 ms-lg-5 mt-lg-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"><path fill="#231f20" d="M62 32S51.9 52 32 52S2 32 2 32s10.1-20 30-20s30 20 30 20"/><path fill="#fff" d="M57 32s-8.4 16.7-25 16.7S7 32 7 32s8.4-16.7 25-16.7S57 32 57 32z"/><path fill="#42ade2" d="M45.4 32c0 7.5-6 13.5-13.5 13.5s-13.5-6-13.5-13.5s6-13.5 13.5-13.5s13.5 6 13.5 13.5"/><path fill="#231f20" d="M39.4 32c0 4.1-3.4 7.5-7.5 7.5s-7.5-3.4-7.5-7.5s3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5"/></svg>
                                        <h5 class="mt-1">${
                                          news.total_view
                                            ? news.total_view
                                            : "No views"
                                        }</h5>
                                    </div>
                                    <div class="ms-lg-5 mt-lg-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M5.354 5.119L7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327l4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356l.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403a.58.58 0 0 1 .085-.302a.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894l-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77l-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223L8 2.226v9.8z"/></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 2l4 10h10l-8 7l3 11l-9-7l-9 7l3-11l-8-7h10Z"/></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 2l4 10h10l-8 7l3 11l-9-7l-9 7l3-11l-8-7h10Z"/></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 2l4 10h10l-8 7l3 11l-9-7l-9 7l3-11l-8-7h10Z"/></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 2l4 10h10l-8 7l3 11l-9-7l-9 7l3-11l-8-7h10Z"/></svg>
                                    </div>
                                    <div class="ms-lg-5 mt-lg-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="#5d5fef" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16m-7-7l7 7l-7 7"/></svg>
                                    </div>
                                </div>
                            </div>
                        </div>      
        `;
    newsDiv.appendChild(newsCard);
  });
    const newsModal = document.getElementById('newsModal')
    const newsCards = document.querySelectorAll('.news-card')
    const newsImg = document.getElementById("news-img");
    const newsTrending = document.getElementById("news-trending");
    const authorDp = document.getElementById("author-dp");
    const authorName = document.getElementById("author-name");
    const newsContent = document.getElementById("news-content");
    const newsTitle = document.getElementById("news-title");
    
    newsCards.forEach(card => {
        card.addEventListener('click', () => {
            fetch(`https://openapi.programming-hero.com/api/news/${card.id}`)
                .then(res => res.json())
                .then(data => {
                    newsImg.setAttribute("src", data.data[0].image_url);
                    newsTrending.innerHTML = data.data[0].others_info.is_trending = true ? 'Trending' : 'Not Trending'
                    authorDp.setAttribute("src", data.data[0].author.img);
                    authorName.innerHTML = data.data[0].author.name
                      ? data.data[0].author.name
                        : "No name found";
                    newsContent.innerHTML = data.data[0].details
                      ? data.data[0].details
                        : "No news found";
                    newsTitle.innerHTML = data.data[0].title
                      ? data.data[0].title
                      : "No title found";
                })
            .catch(error => console.log(error))
        })
    })
  toggleSpinner(false);
};
const navHome = () => {
  const liHome = document.getElementById("link-home");
  loadNews("08", "Home", true);
};
navHome();
