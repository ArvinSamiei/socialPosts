export default (state=false, action) => {
    switch(action.type){
        case 'USER_LOGOUT':
            return action.payload
        default:
            return state
    }
}