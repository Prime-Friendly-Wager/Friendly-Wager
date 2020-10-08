import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getMyActiveBets(){
    try {
        let response = yield axios.get('/api/bets/my-bets/active');
        yield put({type: 'SAVE_ACTIVE_BETS', payload: response.data})
    }catch(error){
        console.log("ERROR IN GET ACTIVE BETS SAGA: ", error)
    }
}

function* myBetSaga(){
    yield takeEvery('GET_MY_ACTIVE_BETS', getMyActiveBets);
    
}

export default myBetSaga;