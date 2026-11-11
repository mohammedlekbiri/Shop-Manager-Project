const productQty = document.querySelector('#productQty')

async function getProducts() {
  const response = await fetch("http://localhost:3000/api/poducts");
  console.log(response.status);
  let products = await response.json();
  console.log(products);
  return products;
}
// productQty.textContent = await products.length
// async (products) => {
//   const data = await products
//   console.log(data)
// }


const cardContainer = document.querySelector("#cardContainer");
const affichagecard = async () => {
  // console.log(cardContainer);
  let data = await getProducts();
  try {
       data.forEach((element) => {
    cardContainer.innerHTML += `<article class="bg-white border rounded-xl overflow-hidden" >
          <div class="h-28 bg-indigo-50"><img src="${element.image}"></div>
          <div class="p-4">
            <div class="flex justify-between mb-2">
              <span class="text-[10px] bg-indigo-50 text-indigo-600 rounded px-1.5 py-0.5">${element.categoryName}</span>
              <span class="text-[10px] bg-green-50 text-green-600 rounded px-1.5 py-0.5">in stock</span>
            </div>
            <h3 class="text-sm font-semibold">${element.name}</h3>
            <p class="text-[11px] text-slate-500 mb-3">${element.description}</p>
            <div class="flex justify-between items-end">
              <span class="font-bold">${element.price} €</span>
              <span class="text-[10px] text-slate-500">Qty: ${element.stock}</span>
            </div>
          </div>
        </article>`;
    })
  } catch (error) {
    
    cardContainer.classList.remove("grid" , "grid-cols-3" )
    cardContainer.classList.add("flex-col" , "p-1", "bg-blue-100","justify-items-center","content-end")

  }}


affichagecard();




