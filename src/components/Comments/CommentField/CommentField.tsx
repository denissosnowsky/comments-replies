import Button from "../../Button/Button";
import Image from "../../Image/Image";
import TextArea from "../../TextArea/TextArea";
import s from "./CommentField.module.sass";
import userLogo from "../../../assets/user.jpg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCommentThunk } from "../../../redux/commentsReducer";
import { userAvatar, userName } from "../../../config";
import { setErrorThunk } from "../../../redux/alertReducer";

const CommentField: React.FC = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleAddComment = () => {
    if (text) {
      dispatch(addCommentThunk(userName, text, +new Date() / 1000, userAvatar));
    } else {
      dispatch(setErrorThunk("Fill in the comment"));
    }
  };

  return (
    <div className={s.commentField__wrapper}>
      <Image height={"120px"} width={"120px"} image={userLogo} />
      <div className={s.commentField__infoField}>
        <TextArea
          placeholder={"Your message"}
          value={text}
          onChange={setText}
        />
        <div className={s.commentField__btnBlock}>
          <Button text={"Send"} onClick={handleAddComment} />
        </div>
      </div>
    </div>
  );
};

export default CommentField;
