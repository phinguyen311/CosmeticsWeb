//mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoieXV5b3BlaTAyIiwiYSI6ImNrd201amxtZTA2ajcybmw2dzZiOTJuODMifQ.rS4KYciM5pIZ96g6lDpf_Q';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.060982, 42.35725],
    zoom: 18,
});
//adding to cart
let carts = document.querySelectorAll('.add-cart');
console.log(carts.length)

let products = [
    {
        name:'HADA LABO',
        tag:'sanpham1',
        price: 95000,
        inCart: 0
    },
    {
        name:'ROSETTE',
        tag:'sanpham2',
        price: 170000,
        inCart: 0
    },
    {
        name:'LA ROCHE POSAY',
        tag:'sanpham3',
        price: 280000,
        inCart: 0
    },
    {
        name:'CETAPHIL',
        tag:'sanpham4',
        price: 364000,
        inCart: 0
    },
    {
        name:'PAULAS CHOICE',
        tag:'sanpham5',
        price: 683000,
        inCart: 0
    },
    {
        name:'INSTREE',
        tag:'sanpham6',
        price: 320000,
        inCart: 0,
    },
    {
        name:'OXY',
        tag:'sanpham7',
        price: 58000,
        inCart: 0
    },
    {
        name:'SKIN1004',
        tag:'sanpham8',
        price: 397000,
        inCart: 0
    },
    {
        name:'BIORE',
        tag:'sanpham9',
        price: 182000,
        inCart: 0
    },
    {
        name:'ROVECTIN',
        tag:'sanpham10',
        price: 315000,
        inCart: 0
    },
    {
        name:'GGG',
        tag:'sanpham11',
        price: 493000,
        inCart: 0
    },
    {
        name:'COSRX',
        tag:'sanpham12',
        price: 289000,
        inCart: 0
    },

]

for(let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

//update number of products in cart
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
//knowing how many item customer adding to the cart
function cartNumbers(products){
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } 
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    
    setItems(products);
}
function setItems(products) {
    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[products.tag] == undefined){
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1;
    }
    else {
        products.inCart = 1;
        cartItems = {
            [products.tag]: products
        }
    }
    products.inCart = 1;
    localStorage.setItem("productsIncart",JSON.stringify(cartItems));
}

function totalCost(products) {
    //console.log("the product price is",products.price);
    let cartCost = localStorage.getItem('totalCost');
    // console.log("my cartCost is", cartCost);
    // console.log(typeof cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + products.price);
    }
    else {
        localStorage.setItem("totalCost", products.price);
    }
}
function displayCart() {
    let cartCost = localStorage.getItem('totalCost');
    let cartItems = localStorage.getItem("productsIncart");
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector(".products");

    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class = "container" style = "border-bottom: 1px solid pink">
                <div class = "products-title">
                    <button class = "delete-item">XÓA</button>
                    <img class = "w-25" src = "product_img/${item.tag}.jpg">
                    <span>${item.name}</span>
                </div>
                <div class = "price">${item.price/1000}.000</div>
                <div class = "quantity">
                    <center>
                        <a href=""><i class ="bi bi-file-minus-fill"></i></a>
                        ${item.inCart}
                        <a href=""><i class ="bi bi-file-plus-fill"></i></a>
                    </center>
                </div>
                <div class = "total">
                    ${item.inCart * item.price/1000}.000đ
                </div>
            </<div>
            `
        });
        productContainer.innerHTML += `
            <div class = "basketTotalContainer">
                <h5 class = "basketTotalTitle">Tổng cộng:</h5>
                <h5 class = "basketTotal">${cartCost/1000}.000đ</h5>
            </div>
        `
    }
}

onLoadCartNumbers();
displayCart();

var remove_cart = document.getElementsByClassName("delete-item")
console.log(remove_cart.length)
for (var i = 0; i < remove_cart.length; i++) {
  var button = remove_cart[i]
  button.addEventListener("click", function () {
    var button_remove = event.target
    button_remove.parentElement.parentElement.remove()
  })
}
function cartRemoveItem() {

}