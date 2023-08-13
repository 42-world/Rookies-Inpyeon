import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Text } from "@rookies-team/design";
import { getDateDistance } from "@toss/date";

import { type Letter } from "@/types/Letter";
import { httpClient } from "@/services";

const DUMMY_LETTER: Letter = {
  id: -1,
  title: "",
  linkId: -1,
  content: "",
  writer: "",
  isSent: false,
  password: "",
  createdAt: "1900-01-01",
  updatedAt: "1900-01-01",
  deletedAt: "",
};

interface Props {
  letterId: number;
  password: string;
}

export const LetterViewForm = ({ letterId, password }: Props) => {
  const [letter, setLetter] = useState<Letter>(DUMMY_LETTER);
  const { register, handleSubmit, watch } = useForm();

  function handleSubmitForm(data: any) {
    httpClient({ path: `/letter/${letterId}?password=${data.password}` }).then(
      (res) => {
        setLetter(res);
      }
    );
  }

  useEffect(() => {
    if (password === "false") {
      httpClient({ path: `/letter/${letterId}` }).then((res) => {
        setLetter(res);
      });
    }
  }, [letterId, password]);

  if (!password || (password !== "true" && password !== "false")) {
    return <Text size="heading2" weight="semibold" text="잘못된 접근입니다" />;
  }

  if (!letter || (password === "true" && letter.id < 0)) {
    return (
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <input
          type="text"
          className="border-border-primary bg-transparent focus-within:border-color-blue_200 dark:border-border-primary_dark rounded-xl flex-1 border mt-4 w-full px-4 py-2 mb-4 placeholder:text-text-tertiary"
          maxLength={15}
          required={true}
          placeholder="비밀번호를 입력하세요."
          {...register("password")}
        />
        <Button disabled={!watch("password")} text="이동" />
      </form>
    );
  }

  const distance = getDateDistance(new Date(letter.createdAt), new Date());
  const distanceDate =
    distance.days > 1
      ? `${distance.days}일 전`
      : `${distance.days * 24 + distance.hours}시간 전`;

  return (
    <>
      <div className="py-2">
        <Text
          size="body1"
          weight="medium"
          color="secondary"
          text={distanceDate}
        />
        <Text size="heading2" weight="semibold" text={letter.title} />
      </div>
      <Text
        size="body1"
        weight="regular"
        color="secondary"
        text={letter.content}
        className="py-4"
      />
    </>
  );
};
