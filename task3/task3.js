let container = document.getElementById("container");
let btn = document.getElementById("btn");


let inputs = document.querySelectorAll("input");


inputs.forEach(input => {
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {  
            event.preventDefault();  
            btn.click();  
            
        }
    });
});


btn.addEventListener("click", function () {
    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let description = document.getElementById("description");
    let category=document.getElementById("category")
    let rating=document.getElementById("rating");
    let imageURL = document.getElementById("imageURL");
  
    if (title.value == "" || price.value == "" || description.value == ""||rating.value==""||category.value==""|| imageURL.value == "") {
        alert("Enter data properly");
    }

    if (rating.value > 5) {
        alert("Enter rating between 0 -5")
        
    } 
    else {
        let options = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                "title": title.value,
                "price": price.value,
                "description": description.value,
                "rating":rating.value,
                "category":category.value,
                "image": imageURL.value,
                
            
            })
        }
        fetch("https://kaput-midi-temperature.glitch.me/products", options)
            .then(res => {
                if (res.ok) {
                    title.value = '';
                    price.value = '';
                    description.value = '';
                    rating.value='';
                    category.value='';
                    imageURL.value='';
                    
                 
                    getData(); // mandatory
                    alert("Data Added");
                }
            })
    }
})

function getData() {
    fetch("https://kaput-midi-temperature.glitch.me/products")
        .then(res => res.json())
        .then(data => displayData(data));
}


function displayData(products) {
console.log(products)
    container.innerHTML = ``; // mandatory
    console.log(products)
    products.forEach(obj => {
        let item = document.createElement("div");
        item.className="item";
        item.innerHTML = `
            <img src="${obj.image}" class="image">
            <p class="title">${obj.title}</p>
            <p class="price">${obj.price}</p>
            <p class="description">${obj.description}</p>
                            
       
            <p class="category">${obj.category}<P>
            <button onclick = deleteData('${obj.id}')>Delete</button>
        `;
  
        
        container.appendChild(item);
    })
}

function deleteData(id) {
    console.log(id)
    let options = {
        "method": "DELETE"
    }
    fetch(`https://kaput-midi-temperature.glitch.me/products/${id}`, options)
        .then(res => {
            if (res.ok) {
                getData(); // mandatory
                alert("Data Deleted");
            }
        })
        .catch(err => console.error(err));
      
}
getData();