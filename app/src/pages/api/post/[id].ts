import post from "data/post.json";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const postsFilePath = path.join(process.cwd(), "data", "post.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    const targetPost = post.posts.find((post) => post.id === +id);
    if (!targetPost) {
      res.status(404).send("Post not found");
      return;
    }
    res.status(200).json(targetPost);
  } else if (req.method === "PUT") {
    const { title, content } = req.body;
    const index = post.posts.findIndex((post) => post.id === +id);
    if (index === -1) {
      res.status(404).send("Post not found");
      return;
    }
    const updatedPost = { ...post.posts[index], title, content };
    post.posts.splice(index, 1, updatedPost);
    fs.writeFileSync(postsFilePath, JSON.stringify(post, null, 2));
    res.status(200).json(updatedPost);
  } else if (req.method === "DELETE") {
    const index = post.posts.findIndex((post) => post.id === +id);
    if (index === -1) {
      res.status(404).send("Post not found");
      return;
    }
    post.posts.splice(index, 1);
    fs.writeFileSync(postsFilePath, JSON.stringify(post, null, 2));
    res.status(200).send("Post deleted");
  } else {
    res.status(405).send("Method not allowed");
  }
}
