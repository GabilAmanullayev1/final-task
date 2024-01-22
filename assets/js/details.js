let body = document.querySelector('body')
let id = new URLSearchParams(window.location.search).get('id')
fetch(`http://localhost:3000/services/${id}`)
    .then(Response => Response.json())
    .then(data => {
        body.innerHTML = `
    <img src="${data.image}">
    <h2>${data.price}</h2>
    <p>${data.title}</p>
    `
    })