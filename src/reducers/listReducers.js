import { getActionStates, loadingState, errorState, successState } from '../Utitlity'
import { GET_LIST } from '../actions/listActions';


export function listResponse(state={}, action){

	switch(action.type){
		case getActionStates(GET_LIST).success:
			return {
				...successState, data: action.data
			}
		case getActionStates(GET_LIST).inProgress:
			return{
				...loadingState, loading: action.isLoading
			}
		case getActionStates(GET_LIST).failure:
			return{
				...errorState,error: action.error
			}
		default:
			return state
	}
}