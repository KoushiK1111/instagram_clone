const initialState = {
    currentuser: null,
    posts: [],
    following: [],
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CURRENT_USER':
            return { ...state, currentuser: action.payload }
        case 'USER_POSTS_STATE_CHANGE':
            return { ...state, posts: action.payload }
        case 'USER_FOLLOWING_STATE_CHANGE':
            return {
                ...state,
                following: action.following
            }
        default:
            return state
    }
};

export default Reducer