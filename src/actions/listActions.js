import { getActionStates } from '../Utitlity'
import axios from 'axios';


const apiRequest  = (dispatch, params, path, actionLoading, actionSuccess, actionError)=>{

	const Headers = {
		"Content-Type": "application/json" 
	}

	const reqObj = {
		"method": "GET",
		"url": path,
		"header": Headers,
		"data": params
	}

	if(actionLoading){
		dispatch(actionLoading(true))
	}

	axios(reqObj).then(res=>{

		if (actionLoading) {
			dispatch(actionLoading(false));
		}

		if(res.data){
			dispatch(actionSuccess(res.data))
		}
	}).catch(error=>{
			if (actionError) {
				dispatch(actionError(error.response.data));
			}

	})	
}

export const GET_LIST = "GET_LIST"


export const listLoading = (isLoading)=>{

	return { type: getActionStates(GET_LIST).inProgress, isLoading}
}

export const listErrored = (error)=>{
	return { type: getActionStates(GET_LIST).failure, error}
}

export const listSuccess = (data)=>{
	return { type: getActionStates(GET_LIST).success, data}
}

export const getList = (params)=>{
	let url = 'https://reqres.in/api/users?page=2';
	return dispatch => apiRequest(dispatch, params,url, listLoading, listSuccess, listErrored) 
}