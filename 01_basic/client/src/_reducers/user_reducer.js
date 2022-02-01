import { 
    LOGIN_USER
} from '../_actions/types'

export default function (state = {}, action) {
    switch(action.tpye) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            break;
            
        default:
            return state;
    }
}