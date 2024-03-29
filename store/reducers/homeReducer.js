import { LIKE_POST, LOAD_HOME_DATA, COMMENT_POST, SEND_POST, DELETE_COMMENT, DELETE_POST } from '../actions/homeActions';
import homePosts, { comments, likes } from '../../data/homePosts';
import HomePost from '../../models/homePost';

const availableLikes = likes.filter((l) => l.liker.id === 'studentUserId').map((l) => l.postId);

const initialState = {
	availablePosts: homePosts, //[], //this should initially be from the Async storage
	availableGeneralLikes: likes, //[] // use this for network
	availableLikes: availableLikes, //[]this is for the user and not general(network)
	availableComments: comments,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOAD_HOME_DATA: {
			return {
				...state,
				availablePosts: action.availablePosts,
			};
		}
		case LIKE_POST: {
			const prevGenLikes = [...state.availableGeneralLikes.reverse()];
			const alreadyLiked = !!prevGenLikes.find(
				(l) => l.postId === action.likeData.postId && l.liker.id === action.likeData.liker.id
			);
			const updatedGeneralLikes = !alreadyLiked
				? [...prevGenLikes.concat(action.likeData).reverse()]
				: [
						...prevGenLikes
							.filter(
								(l) => !(l.postId === action.likeData.postId && l.liker.id === action.likeData.liker.id)
							)
							.reverse(),
				  ];
			const userLikes = updatedGeneralLikes
				.filter((l) => l.liker.id === action.likeData.liker.id)
				.map((l) => l.postId);

			return {
				...state,
				availableGeneralLikes: updatedGeneralLikes,
				availableLikes: userLikes,
			};
		}
		case COMMENT_POST: {
			const prevComments = [...state.availableComments.reverse()];
			const commentedPost = [...state.availablePosts].find((p) => p.id === action.comment.ownPostId);
			const currentComment = action.comment;
			currentComment.type = commentedPost.type;

			return {
				...state,
				availableComments: [...prevComments.concat(currentComment).reverse()],
			};
		}
		case SEND_POST: {
			const prev = [...state.availablePosts];
			const updatedPosts = [
				...prev
					.filter((p) => p.id !== action.homePostItem.id)
					.concat(action.homePostItem)
					.sort((p1, p2) => p2.date.getTime() - p1.date.getTime()),
			];

			return {
				...state,
				availablePosts: updatedPosts,
			};
		}
		case DELETE_POST: {
				const prev = [...state.availablePosts];
				const updatedPosts = [
					...prev
						.filter((p) => p.id !== action.postId)
						.sort((p1, p2) => p2.date.getTime() - p1.date.getTime()),
				];

				return {
					...state,
					availablePosts: updatedPosts,
				};
		}
	}
	return state;
};
