import homePosts from '../../data/homePosts';


export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST ='UNLIKE_POST'
export const SHARE_POST = 'SHARE_POST';
export const LOAD_HOME_DATA = 'LOAD_HOME_DATA';



export const fetchHomeData = () => {
  //should comprise of announcements, news,  awards, general events, admin and authorized posts
  return ({
    type: LOAD_HOME_DATA,
    availablePosts: homePosts,
  });
}

export const likePost = (postId, liked)=>{
  //console.log(postId);
  return({ 
    type: LIKE_POST,
    postId: postId,
    liked: liked,
  });
};


export const unLikePost = (postId) => {
  return ({
    type: UNLIKE_POST,
    postId: postId,
  });
};

export const sharePost = (postId) => {
  return ({
    type: SHARE_POST,
    postId:postId,
  });
};