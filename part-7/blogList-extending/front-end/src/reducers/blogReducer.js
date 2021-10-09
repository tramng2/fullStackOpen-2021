import blogsService from '../services/blogs'

const blogReducer = (state =[], action) => {
    switch(action.type) {
        case 'INITBLOGS': 
        return state = action.data
        default: return state
    }

}
export const initBlogs = () =>{
    return async (dispatch) => {
        const initBlogs = await blogsService.getAll()
        dispatch({
            type: 'INITBLOGS',
            data: initBlogs
        })
    }
}
export default blogReducer