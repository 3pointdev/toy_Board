import post from "data/post.json";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const postsFilePath = path.join(process.cwd(), "data", "post.json"); // post.json 파일의 경로 설정

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // query string에서 id 값 추출

  if (req.method === "GET") {
    // GET 요청 처리
    const targetPost = post.posts.find((post) => post.id === +id); // id에 해당하는 게시글을 post.json에서 찾음
    if (!targetPost) {
      // 해당하는 게시글이 없으면 404 에러 반환
      res.status(404).send("Post not found");
      return;
    }
    const targetComments = post.comments.filter(
      // 해당 게시글에 해당하는 댓글 목록을 post.json에서 찾음
      (comment) => comment.post_id === +id
    );
    targetComments.sort(
      // 댓글 목록을 생성 시간 내림차순으로 정렬
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    res.status(200).json({ post: targetPost, comments: targetComments }); // 게시글과 댓글 목록을 JSON 형태로 반환
  } else if (req.method === "PUT") {
    // PUT 요청 처리
    const { title, content } = req.body; // 요청 body에서 title, content 값 추출
    const index = post.posts.findIndex((post) => post.id === +id); // id에 해당하는 게시글의 인덱스를 post.json에서 찾음
    if (index === -1) {
      // 해당하는 게시글이 없으면 404 에러 반환
      res.status(404).send("Post not found");
      return;
    }
    const updatedPost = { ...post.posts[index], title, content }; // 새로운 게시글 객체 생성
    post.posts.splice(index, 1, updatedPost); // 기존 게시글을 새로운 게시글로 대체
    fs.writeFileSync(postsFilePath, JSON.stringify(post, null, 2)); // 변경된 데이터를 post.json 파일에 저장
    res.status(200).json(updatedPost); // 변경된 게시글을 JSON 형태로 반환
  } else if (req.method === "DELETE") {
    // DELETE 요청 처리
    const index = post.posts.findIndex((post) => post.id === +id); // id에 해당하는 게시글의 인덱스를 post.json에서 찾음
    if (index === -1) {
      // 해당하는 게시글이 없으면 404 에러 반환
      res.status(404).send("Post not found");
      return;
    }
    post.posts.splice(index, 1); // post.json에서 해당하는 게시글을 삭제
    fs.writeFileSync(postsFilePath, JSON.stringify(post, null, 2)); // 변경된 데이터를 post.json 파일에 저장
    res.status(200).send("Post deleted"); // "Post deleted" 메시지를 반환
  } else {
    res.status(405).send("Method not allowed"); // GET, PUT, DELETE 외의 요청은 Method not allowed 에러 반환
  }
}
