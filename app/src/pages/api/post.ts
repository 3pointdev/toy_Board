import post from "data/post.json";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // GET 요청 처리
    const offset = Number(req.query.offset); // query string에서 offset 값 추출
    const startIndex = (offset - 1) * 20; // 페이지당 20개의 게시글이 보이도록 offset을 이용하여 startIndex 계산
    const endIndex = offset * 20; // 페이지당 20개의 게시글이 보이도록 offset을 이용하여 endIndex 계산

    const responseData = Number(req.query.offset) // offset 값이 존재하는 경우, startIndex부터 endIndex까지의 게시글 목록 반환
      ? post.posts
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime() // 게시글 생성 시간 내림차순으로 정렬
          )
          .slice(startIndex, endIndex)
      : post.posts.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime() // 게시글 생성 시간 내림차순으로 정렬
        ); // offset 값이 존재하지 않는 경우, 모든 게시글 목록 반환

    res.status(200).json(responseData); // responseData를 JSON 형태로 반환
  } else if (req.method === "POST") {
    // POST 요청 처리
    const { author, title, content, password } = req.body; // 요청 body에서 author, title, content, password 값 추출
    const id = post.posts.length + 1; // 새로운 게시글의 id는 기존 게시글 수 + 1
    const created_at = new Date().toJSON(); // 현재 시간을 JSON 형태로 저장
    const newPost = {
      id,
      title,
      content,
      created_at,
      password,
      author,
    };
    post.posts.push(newPost); // 새로운 게시글을 기존 게시글 목록에 추가

    const filePath = path.join(process.cwd(), "data", "post.json"); // post.json 파일의 경로 설정
    fs.writeFileSync(filePath, JSON.stringify(post)); // 변경된 데이터를 post.json 파일에 저장

    res.status(201).json(newPost); // 생성된 게시글을 JSON 형태로 반환
  } else {
    res.status(405).send("Method not allowed"); // GET, POST 외의 요청은 Method not allowed 에러 반환
  }
}
