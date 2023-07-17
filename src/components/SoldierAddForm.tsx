import { FormEvent, useRef } from "react";
import { useRouter } from "next/router";
import { Button } from "@rookies-team/design";

import { httpClient } from "@/services";

interface Props {
  cookie: string;
}

export const SoldierAddForm = ({ cookie }: Props) => {
  const campIdRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      campId: campIdRef.current?.value,
      name: nameRef.current?.value,
      nickname: nicknameRef.current?.value,
    };

    httpClient({
      path: "/soldier",
      method: "post",
      body: JSON.stringify(data),
      headers: {
        Cookie: cookie,
      },
    }).then((res) => {
      console.log(res);
      router.push("/");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="부대명" required />
      <input type="text" placeholder="이름" required />
      <input type="text" placeholder="별명" required />
      <Button type="submit" text="등록하기" />
    </form>
  );
};
