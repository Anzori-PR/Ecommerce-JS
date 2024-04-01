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
  
  productsCollection.get().then((querySnapshot) => {
    const productsContainer = document.getElementById('products-container');
  
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
    
      Object.keys(data).forEach((key) => {
        const productData = data[key];
        if (doc.id === 'bag') {

            const productElement = document.createElement('div');
            productElement.classList.add('product-item');
            productElement.classList.add('square');
            productElement.setAttribute('data-id', productData.Id);
        
            productElement.innerHTML = `
            <div onclick="redirectToProductDetails(this)">
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
    if(link.href.includes(`${ActivePage}`)){
      link.classList.add('active');
    }
  })
  
  