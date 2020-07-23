import { combineReducers } from "redux";
import login from './login'
import currentUser from './currentUser'
import followingUsers from './followingUsers'
import followingChannels from './followingChannels'
import otherUser from './otherUser'
import channel from './channel'

const appReducer =  combineReducers({
    login: login,
    currentUser,
    followingChannels,
    followingUsers,
    otherUser,
    channel
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      state = undefined
    }
  
    return appReducer(state, action)
}

export default rootReducer