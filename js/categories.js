import { categoriesurl } from "./api.js";
import { categoryContainer } from "./DOM&UI.js";

//------- get and render Categories

export const renderCategories = async () => {
  try {
    const categoryContainer = document.querySelector("#categoriesContainer");
    const res = await fetch(categoriesurl);
    if (!res.ok) console.error(`HTTP ${res.status}`);
    const categories = await res.json();
    console.log(categories);
    console.log(categoryContainer);
    categoryContainer.innerHTML = categories
      .map(
        (c) => `<label class="flex items-center gap-2">
          <input type="checkbox" class="category-checkbox" name="categorie" data-id="${c.id}">
          ${c.name}
        </label>`,
      )
      .join("");
  } catch (err) {
    console.error(err);
  }
};

//---------- get checked categories Ids

export const getCheckedCategoriesIds = () => {
  const checkedCategories = categoryContainer.querySelectorAll(
    'input[type="checkbox"]:checked',
  );
  const values = Array.from(checkedCategories).map((input) => input.dataset.id);
  console.log(`${values}`);
  return values;
};



   
// export function getCheckedCategoryIds() {
//   if (!categoryContainer) {
//     throw new Error("Missing #categoriesContainer");
//   }let checkedCategoriesIds =  [...categoryContainer.querySelectorAll(".category-checkbox:checked")]
//     .map((checkbox) => checkbox.dataset.id);
//      console.log(checkedCategoriesIds)

//   return checkedCategoriesIds
// }
