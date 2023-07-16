import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { Letter } from "@/types/Letter";
import { httpClient } from "@/services";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { soldierNickname, displayId } = context.query;
  const soldierRes = await httpClient({
    path: `/soldier?nickname=${soldierNickname}`,
  });
  if (!soldierRes) return { props: { letters: null } };

  const linkRes = await httpClient({
    path: `/link?soldierId=${soldierRes.id}&displayId=${displayId}`,
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
    query: { soldierID, linkID },
  } = useRouter();

  if (!letters) return <h1>군인 혹은 링크가 잘못되었습니다</h1>;
  return (
    <main>
      <h1>편지 목록</h1>
      {letters &&
        letters.map((letter, index) => (
          <Link
            key={`${linkID}-${letter.id}`}
            href={`/${soldierID}/${letter.linkId}/${letter.id}`}>
            <h3>{letter.writer}이(가) 쓴 편지입니다</h3>
          </Link>
        ))}
    </main>
  );
}
