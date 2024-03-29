// SELECT ELEMENTS

const products = [
  {
    id: 0,
    name: "orange",
    price: 0.5,
    instock: 20,
    description: "juicey orange",
  },
  {
    id: 1,
    name: "melon",
    price: 5,
    instock: 99,
    description: "whole melon",
  },
  {
    id: 2,
    name: "pear",
    price: 0.75,
    instock: 19,
    description: "conference pear",
  },
  {
    id: 3,
    name: "Carrot",
    price: 0.1,
    instock: 100,
    description: "organic carrot",
  },
  {
    id: 4,
    name: "wonkay fruit & vegetables",
    price: 10,
    instock: 4,
    description: "mixture of wonkey fruit and veg, items vary",
  },
  {
    id: 5,
    name: "potatoes",
    price: 2,
    instock: 40,
    description: "seasonal potatos",
  },
];

const productsDiv = document.querySelector(".products");
let totl = document.getElementById("total");
let itemsNo = document.getElementById("items");

function renderProducts() {
  products.forEach((product) => {
    productsDiv.innerHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h4>${product.name}</h4>
                        <h4><small>$</small>${product.price}</h4>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                    <div class = "row1">
                        <div class="wishlist row1Child">
                           <a href=""> <img src= "C\:Users\saint\Pictures\img\heartveg.jpg” alt="add to wish list"></a>                       
                       </div>
                           <div class="add-to-cart row1Child tooltip" onclick="addToCart(${product.id})" >
                            <a href=""><i class="fa fa-shopping-cart" style="font-size:48px;color:red"></i></a>
                            <span class="tooltiptext">Add to Cart</span>
                            </div>
                        </div>
                    
                    </div>
            </div>
        `;
  });
}
renderProducts();

const cartItemsEl = document.querySelector(".cart-items");
let cart = JSON.parse(localStorage.getItem("myCart")) || [];
updateCart();
function displayCart() {
  if (cart.length === 0) {
    //alert("here")
    document.getElementById("cartId").style.visibility = "hidden";
  }
}
displayCart();

function addToCart(id) {
  let item = cart.find((item) => item.id === id);
  if (item) {
    item.numberOfUnits += 1;
  } else {
    products.forEach((product) => {
      if (product.id === id) {
        cart.push({ ...product, numberOfUnits: 1 });
      }
    });
  }

  updateCart();
}

function updateCart() {
  renderCart();
  totalAmount();
  localStorage.setItem("myCart", JSON.stringify(cart));
}
function renderCart() {
  cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h6>${item.name}</h6>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
              <div class="box">
                <div class="minus" onclick="minusItem(${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="plus" onclick="plusItem(${item.id})">+</div>
              </div>
                
              <div class="remove" onclick="remove(${item.id})">
                    <a href="">Remove</a>
              </div>
            </div>
        </div>
      `;
  });
}

function totalAmount() {
  let total = 0;
  noItems = 0;
  cart.forEach((item) => {
    total = total + item.price * item.numberOfUnits;
    noItems = noItems + item.numberOfUnits;
  });

  totl.innerHTML = "Total : " + " $ " + total;
  itemsNo.innerHTML = "Cart " + noItems;
}
function remove(id) {
  let item = cart.find((item) => item.id === id);
  let newArr = [];
  cart.forEach((prod) => {
    if (item.id !== prod.id) {
      newArr.push(prod);
    }
  });
  cart = newArr;
  updateCart();
}

function plusItem(id) {
  let item = cart.find((item) => item.id === id);
  if (item) {
    item.numberOfUnits += 1;
  }
  updateCart();
}
function minusItem(id) {
  let item = cart.find((item) => item.id === id);
  if (item && item.numberOfUnits > 1) {
    item.numberOfUnits -= 1;
  } else if (item.numberOfUnits === 1) {
    remove(id);
  }
  if (cart.length == 0) displayCart();
  updateCart();
}
