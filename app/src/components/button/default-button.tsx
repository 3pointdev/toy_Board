import { MouseEventHandler, ReactElement } from "react";

interface IProps {
  title: string | string[] | ReactElement;
  onClick: MouseEventHandler;
  addClass?: string;
}

/**
 * 기본 재사용 버튼
 * @param props.title 버튼 내 text
 * @param props.onClick 버튼 click event
 */
export default function DefaultButton(props: IProps): ReactElement {
  const { title, onClick, addClass } = props;

  return (
    <button
      className={`py-2 px-4 rounded-md shadow-md ${addClass}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
