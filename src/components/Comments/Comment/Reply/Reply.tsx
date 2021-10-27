import { ReplyType } from "../../../../types/types";
import Image from "../../../Image/Image";
import s from "./Reply.module.sass";
import moment from 'moment';

interface ReplyPropsType {
  data: ReplyType;
  commentAuthor: string;
}

const Reply: React.FC<ReplyPropsType> = ({ data, commentAuthor }) => {
  return (
    <div className={s.reply__wrapper}>
      <Image height={"88px"} width={"88px"} image={data.avatar} />
      <div className={s.reply__infoBlock}>
        <div className={s.reply__infoBlock_header}>
          <span>{data.name}</span>
          <span>{`to ${commentAuthor}`}</span>
          <span>{moment.unix(data.date).format("YYYY-MM-DD")}</span>
        </div>
        <div className={s.reply__infoBlock_body}>{data.body}</div>
      </div>
    </div>
  );
};

export default Reply;
