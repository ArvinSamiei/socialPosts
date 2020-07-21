import { combineReducers } from "redux";
import login from './login'
import currentUser from './currentUser'
import followingUsers from './followingUsers'
import followingChannels from './followingChannels'
import otherUser from './otherUser'

export default combineReducers({
    login: login,
    currentUser,
    followingChannels,
    followingUsers,
    otherUser
});
