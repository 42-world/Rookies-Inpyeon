import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { getDateDistance } from "@toss/date";

import { LetterShort } from "@/types/Letter";
import { ListItem } from "@rookies-team/design";

interface Props {
  letter: LetterShort;
  soldierNickname: string;
  displayId: string;
}

export const LetterLink = ({ letter, soldierNickname, displayId }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const router = useRouter();

  const distance = getDateDistance(new Date(letter.createdAt), new Date());
  const distanceDate =
    distance.days > 1
      ? `${distance.days}일 전`
      : `${distance.days * 24 + distance.hours}시간 전`;

  function handleSubmitForm(data: any) {
    router.push(
      `/${soldierNickname}/${displayId}/${letter.id}?password=${data.password}`
    );
  }

  if (letter.hasPassword) {
    return (
      <>
        <ListItem
          onClick={() => setIsActive((prev) => !prev)}
          secondaryTextFirst={distanceDate}
          title={`${letter.writer}님이 보낸 인편입니다!`}
        />
        {isActive && (
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <input
              className="border"
              placeholder="비밀번호를 입력하세요."
              {...register("password")}
            />
            <button disabled={!watch("password")}>이동</button>
          </form>
        )}
      </>
    );
  }
  return (
    <ListItem
      onClick={() =>
        router.push(`/${soldierNickname}/${displayId}/${letter.id}`)
      }
      secondaryTextFirst={distanceDate}
      title={`${letter.writer}님이 보낸 인편입니다!`}
    />
  );
};
