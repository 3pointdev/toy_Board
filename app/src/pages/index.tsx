import axios, { AxiosError, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import useScroll from "modules/scroll.module";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { MouseEvent, ReactElement, useEffect, useState } from "react";
import DefaultButton from "src/components/button/default-button";
import PostItem from "src/components/post/post-item";
import { PostDto } from "src/dto/post.dto";

interface IProps {
  posts: PostDto[];
  apiUrl: string;
}

/**
 * 메인페이지 - 게시판 게시물 리스트
 * @param param.posts SSR로 서버에서 받아온 게시물리스트
 */
export default function HomePostsView({ posts, apiUrl }: IProps): ReactElement {
  const [postList, setPostList] = useState<PostDto[]>([]);
  const [offset, setOffset] = useState<number>(2);
  const router = useRouter();

  //Mount 후 서버로부터 받아온 정보를 State에 PostDto에 맞추어 저장함
  useEffect(() => {
    setPostList(posts.map((item) => plainToInstance(PostDto, item)));
  }, []);

  //Scroll event
  const handleScroll = async () => {
    await axios
      .get<PostDto[]>(`${apiUrl}/post?offset=${offset}`)
      .then((result: AxiosResponse<PostDto[]>) => {
        setPostList([
          ...postList,
          ...result.data.map((item) => plainToInstance(PostDto, item)),
        ]);
        setOffset(offset + 1);
      })
      .catch((error: AxiosError) => {
        console.log("error!", error);
        return false;
      });
  };

  //스크롤액션모듈
  //뷰 하단으로부터 16px에 진입했을 경우 handleScroll작동
  //작동 후 3초간 반복작동 중지
  useScroll(handleScroll, { offset: 16, debounceDelay: 3000 });

  const onClickCreatePost = (e: MouseEvent<HTMLButtonElement>) => {
    router.push("/post/create");
  };

  return (
    <div>
      <div className="flex justify-between items-center px-2 pt-4">
        <h1 className="text-xl font-semibold px-3">게시판</h1>
        <DefaultButton
          title={"글쓰기"}
          onClick={onClickCreatePost}
          addClass={"bg-blue-500 hover:bg-blue-600 text-white"}
        />
      </div>
      <ul className="grid grid-cols-2 gap-4 px-4 py-4">
        {postList.map((post: PostDto, key: number) => {
          return <PostItem post={post} key={`post_${key}`} />;
        })}
      </ul>
      <div className="bg-gray-200 py-2 text-center text-sm">
        <p className="text-gray-600">
          {`© 2023 JANGJUNSU's Awesome Board, Inc.`}
        </p>
        <p className="text-gray-600">{`All rights reserved.`}</p>
        <p className="text-gray-600">{`Contact: motors3996@gmail.com`}</p>
      </div>
    </div>
  );
}

//SSR 서버로부터 랜더링 전 Post List를 받아옴
export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await axios.get<PostDto[]>(`${apiUrl}/post?offset=1`);
  const posts = response.data;
  return { props: { posts, apiUrl } };
};
