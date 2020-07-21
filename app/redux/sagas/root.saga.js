import {all} from 'redux-saga/effects';
import drinksSaga from './drinks.saga';

export default function* rootSaga() {
  yield all([drinksSaga()]);
}
