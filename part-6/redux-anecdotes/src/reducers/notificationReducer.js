const notiReducer = (state = "", action) => {
  if (action.type === "INIT_NOTI") {
    return action.message;
  }
  if (action.type === "NOTIFICATION") {
    clearTimeout(action.delay);
    const message = action.data.content;
    return (state = message);
  }
  return state;
};
export const setNoti = (content, delay) => {
  return async (dispatch) => {
    dispatch({
      type: "NOTIFICATION",
      data: {
        content: content,
        delay: setTimeout(() => {
          dispatch(initNoti());
        }, delay),
      },
    });
  };
};
export const initNoti = () => {
  return {
    type: "INIT_NOTI",
    message: "",
  };
};
export default notiReducer;
