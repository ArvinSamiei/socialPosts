export default (state=[], action) => {
    switch(action.type){
        case 'FOLLOWING_USERS':
            return action.payload
        default:
            return state
    }
}