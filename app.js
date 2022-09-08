
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
    // loading start 
    toggleSpinner(true);
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
        postItem.setAttribute('onclick', `loadPostDetails('${post._id}')`);
        postItem.setAttribute('data-bs-toggle', 'modal');
        postItem.setAttribute('data-bs-target', '#newsPopUP');
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


    // 6 Post count and set
    const newsCount = postList.length;
    const setNewsNum = document.getElementById('news-count');
    setNewsNum.innerHTML = '';
    if (newsCount == 0) {
        setNewsNum.innerHTML = `
        ${newsCount} News in this Category
        `;
        const postContainer = document.getElementById('post-container');
        postContainer.innerHTML = '';
        postContainer.innerHTML = `
        <h1 class="text-center text-warning"> No news found in this Category!</h1>
        `;
    } else {
        setNewsNum.innerHTML = `
        ${newsCount} News in this Category
        `;
    };

    // Loading Stop
    toggleSpinner(false);
};

// 7 load news Details 
const loadPostDetails = news_id => {
    const newsURL = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(newsURL)
        .then(res => res.json())
        .then(data => showNewsDetails(data.data[0]))
        .catch(err => console.log(err));

};

// 8 show news details om modal 
const showNewsDetails = newsDetailsList => {
    const newsPopUPContainer = document.getElementById('newsPopUP-container');
    newsPopUPContainer.innerHTML = '';
    newsPopUPContainer.innerHTML = `
    <!-- Modal -->
    <div class="modal fade" id="newsPopUP" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${newsDetailsList.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="card mb-3">
                        <img src="${newsDetailsList.image_url}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <p class="card-text">${newsDetailsList.details}</p>
                        </div>
                    </div>
                </div>


                <div class="modal-footer justify-content-between">


                <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center gap-2">
                    <div>
                        <img class="rounded-circle" src="${newsDetailsList.author.img}" alt="" width="50" height="50">
                    </div>
                    <div>
                        <p class="p-0 m-0">${newsDetailsList.author.name}</p>
                        <span class="text-muted">${newsDetailsList.author.published_date}</span>
                    </div>
                </div>
                <div class="mx-3">
                    <i class="fa-solid fa-eye"></i>
                    <strong> ${newsDetailsList.total_view}K</strong>
                </div>
                <div class="rating-star fw-bold mx-3">
                ${newsDetailsList.rating.number}
                <i role="button" class="fa-solid fa-star"></i>
                </div>
            </div>

                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `;
    console.log(newsDetailsList);
};


//Loading Function 
const toggleSpinner = isLoading => {
    const loderSpinner = document.getElementById('spinner');
    if (isLoading) {
        loderSpinner.classList.remove('d-none');
    } else {
        loderSpinner.classList.add('d-none');
    };
};




// Call categories function
loadCategories();

//call default post function
defaultPost();

