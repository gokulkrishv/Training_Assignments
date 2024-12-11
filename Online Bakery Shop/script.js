function BakeryItem(name, price, weight) {
    this.name = name;
    this.price = price;
    this.weight = weight;
  }
  
  // Add a method to the BakeryItem prototype to get the item's details
  BakeryItem.prototype.getDetails = function () {
    return `${this.name} - $${this.price} (${this.weight}g)`;
  };
  
 
  const bakeryItems = [
    new BakeryItem("Chocolate Cake", 10, 500),
    new BakeryItem("Blueberry Muffin", 3, 150),
    new BakeryItem("Croissant", 2, 100),
    new BakeryItem("Apple Pie", 8, 400),
  ];
  

  const cart = [];
  
  function displayItems() {
    const itemsContainer = document.getElementById("items");
    itemsContainer.innerHTML = ""; // Clear the container
    bakeryItems.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item");
      itemDiv.innerHTML = `
        <p>${item.getDetails()}</p>
        <button onclick="addToCart(${index})">Add to Cart</button>
      `;
      itemsContainer.appendChild(itemDiv);
    });
  }

  function addToCart(index) {
    cart.push(bakeryItems[index]);
    displayCart();
  }
  

  function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");
    cartContainer.innerHTML = ""; // used to Clear the container
  
    if (cart.length === 0) {
      totalContainer.textContent = "Your cart is empty.";
      return;
    }
  
    let total = 0;
    cart.forEach((item) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.textContent = item.getDetails();
      cartContainer.appendChild(cartItemDiv);
      total += item.price;
    });
  
    totalContainer.textContent = `Total: $${total}`;
  }

  displayItems();
  displayCart();
  