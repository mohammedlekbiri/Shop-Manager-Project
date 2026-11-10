async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products");
  console.log(response.status);
  let products = await response.json();
  console.log(products);
  return products;
}

// let data = dataretrieve()
// let data =  dataretrieve().json

// console.log('h')
// setTimeout((console.log('hi there')), 5000)
// console.log('hi')
const cardContainer = document.querySelector("#cardContainer");
const affichagecard = async () => {
  let data = await getProducts();
  console.log(cardContainer)
  data.forEach(d => {
    let item = document.createElement("article");
    item.innerHTML = `<div class="h-28 bg-indigo-50"></div>
          <div class="p-4">
            <div class="flex justify-between mb-2">
              <span class="text-[10px] bg-indigo-50 text-indigo-600 rounded px-1.5 py-0.5">Electronics</span>
              <span class="text-[10px] bg-green-50 text-green-600 rounded px-1.5 py-0.5">In stock</span>
            </div>
            <h3 class="text-sm font-semibold">Wireless Headphones</h3>
            <p class="text-[11px] text-slate-500 mb-3">Over-ear Bluetooth headphones with noise cancelling and 30h battery life.</p>
            <div class="flex justify-between items-end">
              <span class="font-bold">129.99 €</span>
              <span class="text-[10px] text-slate-500">Qty: 24</span>
            </div>
          </div>`;
    // cardContainer.appendChild(item)
    console.log(item)
  });
};

affichagecard();
