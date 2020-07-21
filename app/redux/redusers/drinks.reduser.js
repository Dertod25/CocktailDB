import {
  GET_DRINK_CATEGORIES,
  GET_DRINK_CATEGORIES_SUCCESS,
  GET_DRINK_CATEGORIES_FAILURE,
  GET_CATEGORY_DRINKS,
  GET_CATEGORY_DRINKS_SUCCESS,
  GET_CATEGORY_DRINKS_FAILURE,
  REFRESH_DRINKS,
  REFRESH_DRINKS_SUCCESS,
  REFRESH_DRINKS_FAILURE,
  SWITCH_FILTERS,
  SWITCH_FILTERS_SUCCESS,
  SWITCH_FILTERS_FAILURE,
} from '../actions/drinks';
const initialState = {
  categories: [],
  filters: {},
  drinks: [],
  nextActualCategory: null,
  isLoading: false,
  isSplash: true,
  savedFilters: false,
  error: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DRINK_CATEGORIES:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DRINK_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: [...state.categories, ...action.data.categories],
        filters: {...state.filters, ...action.data.filters},
      };
    case GET_DRINK_CATEGORIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case GET_CATEGORY_DRINKS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CATEGORY_DRINKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSplash: false,
        drinks: [...state.drinks, action.data.drinks],
        filters: action.data.newFilters,
        nextActualCategory: action.data.nextActualCategory,
      };
    case GET_CATEGORY_DRINKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case REFRESH_DRINKS:
      return {
        ...state,
        isLoading: true,
      };
    case REFRESH_DRINKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        drinks: action.data.filteredDrinks,
        filters: action.data.newFilters,
        nextActualCategory: action.data.nextActualCategory,
      };
    case REFRESH_DRINKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case SWITCH_FILTERS:
      return {
        ...state,
        isLoading: true,
      };
    case SWITCH_FILTERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        savedFilters: true,
        filters: {...state.filters, ...action.data},
      };
    case SWITCH_FILTERS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
