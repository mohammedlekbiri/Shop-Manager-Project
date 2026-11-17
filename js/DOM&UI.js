export const productContainer = document.querySelector("#productContainer");
export const searchInput = document.querySelector("#searchInput");
export const categoryContainer = document.querySelector("#categoriesContainer")
export const checkedCategories = categoryContainer.querySelectorAll(
  'input[type="checkbox"]:checked',
);


import { productsByCategory, renderProducts,renderProductsBySearch,fetchProducts } from "./Products.js";
import { renderCategories } from "./categories.js";
import { getCheckedCategoriesIds } from "./categories.js";







//-------- load products on the loading page


document.addEventListener("DOMContentLoaded", async () => {
    renderProducts();
})


//-------- load products on the saerch input 


searchInput.addEventListener('input', () => {
    renderProductsBySearch();
})

////---------get selected categories Ids 


categoryContainer.addEventListener("change", (event)=>{
        // getCheckedCategoriesIds();

})


//--------- load fetched selcted products by category


categoryContainer.addEventListener('change', async () => {
  const selectedIds = getCheckedCategoriesIds();
  if (selectedIds.length === 0) return;

  try {
    const products = await fetchProducts(selectedIds);
    renderProducts(products);
  } catch (err) {
    console.error(err);
  }
});


//-------- load products on category select

// categoryContainer.addEventListener('change', (e)=>{
    
//     console.log(e.target)
//     const chosencategories=
// })


//---------- load fetcehd categories

document.addEventListener("DOMContentLoaded", async () => {
    renderCategories();
})