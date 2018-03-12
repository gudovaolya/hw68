import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-hw';

import './ToDoList.css';
import Task from "../../components/Task/Task";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import {addTask, changeValue, getTasks, removeTask} from "../../store/actions";
import withLoader from "../../hoc/withLoader/withLoader";

class ToDoList extends Component {

    componentDidMount() {
        this.props.getTasks();
    };

    showDate = (dateTime) => {
       return `${dateTime.substr(8,2)}
               ${dateTime.substr(4,3)}
               ${dateTime.substr(11,4)}`;
    };

    render() {

        let tasks = (
            <div>
                {
                    this.props.tasks.map((item) => {
                        return <Task
                            key={item.id}
                            task={item.taskText}
                            date={this.showDate(item.dateTime)}
                            remove={() => this.props.removeTask(item.id, this.props.history)}
                        />

                    })
                }
            </div>
        );

        return (
            <div className="container content">
                <AddTaskForm
                    value = {this.props.currentValue}
                    change={(event) => this.props.changeValue(event.target.value)}
                    click = {(event) => this.props.addTask(event, this.props.history)}
                />
                {tasks}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        currentValue: state.currentValue
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getTasks: () => dispatch(getTasks()),
        changeValue: (value) => dispatch(changeValue(value)),
        addTask: (event, history) => dispatch(addTask(event, history)),
        removeTask: (id, history) => dispatch(removeTask(id, history))
    }
};

export default withLoader(connect(mapStateToProps, mapDispatchToProps)(ToDoList), axios);

