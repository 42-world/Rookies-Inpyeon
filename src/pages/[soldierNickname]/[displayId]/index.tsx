import { Button } from "@rookies-team/design";
import { GetServerSideProps } from "next";
import Link from "next/link";

import { LetterLink, SoldierInfo } from "@/components";
import { httpClient } from "@/services";
import { LetterShort } from "@/types/Letter";
import { Soldier } from "@/types/Soldier";

interface Props {
  soldierNickname: string;
  displayId: string;
  soldier: Soldier;
  letters: LetterShort[] | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { soldierNickname, displayId } = context.query;
  const soldierRes = await httpClient({
    path: `/soldier?nickname=${soldierNickname}`,
  });
  if (!soldierRes) return { props: { letters: null } };

  const linkRes = await httpClient({
    path: `/link?soldierId=${soldierRes.id}&displayId=${displayId}`,
    headers: {
      Cookie: context.req.headers.cookie,
    },
  });
  if (!linkRes) return { props: { letters: null } };

  const letterRes = await httpClient({
    path: `/letter/by/linkId/${linkRes.id}`,
  });
  return {
    props: {
      soldierNickname,
      displayId,
      soldier: soldierRes,
      letters: letterRes ?? null,
    },
  };
};

export default function Letters({
  soldierNickname,
  displayId,
  soldier,
  letters,
}: Props) {
  if (!letters) return <h1>군인 혹은 링크가 잘못되었습니다</h1>;
  return (
    <>
      <SoldierInfo soldier={soldier} />
      <Link href={`/${soldierNickname}/${displayId}/write`}>
        <Button type="button" text="편지 쓰러가기" />
      </Link>
      <ul className="flex flex-col-reverse">
        {letters &&
          letters.map((letter) => (
            <LetterLink
              key={`${displayId}-${letter.id}`}
              letter={letter}
              soldierNickname={soldierNickname}
              displayId={displayId}
            />
          ))}
      </ul>
    </>
  );
}
