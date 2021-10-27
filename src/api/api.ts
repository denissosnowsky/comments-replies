import axios from "axios";
import { apiUrl } from "../config";
import { CommentMutationType, CommentType, ReplyType } from "../types/types";

const instance = axios.create({
  baseURL: apiUrl,
});

export const commentsAPI = {
  async getComments() {
    try {
      const res = await instance.get<Array<CommentType>>(
        "/comments?_embed=replies"
      );

      return res.data;
    } catch (e) {
      return false;
    }
  },
  async addComment(name: string, body: string, date: number, avatar: string) {
    try {
      const res = await instance.post<CommentMutationType>("/comments", {
        name,
        body,
        date,
        avatar,
      });
      return res.data;
    } catch (e) {
      return false;
    }
  },
  async changeComment(
    id: number,
    name: string,
    body: string,
    date: number,
    avatar: string
  ) {
    try {
      const res = await instance.put<CommentMutationType>(`/comments/${id}`, {
        name,
        body,
        date,
        avatar,
      });
      return res.data;
    } catch (e) {
      return false;
    }
  },
  async deleteComment(id: number) {
    try {
      const res = await instance.delete<CommentMutationType>(`/comments/${id}`);
      return res.data;
    } catch (e) {
      return false;
    }
  },
};

export const repliesAPI = {
  async getReplies(){
    try{
      const res = await instance.get<Array<ReplyType>>(
        "/replies"
      );

      return res.data;
    }catch (e) {
      return false;
    }
  },
  async postReply(
    id: number,
    name: string,
    body: string,
    date: number,
    avatar: string
  ) {
    try {
      const res = await instance.post<ReplyType>(`/comments/${id}/replies`, {
        commentId: id,
        name,
        body,
        date,
        avatar,
      });
      return res.data;
    } catch (e) {
      return false;
    }
  },
  async deleteReply(id: number){
    try {
      const res = await instance.delete<ReplyType>(`/comments/replies/${id}`);
      return res.data;
    } catch (e) {
      return false;
    }
  },
  async deleteReplies(commentId: number){
    try{
      const res = await instance.get<Array<ReplyType>>(`replies?commentId=${commentId}`);

      const ids = res.data.map(item => item.id);

      for(let i = 0; i < ids.length; i++){
        await this.deleteReply(ids[i]);
      }

      return true;

    }catch (e) {
      return false;
    }
  }
};
