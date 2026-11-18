//------- elements in html

export const productContainer = document.querySelector("#productContainer");
export const productQty = document.querySelector("#productQty");
export const searchForm = document.querySelector("#searchForm");
export const searchInput = document.querySelector("#searchInput");
export const categoryContainer = document.querySelector("#categoriesContainer");
export const priceRange = document.querySelector("#priceRange");
export const priceValue = document.querySelector("#priceValue");
export const stockToggle = document.querySelector("#inStock");
export const resetLink = document.querySelector("#resetLink");
export const resetBtn = document.querySelector("#resetBtn");

// ---- show products

export const renderProducts = async (products) => {
  let html = "";

  products.forEach((product) => {
    // stock badge
    let stockText = "In stock";
    let stockcolor = "bg-green-50 text-green-600";

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
        </div>
      </article>`;
  });
  productContainer.innerHTML = html;
  productQty.textContent = products.length + " products";
};

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
    productContainer.innerHTML = `<p class="col-span-3 text-center text-sm text-slate-500">Loading...</p>`
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

  categories.forEach(function (category) {
    html += `
      <label class="flex items-center gap-2">
        <input type="checkbox" name="categorie" value="${category.id}"> ${category.name}
      </label>`;
  });

  categoryContainer.innerHTML = html;
}

// ---------- price label

export function renderPrice() {
  priceValue.textContent = "≤ " + priceRange.value + " €";
}
