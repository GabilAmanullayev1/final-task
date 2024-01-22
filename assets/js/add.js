let table = document.querySelector("#table");
let form = document.querySelector('form');
let image = document.querySelector("#img");
let fileInput = document.querySelector("#file");
let price = document.querySelector("#price");
let title = document.querySelector("#title");
let description = document.querySelector("#description");

fileInput.addEventListener("input", (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (title.value.trim() && description.value.trim()) {
        let reader = new FileReader();
        let selectedFile = fileInput.files[0];
        
        reader.onload = (e) => {
            let obj = {
                image: reader.result,
                title: title.value,
                price: price.value,
                description: description.value
            };
            
            axios.post("http://localhost:3000/services", obj)
                .then(res => {
                    window.location = "./index.html";
                });
        };

        reader.readAsDataURL(selectedFile);
    } else{
        alert("xanalrari doldurun")
    }
});

fetch("http://localhost:3000/services")
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            table.innerHTML += `
            <tr>
            <td>${element.id}</td>
            <td><img src="${element.image}" alt=""></td>
            <td>${element.title}</td>
            <td>${element.description}</td>
            <td>${element.price}</td>
            <td><button onclick="deletes(${element.id})">Delete</button></td>
            </tr>
        
        `
        });


    })
function deletes(id) {
    axios.delete(`http://localhost:3000/services/${id}`)
    window.location.reload()
}