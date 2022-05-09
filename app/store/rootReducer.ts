import { reducer as toastrReducer } from 'react-redux-toastr'
import { reducer as userReducer } from './user/userSlice'

export const reducers = {
	user: userReducer,
	toastr: toastrReducer,
}
