const loadCategory = () => {
    const api = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(api)
        .then(res => {
            res = JSON.stringify(res);
            return res.json()
        })
        .then(data => displayCategory(data))
}
const displayCategory = categories => {
    const categorySection = document.getElementById('category');
    for (const category of categories) {
        console.log(category);
    }
}
loadCategory();