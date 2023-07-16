import { FormEvent, useRef } from "react";

interface Props {
  linkId: number;
}

export const WriteForm = ({ linkId }: Props) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const writerRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      title: titleRef.current?.value,
      writer: writerRef.current?.value,
      content: contentRef.current?.value,
      linkId,
      password: passwordRef.current?.value,
    };
    fetch("http://localhost:8888/letter", {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "post",
      body: JSON.stringify(data),
    }).then((res) => console.log(res));
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
      <input
        type="text"
        placeholder="제목"
        className="border-2"
        maxLength={42}
        required
        ref={titleRef}
      />
      <input
        type="text"
        placeholder="작성자"
        className="border-2"
        maxLength={15}
        required
        ref={writerRef}
      />
      <input
        type="password"
        placeholder="비밀번호"
        className="border-2"
        maxLength={15}
        required
        ref={passwordRef}
      />
      <textarea
        placeholder="글 내용"
        className="border-2"
        ref={contentRef}
        required
        maxLength={4000}
      />
      <button type="submit">전송하기</button>
    </form>
  );
};
