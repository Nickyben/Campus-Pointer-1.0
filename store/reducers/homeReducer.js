import { LIKE_POST, LOAD_HOME_DATA } from "../actions/homeActions";

const initialState = {
  availablePosts: [],
  availableLikes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    
    case LIKE_POST:
      const currentPost = state.availablePosts.find(post => post.id === action.postId);
      currentPost.likes = action.liked ? +currentPost.likes + 1 : +currentPost.likes - 1;
      return ({
        ...state,
        availablePosts: state.availablePosts.map(post => post.id === action.postId ? currentPost : post),
        availableLikes: state.availableLikes.includes(action.postId) ?
          state.availableLikes.filter(postId=> postId !== action.postId) :
          state.availableLikes.concat(action.postId),
      });
      
    case LOAD_HOME_DATA:
      return (
        {
          ...state,
          availablePosts: action.availablePosts,

        }
      );
  }
  return (state);
}