const notiReducer = (state = {typeNoti: '', content:''}, action) => {
  if (action.type === 'INITIAL_NOTI') {
    return action.data
  }
  if (action.type === 'NOTIFICATION') {
    clearTimeout(action.delay);
    return state={content: action.data.content, typeNoti: action.data.type} ;
  }
  return state
}
export const setNoti = (content, type, delay) => {
  return async (dispatch) => {
    dispatch({
      type: "NOTIFICATION",
      data: {
        type: type,
        content: content,
        delay: setTimeout(() => {
          dispatch(initNoti());
        }, delay),
      },
    });
}}
export const initNoti = () => {
    return {
        type: "INITIAL_NOTI",
        data :{
          type: '',
          content:''
        }
    };
  };
export default notiReducer;
