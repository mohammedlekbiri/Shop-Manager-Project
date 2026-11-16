import { categoriesurl } from "./main.js";
import { categoryContainer } from "./DOM&UI.js";
export const renderCategories = async () => {
  try {
    const res = await fetch(categoriesurl);
    if (!res.ok) console.error(`HTTP ${res.status}`);
    const categories = await res.json();

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
