import { firestore } from "./firestore.js";
import { showItems } from "./cart.js";

const productsCollection = firestore.collection("products");

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const productImage = document.getElementById('product-image');
const additional = document.getElementById('product-additional-img');
const might_like_container = document.getElementById('you-might-like-container');
const product_about = document.getElementById('abouts-description');
const addToCartButtons = document.getElementById('add-to-cart');
const successfullyAdded = document.getElementById('success');

productsCollection.get().then((querySnapshot) => {
    let youMightLikeCounter = 0;

    querySnapshot.forEach((doc) => {
        const productData = doc.data();

        Object.keys(productData).forEach((key) => {
            const Data = productData[key];

            if (Data.Id === productId.toString()) {

                productImage.src = Data.imageUrl;

                for (let i = 0; i < Data.additionalImages.length; i++) {
                    const productElement = document.createElement('div');
                    productElement.classList.add('additionalStyle');

                    productElement.innerHTML = `
                        <img class="additional-img" src="${Data.additionalImages[i]}">
                    `;

                    additional.appendChild(productElement);

                    productElement.addEventListener('click', () => {
                        productImage.src = Data.additionalImages[i];

                        document.querySelectorAll('.additionalStyle').forEach(element => {
                            element.style.border = 'none';
                        });
                        // Add border to the clicked element
                        productElement.style.border = '1px solid rgb(42, 42, 255)';
                        productElement.style.borderRadius = '0.5rem';
                    });
                }

                const productAboutContainer = document.createElement('div');
                productAboutContainer.classList.add('product-detail-about');


                productAboutContainer.innerHTML = `
                    <div>
                        <h1 class="products-name">${Data.name}</h1>
                        <p class="products-about">${Data.description}</p>
                    </div>
                    <div>
                        <h1 class="products-price">€${Data.price}</h1>
                    </div>
                `;

                product_about.appendChild(productAboutContainer);
            }

            const productElement = document.createElement('div');
            productElement.classList.add('you-might-product-item');
            productElement.classList.add('you-might-square');

            productElement.innerHTML = `
                <div>
                    <div class="product-thumb">
                    <img class="product-img" src="${Data.imageUrl || '../Images/no-image.jpg'}" alt="${Data.name}">
                    </div>
                    <div class="product-about">
                        <div class="product-descr">
                            <div class="product-name">${Data.name}</div>
                            <div>${Data.description}</div>
                        </div>
                        <div class="product-price">€${Data.price}</div>
                    </div>
                </div>
            `;
            productElement.addEventListener('click', () => {
                redirectToProductDetails(Data.Id);
            });

            if (youMightLikeCounter < 5) {
                might_like_container.appendChild(productElement);
                youMightLikeCounter++;
            } else {
                return;
            }
        });
    });
});

function redirectToProductDetails(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

addToCartButtons.addEventListener("click", () => {
    let cartItems = JSON.parse(localStorage.getItem("id") || '[]');
    cartItems.push(productId);
    localStorage.setItem("id", JSON.stringify(cartItems));
    successfullyAdded.innerHTML = `<h1>Item successfully added</h1>`;
    setTimeout(() => {
        successfullyAdded.innerHTML = '';
    }, 3000);
    showItems();
});
