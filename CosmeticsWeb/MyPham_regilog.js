$(function() {

    $("#name_error_message").hide();
    $("#email_error_message").hide();
    $("#phonenumber_error_message").hide();
    $("#password_error_message").hide();
    $("#retype_password_error_message").hide();
    
    var error_name = false;
    var error_email = false;
    var error_phonenumber = false;
    var error_password = false;
    var error_retype_password = false;
    
    $("#form_name").focusout(function(){
        check_name();
    });
    $("#form_email").focusout(function() {
        check_email();
    });
    $("#form_phonenumber").focusout(function() {
        check_email();
    });
    $("#form_password").focusout(function() {
        check_password();
    });
    $("#form_retype_password").focusout(function() {
        check_retype_password();
    });
    
    function check_name() {
        var pattern = /^[a-zA-Z]*$/;
        var name = $("#form_name").val();
        if (pattern.test(name) && name !== '') {
            $("#name_error_message").hide();
            $("#form_name").css("border-bottom","2px solid #34F458");
        } else {
            $("#name_error_message").html("Họ tên chỉ nên có CHỮ");
            $("#name_error_message").show();
            $("#orm_fname").css("border-bottom","2px solid #F90A0A");
            error_name = true;
        }
    }
    
    function check_email() {
        var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var email = $("#form_email").val();
        if (pattern.test(email) && email !== '') {
            $("#email_error_message").hide();
            $("#form_email").css("border-bottom","2px solid #34F458");
        } else {
            $("#email_error_message").html("Email không tồn tại");
            $("#email_error_message").show();
            $("#form_email").css("border-bottom","2px solid #F90A0A");
            error_email = true;
        }
    }
    
    function check_phonenumber() {
        var pattern = /^[0-9]*$/;
        var phonenumber = $("#form_phonenumber").val();
        if (pattern.test(phonenumber) && phonenumber !== '') {
            $("#phonenumber_error_message").hide();
            $("#form_phonenumber").css("border-bottom","2px solid #34F458");
        } else {
            $("#phonenumber_error_message").html("Số điện thoại không tồn tại");
            $("#phonenumber_error_message").show();
            $("#form_phonenumber").css("border-bottom","2px solid #F90A0A");
            error_phonenumber = true;
        }
    }
    
    function check_password() {
        var password_length = $("#form_password").val().length;
        if (password_length < 8) {
            $("#password_error_message").html("Nên có ít nhất 8 chữ cái");
            $("#password_error_message").show();
            $("#form_password").css("border-bottom","2px solid #F90A0A");
            error_password = true;
        } else {
            $("#password_error_message").hide();
            $("#form_password").css("border-bottom","2px solid #34F458");
        }
    }
    
    function check_retype_password() {
        var password = $("#form_password").val();
        var retype_password = $("#form_retype_password").val();
        if (password !== retype_password) {
            $("#retype_password_error_message").html("Chưa khớp với mật khẩu đã nhập");
            $("#retype_password_error_message").show();
            $("#form_retype_password").css("border-bottom","2px solid #F90A0A");
            error_retype_password = true;
        } else {
            $("#retype_password_error_message").hide();
            $("#form_retype_password").css("border-bottom","2px solid #34F458");
        }
    }
    
    $("#registration_form").submit(function() {
        error_name = false;
        error_email = false;
        error_phonenumber = false;
        error_password = false;
        error_retype_password = false;
    
        check_name(); 
        check_email();
        check_phonenumber();
        check_password();
        check_retype_password();
    
        if (error_name === false && error_phonenumber === false && error_email === false && error_password === false && error_retype_password === false) {
            alert("Registration Successfull");
            return true;
        } else {
            alert("Please Fill the form Correctly");
            return false;
        }
    });
});
const productsDOM = document.querySelector(".product-center");
const cartDOM = document.querySelector(".cart");
const cartContent = document.querySelector(".cart-content");
const cartBtn = document.querySelector(".cart-icon");
const closeCart = document.querySelector(".close-cart");
const overlayCart = document.querySelector(".cart-overlay");
const cartTotal = document.querySelector(".cart-total");
const clearCartBtn = document.querySelector(".clear-cart");
const cartItems = document.querySelector(".cart-items");

let cart = [];

let buttonDOM = [];

