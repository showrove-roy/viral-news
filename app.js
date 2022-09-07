
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
        list.setAttribute("type", "button");
        list.setAttribute('id', `${category.category_id}`);
        list.innerHTML = `
        ${category.category_name}
        `;
        categorieS.appendChild(list);
    });
};

// 3 Get category id 
document.getElementById('categories').addEventListener('click', function (event) {
    const category_id = event.target.id;
    event.stopPropagation();
    if (isNaN(category_id)) {
        return;
    } else {
        const categoryUrl = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
        console.log(categoryUrl);
    }
});







// Call categories function
loadCategories();