import { firestore } from "./firestore.js";
const productsCollection = firestore.collection("products");

// DOM element selection for sidebar mechanism
const shopping_cart = document.querySelector('.shopping-cart');
const shopping_pop_up = document.querySelector('.shopping-cart-pop-up');
const close_tag = document.querySelector('.close-tag');
const addToCart = document.querySelector('.addToCart');

if (shopping_cart && shopping_pop_up && close_tag) {
  shopping_cart.addEventListener('click', () => {
    shopping_pop_up.classList.toggle('active');
  });

  close_tag.addEventListener('click', () => {
    shopping_pop_up.classList.remove('active'); // Always remove 'active' class on close
  });
}

// Burger Menu Logic
const menu = document.getElementById('burger');
const burger_result = document.querySelector('.burger-menu-result');

menu.addEventListener('click', () => {
  burger_result.style.display === 'flex' ? burger_result.style.display = 'none' : burger_result.style.display = 'flex'; 
})


// Delete added items

function deleteItem(id) {
  let cartItems = JSON.parse(localStorage.getItem("id") || '[]');

  // Filter out all occurrences of the id from cartItems
  cartItems = cartItems.filter(itemId => itemId !== id);

  // Update localStorage with the modified cartItems
  localStorage.setItem("id", JSON.stringify(cartItems));

  // Remove all DOM elements corresponding to the deleted item
  const deletedItems = document.querySelectorAll(`[id^="added-item-${id}"]`);
  deletedItems.forEach(item => item.remove());

  // Update the cart count display
  addToCart.innerHTML = cartItems.length;
}


// Sidebar added item display

export function showItems() {
  productsCollection.get().then((querySnapshot) => {
    const storedIds = JSON.parse(localStorage.getItem("id")) || [];
    const addedItems = document.getElementById('added-items');
    addToCart.innerHTML = storedIds.length;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      Object.keys(data).forEach((key) => {
        const productData = data[key];
        if (storedIds.includes(productData.Id)) {
          const existingItem = document.getElementById(`added-item-${productData.Id}`);
          if (!existingItem) {
            const productElement = document.createElement('div');
            productElement.id = `added-item-${productData.Id}`;
            productElement.classList.add('added-item', 'square');
            productElement.innerHTML = `
              <div>
                <div>
                  <img class="added-img" src="${productData.imageUrl || './images/placeholder.jpg'}" alt="${productData.name}">
                </div>
                <div class="added-about">
                  <div class="added-descr">
                    <div class="added-name">${productData.name}</div>
                    <div>${productData.description}</div>
                  </div>
                  <div class="price-and-Delete">
                    <div class="added-price">€${productData.price}</div>
                    <button class="delete-btn"><img src="./Images/delete.png" alt="delete"></button>
                  </div>
                </div>
              </div>
            `;
            addedItems.appendChild(productElement);

            // Add event listener for delete button inside the created productElement
            const delete_btn = productElement.querySelector('.delete-btn');
            delete_btn.addEventListener('click', () => {
              deleteItem(productData.Id);
              productElement.remove();
            });
          }
        }
      });
    });
  });
}

// Call showItems() to display items in the sidebar
showItems();
