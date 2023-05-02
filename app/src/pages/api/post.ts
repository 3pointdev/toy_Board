import post from "data/post.json";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const offset = Number(req.query.offset);
    const startIndex = (offset - 1) * 20;
    const endIndex = offset * 20;
    const responseData = Number(req.query.offset)
      ? post.posts
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .slice(startIndex, endIndex)
      : post.posts.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

    res.status(200).json(responseData);
  } else if (req.method === "POST") {
    const { author, title, content, password } = req.body;
    const id = post.posts.length + 1;
    const created_at = new Date().toJSON();
    const newPost = {
      id,
      title,
      content,
      created_at,
      password,
      author,
    };
    post.posts.push(newPost);

    // post.json 파일에 변경된 데이터 저장
    const filePath = path.join(process.cwd(), "data", "post.json");
    fs.writeFileSync(filePath, JSON.stringify(post));

    res.status(201).json(newPost);
  } else {
    res.status(405).send("Method not allowed");
  }
}
