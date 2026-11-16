export const productContainer = document.querySelector("#productContainer");
export const searchInput = document.querySelector("#searchInput");
export const categoryContainer = document.querySelector("#categoriesContainer")
export const checkedCategories = categoryContainer.querySelectorAll(
  'input[type="checkbox"]:checked',
);


import { productsByCategory, renderProducts,renderProductsBySearch } from "./Products.js";
import { renderCategories } from "./categories.js";








//-------- load products on the loading page


document.addEventListener("DOMContentLoaded", async () => {
    renderProducts()
})


//-------- load products on the saerch input 


searchInput.addEventListener('input', () => {
    renderProductsBySearch()
})

////---------get selcted checkboxes id 

export const getCheckedCategoriesIds = () =>{}

//-------- load products on category select

categoryContainer.addEventListener('change', ()=>{
    console.log(checkedCategories)
})


//---------- l

