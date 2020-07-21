export default (state=[], action) => {
    switch(action.type){
        case 'FOLLOWING_CHANNELS':
            return action.payload
        default:
            return state
    }
}