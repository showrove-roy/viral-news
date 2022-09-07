
//1 Load Categories 
const loadCategories = () => {
    const categoriesUrl = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(categoriesUrl)
        .then(res => res.json())
        .then(data => showCategories(data.data.news_category))
        .catch(error => console.log(error));
};

//2 show categories data
const showCategories = categories => {
    const categorieS = document.getElementById('categories');
    categories.forEach(category => {
        const list = document.createElement('li');
        list.classList.add('mutade-text');
        list.innerHTML = `
        ${category.category_name}
        `;
        categorieS.appendChild(list);
        console.log(category.category_name);
    });
    // console.log(categories);
};









// Call categories function
loadCategories();