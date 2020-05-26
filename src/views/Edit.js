import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

class Edit extends Component{

	constructor(props){
		super(props)
		this.state={
			first_name: "",
			last_name: "",
			email: ""
		}
	}

	componentDidMount(){
		this.setState({
			first_name: this.props.data.first_name,
			last_name: this.props.data.last_name,
			email: this.props.data.email
		})
	}

	handleChange = (e)=>{
		const {name, value } = e.target;
		this.setState({
			[name]: value
		})
	}

	edit = ()=>{
		let edit = {
			id: this.props.data.id,
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			avatar: this.props.data.avatar
		}

		this.props.edit(this.props.index, edit);
	}

	render(){
		return <Dialog open={this.props.open} onClose={this.props.toggle}>
				<DialogTitle>Edit</DialogTitle>
				<DialogContent>
					<ListItem button>
						<ListItemAvatar>
							<Avatar src={this.props.data.avatar} />
						</ListItemAvatar>
					</ListItem>
					<TextField onChange={this.handleChange} name="first_name" value={this.state.first_name} label="First Name" type="text" fullWidth />
					<TextField onChange={this.handleChange} name="last_name" value={this.state.last_name} label="Last Name" type="text" fullWidth />
					<TextField onChange={this.handleChange} name="email" value={this.state.email} label="Email" type="email" fullWidth />
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.toggle} color="primary">
						Cancel
					</Button>
					<Button onClick={this.edit} color="primary">
						Edit
					</Button>
				</DialogActions>
			</Dialog>;
	}
}

export default Edit;