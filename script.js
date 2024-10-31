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
    document.getElementById("accountText").textContent = name ? `Вітаю, ${name}` : "Увійти в акаунт";
    document.getElementById("greetingText").textContent = name ? `Привіт, ${name}, давай читати!` : "Привіт, давай читати!";
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
                    <span class="btn-wait" ${isAvailable ? 'style="display: none;"' : ''}>${product.btnWait}</span>
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

/*HIDDEN BASCKET */

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
    if(window.scrollY < 500){
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