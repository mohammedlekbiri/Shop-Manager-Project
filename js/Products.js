import { productContainer, searchInput, checkedCategories, categoryContainer } from "./DOM&UI.js";
import { producturl } from "./api.js";

//------------fetch products function

export async function fetchProducts() {
  const response = await fetch(`${producturl}`);
  // console.log(response.status);
  let products = await response.json();
  return products;
}

//--------------render products function

export const renderProducts = async () => {
  let data = await fetchProducts();
  try {
    
      productContainer.innerHTML = data.map((element) =>`<article class="bg-white border rounded-xl overflow-hidden" >
          <div class="bg-indigo-50"><img src="http://localhost:3000${element.image}"></div>
          <div class="p-4">
            <div class="flex justify-between mb-2 ">
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
        </article>`).join("");
    }
  catch (error) {
    productContainer.classList.remove("grid", "grid-cols-3");
    productContainer.classList.add(
      "flex-col",
      "p-1",
      "bg-blue-100",
      "justify-items-center",
      "content-end",
    );
    console.error(`hello , there is the error : ${error}`);
  }
};

//---------------fetch products by search function

export const fetchBySearch = async (value) => {
  try {
    const response = await fetch(`${producturl}?search=${value}`);
    const filteredBySearch = await response.json();
    return await filteredBySearch;
  } catch (err) {
    console.error(err);
  }
};

//-------------render products by search function

export const renderProductsBySearch = async () => {
  const productContainer = document.querySelector("#productContainer");

  try {
    const filteredBySearch = await fetchBySearch(searchInput.value);
    // console.log(filteredBySearch);
    productContainer.innerHTML = filteredBySearch.map((item)=> `<article class="bg-white border rounded-xl overflow-hidden" >
          <div class="bg-indigo-50"><img src="http://localhost:3000${item.image}"></div>
          <div class="p-4">
            <div class="flex justify-between mb-2 ">
              <span class="text-[10px] bg-indigo-50 text-indigo-600 rounded px-1.5 py-0.5">${item.categoryName}</span>
              <span class="text-[10px] bg-green-50 text-green-600 rounded px-1.5 py-0.5">in stock</span>
            </div>
            <h3 class="text-sm font-semibold">${item.name}</h3>
            <p class="text-[11px] text-slate-500 mb-3">${item.description}</p>
            <div class="flex justify-between items-end">
              <span class="font-bold">${item.price} €</span>
              <span class="text-[10px] text-slate-500">Qty: ${item.stock}</span>
            </div>
          </div>
        </article>`
      ).join("");
    
       
  } catch (err) {
    console.error(err);
  }
};

//---------- get products by category or categories

export const productsByCategory = async () => {
  
  try{const response = await fetch(
  "http://localhost:3000/api/products?categorId=2&inStock=true"
);
console.log(response.status);
console.log(await response.json()); 
} catch(err){
  console.error(`this is a ${err.name}, and it's ${err.stack}`)
}


  
  // try {
  //   const results = await Promise.all(
  //     [...checkedCategories].map(async (c) => {
  //       const categoryId = Number(c.dataset.id);
  //       const response = await fetch(`${producturl}?categoryId=${categoryId}`);
  //       const filteredProductsByCat = await response.json();
  //       console.log(filteredProductsByCat)
  //       return filteredProductsByCat;
  //     }),
  //   );

  //   // Merge all arrays
  //   const allProducts = results.flat();

  //   // Deduplicate by product id
  //   const uniqueProducts = allProducts.filter(
  //     (product, index, self) =>
  //       index === self.findIndex((p) => p.id === product.id),
  //   );

  //   console.log(uniqueProducts);
  // } catch (err) {
  //   console.error(err);
  // }
};


//---------- render products by Category or categories

export const renderProductsByCategory = async (data) => {
  //   const productContainer = document.querySelector("#productContainer");
  let filteredBycategory = await fetchBySearch(searchInput.value);
  
  try {
    
      productContainer.innerHTML =  filteredBySearch.map((data) =>`<article class="bg-white border rounded-xl overflow-hidden" >
          <div class="bg-indigo-50"><img src="http://localhost:3000${data.image}"></div>
          <div class="p-4">
            <div class="flex justify-between mb-2 ">
              <span class="text-[10px] bg-indigo-50 text-indigo-600 rounded px-1.5 py-0.5">${data.categoryName}</span>
              <span class="text-[10px] bg-green-50 text-green-600 rounded px-1.5 py-0.5">in stock</span>
            </div>
            <h3 class="text-sm font-semibold">${data.name}</h3>
            <p class="text-[11px] text-slate-500 mb-3">${data.description}</p>
            <div class="flex justify-between datas-end">
              <span class="font-bold">${data.price} €</span>
              <span class="text-[10px] text-slate-500">Qty: ${data.stock}</span>
            </div>
          </div>
        </article>`
  );
  } catch (err) {
    console.error(err);
  }
};
