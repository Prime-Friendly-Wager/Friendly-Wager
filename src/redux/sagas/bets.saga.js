import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//sending bet to router
function* postBet(action) {
  try {
    yield axios.post('/api/bets', action.payload);
    yield fetchGameDetailsMyBets({ payload: action.payload.game_id });
  } catch (error) {
    console.log('ERROR POSTING BET', error);
  }
};

//this is for 3.2 my bets, open bets
function* fetchGameDetailsMyBets(action) {
    try {
        let response = yield axios.get(`/api/bets/details/my-bets/open/${action.payload}`);
        yield put({type: 'SAVE_OPEN_BETS', payload: response.data});
      } catch (error) {
        console.log('ERROR GETTING GAME DETAILS MY BETS OPEN BETS', error);
      }
};

//requesting 3.1 bets
function* fetchGameOpenBets(action) {
  try {
    const response = yield axios.get(`/api/bets/details/open/${action.payload}`);

    yield put({type: 'SAVE_OPEN_BETS', payload: response.data})

  } catch (error) {
    console.log('ERROR FETCHING INDIVIDUAL GAME OPEN BETS', error);
  }
}

function* betsSaga() {
  yield takeLatest('POST_BET', postBet);
  yield takeLatest('FETCH_GAME_DETAILS_MY_BETS', fetchGameDetailsMyBets)
  yield takeLatest('FETCH_GAME_OPEN_BETS', fetchGameOpenBets);
};

export default betsSaga;
