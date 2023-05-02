import post from "data/post.json";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const offset = Number(req.query.offset);
    const startIndex = (offset - 1) * 20;
    const endIndex = offset * 20;
    const responseData = Number(req.query.offset)
      ? post.posts.slice(startIndex, endIndex)
      : post.posts;

    res.status(200).json(responseData);
  } else if (req.method === "POST") {
    const { title, content, password } = req.body;
    const id = post.posts.length + 1;
    const created_at = new Date().toJSON();
    const newPassword = password ?? `password${id}`;
    const newPost = { id, title, content, created_at, password };
    post.posts.push(newPost);
    res.status(201).json(newPost);
  } else {
    res.status(405).send("Method not allowed");
  }
}
