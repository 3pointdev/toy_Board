## **게시판 프로젝트**
#### 이 프로젝트는 React와 Next.js, Typescript, Tailwindcss를 사용하여 만든 간단한 게시판입니다.
#### 사용자는 게시글을 작성하고, 다른 사용자는 게시글에 댓글을 작성할 수 있습니다.
#

### **실행방법**
- 프로젝트를 원하는 위치에 다운로드 합니다.
- 프로젝트 루트경로에 [.env]()파일을 생성하고 다음과 같이 기입한 후 저장합니다.
- NEXT_PUBLIC_API_URL=api address (로컬이라면 http://localhost:3000/api )
- 터미널을 실행해서 pnpm run dev를 입력하고 http://localhost:portnumber로 접속합니다.

### **사용된 스택**
- React
- Next.js
- Typescript
- Tailwindcss
- Git Flow

### **개발환경**
- 이 프로젝트는 Local에서 개발되었습니다.
- Next.js에서 제공하는 [pages/api](src/pages/api/)를 활용하여 직접 서버 코드를 작성하였습니다.

### **데이터 저장 위치**
- 게시글과 댓글 데이터는 [/data/post.json](data/post.json) 파일에 저장되어 있습니다.

### **기능**

- Post 무한스크롤 : 무한스크롤 기능이 적용되어, 사용자는 게시글 목록을 업데이트할 수 있습니다.

- Post 작성 : 사용자는 제목, 내용, 비밀번호를 입력하여 게시글을 작성할 수 있습니다.

- Post 삭제 : 작성자 본인만 게시글을 삭제할 수 있습니다. 비밀번호가 일치하지 않으면 삭제할 수 없습니다.

- Post 수정 : 작성자 본인만 게시글을 수정할 수 있습니다. 비밀번호가 일치하지 않으면 수정할 수 없습니다.

- Comment 작성 : 사용자는 댓글을 작성할 수 있습니다.

- Comment 삭제 : 작성자 본인만 댓글을 삭제할 수 있습니다. 비밀번호가 일치하지 않으면 삭제할 수 없습니다.

### **페이지설명**
- 메인페이지</br>
<img src="public/Images/main-page.png" width="150" height="300">
- 게시글 상세페이지</br>
<img src="public/Images/post-detail.png" width="150" height="300">
- 게시글 생성 및 수정 페이지</br>
<img src="public/Images/post-create.png" width="150" height="300">
<img src="public/Images/post-modify.png" width="150" height="300">

### **개발자**
- 장준수 // motors3996@gmail.com