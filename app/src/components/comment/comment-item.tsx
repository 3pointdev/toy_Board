import moment from "moment";
import { ReactElement } from "react";
import { CommentDto } from "src/dto/comment.dto";

interface IProps {
  data: CommentDto;
}

/**
 * 댓글아이템
 * @param props.data 댓글정보
 */
export default function CommentItem(props: IProps): ReactElement {
  const { author, content, createdAt } = props.data;

  return (
    <div className="bg-white rounded-md shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600 text-sm font-medium">{author}</span>
        <span className="text-gray-400 text-xs">
          {moment(createdAt).format("YYYY년 MM월 DD일 HH시 mm분")}
        </span>
      </div>
      <p className="text-gray-700 text-sm mb-4">{content}</p>
    </div>
  );
}
