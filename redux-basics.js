const redux = require('redux');

const initialstate = {
    counter: 0
};

const rootReducer = (state = initialstate, action) => {
    if (action.type === 'INC_COUNTER'){
        return {...state, counter: state.counter + 1};
    }

    if (action.type === 'ADD_COUNTER'){
        return {...state, counter: state.counter + action.value};
    }

    return state;
};

const store = redux.createStore(rootReducer);

store.subscribe(() => {
    console.log('[Subscriber]:', store.getState());
});

console.log('before:', store.getState());

store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});

console.log('after:', store.getState());