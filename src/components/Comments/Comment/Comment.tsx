import { createRef, useRef, useState } from "react";
import { CommentType } from "../../../types/types";
import Button from "../../Button/Button";
import Image from "../../Image/Image";
import TextArea from "../../TextArea/TextArea";
import s from "./Comment.module.sass";
import Reply from "./Reply/Reply";
import moment from "moment";
import {
  addReplyThunk,
  changeCommentThunk,
  deleteCommentThunk,
} from "../../../redux/commentsReducer";
import { useDispatch, useSelector } from "react-redux";
import { userAvatar, userName } from "../../../config";
import { StateType } from "../../../redux/store";
import { setErrorThunk } from "../../../redux/alertReducer";

interface CommentPropsType {
  data: CommentType;
}

const Comment: React.FC<CommentPropsType> = ({ data }) => {
  const [text, setText] = useState("");
  const [inputText, setInputText] = useState(data.body);
  const [openReply, setOpenReply] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();
  const replies = useSelector((state: StateType) => state.commentsReducer.replies);

  const handleOpenReply = () => {
    setOpenReply(true);
    openEdit && setOpenEdit(false);
  };
  const handleCloseReply = () => {
    setOpenReply(false);
    setText("");
  };

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };
  const handleSaveEdit = () => {
    if (inputText) {
      dispatch(
        changeCommentThunk(
          data.id,
          data.name,
          inputText,
          +new Date() / 1000,
          data.avatar
        )
      );
    } else {
      dispatch(setErrorThunk("Fill in the comment"));
    }
  };
  const handleCancelEdit = () => {
    setInputText(data.body);
    setOpenEdit(false);
  };

  const handleDeleteComment = () => {
    dispatch(deleteCommentThunk(data.id));
  };

  const handleAddReply = () => {
    if (text) {
      dispatch(
        addReplyThunk(data.id, userName, text, +new Date() / 1000, userAvatar)
      );
      setText("");
    } else {
      dispatch(setErrorThunk("Fill in the reply"));
    }
  };

  return (
    <div className={s.comment__wrapper}>
      <Image height={"120px"} width={"120px"} image={data.avatar} />
      <div className={s.comment__infoBlock}>
        <div className={s.comment__infoBlock_name}>
          <span>{data.name}</span>
          <span>{moment.unix(data.date).format("YYYY-MM-DD")}</span>
        </div>
        {openEdit ? (
          <TextArea
            value={inputText}
            onChange={setInputText}
            placeholder=""
            style={{ width: "100%" }}
            makeFocus={true}
          />
        ) : (
          <div className={s.comment__infoBlock_body}>{data.body}</div>
        )}
        <div className={s.comment__infoBlock_btns}>
          {openEdit ? (
            <>
              <span onClick={handleSaveEdit} style={{ color: "green" }}>
                Save
              </span>
              <span onClick={handleCancelEdit} style={{ color: "red" }}>
                Cancel
              </span>
            </>
          ) : (
            <span onClick={handleOpenEdit}>Edit</span>
          )}
          <span onClick={handleDeleteComment}>Delete</span>
          <span onClick={handleOpenReply}>Reply</span>
        </div>
        {openReply && (
          <div className={s.comment__infoBlock_writeField}>
            <div className={s.comment__infoBlock_writeField_header}>
              <span>{`to ${data.name}`}</span>
              <span onClick={handleCloseReply}>Cancel</span>
            </div>
            <TextArea
              placeholder={"Your message"}
              style={{ width: "100%" }}
              value={text}
              onChange={setText}
            />
            <div className={s.comment__infoBlock_writeField_btnBlock}>
              <Button text={"Send"} onClick={handleAddReply} />
            </div>
          </div>
        )}
        {
          <div className={s.comment__infoBlock_repliesWrapper}>
            {replies
              .filter((item) => +item.commentId === data.id)
              .map((newItem) => (
                <Reply
                  key={newItem.id}
                  data={newItem}
                  commentAuthor={data.name}
                />
              ))}
          </div>
        }
      </div>
    </div>
  );
};

export default Comment;
