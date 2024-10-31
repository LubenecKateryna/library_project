const hiddenMenu = document.getElementById("lefthiddemMenuBox");
const mainMenuBtn = document.getElementById("header-menu-btn");

mainMenuBtn.addEventListener("click", function toggleMenu() {
    hiddenMenu.style.width = hiddenMenu.style.width === "250px" ? "0" : "250px";
});

document.addEventListener("click", (event) => {
    const isClickInside = hiddenMenu.contains(event.target) || mainMenuBtn.contains(event.target);
    if (!isClickInside) {
        hiddenMenu.style.width = "0";
    }
});

// Скрытие и показ аккаунта
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

// Функция создания карточки товара
function getProductHtml(product) {
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
                    <button class="btn-to-basket">В корзину</button>
                    <button class="btn-to-buy">Купить</button>
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

/*footer-conect-icon */
function toggleDropdown() {
    const dropdown = document.querySelector('.footer-juners-a');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}