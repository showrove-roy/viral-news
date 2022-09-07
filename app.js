
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
    const element = event.target;
    let categoriItems = document.getElementsByClassName('mutade-text');
    for (let item of categoriItems) {
        item.classList.remove('active-category');
    };
    element.classList.add('active-category');
    event.stopPropagation();

    if (isNaN(category_id)) {
        return;
    } else {
        const categoryUrl = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
        fetch(categoryUrl)
            .then(res => res.json())
            .then(data => showPost(data.data))
            .catch(err => console.log(err));
    };
});

// 4 Default Post
const defaultPost = () => {
    const categoryUrL = `https://openapi.programming-hero.com/api/news/category/01`;
    fetch(categoryUrL)
        .then(res => res.json())
        .then(data => showPost(data.data))
        .catch(err => console.log(err));
};

// 5 Show post on site
const showPost = postList => {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = '';
    postList.forEach(post => {
        const postItem = document.createElement('div');
        postItem.classList.add('col');
        postItem.innerHTML = `
        <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-3">
                <img src="${post.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-9">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.details.slice(0, 700)}...</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <div class="d-flex align-items-center gap-2">
                            <div>
                                <img class="rounded-circle" src="${post.author.img}" alt="" width="50" height="50">
                            </div>
                            <div>
                                <p class="p-0 m-0">${post.author.name}</p>
                                <span class="text-muted">${post.author.published_date}</span>
                            </div>
                        </div>
                        <div>
                            <i class="fa-solid fa-eye"></i>
                            <strong> ${post.total_view}K</strong>
                        </div>
                        <div class="rating-star fw-bold">
                        ${post.rating.number}
                        <i role="button" class="fa-solid fa-star"></i>
                        </div>
                        <div>
                            <i role="button" class="fa-solid fa-arrow-right navbar-brand"></i>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
        `;
        postContainer.appendChild(postItem);
    });


    //Post count and set
    const newsCount = postList.length;
    const setNewsNum = document.getElementById('news-count');
    setNewsNum.innerHTML = '';
    setNewsNum.innerHTML = `
    ${newsCount} News in this Category
    `;
};








// Call categories function
loadCategories();

//call default post function
defaultPost();

