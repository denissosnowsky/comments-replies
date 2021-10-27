import { ThunkAction } from "redux-thunk";
import { commentsAPI, repliesAPI } from "../api/api";
import { CommentType, ReplyType } from "../types/types";
import { StateType } from "./store";

const GET_COMMENTS = "GET_COMMENTS";
const GET_REPLIES = "GET_REPLIES";
const IS_FETCHING = "IS_FETCHING";

export type initialStateType = {
  comments: Array<CommentType>;
  replies: Array<ReplyType>;
  isFetching: boolean;
};

const initialState = {
  comments: [],
  replies: [],
  isFetching: false,
};

type ActionsType = GetCommentsACType | IsFetchingACType | GetRepliesACType;

const commentsReducer = (
  state: initialStateType = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.data,
      };
    case GET_REPLIES: {
      return {
        ...state,
        replies: action.data,
      };
    }
    case IS_FETCHING:
      return {
        ...state,
        isFetching: action.data,
      };
    default:
      return state;
  }
};

type IsFetchingACType = {
  type: typeof IS_FETCHING;
  data: boolean;
};
export const isFetchingAC = (data: boolean): IsFetchingACType => ({
  type: IS_FETCHING,
  data,
});

type GetCommentsACType = {
  type: typeof GET_COMMENTS;
  data: Array<CommentType>;
};
export const getCommentsAC = (data: Array<CommentType>): GetCommentsACType => ({
  type: GET_COMMENTS,
  data,
});

type GetRepliesACType = {
  type: typeof GET_REPLIES;
  data: Array<ReplyType>;
};
export const getRepliesAC = (data: Array<ReplyType>): GetRepliesACType => ({
  type: GET_REPLIES,
  data,
});

export const getCommentsThunk =
  (): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    dispatch(isFetchingAC(true));
    const res = await commentsAPI.getComments();

    if (res) {
      dispatch(getCommentsAC(res));
    }

    dispatch(isFetchingAC(false));
  };

export const getRepliesThunk =
  (): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    dispatch(isFetchingAC(true));
    const res = await repliesAPI.getReplies();

    if (res) {
      dispatch(getRepliesAC(res));
    }

    dispatch(isFetchingAC(false));
  };

export const addCommentThunk =
  (
    name: string,
    body: string,
    date: number,
    avatar: string
  ): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    const res = await commentsAPI.addComment(name, body, date, avatar);

    if (res) {
      dispatch(getCommentsThunk());
    }
  };

export const deleteCommentThunk =
  (id: number): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    const resComments = await commentsAPI.deleteComment(id);
    const resReplies = await repliesAPI.deleteReplies(id);

    if (resComments) {
      dispatch(getCommentsThunk());
    }

    if(!resReplies){
      console.log("Error");
    }
  };

export const changeCommentThunk =
  (
    id: number,
    name: string,
    body: string,
    date: number,
    avatar: string
  ): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    const res = await commentsAPI.changeComment(id, name, body, date, avatar);

    if (res) {
      dispatch(getCommentsThunk());
    }
  };

export const addReplyThunk =
  (
    id: number,
    name: string,
    body: string,
    date: number,
    avatar: string
  ): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    const res = await repliesAPI.postReply(id, name, body, date, avatar);

    if (res) {
      dispatch(getRepliesThunk());
    }
  };

export default commentsReducer;
