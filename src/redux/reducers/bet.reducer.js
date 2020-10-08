import { combineReducers } from 'redux'

const activeBetReducer = (state = [], action) => {
    switch (action.type) {
        case 'SAVE_ACTIVE_BETS':
            return action.payload;
        default:
            return state;
    }
}

const completedBetReducer = (state = [], action) => {
    switch(action.type) {
        case 'SAVE_COMPLETED_BETS':
            return action.payload;
        default:
            return state;
    }
}

const betReducer = combineReducers({
    activeBetReducer,
    completedBetReducer
})

export default betReducer;