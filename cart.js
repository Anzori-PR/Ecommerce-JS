// ----------- side Bar mechanism
const shopping_cart = document.getElementsByClassName('shoppinng-cart')[0];
const shopping_pop_up = document.getElementsByClassName('shopping-cart-pop-up')[0];
const close_tag = document.getElementsByClassName('close-tag')[0];

shopping_cart.addEventListener('click', () => {
  shopping_pop_up.classList.toggle('active');
});

close_tag.addEventListener('click', () => {
  shopping_pop_up.classList.toggle('active');
});

function deleteItem(id) {
  let cartItems = JSON.parse(localStorage.getItem("id") || '[]');
  const indexToDelete = cartItems.indexOf(id);
  
  if (indexToDelete !== -1) {
    cartItems.splice(indexToDelete, 1);
    localStorage.setItem("id", JSON.stringify(cartItems));
    const deletedItem = document.getElementById(`added-item-${id}`);
    if (deletedItem) {
      deletedItem.remove();
    }
  }
}

function showItems() {
  productsCollection.get().then((querySnapshot) => {
    const storedIds = JSON.parse(localStorage.getItem("id")) || [];
    const addedItems = document.getElementById('added-items');
  
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      Object.keys(data).forEach((key) => {
        const productData = data[key];
        if (storedIds.includes(productData.Id)) {
          // Check if the item is already in the DOM
          const existingItem = document.getElementById(`added-item-${productData.Id}`);
          if (!existingItem) {
            // If not, create and append it
            const productElement = document.createElement('div');
            productElement.id = `added-item-${productData.Id}`;
            productElement.classList.add('added-item');
            productElement.classList.add('square');
            productElement.innerHTML = `
              <div>
                <div>
                  ${productData.imageUrl == null
                    ? `<img class="added-img" src="./images/placeholder.jpg" alt="">`
                    : `<img class="added-img" src="${productData.imageUrl}" alt="${productData.name}">`
                  }
                </div>
                <div class="added-about">
                  <div class="added-descr">
                    <div class="added-name">${productData.name}</div>
                    <div>${productData.description}</div>
                  </div>
                  <div class="price-and-Delete">
                    <div class="added-price">€${productData.price}</div>
                    <button class="delete-btn" onclick="deleteItem('${productData.Id}')">DLT</button>
                  </div>
                </div>
              </div>
            `;
            addedItems.appendChild(productElement);
          }
        }
      });
    });
  });
}

showItems();
