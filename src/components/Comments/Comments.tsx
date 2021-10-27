import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../redux/store";
import Container from "../Container/Container";
import Comment from "./Comment/Comment";
import CommentField from "./CommentField/CommentField";
import s from "./Comments.module.sass";

interface CommentsPropsType {}

const Comments: React.FC<CommentsPropsType> = () => {
  const comments = useSelector((state: StateType) => state.commentsReducer.comments);
  
  return (
    <Container>
      <div className={s.wrapper}>
        <CommentField />
        {comments.map((item) => (
          <Comment key={item.id} data={item}/>
        ))}
      </div>
    </Container>
  );
};

export default Comments;
