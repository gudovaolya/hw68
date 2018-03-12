import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Counter.css';

import {
    addCounter, decrementCounter, fetchCounter, incrementCounter, saveCounter,
    subtractCounter
} from "../../store/actions";
import Spinner from '../../components/UI/Spinner/Spinner';

class Counter extends Component {

    componentDidMount () {
        this.props.fetchCounter();
    }

    render () {

        let counter =  <span>{this.props.ctr}</span>;

        if (this.props.loading) {
           counter = <Spinner/>
        }

        return (
            <div className="Counter">
                <h1>{counter}</h1>
                <button onClick={this.props.increaseCounter}>Increase</button>
                <button onClick={this.props.decreaseCounter}>Decrease</button>
                <button onClick={this.props.addCounter}>Increase by 5</button>
                <button onClick={this.props.subtractCounter}>Decrease by 5</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.counter,
        loading: state.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        increaseCounter: () => {dispatch(incrementCounter());dispatch(saveCounter())},
        decreaseCounter: () => {dispatch(decrementCounter()); dispatch(saveCounter())},
        addCounter: () => {dispatch(addCounter(5)); dispatch(saveCounter())},
        subtractCounter: () => {dispatch(subtractCounter(5)); dispatch(saveCounter())},
        fetchCounter: () => dispatch(fetchCounter())

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
