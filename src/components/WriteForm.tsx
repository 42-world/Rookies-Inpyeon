import { FormEvent, useRef } from "react";
import { Button, Input } from "@rookies-team/design";

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
    fetch("http://localhost:8889/letter", {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "post",
      body: JSON.stringify(data),
    }).then((res) => console.log(res));
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
      <Input
        type="text"
        placeholder="제목"
        maxLength={42}
        required
        ref={titleRef}
      />
      <Input
        type="text"
        placeholder="작성자"
        maxLength={15}
        required
        ref={writerRef}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        maxLength={15}
        required
        ref={passwordRef}
      />
      <textarea
        placeholder="글 내용"
        className="border-2 mt-4"
        cols={30}
        rows={15}
        ref={contentRef}
        required
        maxLength={4000}
      />
      <Button type="submit" text="전송하기" className="mt-4" />
    </form>
  );
};
