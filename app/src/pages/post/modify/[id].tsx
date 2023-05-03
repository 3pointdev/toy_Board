import axios, { AxiosError, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import { Alert } from "modules/alert.module";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import DefaultButton from "src/components/button/default-button";
import SubPageContainer from "src/components/container/sub-page-container";
import PostForm from "src/components/post/post-form";
import { PostDto } from "src/dto/post.dto";
import { PostModel } from "src/model/post.model";

interface IProps {
  post: PostDto;
  apiUrl: string;
}

/**
 * 게시판 수정 페이지
 * @param post User가 선택한 기존 게시물 정보
 */
export default function PostModifyView({ post, apiUrl }: IProps): ReactElement {
  const postId = post.id;
  const [updateModel, setUpdateModel] = useState<PostModel>(new PostModel());
  const router = useRouter();

  //Mount 후 서버로부터 받아온 정보를 State에 PostModel에 맞추어 저장함
  useEffect(() => {
    setUpdateModel(plainToInstance(PostModel, post));
  }, []);

  // Post 수정 api
  const updatePost = async () => {
    await axios
      .put<PostModel>(`${apiUrl}/post/${postId}`, updateModel)
      .then((result: AxiosResponse) => {
        Alert.alert("수정되었습니다.", () => router.replace(`/post/${postId}`));
      })
      .catch((error: AxiosError) => {
        Alert.alert("수정을 실패하였습니다.");
        return false;
      });
  };

  // 게시물 수정 - 타이틀 변경 이벤트
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUpdateModel({ ...updateModel, title: value });
  };

  // 게시물 작성 - 작성자 변경 이벤트
  const onChangeAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUpdateModel({ ...updateModel, author: value });
  };

  // 게시물 수정 - 내용 변경 이벤트
  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setUpdateModel({ ...updateModel, content: value });
  };

  // 수정완료 이벤트
  const onClickComplete = (e: MouseEvent<HTMLButtonElement>) => {
    updatePost();
  };

  return (
    <SubPageContainer title={"글수정"}>
      <PostForm
        post={updateModel}
        onChangeTitle={onChangeTitle}
        onChangeContent={onChangeContent}
        onChangeAuthor={onChangeAuthor}
      />
      <div className="flex justify-center">
        <DefaultButton
          addClass="bg-blue-500 hover:bg-blue-600 text-white"
          title={"수정완료"}
          onClick={onClickComplete}
        />
      </div>
    </SubPageContainer>
  );
}

//SSR 서버로부터 랜더링 전 유저가 선택한 게시물의 id를 필터하여 알맞는 게시물 정보를 받아옴
export const getServerSideProps: GetServerSideProps = async (context) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const postId = context.query.id;
  const response = await axios.get(`${apiUrl}/post/${postId}`);
  const post = response.data.post;
  return { props: { post, apiUrl } };
};
