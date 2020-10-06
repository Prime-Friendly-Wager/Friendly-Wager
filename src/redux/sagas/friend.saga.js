import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getUsersForFriend(action){
    try{
        let response = yield axios.get(`/api/friend/${action.payload}`);
        yield put({type: 'SAVE_USERS', payload: response.data})
    }catch(error){
        console.log('ERROR IN GET USERS SAGA:', error);
    }
}


function* friendSaga(){
    yield takeEvery('GET_USERS', getUsersForFriend)
}

export default friendSaga;

