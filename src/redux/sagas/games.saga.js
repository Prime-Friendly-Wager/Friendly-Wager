import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchGames() {
  try {
    let response = yield axios.get('/api/games');
    console.log(response);
  } catch (error) {
    console.log('ERROR FETCHING GAMES', error);
  }
}

function* gamesSaga() {
  yield takeLatest('FETCH_GAMES', fetchGames);
}

export default gamesSaga;
