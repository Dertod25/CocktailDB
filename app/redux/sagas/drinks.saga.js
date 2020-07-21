import {put, takeEvery, select, takeLeading} from 'redux-saga/effects';
import {fetchCategories, fetchDrinks} from '../../helpers/api.helper';
import AsyncStorage from '@react-native-community/async-storage';
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

const refreshFiltersParam = (filters, category, param) => {
  let filter = {
    [category]: {
      ...filters[category],
      [param]: !filters[category][param],
    },
  };
  return {...filters, ...filter};
};
const getNextActualCategory = (categories, filters) => {
  let nextActualCategory = null;
  categories.map((category) => {
    if (
      !nextActualCategory &&
      filters[category].isSelected &&
      !filters[category].isLoaded
    ) {
      nextActualCategory = category;
    }
  });
  return nextActualCategory;
};

function* getCategories() {
  try {
    const result = yield fetchCategories();
    const filters = JSON.parse(
      yield AsyncStorage.getItem('@storage_coctailFilters')
    );
    let data;
    if (filters !== null) {
      data = {...result, filters};
    } else {
      data = result;
    }
    let category = getNextActualCategory(data.categories, data.filters);
    yield put({type: GET_DRINK_CATEGORIES_SUCCESS, data});
    yield put({type: GET_CATEGORY_DRINKS, category});
  } catch (e) {
    yield put({type: GET_DRINK_CATEGORIES_FAILURE, message: e.message});
  }
}
function* getDrinks(action) {
  try {
    const {category} = action;
    const {filters, categories} = yield select((state) => state.drinks);
    const drinks = yield fetchDrinks(category);
    const newFilters = refreshFiltersParam(filters, category, 'isLoaded');
    const nextActualCategory = getNextActualCategory(categories, newFilters);
    const data = {drinks, newFilters, nextActualCategory};

    yield put({type: GET_CATEGORY_DRINKS_SUCCESS, data});
  } catch (e) {
    yield put({type: GET_CATEGORY_DRINKS_FAILURE, message: e.message});
  }
}

function* refreshDrinks() {
  try {
    const {drinks, filters, categories} = yield select((state) => state.drinks);
    const newFilters = {...filters};
    const filteredDrinks = drinks.filter((drink) => {
      if (filters[drink.title].isSelected) {
        return drink;
      } else {
        newFilters[drink.title].isLoaded = false;
      }
    });
    const nextActualCategory = getNextActualCategory(categories, newFilters);
    const data = {filteredDrinks, newFilters, nextActualCategory};

    yield put({type: REFRESH_DRINKS_SUCCESS, data});
    if (filteredDrinks.length === 0 && nextActualCategory) {
      let category = nextActualCategory;
      yield put({type: GET_CATEGORY_DRINKS, category});
    }
  } catch (e) {
    yield put({type: REFRESH_DRINKS_FAILURE, message: e.message});
  }
}
function* switchFilters(action) {
  try {
    const data = action.filters;
    yield AsyncStorage.setItem('@storage_coctailFilters', JSON.stringify(data));
    yield put({type: SWITCH_FILTERS_SUCCESS, data});
  } catch (e) {
    yield put({type: SWITCH_FILTERS_FAILURE, message: e.message});
  }
}

function* drinksSaga() {
  yield takeLeading(GET_CATEGORY_DRINKS, getDrinks);
  yield takeEvery(GET_DRINK_CATEGORIES, getCategories);
  yield takeEvery(REFRESH_DRINKS, refreshDrinks);
  yield takeEvery(SWITCH_FILTERS, switchFilters);
}

export default drinksSaga;
