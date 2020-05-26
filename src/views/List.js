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
import Edit from './Edit';

class ListUser extends Component{

	constructor(props){
		super(props)
		this.state = {
			list: [],
			open: false
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
	toggleDialog = ()=>{
		this.setState({
			open: !this.state.open
		})
	}

	edit = (ind, editObject)=>{
		let list = [...this.state.list];
		list[ind] = editObject;
		this.setState({
			list: [...list],
			open: !this.state.open
		})
	}

	delete = (ind)=>{
		this.setState({
			list: [...this.state.list.filter((entity, i) => i != ind)]
		})
	}
	render(){ 	

		return <div className="list">
				<List component="nav">
					{this.state.list.map((entity, ind) => {
						return <ListItem button>
								<Edit index={ind} data={entity} edit={this.edit} open={this.state.open} toggle={this.toggleDialog} />
								<ListItemAvatar>
									<Avatar src={entity.avatar} />
								</ListItemAvatar>
								<ListItemText primary={entity.first_name + ' ' + entity.last_name} secondary={entity.email} />
								<ListItemSecondaryAction>
									<IconButton edge="end" aria-label="edit">
										<EditIcon onClick={this.toggleDialog} />
									</IconButton>
									<IconButton edge="end" aria-label="delete">
										<DeleteIcon onClick={()=> this.delete(ind)}/>
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