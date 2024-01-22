let menu = document.querySelector('.menu')
let modal = document.querySelector('.modal')
let close = document.querySelector('.close')
let nav = document.querySelector('nav')
let navLinks = document.querySelectorAll('nav a');
let navLogo = document.getElementById('nav-logo');

menu.addEventListener('click', () => {

    modal.style.display = 'block';
})
close.addEventListener('click', () => {
    modal.style.display = 'none';
})
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        nav.style.position = 'fixed';
        nav.style.backgroundColor = 'black';
    } else {
        nav.style.position = 'absolute';
        nav.style.backgroundColor = 'transparent';
    }

})
let carouselBox = document.querySelector('.carousel-box')
let carouselBox2 = document.querySelector('.carousel-box-2')
let search = document.getElementById("search")
let sort = document.getElementById("sort")
let copyArr = []
let filteredArr = []
function getDataJson() {
    fetch(`http://localhost:3000/services`)
        .then(response => response.json())
        .then(data => {
            copyArr = data;
            carouselBox.innerHTML = ""
            filteredArr = filteredArr.length || search.value ? filteredArr : data;
            filteredArr.forEach(element => {
                carouselBox.innerHTML += `
            <div class="card">
            <div class="carousel-image"><img src="${element.image}" alt=""></div>
            <div class="carousel-text">
            <h5>${element.price}</h5>
            <h4>${element.title}</h4>
            <p>${element.description}</p>
            </div>   <div class="carousel-button">
            <button><a href="details.html?id=${element.id}">Details</a></button>
            </div> 

            </div>
            `
                carouselBox2.innerHTML += `
            <div class="card">
            <div class="carousel-image"><img src="${element.image}" alt=""></div>
            <div class="carousel-text">
            <h5>${element.price}</h5>
            <h4>${element.title}</h4>
            <p>${element.description}</p>
            </div> 
            <div class="carousel-button">
            <button><a href="details.html?id=${element.id}">Details</a></button>
            </div> 
            </div>
            `
            });

        })
}
getDataJson()
search.addEventListener("input", (e) => {
    filteredArr = copyArr
    filteredArr = filteredArr.filter((el) => {
        return el.title.toLowerCase().includes(e.target.value.toLowerCase());
    })
    getDataJson()
})
sort.addEventListener('change', (e) => {
    if (e.target.value === "des") {
        filteredArr.sort((a, b) => b.price - a.price)
    } else if (e.target.value === "asc") {
        filteredArr.sort((a, b)=> a.price - b.price)
    }
    else(
        filteredArr=[]
    )
    getDataJson()

})