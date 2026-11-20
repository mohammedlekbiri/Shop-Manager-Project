import {
 productContainer,
  searchInput,
  categoryContainer,
  categoryItems,
  priceRange,
  stockToggle,
  resetLink,
  resetBtn,
  renderProducts,
  renderLoading,
  renderEmpty,
  renderNoResults,
  renderError,
  renderCategories,
  renderPrice,
  renderCartItem,
  cartIcon,
  cartContainer,
  cartCloseBtn,
  cartBackdrop,
} from "./ui.js";
import { fetchData, buildUrl } from "./api.js";
import { saveData, getData, resetData} from "./localstorage.js";

// Removes all data from localStorage
// localStorage.clear();   
//------------ get current state of every filter

export const getFilters = () => {
  const categoryItems = categoryContainer.querySelectorAll('input[type="checkbox"]:checked');
   const search = searchInput.value.trim();
   const categoryId = [] 
   for(let i=0 ; i<categoryItems.length; i++){
    categoryId[categoryId.length] = Number(categoryItems[i].value)
   }
   const maxPrice = Number(priceRange.value);
   const inStock = stockToggle.checked;
   console.log({search, categoryId, maxPrice,inStock})
   return{search, categoryId, maxPrice, inStock}
} 



//----------- load the products 


async function loadProducts() {
  console.log('start')
  const filters = getFilters();
  console.log('got the filters')
   renderLoading();

  try {
    const response = await fetchData("products", filters);
    const products = await response.data
    if (products.length > 0) {
      console.log("fetched products :",products)
       renderProducts(products);
    } else if (
      filters.search !== "" ||
      filters.categoryId.length > 0 ||
      filters.maxPrice !== "" ||
      filters.inStock
    ) {
      console.log('no products')
      //-------- filters But No Products
      renderNoResults();
    } else {
      //-------- no Filters And No Products
      renderEmpty();
    }
  } catch (error) {
    // renderError(buildUrl("products", filters), error.message);
  }
}
loadProducts()




//---------- load the categories

async function loadCategories() {
  try {
    const categories = await fetchData("categories");
      console.log(categories.data)
      renderCategories(categories.data)
  } catch (error) {
    console.error("Can't load the categories", error);
  }
}


// ---------- reset

function resetFilters() {
  searchInput.value = "";
  categoryContainer.querySelectorAll("input:checked").forEach(function (box) {
    box.checked = false;
  });
  priceRange.value = priceRange.max;
  stockToggle.checked = false;
  renderPrice();
  loadProducts();
}

// ---------- events


//------  rendering the fetched categories and all the products

 

// dynamic search when the user types + adding debouce for not firing requests

const searchdebouce = setTimeout(searchInput.addEventListener("input", loadProducts), 2000);

// search with the button or enter

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  loadProducts();
});

// categories (the checkboxes are created later so we listen on the container)
categoryContainer.addEventListener("change", loadProducts);

// stock
stockToggle.addEventListener("change", loadProducts);

// price : the label changes while sliding, we fetch when we release
priceRange.addEventListener("input", renderPrice);
priceRange.addEventListener("change", loadProducts);

// reset buttons
resetLink.addEventListener("click", resetFilters);
resetBtn.addEventListener("click", resetFilters);



//------- display cart and abort display of it 

cartIcon.addEventListener('click', (e)=>{
  e.preventDefault()
  cartContainer.classList.toggle("hidden")
  cartBackdrop.classList.toggle("hidden")
})
cartCloseBtn.addEventListener('click', ()=>{
  cartContainer.classList.toggle("hidden")
  cartBackdrop.classList.toggle("hidden")
})
cartBackdrop.addEventListener('click', ()=>{
  cartContainer.classList.toggle("hidden")
  cartBackdrop.classList.toggle("hidden")
})


//--------- display cart item added 

productContainer.addEventListener('click', (e)=>{
  const selectedProduct = e.target.closest('.addToCartBtn')
  const product = {
    id: selectedProduct.dataset.id,
    name: selectedProduct.dataset.name,
    price: Number(selectedProduct.dataset.price),
    image: selectedProduct.dataset.image,
    quantity: 1
  };
  console.log(product)
   const cart =  getData('cart');
   console.log(cart)
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push(product);
  }
  saveData('cart',cart)
  console.log(cart)
  renderCartItem()
})


// ---------- start the page

renderPrice();
loadCategories();
loadProducts();
document.addEventListener('DOMContentLoaded', ()=>{
  loadCategories();
  loadProducts();
  renderCartItem();
} )