class UI {
    displayProducts(obj) {
        let result ="";
        obj.forEach(({title,image,id,price}) => {
            result += `
            <div class="col-lg-3">
                <!-- item 1 -->
                <article class = "product">
                    <div class="card shadow">
                        <img class="card-img-top"
                            src="${image}"
                            alt="sp1">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${price/1000}.000đ</p>
                            <button class="btn btn-danger add-cart" data-id="${id}">Mua</button>
                            <a href="MyPham_item_${id}.html" class="btn btn-primary">Xem chi tiết</a>
                        </div>
                    </div>
                </article>
            </div>
            `
        });
        productsDOM.innerHTML = result;
    }
    getButtons() {
        const buttons = [...document.querySelectorAll('.add-cart')];
        buttonDOM = buttons;
        buttons.forEach(button => {
            const id = button.dataset.id;
            const inCart = cart.find(item => item.id === parseInt(id))
            if(inCart) {
                button.innerText = "Đã thêm";
                button.disabled = true; 
            }
            button.addEventListener('click', e => {
                e.preventDefault();
                e.target.innerText = "Đã thêm"
                e.target.disabled = true;
                //get product from products
                const cartItem = {...Storage.getProducts(id), amount:1};
                console.log(cartItem);
                //add product to cart 
                cart = [...cart,cartItem];
                //store the product in local storage
                Storage.saveCart(cart);
                //set item values
                this.setCartValues(cart)
                //display items in the cart
                this.addCartItem(cartItem)
                //show the cart
                this.showCart();
            });
        });
    }
    setCartValues(cart) {
        let tempTotal = 0;
        let itemTotal = 0;

        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemTotal += item.amount;
        });
        cartTotal.innerText = parseInt(tempTotal.toFixed(2));
        cartItems.innerText = itemTotal;
    }
    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
        <img src= ${item.image} alt="product">
        <div>
            <h4>${item.title}</h4>
            <h5>${item.price/1000}.000đ</h5>
            <span class="remove-item" data-id=${item.id}>Xóa khỏi giỏ hảng</span>
        </div>
        <div>
            <div class="i fas fa-chevron-up" data-id=${item.id}></div>
            <p class="item-amount">${item.amount}</p>
            <div class="i fas fa-chevron-down" data-id=${item.id}></div>
        </div>
        `
        cartContent.appendChild(div);
    }
    showCart() {
        overlayCart.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    }
    setupAPP() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click', this.showCart)
        closeCart.addEventListener('click', this.hideCart)
    }
    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }
    hideCart() {
        overlayCart.classList.remove('transparentBcg');
        cartDOM.classList.remove('showCart');
    }
    cartLogic() {
        //clear cart button
        clearCartBtn.addEventListener('click', () => {
            this.clearCart();
        });
        // cart functionally
        cartContent.addEventListener('click', e => {
            if(e.target.classList.contains('remove-item')) {
                let removeItem = e.target;
                let id = parseInt(removeItem.dataset.id);
                cartContent.removeChild(removeItem.parentElement.parentElement);
                this.removeItem(id);
            } else if (e.target.classList.contains("fa-chevron-up")) {
                let addAmount = e.target;
                let id = parseInt(addAmount.dataset.id);
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount ++;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;
            } else if(e.target.classList.contains("fa-chevron-down")) {
                let lowerAmount = e.target;
                let id = parseInt(lowerAmount.dataset.id);
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount --;
                if(tempItem.amount > 0) {
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    lowerAmount.previousElementSibling.innerText = tempItem.amount;
                } else {
                    cartContent.removeChild(lowerAmount.parentElement.parentElement);
                    this.removeItem(id);
                }

            }
            
        })
    }
    clearCart() {
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));
        console.log(cartContent.children)
        while(cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }
        this.hideCart();
    }
    removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        this.setCartValues(cart);
        Storage.saveCart(cart);

        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerText = "Mua";
    }
    getSingleButton(id) {
        return buttonDOM.find(button => parseInt(button.dataset.id) === id);
    }
}

class Storage {
    static saveProducts (obj) {
        localStorage.setItem('products',JSON.stringify(obj))
    }
    static saveCart(cart) {
        localStorage.setItem('carts',JSON.stringify(cart))
    }
    static getCart() {
        return localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')):[];
    }
    static getProducts(id){
        const products = JSON.parse(localStorage.getItem('products'))
        return products.find(item => item.id === parseInt(id))
    }
}

class Products{
    async getProducts() {
        try {
            const results = await fetch('products.json')
            const data = await results.json();
            const products = data.items;
            return products
        } catch (err) {
            console.log(err)
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const ui = new UI();
    const products = new Products();
    ui.setupAPP();

    const productsObj = await products.getProducts();
    Storage.saveProducts(productsObj);
    ui.getButtons();
    ui.cartLogic();
})
