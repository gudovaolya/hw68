import axios from '../axios-hw';


export const START_REQUEST = 'START_REQUEST';
export const REQUEST_ERROR = 'REQUEST_ERROR';

export const startRequest = () => {
    return { type: START_REQUEST};
};

export const requestError = () => {
    return { type: REQUEST_ERROR};
};

/* Counter */
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';

export const FETCH_COUNTER_REQUEST = 'FETCH_COUNTER_REQUEST';
export const FETCH_COUNTER_SUCCESS = 'FETCH_COUNTER_SUCCESS';
export const SAVE_COUNTER_SUCCESS = 'FETCH_COUNTER_SUCCESS';

export const incrementCounter = () => {
    return { type: INCREMENT };
};

export const decrementCounter = () => {
    return { type: DECREMENT };
};

export const addCounter = (amount) => {
    return { type: ADD, amount};
};

export const subtractCounter = (amount) => {
    return { type: SUBTRACT, amount};
};

export const fetchCounterRequest = () => {
    return { type: FETCH_COUNTER_REQUEST };
};

export const fetchCounterSuccess = (counter) => {
    return { type: FETCH_COUNTER_SUCCESS, counter};
};

export const fetchCounter = () => {
    return dispatch => {
        dispatch(fetchCounterRequest());
        axios.get('/counter.json').then(response => {
            dispatch(fetchCounterSuccess(response.data));
        }, error => {
            dispatch(requestError());
        })
    }
};

export const saveCounterSucces = (counter) => {
    return {type: SAVE_COUNTER_SUCCESS, counter}
};

export const saveCounter = () => {
    return (dispatch, getState) => {
       dispatch(fetchCounterRequest());
       const counter = getState().counter;
       axios.put('/counter.json', counter).then(() => {
           dispatch(saveCounterSucces(counter))
       });
    }
};

/* ToDoList */
export const GET_TASKS_SUCCES = 'GET_TASKS_SUCCES';
export const CHANGE_VALUE = 'CHANGE_VALUE';
export const ADD_TASK_SUCCES = 'ADD_TASK_SUCCES';
export const REMOVE_TASK_SUCCES = 'REMOVE_TASK_SUCCES';

export const getTasksSuccess = (tasksData) => {
    let tasks = [];
    for (let key in tasksData) {
        tasksData[key].id = key;
        tasks.push(tasksData[key]);
    }
    return { type: GET_TASKS_SUCCES, tasks};
};

export const getTasks = () => {
    return dispatch => {
        dispatch(startRequest());
        axios.get('/tasks.json').then(response => {
            dispatch(getTasksSuccess(response.data));
        }, error => {
            dispatch(requestError());
        })
    }
};

export const changeValue = (value) => {
    return { type: CHANGE_VALUE, value};
};

export const addTaskSuccess = (task, tasks) => {
    return { type: ADD_TASK_SUCCES, task, tasks};
};

export const  addTask = (event, history) => {
    event.preventDefault();
    return (dispatch, getState) => {
        dispatch(startRequest());
        const currentValue = getState().currentValue;
        const tasks = getState().tasks;
        let task = {
            taskText: currentValue,
            dateTime:   `${new Date()}`
        };
        axios.post('/tasks.json', task).then(response => {
            task.id = response.data.name;
            tasks.push(task);
            dispatch(addTaskSuccess(task, tasks));
        }, error => {
            dispatch(requestError());
        }).finally(() => {
           history.push('/todolist');
        })
    }
};

export const removeTaskSuccess = (tasks) => {
    return { type: REMOVE_TASK_SUCCES, tasks};
};

export const removeTask = (id, history) => {
    return (dispatch, getState) => {
        dispatch(startRequest());
        const tasks = getState().tasks;
        const index = tasks.findIndex(item => item.id === id);
        tasks.splice(index,1);
        axios.delete('tasks/' + id + '.json').then(() => {
            dispatch(removeTaskSuccess(tasks))
        }, error => {
            dispatch(requestError());
        }).finally(() => {
            history.push('/todolist');
        })
    }
};






