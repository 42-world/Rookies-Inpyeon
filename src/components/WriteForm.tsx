import { FormEvent, useRef, useState } from "react";
import { Button, Checkbox, Input } from "@rookies-team/design";
import { useRouter } from "next/router";
import { httpClient } from "@/services";

interface Props {
  linkId: number;
}

export const WriteForm = ({ linkId }: Props) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const writerRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isSecret, setIsSecret] = useState(false);
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: Record<string, string | number | undefined> = {
      title: titleRef.current?.value,
      writer: writerRef.current?.value,
      content: contentRef.current?.value,
      linkId,
    };
    if (isSecret) data.password = passwordRef.current?.value;

    httpClient({
      path: "/letter",
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res) return;
      alert("편지가 정상적으로 등록되었습니다");
      router.reload();
    });
  }

  const handleChangeCheckbox = () => {
    setIsSecret((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
      <Checkbox
        checked={isSecret}
        labelText="비밀글"
        onChange={handleChangeCheckbox}
      />
      {isSecret && (
        <Input
          type="password"
          placeholder="비밀번호"
          maxLength={15}
          required
          ref={passwordRef}
        />
      )}
      <Input
        type="text"
        placeholder="작성자"
        maxLength={15}
        required
        ref={writerRef}
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
