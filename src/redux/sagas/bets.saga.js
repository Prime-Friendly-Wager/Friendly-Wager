import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postBet(action) {
  try {
    console.log('SAGA BET', action.payload);
    yield axios.post('/api/bets', action.payload);

  } catch (error) {
    console.log('ERROR POSTING BET', error);
  }
}

function* betsSaga() {
  yield takeLatest('POST_BET', postBet);
}

export default betsSaga;
