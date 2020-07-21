export const GET_DRINK_CATEGORIES = 'GET_DRINK_CATEGORIESS';
export const GET_DRINK_CATEGORIES_SUCCESS = 'GET_DRINK_CATEGORIES_SUCCESS';
export const GET_DRINK_CATEGORIES_FAILURE = 'GET_DRINK_CATEGORIES_FAILURE';
export const GET_CATEGORY_DRINKS = 'GET_CATEGORY_DRINKS';
export const GET_CATEGORY_DRINKS_SUCCESS = 'GET_CATEGORY_DRINKS_SUCCESS';
export const GET_CATEGORY_DRINKS_FAILURE = 'GET_CATEGORY_DRINKS_FAILURE';
export const REFRESH_DRINKS = 'REFRESH_DRINKS';
export const REFRESH_DRINKS_SUCCESS = 'REFRESH_DRINKS_SUCCESS';
export const REFRESH_DRINKS_FAILURE = 'REFRESH_DRINKS_FAILURE';
export const SWITCH_FILTERS = 'SWITCH_FILTERS';
export const SWITCH_FILTERS_SUCCESS = 'SWITCH_FILTERS_SUCCESS';
export const SWITCH_FILTERS_FAILURE = 'SWITCH_FILTERS_FAILURE';

export function getDrinkCategories() {
  return {
    type: GET_DRINK_CATEGORIES,
  };
}

export function getCategoryDrinks(category) {
  return {
    type: GET_CATEGORY_DRINKS,
    category,
  };
}
export function switchFilters(filters) {
  return {
    type: SWITCH_FILTERS,
    filters,
  };
}
export function refreshDrinks() {
  return {
    type: REFRESH_DRINKS,
  };
}
