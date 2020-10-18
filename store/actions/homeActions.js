import homePosts from '../../data/homePosts';
import HomePost from '../../models/homePost';
import HomeComment from '../../models/homeComment';

export const SEND_POST = 'SEND_POST';
export const DELETE_POST = 'DELETE_POST';
export const LIKE_POST = 'LIKE_POST';
//export const UNLIKE_POST ='UNLIKE_POST'
export const SHARE_POST = 'SHARE_POST';
export const LOAD_HOME_DATA = 'LOAD_HOME_DATA';
export const COMMENT_POST = 'COMMENT_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';



export const fetchHomeData = () => {
  //should comprise of announcements, news,  awards, general events, admin and authorized posts
  return ({
    type: LOAD_HOME_DATA,
    availablePosts: homePosts,
  });
};

export const sendPost = (postData) => {
  return ({
    type: SEND_POST,
    //postData: new HomePost (),
  });
};

export const deletePost = (postId, postAuthorId) => {
  return ({
    type: DELETE_POST,
    postId: postId,
    postAuthorId: postAuthorId,
  });
};

export const likePost = (postId, liker) => {
  return ({
    type: LIKE_POST,
    likeData:{
      id: Math.random().toString() + new Date().toLocaleDateString(),
      date: new Date(),
      postId,
      liker
    }
   
  });
};


export const commentPost = (postId, commentAuthor, authorType, text) => {
 // console.log('comment dispatched with', postId,commentAuthor.fullName,authorType,text)
  return ({
    type: COMMENT_POST,
    comment: new HomeComment(
      postId + new Date().toLocaleDateString()+ Math.random().toString(),
      postId,
      new Date(),
      authorType,
      commentAuthor,
      text
    ),
  });

};

export const deleteComment = (postId, commentAuthorId, commentId) => {
  return ({
    type: DELETE_COMMENT,
    postId: postId,
    commentId: commentId,
    commentAuthorId: commentAuthorId,
  });
};


export const sharePost = (postId) => {
  return ({
    type: SHARE_POST,
    postId: postId,
  });
};








// export const unLikePost = (postId) => {
//   return ({
//     type: UNLIKE_POST,
//     postId: postId,
//   });
// };

