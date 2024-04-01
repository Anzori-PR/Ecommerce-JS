const firebaseConfig = {

    apiKey: "AIzaSyAIr5oOxsmrRY1ckvVjzI5lKfaKGZL0Nyo",

    authDomain: "first-project-51a51.firebaseapp.com",

    projectId: "first-project-51a51",

    storageBucket: "first-project-51a51.appspot.com",

    messagingSenderId: "933776983263",

    appId: "1:933776983263:web:e0087bbc897bd349fb556a",

    measurementId: "G-WZ9P90S5JW"

};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const productsCollection = firestore.collection("products");

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const productImage = document.getElementById('product-image');
const additional = document.getElementById('product-additional-img');
const might_like_container = document.getElementById('you-might-like-container');
const product_about = document.getElementById('abouts-description');
const addToCartButtons = document.getElementById('add-to-cart');

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
                <div onclick="redirectToProductDetails(this)">
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
    console.log("3");

    let cartItems = JSON.parse(localStorage.getItem("id") || '[]');
    cartItems.push(productId);
    localStorage.setItem("id", JSON.stringify(cartItems));
});
