import {
    INCREMENT, DECREMENT, ADD, SUBTRACT, FETCH_COUNTER_SUCCESS, GET_TASKS_SUCCES,
    CHANGE_VALUE, FETCH_COUNTER_REQUEST, SAVE_COUNTER_SUCCESS

} from "./actions";

const initialState = {
    counter: 0,
    tasks: [],
    currentValue: '',
    loading: false
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case INCREMENT:
            return {...state, counter: state.counter + 1};
        case DECREMENT:
            return {...state, counter: state.counter - 1};
        case ADD:
            return {...state, counter: state.counter + action.amount};
        case SUBTRACT:
            return {...state, counter: state.counter - action.amount};
        case FETCH_COUNTER_REQUEST:
            return {...state, loading: true};
        case FETCH_COUNTER_SUCCESS:
            return {...state, counter: action.counter, loading: false};
        case SAVE_COUNTER_SUCCESS:
            return {...state,  counter: action.counter, loading: false};
        case GET_TASKS_SUCCES:
            return {...state, tasks: action.tasks};
        case CHANGE_VALUE:
            return {...state, currentValue: action.value};
        default:
            return state;
    }
};

export default reducer;

