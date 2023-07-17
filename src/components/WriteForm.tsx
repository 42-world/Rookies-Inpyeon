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
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요."
          type="password"
          maxLength={15}
          required
          ref={passwordRef}
        />
      )}
      <Input
        label="이름"
        placeholder="군인에게 보여질 이름을 입력해 주세요."
        type="text"
        maxLength={20}
        required
        ref={writerRef}
      />
      <textarea
        placeholder="군인에게 전달하고 싶은 내용을 입력해 주세요."
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
