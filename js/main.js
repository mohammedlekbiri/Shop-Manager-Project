import {
  fetchProducts,
  renderProducts,
  fetchBySearch,
  renderProductsBySearch,
  productsByCategory,
} from "./Products.js";
import {  } from "./DOM&UI.js";
import { renderCategories } from "./categories.js";
import { producturl,categoriesurl } from "./api.js";
// const productQty = document.querySelector("#productQty"); -----------to save

//------ fetch products

fetchProducts();

//-------  render fetched products

renderProducts();

//-------- get products by search

fetchBySearch();

//-------- render products By Search

renderProductsBySearch();

//------------fetch products by category or categories

productsByCategory();

//---------render Products By Category or categories

//----- get categories and render them in DOM



// const response = await fetch(`${producturl}?categoryId=${}`);
// console.log(response.status);
// console.log(await response.json());

//---------- render filtered products

// const renderFilteredproducts = async (search, category, price, stock) => {
//   try {
//     const productContainer = document.querySelector("#productContainer");
//     productContainer.innerHTML = ``;
//     const filteredProducts = [];
//     filteredProducts.push(search);
//     filteredProducts.push(category);
//     filteredProducts.push(price);
//     filteredProducts.push(stock);
//   } catch (error) {}
// };
