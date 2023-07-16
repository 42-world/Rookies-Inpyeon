import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { Letter } from "@/types/Letter";
import { httpClient } from "@/services";
import { useState } from "react";
import { LetterLink } from "@/components/LetterLink";

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("cookie: ", context.req.headers.cookie);
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
    props: { letters: letterRes ?? null },
  };
};

export default function Letters({ letters }: { letters: Letter[] | null }) {
  const {
    query: { soldierNickname, displayId },
  } = useRouter();

  console.log(letters);
  if (!letters) return <h1>군인 혹은 링크가 잘못되었습니다</h1>;
  return (
    <main>
      <h1>편지 목록</h1>
      <ul className="flex flex-col">
        {letters &&
          letters.map((letter) => (
            <li key={`${displayId}-${letter.id}`}>
              <LetterLink letter={letter} />
            </li>
          ))}
      </ul>
    </main>
  );
}
