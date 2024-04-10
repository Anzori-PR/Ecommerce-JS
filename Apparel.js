import { firestore } from "./firestore.js";
const productsCollection = firestore.collection("products");

productsCollection.get().then((querySnapshot) => {
  const productsContainer = document.getElementById('products-container');

  querySnapshot.forEach((doc) => {
    const data = doc.data();


    Object.keys(data).forEach((key) => {
      const productData = data[key];

      if (doc.id != 'bag') {

        const productElement = document.createElement('div');
        productElement.classList.add('product-item');
        productElement.classList.add('square');
        productElement.setAttribute('data-id', productData.Id);

        productElement.innerHTML = `
        <div class="redirectToProductDetails">
          <div class="product-thumb">
          ${productData.imageUrl == null
          ? `<img class="product-img" src="./images/placeholder.jpg" alt="">`
          : `<img class="product-img" src="${productData.imageUrl}" alt="${productData.name}">`
        }
          </div>
          <div class="product-about">
              <div class="product-descr">
                  <div class="product-name">${productData.name}</div>
                  <div>${productData.description}</div>
              </div>
              <div class="product-price">€${productData.price}</div>
          </div>
          </div>
        `;

      productsContainer.appendChild(productElement);
      const redirectToProductDetails = productElement.querySelector('.redirectToProductDetails');
      redirectToProductDetails.addEventListener('click', () => {
        product_details(productData.Id);
      })

      }
    });
  });
});

function redirectToProductDetails(element) {
  const productId = element.closest('.product-item').getAttribute('data-id');
  window.location.href = `product-detail.html?id=${productId}`;
}

const ActivePage = window.location.pathname;
const NavLinks = document.querySelectorAll('nav a').
  forEach(link => {
    if (link.href.includes(`${ActivePage}`)) {
      link.classList.add('active');
    }
  })

