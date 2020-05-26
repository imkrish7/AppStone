import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getList } from '../actions/listActions';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class ListUser extends Component{

	constructor(props){
		super(props)
		this.state = {
			list: [],
			open: false,
			editInd: null,
			first_name: null,
			last_name: null,
			avatar: null,
			email: null
		}
	}

	componentDidMount(){
		this.props.getList({})
	}
	componentDidUpdate(prevProps){
	if(prevProps.listResponse.data != this.props.listResponse.data){
			
		this.setState({
				list: [...this.props.listResponse.data.data]
			})
		}
	}

	editToggle = (ind)=>{
		let obj = {...this.state.list[ind]}

		this.setState({
			open: !this.state.open,
			editInd: ind, 
			first_name: obj.first_name,
			last_name: obj.last_name,
			email: obj.email,
			avatar: obj.avatar
		})
	}

	closeToggle = ()=>{
		this.setState({
			open: !this.state.open
		})
	}

	handleChange = (e)=>{
		const { name, value} = e.target;
		this.setState({
			[name]: value
		})
	}

	edit = ()=>{
		let ind = this.state.editInd;
		let list = [...this.state.list]
		list[ind].first_name = this.state.first_name;
		list[ind].last_name = this.state.last_name;
		list[ind].email = this.state.email;
		this.setState({
			list: [...list],
			editInd: null,
			open: !this.state.open,
			first_name: null,
			last_name: null,
			avatar: null,
			email: null,
		});
	}

	delete = (ind)=>{
		this.setState({
			list: this.state.list.filter((entity, i) => i!=ind)
		})
	}
	render(){ 	
		// console.log(this.state)
		return <div className="list">
				{this.state.open && <Dialog open={this.state.open} onClose={this.closeToggle}>
						<DialogTitle>Edit</DialogTitle>
						<DialogContent>
							<ListItem button>
								<ListItemAvatar>
									<Avatar src={this.state.avatar} />
								</ListItemAvatar>
							</ListItem>
							<TextField onChange={this.handleChange} value={this.state.first_name} name="first_name" label="First Name" type="text" fullWidth />
							<TextField onChange={this.handleChange} value={this.state.last_name} name="last_name" label="Last Name" type="text" fullWidth />
							<TextField onChange={this.handleChange} value={this.state.email} name="email" label="Email" type="email" fullWidth />
						</DialogContent>
						<DialogActions>
							<Button onClick={this.closeToggle} color="primary">
								Cancel
							</Button>
							<Button onClick={this.edit} color="primary">
								Edit
							</Button>
						</DialogActions>
					</Dialog>}
				<List component="nav">
					{this.state.list.map((entity, ind) => {
						return <ListItem key={ind} button>
								<ListItemAvatar>
									<Avatar src={entity.avatar} />
								</ListItemAvatar>
								<ListItemText primary={entity.first_name + ' ' + entity.last_name} secondary={entity.email} />
								<ListItemSecondaryAction>
									<IconButton onClick={() =>this.editToggle(ind)} edge="end" aria-label="edit">
										<EditIcon />
									</IconButton>
									<IconButton onClick={() => this.delete(ind)} edge="end" aria-label="delete">
										<DeleteIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>;
					})}
				</List>
			</div>; 
	}
}

const mapStateToProps = (state)=>{
	return {
		listResponse: state.listResponse
	}
}

const mapDispatchToProps= dispatch => {
	return { 
		getList: params => dispatch(getList(params))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);