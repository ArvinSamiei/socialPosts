export default (state={}, action) => {
    switch(action.type){
        case 'CHANNEL':
            return action.payload
        default:
            return state
    }
}