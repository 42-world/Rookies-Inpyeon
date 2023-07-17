import { httpClient } from "@/services";
import { Button, Input } from "@rookies-team/design";
import { useRouter } from "next/router";
import { FormEvent, useRef } from "react";

interface Props {
  soldierNickname: string;
  soldierId: number;
}

export const LinkAddForm = ({ soldierNickname, soldierId }: Props) => {
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = { soldierId, description: descriptionRef.current?.value };

    httpClient({
      path: "/link",
      body: JSON.stringify(data),
      method: "post",
    }).then((res) => {
      router.push(`/${soldierNickname}`);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="링크 설명"
        ref={descriptionRef}
        required
      />
      <Button type="submit" text="링크 생성하기" className="mt-4" />
    </form>
  );
};
