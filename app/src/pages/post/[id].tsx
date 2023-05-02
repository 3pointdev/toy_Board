import axios, { AxiosError, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import { Alert } from "modules/alert.module";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { MouseEvent, ReactElement, useEffect, useState } from "react";
import DefaultButton from "src/components/button/default-button";
import SubPageContainer from "src/components/container/sub-page-container";
import PostDetail from "src/components/post/post-detail";
import { PostDto } from "src/dto/post.dto";

interface IProps {
  post: PostDto;
  apiUrl: string;
}

/**
 * 게시판 상세페이지
 * @param props.post User가 선택한 게시물 정보
 */
export default function PostView(props: IProps): ReactElement {
  const [post, setPost] = useState<PostDto>(new PostDto());
  const router = useRouter();

  //Mount 후 서버로부터 받아온 정보를 State에 PostDto에 맞추어 저장함
  useEffect(() => {
    setPost(plainToInstance(PostDto, props.post));
  }, []);

  //게시물 수정 이벤트
  const onClickModify = (e: MouseEvent<HTMLButtonElement>) => {
    Alert.prompt({
      title: "게시물을 수정하려면 비밀번호를 입력해 주세요.",
      inputType: "text",
      showCancel: true,
      placeholder: "비밀번호를 입력해 주세요.",
      confirm: "수정",
      callback: () => {
        router.push(`/post/modify/${post.id}`);
      },
      error: "비밀번호가 올바르지 않습니다.",
      validation: (value, resolve) => {
        if (value !== post.password) {
          resolve("비밀번호가 올바르지 않습니다.");
        } else {
          resolve();
        }
      },
    });
  };

  //게시물 삭제 이벤트
  const onClickDelete = (e: MouseEvent<HTMLButtonElement>) => {
    Alert.prompt({
      title: "삭제 하시겠습니까?",
      inputType: "text",
      showCancel: true,
      placeholder: "비밀번호를 입력해 주세요.",
      confirm: "삭제",
      callback: () => {
        deletePost();
      },
      error: "비밀번호가 올바르지 않습니다.",
      validation: (value, resolve) => {
        if (value !== post.password) {
          resolve("비밀번호가 올바르지 않습니다.");
        } else {
          resolve();
        }
      },
    });
  };

  //Post 삭제 api
  const deletePost = async () => {
    await axios
      .delete<PostDto>(`${props.apiUrl}/post/${post.id}`)
      .then((result: AxiosResponse) => {
        Alert.alert("성공적으로 삭제하였습니다.", () => router.replace("/"));
      })
      .catch((error: AxiosError) => {
        Alert.alert("삭제를 실패하였습니다.");
        return false;
      });
  };

  return (
    <SubPageContainer title={"게시물"}>
      <PostDetail post={post} />
      <div className="flex justify-between">
        <DefaultButton
          addClass="bg-blue-500 hover:bg-blue-600 text-white"
          title={"수정"}
          onClick={onClickModify}
        />
        <DefaultButton
          addClass="bg-red-500 hover:bg-red-600 text-white"
          title={"삭제"}
          onClick={onClickDelete}
        />
      </div>
    </SubPageContainer>
  );
}

//SSR 서버로부터 랜더링 전 유저가 선택한 게시물의 id를 필터하여 알맞는 게시물 정보를 받아옴
export const getServerSideProps: GetServerSideProps = async (context) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const postId = context.query.id;
  const response = await axios.get<PostDto>(`${apiUrl}/post/${postId}`);
  const post = response.data;
  return { props: { post, apiUrl } };
};
