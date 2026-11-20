//------- elements in html

import { getData, saveData } from "./localstorage.js";

export const productContainer = document.querySelector("#productContainer");
export const productQty = document.querySelector("#productQty");
export const searchInput = document.querySelector("#searchInput");
export const searchForm = document .querySelector("#searchForm")
export const categoryContainer = document.querySelector("#categoriesContainer");
export const categoryItems = categoryContainer.querySelectorAll('input[type="checkbox"]:checked');
export const priceRange = document.querySelector("#priceRange");
export const priceValue = document.querySelector("#priceValue");
export const stockToggle = document.querySelector("#inStock");
export const resetLink = document.querySelector("#resetLink");
export const resetBtn = document.querySelector("#resetBtn");
export const stockLabel = document.querySelector("#stockLabel");
export const cartIcon = document.querySelector('#cartIcon');
export const cartContainer = document.querySelector('#cartContainer');
export const cartCloseBtn = document.querySelector("#cartCloseBtn");
export const cartBackdrop =document.querySelector("#cartBackdrop");
export const addToCartBtn = document.querySelector("#addToCartBtn");
export const cartItemsContainer = document.querySelector("#cartItemsContainer");
export const itemDBtn = document.querySelector("#itemDBtn")
export const itemIBtn = document.querySelector("#itemIBtn")


// ---- show products

export const renderProducts = async (products) => {
  let html = "";

  products.forEach((product) => {
    // stock badge
    let stockText = "In stock";
    let stockColor = "bg-green-50 text-green-600";

    if (product.stock === 0) {
      stockText = "Out of stock";
      stockColor = "bg-red-50 text-red-600";
    } else if (product.stock <= 5) {
      stockText = "Low stock";
      stockColor = "bg-amber-50 text-amber-600";
    }

    html += `
      <article class="bg-white border rounded-xl overflow-hidden">
        <div class="h-40 bg-indigo-50">
          <img class="size-full object-contain p-3" src="http://localhost:3000${product.image}" alt="${product.name}">
        </div>
        <div class="p-4">
          <div class="flex justify-between mb-2">
            <span class="text-[10px] bg-indigo-50 text-indigo-600 rounded px-1.5 py-0.5">${product.categoryName}</span>
            <span class="text-[10px] rounded px-1.5 py-0.5 ${stockColor}">${stockText}</span>
          </div>
          <h3 class="text-sm font-semibold">${product.name}</h3>
          <p class="text-[11px] text-slate-500 mb-3">${product.description}</p>
          <div class="flex justify-between items-end">
            <span class="font-bold">${product.price} €</span>
            <span class="text-[10px] text-slate-500">Qty: ${product.stock}</span>
          </div>
          <button class="addToCartBtn w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image} diabled">
           Add to cart
           
        </div>
      </article>`;
  });
  productContainer.innerHTML = html;
  productQty.textContent = products.length + " products";
};
const edit = async (params) => {
    const response = await fetch("http://localhost:3000/api/products/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Grid Notebook",
    description: "Updated during practice.",
    price: 4.5,
    stock: 0,
    categoryId: 1
  })
});


console.log(response.status);
console.log(await response.json());
}
edit()

// ---------- message handling for (empty, no result, error)

function showMessage(title, text, buttonText, action) {
  productContainer.innerHTML = `
    <div class="col-span-3 flex flex-col items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <p class="text-base font-semibold text-slate-900">${title}</p>
      <p class="max-w-xs text-xs text-slate-500">${text}</p>
      <button data-action="${action}" class="mt-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700">${buttonText}</button>
    </div>`;
  productQty.textContent = "0 products";
}

//--- loading message

export function renderLoading() {
    productContainer.innerHTML = `<p class="col-span-3 text-center text-m text-slate-500">Loading...</p>`
}

export function renderEmpty() {
  showMessage(
    "No products available",
    "The catalogue is empty for now.",
    "Refresh",
    "retry",
  );
}

export function renderNoResults() {
  showMessage(
    "No results found",
    "No product matches your search or your filters.",
    "Reset filters",
    "reset",
  );
}

export function renderError(url, message) {
  showMessage(
    "Unable to load products",
    "The server did not respond. Make sure your local API is running, then try again. (GET " + url + " - " + message + ")",
    "Try again",
    "retry",
  );
  productQty.textContent = "";
}

// ---------- categories

export function renderCategories(categories) {
  let html = "";

  for(const category of categories){
    html += `
      <label class="flex items-center gap-2">
        <input type="checkbox" name="categorie" value="${category.id}"> ${category.name}
      </label>`;
  };

  categoryContainer.innerHTML = html;
}


// ---------- price label

export function renderPrice() {
  priceValue.textContent = "≤ " + priceRange.value + " €";
}


//------------ Cart item


export const    renderCartItem =  async () => {
    const cartItemsContainer = document.querySelector("#cartItemsContainer");
    const stored =  getData('cart');
    const cart = Array.isArray(stored) ? stored : [stored];
    console.log(cart)
    //----------cart container empty (no results from local storage)
    if(!cart || cart.length == 0){
        cartItemsContainer.innerHTML = `<p class="text-gray-500 text-center py-4">Your cart is empty</p>`;
        saveData('cart',[])
        console.log(cart)
        return
    }
    //----------- Render all items found in the cart
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item flex justify-between items-center border-b py-3 px-2">
            <div class="flex items-center gap-3">
                <img src="${item.image || 'placeholder.jpg'}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                <div>
                    <h4 class="font-semibold text-sm">${item.name}</h4>
                    <p class="text-xs text-gray-500">${item.price} € × ${item.quantity} = ${item.price*item.quantity}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="updateQuantity('${item.id}', -1)" class="px-2 bg-gray-200 rounded" id="itemDBtn">-</button>
                <span class="text-sm font-medium">${item.quantity}</span>
                <button onclick="updateQuantity('${item.id}', 1)" class="px-2 bg-gray-200 rounded" id="itemIBtn">+</button>
            </div>
        </div>
    `).join('');


}
const updateQuantity = (id, step)=>{
    const cart = getData('cart')
    const cartItem = cart.find(item => item.id === id)
    cartItem.quantity += step;
    const newQty = cartItem.quantity
    if(newQty <= 0){
        const updated = cart.filter(item => item.id !== id);
        saveData('cart',updated);
        renderCartItem();
        return
    }
    if(newQty > cartItem.stock){
        console.warn(`stock pour ${cartItem.name}`)
        return
    }
    cartItem.quantity = newQty;
    saveData('cart', cart)
    renderCartItem()
}

