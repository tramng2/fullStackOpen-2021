const notiReducer = (state = '', action) => {
    if(action.type === 'INIT_NOTI') {
        const message= action.message
        return state = message
    }
    if(action.type === 'NOTIFICATION') {
        const message= action.message
        return state = message
    }
    return state
}
export const setNoti = (content) => {
    return {
        type: 'NOTIFICATION',
        message: content
    }
}
export const initNoti = () => {
    return {
        type: 'INIT_NOTI',
        message: ''
    }
}
export default notiReducer