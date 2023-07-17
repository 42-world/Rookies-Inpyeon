import { FormEvent, useRef } from "react";
import { useRouter } from "next/router";
import { Button } from "@rookies-team/design";
import { httpClient } from "@/services";

export const SoldierAddForm = () => {
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
      body: JSON.stringify(data),
      method: "post",
    }).then((res) => {
      console.log(res);
      router.push("/");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="부대명" ref={campIdRef} required />
      <input type="text" placeholder="이름" ref={nameRef} required />
      <input type="text" placeholder="별명" ref={nicknameRef} required />
      <Button type="submit" text="등록하기" />
    </form>
  );
};
