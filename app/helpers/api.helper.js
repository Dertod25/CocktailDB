const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';
const generateUrl = (path, param) => `${apiUrl}${path}?c=${param}`;

export const fetchDrinks = async (param) => {
  const path = 'filter.php';
  try {
    const data = await fetch(generateUrl(path, param));
    const response = await data.json();
    let drinks = response.drinks.map((item) => ({
      id: item.idDrink,
      title: item.strDrink,
      urlImage: item.strDrinkThumb,
    }));
    return {title: param, data: drinks};
  } catch (error) {
    console.error(error);
  }
};
export const fetchCategories = async () => {
  const path = 'list.php';
  const filters = {};
  try {
    const data = await fetch(generateUrl(path, 'list'));
    const response = await data.json();
    let categories = response.drinks.map((item) => {
      let category = item.strCategory;
      filters[category] = {isSelected: true, isLoaded: false};
      return category;
    });
    return {categories, filters};
  } catch (error) {
    console.error(error);
  }
};
