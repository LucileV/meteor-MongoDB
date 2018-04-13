import React, { Component } from 'react';

import { withTracker} from 'meteor/react-meteor-data';

import { Tasks } from '../api/task.js';
import Task from './Task';

class App extends Component {

	constructor(props){
		super(props);

		this.state ={
			hideCompleted: false,
		}
	}

	toggleHideCompleted(){
		this.setState({
			hideCompleted: !this.state.hideCompleted,
		})
	}



	renderTasks(){

		let filteredTasks =  this.props.tasks;
		if(this.state.hideCompleted){
			filteredTasks = filteredTasks.filter(task => !task.checked);
		}

		return filteredTasks.map((tasks) => (
		
			<Task key={tasks._id} task={tasks} />

		));

	}

	handleSubmit(e){
		e.preventDefault();
		const text = e.target.textInput.value;
		Tasks.insert({

			text,
			createdAt: new Date(),
		});
		e.target.textInput.value = "";

	}


	render() {
		console.log(this.props)
		return (

			<div className="container"> 
				<header>
					<h1> My todo </h1>
					<label className="hide-complete">
						<input 
							type="checkbox"
							readOnly
							checked={this.state.hideCompleted}
							onClick={this.toggleHideCompleted.bind(this)}
						/>
						Hide completed Tasks
					</label>
				</header>
				<form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
					<input type="text" name="textInput" placeholder="insérer le texte"/>
				</form>
				<ul>
					{this.renderTasks()}
				</ul>
			</div>
		)
	}
}

export default withTracker(() => {

	return {
		tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
	}

})(App);