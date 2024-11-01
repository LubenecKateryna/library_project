/*MENU LINES */



/*HIDDEN MENU */
const hiddenMenu = document.getElementById("lefthiddemMenuBox");
const mainMenuBtn = document.getElementById("header-menu-btn");

mainMenuBtn.addEventListener("click", function toggleMenu() {
    if (hiddenMenu.style.width === "15%") {
        hiddenMenu.style.width = "0";
    } else {
        hiddenMenu.style.width = "15%";
    }
});

document.addEventListener("click", (event) => {
    const isClickInside = hiddenMenu.contains(event.target) || mainMenuBtn.contains(event.target);
    if (!isClickInside) {
        hiddenMenu.style.width = "0";
    }
});

/*HIDDEN ACCOUNT */
const accountIcons = document.querySelectorAll(".class_account");
const hiddenAccount = document.getElementById("hidden-account");
const saveBtn = document.getElementById("hidden-input-btn");

accountIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        hiddenAccount.style.display = "flex";
    });
});

saveBtn.addEventListener("click", () => {
    const name = document.getElementById("getnameInput").value.trim();
    const sureName = document.getElementById("getSureNameInput").value.trim();
    if (name&&sureName) {
        document.getElementById("accountText").textContent = "Вітаю, " + name + " " + sureName;
        document.getElementById("greetingText").textContent = "Привіт, " + name + " " + sureName + ",давай читати!";
    }else if(name) {
        document.getElementById("accountText").textContent = "Вітаю, " + name;
        document.getElementById("greetingText").textContent = "Привіт, " + name + ",давай читати!";
    } else {
        document.getElementById("accountText").textContent = "Увійти в акаунт";
        document.getElementById("greetingText").textContent = "Привіт, давай читати!";
    }
    hiddenAccount.style.display = "none";
});

/*PRODUCTS */
function getProductHtml(product) {
    const isAvailable = product.Vnayawnist && !product.NeVnayawnist;
    const isUnavailable = !product.Vnayawnist && product.NeVnayawnist;

    return `
        <div class="product-card">
            <div class="catalog-item-top">
                <img src="png/${product.img || 'placeholder.jpg'}" alt="${product.title}">
            </div>
            <div class="catalog-item-middle">
                <h3 class="item-card-title">${product.title}</h3>
                <span class="item-card-author">${product.author}</span>
            </div>
            <div class="catalog-item-extra">
                <span class="catalog_item_price_wrapper">
                    <span class="current_price_text">${product.price} ${product.text_ner_price || ''}</span>
                    ${product.discount ? `<span class="old_price_text"><s>${product.discount} ${product.text_ner_price_discount || ''}</s></span>` : ''}
                </span>
                <div class="nayavnist-box">
                    <img src="png/cargo-truck.png" alt="nayavnist-icon" class="card-nayavnist-img">
                    <span class="Vnayavnist-text">${product.Vnayawnist}</span>
                    <span class="NeVnayavnist-text">${product.NeVnayawnist}</span>
                </div>
                <div class="item-bottom-btns">
                    <div class="botton-btn-VNAyavnosyi" ${isUnavailable ? 'style="display: none;"' : ''}>
                        <span class="btn-to-basket">${product.btnToBasket}</span>
                        <span class="btn-to-buy">${product.btnBuy}</span>
                    </div>
                    <span id="btnWait" class="btn-wait" ${isAvailable ? 'style="display: none;"' : ''}>${product.btnWait}</span>
                </div>
            </div>
        </div>
    `;
}

async function getProducts() {
    const response = await fetch('main.json');
    const data = await response.json();

    return data;   
}

getProducts().then(products => {
    const sections = {
        "Дитяча Література": document.querySelector('.first-products-list'),
        "Художня Література": document.querySelector('.second-products-list'),
        "Класична проза": document.querySelector('.third-products-list'),
        "Детективи": document.querySelector('.fourth-products-list')
    };

    products.forEach(product => {
        const section = sections[product.section];
        if (section) {
            section.innerHTML += getProductHtml(product);
        }
    });

    document.querySelectorAll('.product-card').forEach(card => {
        const extraContent = card.querySelector('.catalog-item-extra');
        card.addEventListener('mouseenter', () => extraContent.style.display = "block");
        card.addEventListener('mouseleave', () => extraContent.style.display = "none");
    });
});

/*CARDS BTNS */
const btnTOwait = document.querySelectorAll(".btn-wait");

btnTOwait.forEach(btn => {
    btn.addEventListener("click", showWaitAllert);
});
function showWaitAllert() {
    alert("Ця книга скоро буде у наявності :) ");
}

/*HIDDEN BASCKET */
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.title === product.title);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();

    const cartIcon = document.getElementById('cart-icon');
    cartIcon.classList.add('pulse');
    setTimeout(() => cartIcon.classList.remove('pulse'), 300);
}

function showCartPopup() {
    const cartPopup = document.getElementById('cart-popup');
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${item.title}</span>
            <span>${item.quantity} x ${item.price} грн</span>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartPopup.classList.remove('hidden');
    cartPopup.classList.add('visible');
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById('cart-badge');
    badge.textContent = totalItems;
}

document.getElementById('checkout-button').addEventListener('click', () => {
    localStorage.removeItem('cart');
    updateCartBadge();

    const cartPopup = document.getElementById('cart-popup');
    cartPopup.classList.add('hidden');
    cartPopup.classList.remove('visible');

    alert("Все оплачено!");
});

const cartIcon = document.getElementById('cart-icon');
cartIcon.addEventListener('click', () => {
    showCartPopup();
});

const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click', () => {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.classList.add('hidden');
    cartPopup.classList.remove('visible');
});

document.addEventListener('DOMContentLoaded', updateCartBadge);





















/*GREETING_SCROLL*/
const hiddenElement = document.getElementById("first-junr-books");
const btn = document.querySelector(".greeting-content");

function handleButtonClick() {
  hiddenElement.scrollIntoView({ block: "center"});
}

btn.addEventListener("click", handleButtonClick);

/*SCROLL_TO_TOP */
const main_scroll_to_top = document.querySelector('.scroll_to_top_button')
window.addEventListener('scroll', function(){
    if(window.scrollY < 900){
        document.querySelector(".scroll_to_top_button").classList.remove("scroll_btn_visibility")
    }else{
        main_scroll_to_top.classList.add("scroll_btn_visibility")
    }
})
document.querySelector(".scroll_to_top_button").onclick = function() {
    window.scrollTo( 0, 0)
}

/*FOOTER ICONS */
function toggleDropdown() {
    const dropdown = document.querySelector('.footer-juners-a');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}