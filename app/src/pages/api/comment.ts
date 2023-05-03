import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { method } = req;

  // post.json 파일의 경로를 설정합니다.
  const filePath = path.join(process.cwd(), "data", "post.json");

  // GET 요청일 때, 모든 댓글을 반환합니다.
  if (method === "GET") {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const posts = JSON.parse(fileContents);
    res.status(200).json(posts.comments);
  }

  // POST 요청일 때, 새로운 댓글을 생성합니다.
  if (method === "POST") {
    const { author, content, password, post_id } = req.body;

    // post.json 파일을 읽어옵니다.
    const fileContents = fs.readFileSync(filePath, "utf8");
    const posts = JSON.parse(fileContents);

    // 새로운 댓글 객체를 생성합니다.
    const newComment = {
      id: posts.comments.length + 1,
      author,
      content,
      password,
      post_id,
      created_at: new Date().toISOString(),
    };

    // post.json 파일에 새로운 댓글을 추가합니다.
    posts.comments.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(posts));

    res.status(201).json(newComment);
  }

  // DELETE 요청일 때, 특정 댓글을 삭제합니다.
  if (method === "DELETE") {
    const { id, password } = req.query;

    // post.json 파일을 읽어옵니다.
    const fileContents = fs.readFileSync(filePath, "utf8");
    const posts = JSON.parse(fileContents);

    // 삭제할 댓글의 인덱스를 찾습니다.
    const commentIndex = posts.comments.findIndex(
      (comment) => comment.id === +id
    );

    console.log(
      "commentIndex",
      posts.comments[commentIndex].password,
      password
    );

    // 비밀번호가 일치하지 않으면 에러를 반환합니다.
    if (posts.comments[commentIndex].password !== password) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    // post.json 파일에서 댓글을 삭제합니다.
    posts.comments.splice(commentIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(posts));

    res.status(200).json({ message: "Comment deleted" });
  }
}
