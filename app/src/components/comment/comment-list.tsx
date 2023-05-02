import { ReactElement } from "react";
import { CommentDto } from "src/dto/comment.dto";
import CommentItem from "./comment-item";

interface IProps {
  list: CommentDto[];
}

/**
 * 댓글리스트
 * @param props.post 게시물 정보 객체
 */
export default function CommentList(props: IProps): ReactElement {
  const { list } = props;

  return (
    <div>
      {list.map((data: CommentDto, key: number) => {
        return <CommentItem key={`comment_${key}`} data={data} />;
      })}
    </div>
  );
}
